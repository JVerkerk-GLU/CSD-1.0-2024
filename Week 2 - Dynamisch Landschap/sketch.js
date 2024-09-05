const WIDTH_BUFFER = 128;

const CLOUD_HEIGHT = 64;
const CLOUD_SIZE = 32;
const CLOUD_SPEED = 1;
const CLOUD_HIGHLIGHT_OFFSET = 8;

const SUN_HEIGHT = 64;
const SUN_SIZE = 32;
const SUN_SPEED = 0.5;
const SUN_LIGHT_SPEED = 0.025;
const SUN_LIGHT_OFFSET = 32;

function setup() {
  createCanvas(800, 600);
  ellipseMode(RADIUS);
}

function draw() {
  background(135, 206, 235);

  let sunX = ((frameCount * SUN_SPEED) % (width + WIDTH_BUFFER * 2)) - WIDTH_BUFFER;
  noStroke();
  fill(255, 255, 0, 64);
  circle(sunX, SUN_HEIGHT, SUN_SIZE + cos(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
  circle(sunX, SUN_HEIGHT, SUN_SIZE + sin(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
  circle(sunX, SUN_HEIGHT, SUN_SIZE - cos(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
  circle(sunX, SUN_HEIGHT, SUN_SIZE - sin(frameCount * SUN_LIGHT_SPEED) * SUN_LIGHT_OFFSET);
  fill(255,255,0);
  circle(sunX, SUN_HEIGHT, SUN_SIZE);

  let cloudX = (width + WIDTH_BUFFER) - (frameCount * CLOUD_SPEED) % (width + WIDTH_BUFFER * 2);
  fill(210)
  noStroke();
  circle(cloudX, CLOUD_HEIGHT, CLOUD_SIZE);
  circle(cloudX - CLOUD_SIZE * 1.25, CLOUD_HEIGHT, CLOUD_SIZE * 0.75);
  circle(cloudX + CLOUD_SIZE * 1.25, CLOUD_HEIGHT + 8, CLOUD_SIZE * 0.75);
  fill(255)
  circle(cloudX, CLOUD_HEIGHT + CLOUD_HIGHLIGHT_OFFSET, CLOUD_SIZE);
  circle(cloudX - CLOUD_SIZE * 1.25, CLOUD_HEIGHT + CLOUD_HIGHLIGHT_OFFSET, CLOUD_SIZE * 0.75);
  circle(cloudX + CLOUD_SIZE * 1.25, CLOUD_HEIGHT + CLOUD_HIGHLIGHT_OFFSET + 8, CLOUD_SIZE * 0.75);
}
