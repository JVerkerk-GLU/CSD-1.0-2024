(function () {
  const dependencies = [
    { name: "Tone", url: "https://unpkg.com/tone@14.9.15/build/Tone.js" },
    {
      name: "Tone.Midi",
      url: "https://unpkg.com/@tonejs/midi@2.0.28/build/Midi.js",
    },
  ];

  function loadScript(url, callback) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = callback;
    script.onerror = () => {
      console.error(`FATAL ERROR: Failed to load dependency from ${url}`);
      alert(
        "Could not load required audio libraries (Tone.js or Tone.Midi). Please check your network connection."
      );
    };
    script.src = url;
    document.head.appendChild(script);
  }

  let currentDependencyIndex = 0;

  function loadDependency() {
    if (currentDependencyIndex >= dependencies.length) {
      defineAPI();
      return;
    }

    const dep = dependencies[currentDependencyIndex];
    if (dep.name === "Tone" && typeof window.Tone !== "undefined") {
      console.warn(`Dependency ${dep.name} already loaded, skipping.`);
      currentDependencyIndex++;
      loadDependency();
      return;
    }

    loadScript(dep.url, () => {
      currentDependencyIndex++;
      loadDependency();
    });
  }

  // 4. DEFINE PUBLIC API FUNCTIONS (Executed after all dependencies are present)
  function defineAPI() {

    //#region --- Utilities ---

    function _map(value, start1, stop1, start2, stop2) {
      const result =
        start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
      return result;
    }

    function _constrain(value, low, high) {
      return Math.max(Math.min(value, high), low);
    }

    function _linearToDb(linearValue) {
      const minDb = -40;
      const maxDb = 0;
      const dbValue = _map(linearValue, 0, 100, minDb, maxDb);
      return linearValue === 0 ? -100 : dbValue;
    }

    //#endregion

    //#region --- Loaders ---

    /**
     * Asynchronously loads a MIDI file from the given path using Tone.js.
     * This function handles error logging and returns a Promise that resolves
     * with the fully processed Tone.Midi object.
     * * @param {string} path The file path or URL to the MIDI file.
     * @returns {Promise<object>} A Promise that resolves with the loaded Tone.Midi object.
     * @throws {Error} Throws an error if the MIDI file fails to load.
     */
    window.loadMidiAsync = async function (path) {
      try {
        const midiData = await Midi.fromUrl(path);
        return midiData;
      } catch (error) {
        console.error(`Failed to load MIDI file at ${path}:`, error);
        throw error;
      }
    };

    //#endregion

    /**
     * Creates and returns a self-contained object to manage MIDI playback and scheduling.
     * The object is synchronous and requires fully loaded Tone.Midi data to be passed to the .load() method.
     * @returns {object} The synth player interface.
     */
    window.createSynth = function () {
      const synth = {
        /** @private {Array<Tone.PolySynth>} Internal array of Tone.PolySynth objects for each track. */
        players: [],
        /** @private {Array<Tone.Part>} Internal array of Tone.Part objects containing note schedules. */
        parts: [],

        listeners: {},

        //#region --- Activities ---

        /** * Starts or resumes playback from the current position.
         * Ensures Tone.start() is called to initialize the audio context.
         */
        play() {
          Tone.start();
          Tone.Transport.start();
        },

        /** * Pauses playback. Instantly releases all currently playing notes.
         */
        pause() {
          this.players.forEach((synth) => synth.releaseAll());
          Tone.Transport.pause();
        },

        /** * Stops playback and resets the playhead to the beginning (0:0:0).
         * Instantly releases all currently playing notes.
         */
        stop() {
          this.players.forEach((synth) => synth.releaseAll());
          Tone.Transport.stop();
        },

        /**
         * Schedules the music by processing the loaded MIDI data into Tone.js Parts and Synths.
         * This method is synchronous.
         * @param {object} midi - The fully loaded Midi object (resolved from Midi.fromUrl).
         */
        load(midi) {
          this.stop();
          this._dispose();

          if (
            typeof midi !== "object" ||
            midi === null ||
            !Array.isArray(midi.tracks)
          ) {
            console.error(
              "Cannot load: Provided data is not a valid Midi object."
            );
            return;
          }

          midi.tracks.forEach((track) => {
            const synth = new Tone.PolySynth(Tone.Synth, {
              envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 },
            }).toDestination();
            this.synths.push(synth);

            const partEvents = track.notes.map((note) => ({
              time: note.time,
              note: note.name,
              midi: note.midi,
              duration: note.duration,
              velocity: note.velocity,
            }));

            const part = new Tone.Part((time, value) => {
              synth.triggerAttackRelease(
                value.note,
                value.duration,
                time,
                value.velocity
              );

              this._triggerListener("attack", {
                time: Tone.Transport.seconds,
                note: value.note,
                midi: value.midi,
                velocity: value.velocity,
                channel: track.channel || 0,
              });

              Tone.Transport.scheduleOnce(() => {
                this._triggerListener("release", {
                  time: Tone.Transport.seconds,
                  note: value.note,
                  midi: value.midi,
                  channel: track.channel || 0,
                });
              }, time + value.duration);
            }, partEvents);

            part.start(0);
            this.parts.push(part);
          });
        },

        //#endregion

        //#region --- Listeners ---

        /**
         * Subscribes a callback function to a specific event.
         * Supported events: 'attack', 'release'.
         * @param {string} eventName - The name of the event ('attack' or 'release').
         * @param {function} callback - The function to execute when the event fires.
         */
        addListener(eventName, callback) {
          if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
          }
          this.listeners[eventName].push(callback);
        },

        /**
         * Unsubscribes a callback function from a specific event.
         * @param {string} eventName - The name of the event.
         * @param {function} callback - The function to remove.
         */
        removeListener(eventName, callback) {
          if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(
              (cb) => cb !== callback
            );
          }
        },

        _triggerListener(eventName, data) {
          if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((callback) => callback(data));
          }
        },

        //#endregion

        //#region --- State ---

        /** * @property {boolean} isPlaying
         * Returns true if the transport clock is running and the music is audible.
         */
        get isPlaying() {
          return Tone.Transport.state === "started";
        },

        /** * @property {boolean} isPaused
         * Returns true if the transport clock is paused (position is held).
         */
        get isPaused() {
          return Tone.Transport.state === "paused";
        },

        //#endregion

        //#region --- Volume ---

        /** * @property {number} volumeDb
         * Gets or sets the master output volume in **decibels (dB)**.
         * Range: typically -40.0 dB (min) to 0.0 dB (max).
         */
        get volumeDb() {
          return Tone.Destination.volume.value;
        },
        set volumeDb(newDb) {
          Tone.Destination.volume.value = newDb;
        },

        /** * @property {number} volume
         * Gets or sets the master output volume on a **linear scale**.
         * Range: 0.0 (mute) to 1.0 (max).
         */
        get volume() {
          const currentDb = this.volumeDb;
          const minDb = -40;
          const maxDb = 0;
          if (currentDb <= -100) return 0;
          return map(currentDb, minDb, maxDb, 0, 100) / 100;
        },
        set volume(linearValue) {
          const sliderValue = _constrain(linearValue * 100, 0, 100);
          const newDb = _linearToDb(sliderValue);
          this.volumeDb = newDb;
        },

        //#endregion

        /** * @private
         * Disposes of all internal Tone.js parts and synth objects to prevent memory leaks.
         */
        _dispose() {
          this.parts.forEach((p) => p.dispose());
          this.players.forEach((s) => s.dispose());
          this.parts = [];
          this.synths = [];
          Tone.Transport.cancel();
        },
      };

      return synth;
    };
  }

  loadDependency();
})();
