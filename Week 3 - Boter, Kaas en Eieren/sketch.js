const SCREEN_SIZE = 720;
const SCREEN_CENTER = SCREEN_SIZE * 0.5;
const BG_THICKNESS = 32;
const BG_PADDING = 8;
const BG_TOOTH_SIZE = BG_THICKNESS + BG_PADDING;
const BG_SPEED = 1;
const BG_TRANSITION_SPEED = 0.025;
let bgX = [];
let targetBgX = [];

const PANEL_SIZE = 480;
const BORDER_SIZE = 120;
let cellSize;
const CELL_BUFFER = 20;

let playerIndex = 0;
const playerName = ["Red", "Blue"];
let gridSize = 3;
let grid = [];
const VICTORIES = [7, 56, 73, 84, 146, 273, 292, 448];
let gameStarted = false;
let gameOver = false;
let victor = -1;

function gameSetup() {
  // Reset Grid
  cellSize = (PANEL_SIZE - BORDER_SIZE) / gridSize;
  grid = [];
  for(let iy = 0; iy < gridSize; iy++) {
    let row = [];
    for(let ix = 0; ix < gridSize; ix++) {
      row.push(-1);
    }
    grid.push(row);
  }
  // Set current player to the player that lost in the last match
  playerIndex = (victor + 1) % 2;
  targetBgX[0] = targetBgX[1] = 0.75 - playerIndex * 0.5;
  gameOver = false;
  gameStarted = false;
}

function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  textFont("Syncopate");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  ellipseMode(RADIUS);
  bgX = [0.5, 0.5];
  gameSetup();
}

function draw() {
  for (let i = 0; i < 2; i++) {
    if (bgX[i] < targetBgX[i]) {
      bgX[i] = min(bgX[i] + BG_TRANSITION_SPEED, targetBgX[i]);
    } else if (bgX[i] > targetBgX[i]) {
      bgX[i] = max(bgX[i] - BG_TRANSITION_SPEED, targetBgX[i]);
    }
  }
  //#region Background
  background(0);
  noStroke();
  fill(192, 0, 0);
  let x = bgX[0] * SCREEN_SIZE;
  rect(0, 0, x - BG_THICKNESS, SCREEN_SIZE );
  for (i = - BG_TOOTH_SIZE + ((frameCount * BG_SPEED) % BG_TOOTH_SIZE); i < SCREEN_SIZE + BG_TOOTH_SIZE * 2; i += BG_TOOTH_SIZE) {
    triangle(x - BG_THICKNESS, i, x - BG_THICKNESS, i + BG_TOOTH_SIZE, x, i + BG_TOOTH_SIZE * 0.5);
  }
  x = bgX[1] * SCREEN_SIZE;
  fill(0, 0, 192);
  rect(x + BG_THICKNESS, 0, SCREEN_SIZE * 1.25, SCREEN_SIZE);
  for (i = - BG_TOOTH_SIZE * 1.5 + ((frameCount * BG_SPEED) % BG_TOOTH_SIZE); i < SCREEN_SIZE + BG_TOOTH_SIZE * 2.5; i += BG_TOOTH_SIZE) {
    triangle(1 + x + BG_THICKNESS, i, x + BG_THICKNESS, i + BG_TOOTH_SIZE, x, i + BG_TOOTH_SIZE * 0.5);
  }

  //#region Draw UI
  fill(255);
  stroke(0);
  strokeWeight(8);
  textSize(56 + 8 * sin(frameCount / 18));

  // Header Draw
  push();
  translate(SCREEN_CENTER, 64);
  rotate(cos(frameCount / 18) * 0.1);
  if (!gameOver) {
    text(playerName[playerIndex] + "'s Turn!", 0, 0);
  } else if (victor >= 0) {
    text(playerName[victor] + " Wins!", 0, 0);
  } else {
    text("Draw!", 0, 0);
  }
  pop();

  // Restart Button Draw
  if (!gameStarted) {
    for (let i = 0; i < 3; i++) {
      if (mouseX > SCREEN_SIZE * (0.1 + 0.3 * i) && mouseX < SCREEN_SIZE * (0.3 + 0.3 * i) &&
        mouseY > SCREEN_SIZE - 128 && mouseY < SCREEN_SIZE) {
        fill(0);
        stroke(255);
      } else {
        fill(255);
        stroke(0);
      }

      textSize(64 - 8 * sin((frameCount + 9 * i) / 18));
      push();
      translate(SCREEN_SIZE * (0.2 + 0.3 * i), SCREEN_SIZE - 64);
      rotate(-sin((frameCount + 9 * i) / 18) * 0.1);
      text((3 + i) + "x" + (3 + i), 0, 0);
      pop();
    }
  }

  // Restart Button Draw
  if (gameOver) {
    if (mouseX > SCREEN_SIZE * 0.15 && mouseX < SCREEN_SIZE * 0.85 &&
      mouseY > SCREEN_SIZE - 128 && mouseY < SCREEN_SIZE) {
        fill(0);
        stroke(255);
      }

    textSize(64 - 8 * sin(frameCount / 18));
    push();
    translate(SCREEN_CENTER, SCREEN_SIZE - 64);
    rotate(-sin(frameCount / 18) * 0.1);
    text("Restart!!!", 0, 0);
    pop();
  }

  //#region Draw Gameplay
  noStroke();
  fill(0);
  rect(SCREEN_CENTER - PANEL_SIZE * 0.5, SCREEN_CENTER - PANEL_SIZE * 0.5, PANEL_SIZE, PANEL_SIZE, 32);

  for (iy = 0; iy < gridSize; iy++) {
    for (ix = 0; ix < gridSize; ix++) {
      let x = SCREEN_CENTER - (cellSize * gridSize + CELL_BUFFER * (gridSize - 1)) * 0.5 + (cellSize + CELL_BUFFER) * ix;
      let y = SCREEN_CENTER - (cellSize * gridSize + CELL_BUFFER * (gridSize - 1)) * 0.5 + (cellSize + CELL_BUFFER) * iy;
      let i = grid[iy][ix];
      if (i == 0) fill(255, 0, 0);
      else if (i == 1) fill(0, 0, 255);
      else if (mouseX > x && mouseY > y && mouseX < x + cellSize && mouseY < y + cellSize) fill(128);
      else fill(160);

      // If victory was reached and the cell is NOT part of the winning player, add a thick stroke
      noStroke();
      if (gameOver && i != victor) {
        strokeWeight(32);
        stroke(0);
      }

      rect(x, y, cellSize, cellSize, 16);
    }
  }
}

function mousePressed() {
  if (!gameStarted) {
    for (let i = 0; i < 3; i++) {
      if (mouseX > SCREEN_SIZE * (0.1 + 0.3 * i) && mouseX < SCREEN_SIZE * (0.3 + 0.3 * i) &&
        mouseY > SCREEN_SIZE - 128 && mouseY < SCREEN_SIZE) {
          gridSize = 3 + i;
          gameSetup();
          return;
      }
    }
  }

  //#region Restart Button
  if (gameOver) {
    if (mouseX > SCREEN_SIZE * 0.15 && mouseX < SCREEN_SIZE * 0.85 &&
      mouseY > SCREEN_SIZE - 128 && mouseY < SCREEN_SIZE) {
      gameSetup();
      return;
    }
  }

  //#region Gameplay Area
  let isFull = true;
  for (iy = 0; iy < gridSize; iy++) {
    for (ix = 0; ix < gridSize; ix++) {
      let x = SCREEN_CENTER - (cellSize * gridSize + CELL_BUFFER * (gridSize - 1)) * 0.5 + (cellSize + CELL_BUFFER) * ix;
      let y = SCREEN_CENTER - (cellSize * gridSize + CELL_BUFFER * (gridSize - 1)) * 0.5 + (cellSize + CELL_BUFFER) * iy;
      if (grid[iy][ix] != -1) {
        continue;
      }
      if (mouseX > x && mouseY > y && mouseX < x + cellSize && mouseY < y + cellSize) {
        grid[iy][ix] = playerIndex;
        playerIndex = (playerIndex + 1) % 2;
        targetBgX[0] = targetBgX[1] = 0.75 - playerIndex * 0.5;
        gameStarted = true;
        continue;
      }
      isFull = false;
    }
  }

  //#region Check Victory
  for (let jy = 0; jy <= gridSize - 3; jy++) {
    for (let jx = 0; jx <= gridSize - 3; jx++) {
      let cell = 1;
      let scores = [0, 0];
      for (let iy = 0; iy < 3; iy++) {
        for (let ix = 0; ix < 3; ix++, cell *= 2) {
          let i = grid[iy + jy][ix + jx];
          if (i >= 0) {
            scores[i] += cell;
          }
        }
      }
      // Check for a winning pattern in the sub-grid
      for (let i = 0; i < VICTORIES.length; i++) {
        if ((scores[0] & VICTORIES[i]) == VICTORIES[i]) {
          victor = 0;
          gameOver = true;
          targetBgX[0] = targetBgX[1] = 1.25;
          return;
        }
        if ((scores[1] & VICTORIES[i]) == VICTORIES[i]) {
          victor = 1;
          gameOver = true;
          targetBgX[0] = targetBgX[1] = -0.25;
          return;
        }
      }
    }
  }
  //Draw
  if (isFull) {
    victor = -1;
    gameOver = true;
    targetBgX[0] = -0.25;
    targetBgX[1] = 1.25;
  }
}