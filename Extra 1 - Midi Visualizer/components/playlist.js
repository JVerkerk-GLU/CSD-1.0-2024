const PLAYLIST_WIDTH = 240;
const PLAYLIST_PADDING = 4;
const BUTTON_SIZE = 24;
const BUTTON_GAP = 8;
const TEXT_X_OFFSET = 12;
const TEXT_Y_START = 32;
const ROW_HEIGHT = 32;

const VOLUME_BAR_COUNT = 20;
const VOLUME_DRAG_PADDING = 24;
const VOLUME_BAR_RECT = {
  x: TEXT_X_OFFSET,
  w: 210,
  h: 32,
  inactiveH: 8,
  activeH: 24,
  activeAmplitude: 4,
  padding: 3
}

let _volumeState = {
  isDragging: false,
  collider: null
};

/**
 * Draws the playlist interface, including song labels and control buttons.
 * It also initializes Button objects if they don't exist for the current song.
 * @param {object} songs The global songs data object.
 * @param {string} currentSong The name of the currently selected song.
 * @param {object} synth The playback object (used to check isPlaying state).
 */
function drawPlaylist() {
  fill(24);
  rect(PLAYLIST_PADDING, PLAYLIST_PADDING, PLAYLIST_WIDTH - PLAYLIST_PADDING * 2, height - PLAYLIST_PADDING * 2, 4, 4);
  textAlign(LEFT, CENTER);
  textSize(16);
  noStroke();

  const keys = Object.keys(songs);

  // Calculate the x-position for the buttons (right-aligned)
  const playButtonX = PLAYLIST_WIDTH - TEXT_X_OFFSET - BUTTON_SIZE;
  const stopButtonX = playButtonX - BUTTON_SIZE - BUTTON_GAP;

  for (let i = 0; i < keys.length; i++) {
    const songName = keys[i];
    const textY = TEXT_Y_START + ROW_HEIGHT * i;
    const buttonY = textY - BUTTON_SIZE / 2;

    if (songName === currentSong) {
      fill(100, 100, 255);
    } else {
      fill(255);
    }
    textAlign(LEFT, CENTER);
    textSize(16);
    text(songName, TEXT_X_OFFSET, textY);

    let stopButton = songs[songName].buttons.stop;
    if (!stopButton) {
      stopButton = new Button(stopButtonX, buttonY, BUTTON_SIZE, "■", 'stop');
      songs[songName].buttons.stop = stopButton;
    }
    stopButton.draw();

    let isPlaying = songName === currentSong && (synth.isPlaying || false);
    const playIcon = isPlaying ? "⏸" : "▶";

    let playButton = songs[songName].buttons.play;
    if (!playButton) {
      playButton = new Button(playButtonX, buttonY, BUTTON_SIZE, playIcon, 'play');
      songs[songName].buttons.play = playButton;
    }

    playButton.setLabel(playIcon);
    playButton.draw();
  }

  drawVolumeSlider();
}

/**
 * Checks for a click on any of the playlist buttons and triggers the appropriate action handler.
 * @param {object} songs The global songs data object.
 * @param {function} handlePlayPause Callback function for play/pause action.
 * @param {function} handleStop Callback function for stop action.
 */
function playlistClick(songs, handlePlayPause, handleStop) {
  if (volumeClick(synth))
    return;

  const keys = Object.keys(songs);

  for (let i = 0; i < keys.length; i++) {
    const songName = keys[i];
    const buttons = songs[songName].buttons;

    // Check Play/Pause Button click
    if (buttons.play && buttons.play.isClicked()) {
      handlePlayPause(songName);
      return true; // Click handled
    }

    // Check Stop Button click
    if (buttons.stop && buttons.stop.isClicked()) {
      handleStop(songName);
      return true; // Click handled
    }
  }
  return false; // No button clicked
}

function playlistDrag() {
  volumeDrag();
}

function playlistRelease() {
  volumeRelease();
}

function drawVolumeSlider() {
  colorMode(HSB, 360, 100, 100);
  noStroke();
  textAlign(CENTER, BOTTOM);

  VOLUME_BAR_RECT.y = height - VOLUME_BAR_RECT.h - 8;

  const currentVolume = round(constrain(synth.volume, 0, 1) * VOLUME_BAR_COUNT) / VOLUME_BAR_COUNT;

  let currentX = VOLUME_BAR_RECT.x;
  const segmentW = (VOLUME_BAR_RECT.w / VOLUME_BAR_COUNT) - VOLUME_BAR_RECT.padding;

  for (let i = 0; i < VOLUME_BAR_COUNT; i++) {
    const barValueThreshold = (i + 1) / VOLUME_BAR_COUNT;

    let barHeight;
    let barColor;

    if (currentVolume >= barValueThreshold) {
      const hue = (frameCount * 2 + i * 15) % 360;
      barColor = color(hue, 80, 100);

      const sineWave = sin(frameCount * 0.1 + i * 0.5); // 0.1 is speed, 0.5 is offset
      barHeight = VOLUME_BAR_RECT.activeH + sineWave * VOLUME_BAR_RECT.activeAmplitude;
    } else {
      barColor = color(0, 0, 40); // Grey (Hue 0, Sat 0, Brightness 40)
      barHeight = VOLUME_BAR_RECT.inactiveH;
    }
    fill(barColor);
    rect(currentX, VOLUME_BAR_RECT.y + VOLUME_BAR_RECT.h - barHeight, segmentW, barHeight, 2); // Rounded top corners

    if (i + 1 == round(currentVolume * VOLUME_BAR_COUNT) || (i == 0 && round(currentVolume * VOLUME_BAR_COUNT) == 0)) {
      const percentage = round(currentVolume * 100);
      const displayVolume = round(percentage / 5) * 5;
      text(`${displayVolume}%`, currentX + segmentW * 1.5, VOLUME_BAR_RECT.y);
    }

    currentX += (VOLUME_BAR_RECT.w / VOLUME_BAR_COUNT);
  }

  colorMode(RGB, 255);


  fill(255);
  textAlign(LEFT, CENTER);
  textSize(14);

  _volumeState.collider = {
    x: VOLUME_BAR_RECT.x,
    y: VOLUME_BAR_RECT.y - VOLUME_BAR_RECT.h,
    w: VOLUME_BAR_RECT.w,
    h: VOLUME_BAR_RECT.h
  };
}

/**
* Checks if a click has initiated a drag on the volume visualizer bar.
* @returns {boolean} True if drag started.
*/
function volumeClick() {
  const rect = _volumeState.collider;

  if (mouseX >= rect.x - VOLUME_DRAG_PADDING &&
    mouseX <= rect.x + rect.w + VOLUME_DRAG_PADDING &&
    mouseY >= rect.y - VOLUME_DRAG_PADDING &&
    mouseY <= rect.y + rect.h + VOLUME_DRAG_PADDING) {
      
    _volumeState.isDragging = true;

    volumeDrag();
    return true;
  }
  return false;
}

/**
 * Updates the synth volume based on mouseX position within the bar's bounds.
 */
function volumeDrag() {
  if (!_volumeState.isDragging) return;

  const rect = _volumeState.collider;
  const newHandleX = constrain(mouseX, rect.x, rect.x + rect.w);
  const newVolumeFraction = (newHandleX - rect.x) / rect.w;
  console.log(synth);
  synth.volume = newVolumeFraction;
}

/**
 * Ends the drag on mouse release.
 */
function volumeRelease() {
  if (_volumeState.isDragging) {
    _volumeState.isDragging = false;
    return true;
  }
  return false;
}