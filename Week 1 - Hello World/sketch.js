function setup() {
  createCanvas(600, 400);
  textSize(16);
  textAlign(LEFT, TOP);
  ellipseMode(RADIUS);
}

function draw() {
  background(196, 255, 196);

  //#region 1. Name
  fill(0);
  noStroke()
  text("1", 16, 16);
  text("Jirre Verkerk", 48, 16);
  //#endregion

  //#region 2. Flag
  fill(0);
  noStroke();
  text("2", 16, 48);
  fill(255, 0, 0);
  rect(48, 48, 80, 20);
  fill(255, 255, 255);
  rect(48, 68, 80, 20);
  fill(0, 0, 255);
  rect(48, 88, 80, 20);
  //#endregion

  //#region 3. Checkerboard
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
  //#endregion

  //#region 4. House
  fill(0);
  text("4", 16, 200);
  noFill();
  strokeWeight(4);
  stroke(0);
  triangle(80, 200, 48, 232, 112, 232);
  rect(48, 232, 64, 64);
  //#endregion

  //#region 5. Traffic Light
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
  //#endregion

  //#region 6. Dice
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
  //#endregion
  
  //#region 7. Mario
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

  // - Face - //
  fill(0);
  rect(388, 56, 8, 16);
  rect(396, 72, 8, 8);
  rect(388, 80, 32, 8);

  // - Hands - //
  fill(255, 200, 160);
  rect(324, 120, 96, 24);

  // - Shirt - //
  fill(255, 0, 0);
  rect(340, 96, 56, 8);
  rect(332, 104, 80, 8);
  rect(324, 112, 96, 8);
  rect(340, 120, 64, 8);

  // - Overalls - //
  fill(0, 0, 255);
  rect(356, 96, 8, 16);
  rect(380, 104, 8, 8);
  rect(356, 112, 32, 8);
  rect(348, 120, 48, 16);
  rect(340, 136, 64, 8);
  rect(340, 144, 24, 8);
  rect(380, 144, 24, 8);

  // - Buttons - //
  fill(255, 255, 0);
  rect(356, 120, 8, 8);
  rect(380, 120, 8, 8);

  // - Shoes - //
  fill(152, 64, 56);
  rect(332, 152, 24, 8);
  rect(324, 160, 32, 8);
  rect(388, 152, 24, 8);
  rect(388, 160, 32, 8);
  //#endregion

    //#region 8. Link
    fill(0);
    noStroke();
    text("8", 300, 188);
    text("Link", 332, 188);

    // - Skin - //
    fill(255, 232, 172);
    rect(452, 236, 48, 32);
    rect(388, 268, 96, 80);

    // - Light Green - //
    // Hat
    fill(0, 115, 0);
    rect(396, 236, 64, 8);
    rect(388, 244, 56, 8);
    rect(380, 252, 64, 8);
    rect(364, 260, 72, 8);
    rect(348, 268, 88, 16);
    rect(348, 284, 40, 8);
    rect(412, 284, 8, 8);
    rect(404, 292, 8, 8);
    //Arm
    rect(404, 324, 8, 24);
    rect(412, 340, 8, 8);
    rect(412, 348, 24, 8);
    rect(436, 332, 32, 16);
    //Skirt
    rect(396, 356, 72, 8);
    rect(404, 364, 56, 8);
    rect(412, 372, 40, 8);

    // - Dark Green - //
    // Hat
    fill(0, 42, 0);
    rect(420, 220, 48, 8);
    rect(396, 228, 72, 8);
    rect(388, 236, 8, 8);
    rect(460, 236, 8, 8);
    rect(380, 244, 8, 8);
    rect(364, 252, 16, 8);
    rect(348, 260, 16, 8);
    rect(340, 268, 8, 8);
    rect(372, 268, 8, 8);
    rect(332, 276, 64, 8);
    rect(404, 276, 16, 8);
    rect(372, 292, 16, 8);
    // Arm
    rect(460, 324, 8, 8);
    rect(412, 332, 8, 8);
    rect(428, 332, 8, 8);
    rect(420, 340, 16, 8);
    rect(436, 348, 32, 8);
    // Skirt
    rect(396, 348, 8, 8);
    rect(396, 364, 8, 8);
    rect(404, 372, 8, 8);

    // - Tan - //
    fill(102, 76, 24);
    rect(468, 252, 8, 8);
    rect(476, 260, 8, 8);
    rect(468, 284, 8, 8);
    rect(420, 292, 8, 16);
    rect(444, 292, 8, 8);
    rect(428, 308, 16, 16);
    rect(372, 300, 24, 32);
    rect(404, 308, 8, 8);
    rect(380, 332, 8, 8);
    rect(468, 324, 16, 8);
    rect(468, 348, 16, 8);

    // - Yellow - //
    fill (255, 215, 0);
    rect(468, 236, 16, 16);
    rect(500, 236, 8, 16);
    rect(444, 244, 8, 40);
    rect(484, 244, 16, 16);
    rect(452, 252, 8, 16);
    rect(460, 252, 8, 8);
    rect(436, 260, 8, 24);
    rect(428, 300, 8, 16);
    rect(420, 316, 8, 8);

    // - Dark Grey - //
    fill (56);
    rect(364, 292, 8, 8);
    rect(380, 308, 8, 16);
    rect(396, 308, 8, 16);
    rect(412, 356, 40, 8);
    rect(484, 308, 24, 56);
    rect(508, 324, 80, 32);
    rect(588, 332, 8, 16);

    // - Light Grey - //
    fill (96);
    rect(436, 300, 8, 8);
    rect(492, 316, 8, 40);
    rect(508, 332, 80, 16);

    // - Black - //
    fill(0);
    rect(468, 228, 48, 8);
    rect(508, 236, 8, 16);
    rect(500, 252, 8, 8);
    rect(484, 260, 16, 8);
    rect(484, 268, 8, 32);
    rect(332, 284, 16, 8);
    rect(420, 284, 8, 8);
    rect(460, 284, 8, 8);
    rect(476, 284, 8, 8);
    rect(356, 292, 8, 8);
    rect(412, 292, 8, 40);
    rect(364, 300, 8, 32);
    rect(388, 308, 8, 16);
    rect(484, 308, 8, 8);
    rect(404, 316, 8, 8);
    rect(460, 316, 24, 8);
    rect(396, 324, 8, 24);
    rect(428, 324, 32, 8);
    rect(388, 332, 8, 16);
    rect(420, 332, 8, 8);
    rect(404, 348, 8, 8);
    rect(380, 340, 16, 48);
    rect(372, 348, 8, 32);
    rect(396, 372, 8, 8);
    rect(404, 380, 48, 8);
    rect(468, 356, 8, 8);
    rect(460, 364, 24, 8);
    rect(452, 372, 40, 24);
    rect(492, 380, 8, 16);

    // - Dark Brown - //
    fill(56, 40, 12);
    rect(380, 348, 8, 32);
    rect(388, 372, 8, 8);
    rect(460, 372, 24, 8);
    rect(452, 380, 40, 8);

    // - Eye -- //
    fill(255);
    rect(460, 292, 8, 16);
    fill(128, 128, 255);
    rect(468, 292, 8, 16);
}
