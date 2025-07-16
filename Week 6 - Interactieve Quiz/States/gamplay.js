function onGameplay() {
  fill(255);
  nineSlice(panel_question, 24, 210, 752, 158, 48);
  fill(0);
  textStyle(BOLD);
  textFont("Cinzel");
  text(questions[currentQuestion].question, 24, 210, 752, 158);

  for (let i = 0; i < 4; i++) {
    fill(255);
    textStyle(NORMAL);
    let c = color(255, 255, 255);
    if (currentAnswer === i) {
      c = color(196, 196, 255);
    }
    drawButton(questions[currentQuestion].answers[i], BUTTON_LAYOUT[i], c);
  }

  drawPlayer(width * pX, 64, floor(frameCount / 30) % 2);
  drawEnemy(width * eX, 64, floor(frameCount / 30) % 2);

  drawPlayerPortrait(0, 0);
  drawEnemyPortrait(width - 80, 0);

  drawPlayerHealth();
  drawEnemyHealth();
}

function onGameplayClick() {
    for(let i = 0; i < 4; i++) {
      if (mouseX > BUTTON_LAYOUT[i].x1 && mouseX < BUTTON_LAYOUT[i].x1 + BUTTON_LAYOUT[i].x2 &&
        mouseY > BUTTON_LAYOUT[i].y1 && mouseY < BUTTON_LAYOUT[i].y1 + BUTTON_LAYOUT[i].y2) {
          currentAnswer = i;
          states.Goto("result");
      }
    }
}