const SONG_PATHS = {
  Jenova: "assets/jenova.mid",
  Mario: "assets/mario.mid",
  Matoya: "assets/matoya.mid",
  Tetris: "assets/tetris.mid",
};

let songs = {};
let isLoading = true;
let currentSong = "";

let synth;
let parts = [];

let playButton;
let resetButton;

async function setup() {
  createCanvas(960, 540);
  textFont("Orbitron");

  synth = createSynth();
  synth.volume = 0.5;

  try {
    const songNames = Object.keys(SONG_PATHS);
    const loadPromises = songNames.map((name) =>
      loadMidiAsync(SONG_PATHS[name])
    );
    const files = await Promise.all(loadPromises);

    songNames.forEach((name, index) => {
      songs[name] = { file: files[index], buttons: {} };
    });
    isLoading = false;
  } catch (error) {
    console.error("Failed to load or schedule MIDI:", error);
  }

  setupVisualizer();
}

function draw() {
  drawBackground();
  drawVisualizer();
  drawPlaylist();
}

function mousePressed() {
  if (isLoading) return;

  playlistClick(songs, togglePlayback, resetMIDI);
}

function mouseReleased() {
  if (isLoading) return;

  playlistRelease();
}

function mouseDragged() {
  if (isLoading) return;

  playlistDrag();
}

function togglePlayback(song) {
  if (song != currentSong) {
    resetMIDI();
    currentSong = song;
    if (songs[song] && songs[song].file) {
      synth.load(songs[song].file);
    } else {
      console.error(`File data missing for: ${song}`);
      return;
    }
  }

  if (synth.isPlaying) {
    synth.pause();
  } else {
    synth.play();
  }
}

function resetMIDI(song) {
  if (song != currentSong)
    return;

  synth.stop();
  currentSong = undefined;
}
