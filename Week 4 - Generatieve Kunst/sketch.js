let shapes = [];

const SPAWN_AMOUNT = 20;
const BASE_SPAWN_CHANCE = 0.5;
const SPAWN_CHANCE_PENALTY = 0.02;

const MIN_SIZE = 32;
const MAX_SIZE = 128;
const MIN_LIFE = 0.5;
const MAX_LIFE = 2.0;

const MAX_ROT_SPEED = 90.0;
const MAX_SPEED = 120;

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSB, 360, 255, 255);
  noStroke();
  amount = round(random(0.25, 0.75) * SPAWN_AMOUNT);
  for (let i = 0; i < amount; i++)
  {
    createShape();
  }
}

function draw() {
  background(128);
  if (random(1) < (BASE_SPAWN_CHANCE - SPAWN_CHANCE_PENALTY * shapes.length)) {
    createShape();
  }

  if (shapes.length <= 0) {
    return;
  }

  for (let i = 0; i < shapes.length; i++)
  {
    if (shapes[i].isAlive()) {
      shapes[i].draw();
    } else {
      shapes.splice(i, 1);
      i--;
    }
  }
}

function createShape() {
  shapes.push(new Shape());
}

function Shape() {
  this.x = random(width);
  this.y = random(height);
  this.maxSize = random(MIN_SIZE, MAX_SIZE);
  this.color = color(random(360), 255, 255);
  this.sides = round(random(3, 8));

  this.lifetime = random(MIN_LIFE, MAX_LIFE);
  this.startTime = millis() * 0.001;

  this.rotation = random(360);
  this.rotSpeed = random(-MAX_ROT_SPEED, MAX_ROT_SPEED);

  this.direction = random(360);
  this.speed = random(MAX_SPEED);

  this.isAlive = function () {
    return millis() * 0.001 < this.startTime + this.lifetime;
  }

  this.getShape = function (padding) {
    beginShape(TRIANGLE_FAN);
    vertex(0, 0);
    let delta = 360.0 / this.sides;
    for(let i = 0; i <= this.sides; i++)
    {
      vertex(cos(delta * i) * (MAX_SIZE + padding), sin(delta * i) * (MAX_SIZE + padding));
    }
    endShape(CLOSE);
  }

  this.draw = function () {
    push();
    this.x += cos(this.direction) * this.speed * deltaTime * 0.001;
    this.y += sin(this.direction) * this.speed * deltaTime * 0.001;
    translate(this.x, this.y);
    rotate(this.rotation + (millis() * 0.001 * this.rotSpeed));
    let alpha = sin(
      (((millis() * 0.001) - this.startTime) / this.lifetime) * 180.0
    );
    
    scale(alpha);
    fill(0, 0, 0, alpha);
    this.getShape(12);
    this.color.setAlpha(alpha);
    fill(this.color);
    this.getShape(0);
    pop();
  }
}