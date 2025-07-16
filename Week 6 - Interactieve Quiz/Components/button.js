function drawButton(value, loc, color) {
  tint(color);
  nineSlice(panel_answer, loc.x1, loc.y1, loc.x2, loc.y2, 48);

  fill(0);
  textFont("Cinzel");
  text(value, loc.x1, loc.y1, loc.x2, loc.y2);
  tint(255);
  if (mouseX > loc.x1 && mouseX < loc.x1 + loc.x2 && mouseY > loc.y1 && mouseY < loc.y1 + loc.y2) {
    tint(0, 0, 255, 64);
  }
  nineSlice(panel_answer_border, loc.x1, loc.y1, loc.x2, loc.y2, 48);
  tint(255)
}