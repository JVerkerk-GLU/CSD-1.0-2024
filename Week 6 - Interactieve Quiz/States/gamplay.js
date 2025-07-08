function onGameplay() {
  fill(255);
  nineSlice(panel_question, 24, 240, 752, 158, 48);
  fill(0);
  textStyle(BOLD);
  text(questions[currentQuestion].question, 24, 240, 752, 158);

  for (let i = 0; i < 4; i++) {
    fill(255);
    textStyle(NORMAL);
    let c = color(255, 255, 255);
    if (currentAnswer === i) {
      c = color(196, 196, 255);
    }
    drawButton(questions[currentQuestion].answers[i], BUTTON_LAYOUT[i], c);
  }

  character(char_player, width * 0.4, 64, floor(frameCount / 30) % 2);
  character(char_enemy[0], width * 0.6, 64, floor(frameCount / 30) % 2);
}

function onGameplayClick() {
    console.log("click");
    for(let i = 0; i < 4; i++) {
      if (mouseX > BUTTON_LAYOUT[i].x1 && mouseX < BUTTON_LAYOUT[i].x1 + BUTTON_LAYOUT[i].x2 &&
        mouseY > BUTTON_LAYOUT[i].y1 && mouseY < BUTTON_LAYOUT[i].y1 + BUTTON_LAYOUT[i].y2) {
          currentAnswer = i;
          stateMachine.Goto("result");
      }
    }
}