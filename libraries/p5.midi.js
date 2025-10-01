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
    const GM_INSTRUMENTS_BASE_URL = "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/";
    const INSTRUMENT_TABLE = ["acoustic_grand_piano", "bright_acoustic_piano", "electric_grand_piano", "honkytonk_piano", "electric_piano_1", "electric_piano_2", "harpsichord", "clavinet", "celesta", "glockenspiel", "music_box", "vibraphone", "marimba", "xylophone", "tubular_bells", "dulcimer", "drawbar_organ", "percussive_organ", "rock_organ", "church_organ", "reed_organ", "accordion", "harmonica", "tango_accordion", "acoustic_guitar_nylon", "acoustic_guitar_steel", "electric_guitar_jazz", "electric_guitar_clean", "electric_guitar_muted", "overdriven_guitar", "distortion_guitar", "guitar_harmonics", "acoustic_bass", "electric_bass_finger", "electric_bass_pick", "fretless_bass", "slap_bass_1", "slap_bass_2", "synth_bass_1", "synth_bass_2", "violin", "viola", "cello", "contrabass", "tremolo_strings", "pizzicato_strings", "orchestral_harp", "timpani", "string_ensemble_1", "string_ensemble_2", "synth_strings_1", "synth_strings_2", "choir_aahs", "voice_oohs", "synth_choir", "orchestra_hit", "trumpet", "trombone", "tuba", "muted_trumpet", "french_horn", "brass_section", "synth_brass_1", "synth_brass_2", "soprano_sax", "alto_sax", "tenor_sax", "baritone_sax", "oboe", "english_horn", "bassoon", "clarinet", "piccolo", "flute", "recorder", "pan_flute", "blown_bottle", "shakuhachi", "whistle", "ocarina", "lead_1_square", "lead_2_sawtooth", "lead_3_calliope", "lead_4_chiff", "lead_5_charang", "lead_6_voice", "lead_7_fifths", "lead_8_bass__lead", "pad_1_new_age", "pad_2_warm", "pad_3_polysynth", "pad_4_choir", "pad_5_bowed", "pad_6_metallic", "pad_7_halo", "pad_8_sweep", "fx_1_rain", "fx_2_soundtrack", "fx_3_crystal", "fx_4_atmosphere", "fx_5_brightness", "fx_6_goblins", "fx_7_echoes", "fx_8_scifi", "sitar", "banjo", "shamisen", "koto", "kalimba", "bagpipe", "fiddle", "shanai", "tinkle_bell", "agogo", "steel_drums", "woodblock", "taiko_drum", "melodic_tom", "synth_drum", "reverse_cymbal", "guitar_fret_noise", "breath_noise", "seashore", "bird_tweet", "telephone_ring", "helicopter", "applause", "gunshot"];
    const NOTE_SAMPLES = {
  // --- Natural Notes (Mapped to their own file) ---
  
  // OCTAVE 1
  'C1': 'C1.mp3', 'D1': 'D1.mp3', 'E1': 'E1.mp3', 'F1': 'F1.mp3', 
  'G1': 'G1.mp3', 'A1': 'A1.mp3', 'B1': 'B1.mp3',
  
  // OCTAVE 2
  'C2': 'C2.mp3', 'D2': 'D2.mp3', 'E2': 'E2.mp3', 'F2': 'F2.mp3', 
  'G2': 'G2.mp3', 'A2': 'A2.mp3', 'B2': 'B2.mp3',
  
  // OCTAVE 3
  'C3': 'C3.mp3', 'D3': 'D3.mp3', 'E3': 'E3.mp3', 'F3': 'F3.mp3', 
  'G3': 'G3.mp3', 'A3': 'A3.mp3', 'B3': 'B3.mp3',
  
  // OCTAVE 4 (Middle C)
  'C4': 'C4.mp3', 'D4': 'D4.mp3', 'E4': 'E4.mp3', 'F4': 'F4.mp3', 
  'G4': 'G4.mp3', 'A4': 'A4.mp3', 'B4': 'B4.mp3',
  
  // OCTAVE 5
  'C5': 'C5.mp3', 'D5': 'D5.mp3', 'E5': 'E5.mp3', 'F5': 'F5.mp3', 
  'G5': 'G5.mp3', 'A5': 'A5.mp3', 'B5': 'B5.mp3',
  
  // OCTAVE 6
  'C6': 'C6.mp3', 'D6': 'D6.mp3', 'E6': 'E6.mp3', 'F6': 'F6.mp3', 
  'G6': 'G6.mp3', 'A6': 'A6.mp3', 'B6': 'B6.mp3',
  
  // OCTAVE 7
  'C7': 'C7.mp3', 'D7': 'D7.mp3', 'E7': 'E7.mp3', 'F7': 'F7.mp3', 
  'G7': 'G7.mp3', 'A7': 'A7.mp3', 'B7': 'B7.mp3',

  
  // --- Chromatic Notes (Mapped to Flat equivalent file names) ---

  // C# -> Db
  'C#1': 'Db1.mp3', 'C#2': 'Db2.mp3', 'C#3': 'Db3.mp3', 'C#4': 'Db4.mp3', 
  'C#5': 'Db5.mp3', 'C#6': 'Db6.mp3', 'C#7': 'Db7.mp3',

  // D# -> Eb
  'D#1': 'Eb1.mp3', 'D#2': 'Eb2.mp3', 'D#3': 'Eb3.mp3', 'D#4': 'Eb4.mp3', 
  'D#5': 'Eb5.mp3', 'D#6': 'Eb6.mp3', 'D#7': 'Eb7.mp3',

  // F# -> Gb
  'F#1': 'Gb1.mp3', 'F#2': 'Gb2.mp3', 'F#3': 'Gb3.mp3', 'F#4': 'Gb4.mp3', 
  'F#5': 'Gb5.mp3', 'F#6': 'Gb6.mp3', 'F#7': 'Gb7.mp3',

  // G# -> Ab
  'G#1': 'Ab1.mp3', 'G#2': 'Ab2.mp3', 'G#3': 'Ab3.mp3', 'G#4': 'Ab4.mp3', 
  'G#5': 'Ab5.mp3', 'G#6': 'Ab6.mp3', 'G#7': 'Ab7.mp3',

  // A# -> Bb
  'A#1': 'Bb1.mp3', 'A#2': 'Bb2.mp3', 'A#3': 'Bb3.mp3', 'A#4': 'Bb4.mp3', 
  'A#5': 'Bb5.mp3', 'A#6': 'Bb6.mp3', 'A#7': 'Bb7.mp3',
};


    let instrumentCache = {};

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
        const promises = midiData.tracks.forEach(async (track) => {
          const iName = track.channel != 9 ?
              INSTRUMENT_TABLE[track.instrument?.number] : undefined;

          if (iName && !(iName in instrumentCache)) {
            const iSampler = new Tone.Sampler({
              urls: NOTE_SAMPLES,
              baseUrl: GM_INSTRUMENTS_BASE_URL + iName + "-mp3/",
            }).toDestination();

            instrumentCache[iName] = iSampler;
            await iSampler.loaded;
          }
        });

        if (promises)
          await Promise.all(promises);

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
        async load(midi) {
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

          const promises = [];

          midi.tracks.forEach((track) => {
            const iName = track.channel != 9 && track.instrument?.number != 0 ?
              INSTRUMENT_TABLE[track.instrument?.number] : undefined;
            const synth = this._createSynth(iName);
            this.synths.push(synth);

            const partEvents = track.notes.map((note) => ({
              time: note.time,
              note: note.name,
              midi: note.midi,
              duration: note.duration,
              velocity: note.velocity,
              instrument: iName
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

          await Promise.all(promises);
        },

        _createSynth(instrumentName) {
          if (instrumentName && instrumentName in instrumentCache) {
            return instrumentCache[instrumentName];
          } else {
            return new Tone.PolySynth(Tone.Synth, {
              envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 },
            }).toDestination();
          }
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
