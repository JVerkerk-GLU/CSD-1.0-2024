function setup() {
  createCanvas(480, 320);
  textSize(16);
  textAlign(LEFT, TOP);
  ellipseMode(RADIUS);
}

function draw() {
  background(128, 255, 128);

  // 1. Name
  fill(0);
  noStroke()
  text("1", 16, 16);
  text("Jirre Verkerk", 48, 16);

  // 2. Flag
  fill(0);
  noStroke();
  text("2", 16, 48);
  fill(255, 0, 0);
  rect(48, 48, 80, 20);
  fill(255, 255, 255);
  rect(48, 68, 80, 20);
  fill(0, 0, 255);
  rect(48, 88, 80, 20);

  // 3. Checkerboard
  fill(0);
  noStroke();
  text("3", 16, 128);
  strokeWeight(4);
  stroke(0);
  rect(48, 128, 60, 60);
  noStroke();
  fill(255);
  rect(68, 128, 20, 20);
  rect(48, 148, 20, 20);
  rect(88, 148, 20, 20);
  rect(68, 168, 20, 20);

  // 4. House
  fill(0);
  text("4", 16, 200);
  noFill();
  strokeWeight(4);
  stroke(0);
  triangle(80, 200, 48, 232, 112, 232);
  rect(48, 232, 64, 64);

  // 5. Traffic Light
  fill(0);
  noStroke();
  text("5", 176, 16);
  fill(128);
  rect(208, 16, 32, 96);
  rect(216, 112, 16, 32);
  fill(255, 0, 0);
  circle(224, 32, 12);
  fill(255, 128, 0);
  circle(224, 64, 12);
  fill(0, 255, 0);
  circle(224, 96, 12);

  // 6. Dice
  fill(0);
  noStroke();
  text("6", 176, 160);
  strokeWeight(4);
  stroke(0);
  fill(255);
  rect(208, 160, 64, 64, 8, 8, 8, 8);
  noStroke();
  fill(0);
  circle(224, 176, 8, 8);
  circle(240, 192, 8, 8);
  circle(256, 208, 8, 8);

  // 7. Mario
  fill(0);
  noStroke();
  text("7", 300, 16);
  text("Mario", 332, 16);

  // - Hat - //
  fill(255, 0, 0);
  rect(348, 40, 48, 8);
  rect(340, 48, 80, 8);

  // - Head - //
  fill(255, 200, 160);
  rect(340, 56, 56, 8);
  rect(332, 64, 88, 8);
  rect(332, 72, 96, 8);
  rect(332, 80, 88, 8);
  rect(348, 88, 64, 8);

  // - Hair - //
  fill(152, 64, 56);
  rect(340, 56, 24, 8);
  rect(332, 64, 8, 24);
  rect(340, 80, 8, 8);
  rect(348, 56, 8, 24);
  rect(356, 72, 8, 8);
}
