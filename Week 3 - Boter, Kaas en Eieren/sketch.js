const SCREEN_SIZE = 720;
const SCREEN_CENTER = SCREEN_SIZE * 0.5;
const BG_THICKNESS = 32;
const BG_PADDING = 8;
const BG_TOOTH_SIZE = (BG_THICKNESS + BG_PADDING);
const BG_SPEED = 1;
const BG_TRANSITION_SPEED = 0.025;
let bgX = [];
let targetBgX = [];

const PANEL_SIZE = 480;
const CELL_SIZE = 120;
const CELL_BUFFER = 20;

let playerIndex = 0;
const playerName = ["Red", "Blue"];
let grid = [];
const VICTORIES = [7, 56, 73, 84, 146, 273, 292, 448];
let gameOver = false;
let victor = -1;
let victoryLayout = 0;

function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  textFont("Syncopate");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  ellipseMode(RADIUS);
  grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
  ]

  bgX = [0.5, 0.5];
  targetBgX = [0.75, 0.75];

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
  for (i = - BG_TOOTH_SIZE + ((frameCount * BG_SPEED) % BG_TOOTH_SIZE); i < SCREEN_SIZE + BG_TOOTH_SIZE * 2; i += BG_TOOTH_SIZE)
  {
    triangle(x - BG_THICKNESS, i, 
      x - BG_THICKNESS, i + BG_TOOTH_SIZE, 
      x, i + BG_TOOTH_SIZE * 0.5);
  }
  x = bgX[1] * SCREEN_SIZE;
  fill(0, 0, 192);
  rect(x + BG_THICKNESS, 0, SCREEN_SIZE * 1.25, SCREEN_SIZE);
  for (i = - BG_TOOTH_SIZE * 1.5 + ((frameCount * BG_SPEED) % BG_TOOTH_SIZE); i < SCREEN_SIZE + BG_TOOTH_SIZE * 2.5; i += BG_TOOTH_SIZE)
  {
    triangle(1 + x + BG_THICKNESS, i, 
      x + BG_THICKNESS, i + BG_TOOTH_SIZE, 
      x, i + BG_TOOTH_SIZE * 0.5);
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
        case 0: // Red
          fill(255, 0, 0);
          break;
        
        case 1: // Blue
          fill(0, 0, 255);
          break;

        default: // Empty
          if (mouseX > x && mouseY > y && mouseX < x + CELL_SIZE && mouseY < y + CELL_SIZE) {
            fill(128);
          }
          else {
            fill (160);
          }
      }

      // If victory was reached and the cell is NOT part of the winning pattern, add a thick stroke
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
  //#region Restart Button
  if (gameOver) {
    if (mouseX > SCREEN_SIZE * 0.25 && mouseX < SCREEN_SIZE * 0.75 &&
        mouseY > SCREEN_SIZE - 128 && mouseY < SCREEN_SIZE) {
      for (iy = -1; iy <= 1; iy++) {
        for (ix = -1; ix <= 1; ix++) {
            grid[iy + 1][ix + 1] = -1;
        }
      }
      playerIndex = (victor + 1) % 2;
      victoryLayout = 0;
      targetBgX[0] = 0.75 - playerIndex * 0.5;
      targetBgX[1] = 0.75 - playerIndex * 0.5;
      gameOver = false;
    }
    return;
  }

  //#region Gameplay Area
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
        targetBgX[0] = 0.75 - playerIndex * 0.5;
        targetBgX[1] = 0.75 - playerIndex * 0.5;
        continue;
      }
      isFull = false;
    }
  }

  //#region Check Victory
  //Red Wins
  for (let i = 0; i < VICTORIES.length; i++) {
    if ((scores[0] & VICTORIES[i]) == VICTORIES[i]) {
      victor = 0;
      victoryLayout = scores[0];
      gameOver = true;
      targetBgX[0] = 1.25;
      targetBgX[1] = 1.25;
      return;
    }
    if ((scores[1] & VICTORIES[i]) == VICTORIES[i]) {
      victor = 1;
      victoryLayout = scores[1];
      gameOver = true;
      targetBgX[0] = -0.25;
      targetBgX[1] = -0.25;
      return;
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