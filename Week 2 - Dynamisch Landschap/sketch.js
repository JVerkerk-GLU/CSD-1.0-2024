const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;
const WINDOW_MIN = -128;
const WINDOW_MAX = WINDOW_WIDTH + 128;

let daySky, nightSky;
const SKY_FADE_SPEED = 0.01;
let isDay = true;
let dayBrightness = 1.0;
const STAR_COUNT = 64;
let starPos = [];

const SUN_HEIGHT = 64;
const SUN_SIZE = 32;
const SUN_SPEED = 0.5;
const SUN_LIGHT_SPEED = 0.025;
const SUN_LIGHT_OFFSET = 32;
let sunX;

const CLOUD_HEIGHT = 64;
const CLOUD_SIZE = 32;
const CLOUD_HIGHLIGHT_OFFSET = 8;
const CLOUD_COUNT = 3;
const CLOUD_MIN_SPEED = 0.5;
const CLOUD_MAX_SPEED = 1.5;
let dayCloud, nightCloud;
let cloudSpeed = [];
let cloudY = [96, 128, 160];
let cloudX = [WINDOW_WIDTH * 0.2, WINDOW_WIDTH * 0.4, WINDOW_WIDTH * 0.75];

let trafficLight = 0;

const CAR_Y_ROW = [WINDOW_HEIGHT - 48, WINDOW_HEIGHT - 20];
const CAR_SPEED_ROW = [4, 2];
const CAR_SPAWN_MIN = 64;
const CAR_SPAWN_MAX = 128;
let car = [];
let carCountdown = CAR_SPAWN_MIN;

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  ellipseMode(RADIUS);

  daySky = color(135, 206, 235);
  nightSky = color(12, 20, 69);
  dayCloud = 255;
  nightCloud = 64;
  for (let i = 0; i < STAR_COUNT; i++) {
    starPos[i] = { x: random(0, WINDOW_WIDTH), y: random(0, WINDOW_HEIGHT) };
  }
  sunX = random(WINDOW_MIN, WINDOW_MAX);
  for (let i = 0; i < CLOUD_COUNT; i++) {
    cloudX[i] = random(WINDOW_MIN, WINDOW_MAX);
    cloudSpeed[i] = random(CLOUD_MIN_SPEED, CLOUD_MAX_SPEED);
  }
  car = [
    {
      x: random(WINDOW_MIN, WINDOW_MAX),
      row: int(random(CAR_Y_ROW.length)),
      hue: random(360)
    }
  ]
}

function draw() {
  if (isDay) {
    dayBrightness = min(dayBrightness + SKY_FADE_SPEED, 1.0);
  } else {
    dayBrightness = max(dayBrightness - SKY_FADE_SPEED, 0.0);
  }

  //#region Sky
  background(lerpColor(nightSky, daySky, dayBrightness));
  stroke(255, 255, 0, 255 - (dayBrightness * 255));
  strokeWeight(4);
  for (let i = 0; i < STAR_COUNT; i++) {
    point(starPos[i].x, starPos[i].y);
  }

  //#region Sun
  sunX += SUN_SPEED;
  if (sunX > WINDOW_MAX) {
    sunX = WINDOW_MIN;
    isDay = !isDay;
  }
  noStroke();
  if (isDay)
  {
    fill(255, 128, 0, 64);
    circle(sunX, SUN_HEIGHT, SUN_SIZE + cos(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
    circle(sunX, SUN_HEIGHT, SUN_SIZE + sin(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
    circle(sunX, SUN_HEIGHT, SUN_SIZE - cos(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
    circle(sunX, SUN_HEIGHT, SUN_SIZE - sin(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
    fill(255,255,0);
    circle(sunX, SUN_HEIGHT, SUN_SIZE);
  } else {
    fill(220);
    circle(sunX, SUN_HEIGHT, SUN_SIZE);
    fill(nightSky);
    circle(sunX + (SUN_SIZE * 0.5), SUN_HEIGHT, SUN_SIZE);
  }

  //#region Clouds
  for (let i = 0; i < CLOUD_COUNT; i++) {
    cloudX[i] -= cloudSpeed[i];
    if (cloudX[i] < WINDOW_MIN) {
      cloudX[i] = WINDOW_MAX;
      cloudSpeed[i] = random(CLOUD_MIN_SPEED, CLOUD_MAX_SPEED);
    }
    fill(lerp(nightCloud, dayCloud, dayBrightness) - 32)
    noStroke();
    circle(cloudX[i], cloudY[i], CLOUD_SIZE);
    circle(cloudX[i] - CLOUD_SIZE * 1.25, cloudY[i], CLOUD_SIZE * 0.75);
    circle(cloudX[i] + CLOUD_SIZE * 1.25, cloudY[i] + 8, CLOUD_SIZE * 0.75);
    fill(lerp(nightCloud, dayCloud, dayBrightness))
    circle(cloudX[i], cloudY[i] + CLOUD_HIGHLIGHT_OFFSET, CLOUD_SIZE);
    circle(cloudX[i] - CLOUD_SIZE * 1.25, cloudY[i] + CLOUD_HIGHLIGHT_OFFSET, CLOUD_SIZE * 0.75);
    circle(cloudX[i] + CLOUD_SIZE * 1.25, cloudY[i] + CLOUD_HIGHLIGHT_OFFSET + 8, CLOUD_SIZE * 0.75);
  }

  //#region Mountains
  stroke(0);
  strokeWeight(1);
  fill(32 + (32 * dayBrightness));
  triangle(200, WINDOW_HEIGHT - 64, 600, WINDOW_HEIGHT - 64, 400, WINDOW_HEIGHT - 400);
  fill(64 + (32 * dayBrightness));
  triangle(128, WINDOW_HEIGHT - 64, 384, WINDOW_HEIGHT - 64, 256, WINDOW_HEIGHT - 256);
  triangle(500, WINDOW_HEIGHT - 64, 900, WINDOW_HEIGHT - 64, 700, WINDOW_HEIGHT - 200);

  //#region Ground
  stroke(0, 32 + (32 * dayBrightness), 0);
  strokeWeight(4);
  fill(0, 64 + (32 * dayBrightness), 0);
  rect(-32, WINDOW_HEIGHT - 64, WINDOW_WIDTH + 64, 128);

  stroke(16 + (64 * dayBrightness));
  fill(32 + (64 * dayBrightness));
  rect(-32, WINDOW_HEIGHT -56, WINDOW_WIDTH + 64, 64);

  stroke(128 + (64 * dayBrightness));
  strokeWeight(8);
  for (let x = -32; x < WINDOW_WIDTH + 32; x += 128) {
    line(x, WINDOW_HEIGHT - 24, x + 64, WINDOW_HEIGHT - 24);
  }

  //#region Trees
  noStroke();
  fill(82, 52, 32);
  // The indentation is intended to be increasing
  for (let x = 32; x < WINDOW_WIDTH; x += max(x, 80)) {
    fill(41 + (41 * dayBrightness), 26 + (26 * dayBrightness), 16 + (16 * dayBrightness));
    rect(x, WINDOW_HEIGHT - 200, 16, 140);
    fill(0, 48 + (48 * dayBrightness), 0);
    circle(x + 8 + cos(frameCount * 0.1) * 4, WINDOW_HEIGHT - 200, 32);
    fill(0, 32 + (48 * dayBrightness), 0);
    circle(x + 4 + sin(frameCount * 0.1) * 4, WINDOW_HEIGHT - 196, 32);
    fill(0, 16 + (48 * dayBrightness), 0);
    circle(x - sin(frameCount * 0.1) * 4, WINDOW_HEIGHT - 192, 32);
    fill(0, 8 + (48 * dayBrightness), 0);
    circle(x - 4 - cos(frameCount * 0.1) * 4, WINDOW_HEIGHT - 196, 32);
  }

  //#region Traffic Light
  stroke(48);
  const tlX = WINDOW_WIDTH - 128;
  strokeWeight(8);
  line(tlX, WINDOW_HEIGHT - 56, tlX, WINDOW_HEIGHT - 128);
  noStroke();
  fill(48);
  rect(tlX - 16, WINDOW_HEIGHT - 222, 32, 96);
  if (trafficLight == 0) {
    fill(255, 0, 0);
  } else {
    fill(64, 0, 0);
  }
  circle(tlX, WINDOW_HEIGHT - 206, 12);
  if (trafficLight == 2) {
    fill(255, 64, 0);
  } else {
    fill(64, 32, 0);
  }
  circle(tlX, WINDOW_HEIGHT - 176, 12);
  if (trafficLight == 1) {
    fill(0, 255, 0);
  } else {
    fill(0, 64, 0);
  }
  circle(tlX, WINDOW_HEIGHT - 144, 12);

  
  //#region Car
  car.sort(c => c.row);
  for(let i = 0; i < car.length; i++) {
    if (trafficLight > 0) {
      car[i].x += CAR_SPEED_ROW[car[i].row] / trafficLight;
      if (car[i].x > WINDOW_MAX) {
        car.splice(i, 1);
        i--;
        continue;
      }
    }

    let x = car[i].x;
    let y = CAR_Y_ROW[car[i].row];
    noStroke();
    colorMode(HSL, 360, 255, 255);
    fill(car[i].hue, 255, 64 + 32 * dayBrightness);
    rect(x - 52, y - 32, 104, 32);
    triangle(x - 52, y - 32, x + 52, y - 32, x - 48, y - 64);
    triangle(x - 48, y - 64, x + 32, y - 32, x + 28, y - 64);
    colorMode(RGB);

    fill(48 + 16 * dayBrightness);
    circle(x - 32, y, 16);
    circle(x + 32, y, 16);
  }

  if (trafficLight > 0)
  {
    carCountdown--;
    if (carCountdown <= 0) {
      carCountdown = random(CAR_SPAWN_MIN, CAR_SPAWN_MAX);
      car.push(
        {
          x: WINDOW_MIN,
          row: int(random(CAR_Y_ROW.length)),
          hue: random(360)
        }
      )
    }
  }

  //#region Foreground Tree
  fill(41 + (41 * dayBrightness), 26 + (26 * dayBrightness), 16 + (16 * dayBrightness));
  rect(300, WINDOW_HEIGHT - 96, 16, 140);
  fill(0, 48 + (48 * dayBrightness), 0);
  circle(308 + cos(frameCount * 0.1) * 4, WINDOW_HEIGHT - 96, 32);
  fill(0, 32 + (48 * dayBrightness), 0);
  circle(304 + sin(frameCount * 0.1) * 4, WINDOW_HEIGHT - 92, 32);
  fill(0, 16 + (48 * dayBrightness), 0);
  circle(300 - sin(frameCount * 0.1) * 4, WINDOW_HEIGHT - 88, 32);
  fill(0, 8 + (48 * dayBrightness), 0);
  circle(296 - cos(frameCount * 0.1) * 4, WINDOW_HEIGHT - 84, 32);
}

function keyPressed() {
  if (keyCode == ENTER) {
    trafficLight++;
    trafficLight %= 3;
  }
}