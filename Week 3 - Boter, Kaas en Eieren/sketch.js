const SCREEN_SIZE = 720;
const SCREEN_CENTER = SCREEN_SIZE * 0.5;
const BG_THICKNESS = 32;
const BG_PADDING = 8;
const BG_TOOTH_SIZE = (BG_THICKNESS + BG_PADDING)
const BG_SPEED = 1;
const BG_TRANSITION_SPEED = 10;
let bgX = SCREEN_CENTER;

const PANEL_SIZE = 480;
const CELL_SIZE = 120;
const CELL_BUFFER = 20;

let playerIndex = 0;
let grid = [];
const VICTORIES = [7, 56, 73, 84, 146, 273, 292, 448];
let gameOver = false;
let victor = -1;
let victoryLayout = 0;

function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  textSize(16);
  textAlign(CENTER, TOP);
  ellipseMode(RADIUS);
  grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]
}

function draw() {
  if (bgX < SCREEN_SIZE * (0.75 - (0.5 * playerIndex))) {
    bgX = min(bgX + BG_TRANSITION_SPEED, SCREEN_SIZE * (0.75 - (0.5 * playerIndex)));
  } else if (bgX > SCREEN_SIZE * (0.75 - (0.5 * playerIndex))) {
    bgX = max(bgX - BG_TRANSITION_SPEED, SCREEN_SIZE * (0.75 - (0.5 * playerIndex)));
  }
  //#region Background
  background(0);
  noStroke();
  fill(192, 0, 0);
  rect(0, 0, bgX - BG_TOOTH_SIZE, SCREEN_SIZE);
  for (i = - BG_TOOTH_SIZE + ((frameCount * BG_SPEED) % BG_TOOTH_SIZE); i < SCREEN_SIZE + BG_TOOTH_SIZE * 2; i += BG_TOOTH_SIZE)
  {
    triangle(-1 + bgX - BG_TOOTH_SIZE, i, 
      -1 + bgX - BG_TOOTH_SIZE, i + BG_TOOTH_SIZE, 
      -1 + bgX + BG_THICKNESS, i + BG_TOOTH_SIZE * 0.5);
  }
  fill(0, 0, 192);
  rect(bgX + BG_TOOTH_SIZE, 0, SCREEN_SIZE - BG_TOOTH_SIZE, SCREEN_SIZE);
  for (i = - BG_TOOTH_SIZE * 1.5 + ((frameCount * BG_SPEED) % BG_TOOTH_SIZE); i < SCREEN_SIZE + BG_TOOTH_SIZE * 2.5; i += BG_TOOTH_SIZE)
  {
    triangle(1 + bgX + BG_TOOTH_SIZE, i, 
      1 + bgX + BG_TOOTH_SIZE, i + BG_TOOTH_SIZE, 
      1 + bgX - BG_THICKNESS, i + BG_TOOTH_SIZE * 0.5);
  }

  fill(0);
  rect(SCREEN_CENTER - PANEL_SIZE * 0.5, SCREEN_CENTER - PANEL_SIZE * 0.5, PANEL_SIZE, PANEL_SIZE, 32);
  
  let cell = 1;
  for (iy = -1; iy <= 1; iy++)
  {
    for (ix = -1; ix <= 1; ix++, cell *= 2)
    {
      let x = SCREEN_CENTER + (CELL_SIZE * (ix - 0.5)) + CELL_BUFFER * ix;
      let y = SCREEN_CENTER + (CELL_SIZE * (iy - 0.5)) + CELL_BUFFER * iy;
      let i = grid[iy + 1][ix + 1];
      switch (i)
      {
        case 0: 
          fill(255, 0, 0);
          break;
        
        case 1:
          fill(0, 0, 255);
          break;

        default:
          if (mouseX > x && mouseY > y && mouseX < x + CELL_SIZE && mouseY < y + CELL_SIZE) {
            fill(128);
          }
          else {
            fill (160);
          }
      }

      noStroke();
      if (victoryLayout > 0 && 
          (victoryLayout & cell) == 0) {
        strokeWeight(32);
        stroke(0);
      }

      rect(x, y, CELL_SIZE, CELL_SIZE, 16);
    }
  }
}

function mousePressed() {
  let cell = 1;
  let scores = [0, 0];
  let isFull = true;
  for (iy = -1; iy <= 1; iy++)
  {
    for (ix = -1; ix <= 1; ix++, cell *= 2)
    {
      let x = SCREEN_CENTER + (CELL_SIZE * (ix - 0.5)) + CELL_BUFFER * ix;
      let y = SCREEN_CENTER + (CELL_SIZE * (iy - 0.5)) + CELL_BUFFER * iy;
      let i = grid[iy + 1][ix + 1];
      if (i != -1) {
        scores[i] += cell;
        continue;
      }
      if (mouseX > x && mouseY > y && mouseX < x + CELL_SIZE && mouseY < y + CELL_SIZE) {
        grid[iy + 1][ix + 1] = playerIndex;
        scores[playerIndex] += cell;
        playerIndex = (playerIndex + 1) % 2;
        continue;
      }
      isFull = false;   
    }
  }

  console.log(scores);
  //#region Check Victory
  //Red Wins
  if (VICTORIES.findIndex(e => e == scores[0]) >= 0) {
    victor = 0;
    victoryLayout = scores[0];
    gameOver = true;
    return;
  }
  //Blue Wins
  if (VICTORIES.findIndex(e => e == scores[1]) >= 0) {
    victor = 1;
    victoryLayout = scores[1];
    gameOver = true;
    return;
  }
  //Draw
  if (isFull) {
    victor = -1;
    gameOver = true;
  }
}