function drawPlayer(x, y, frame) {
  character(sheet_player, x, y, frame, cur_player);
}

function drawPlayerPortrait(x, y) {
  nineSlice(panel_name, x + 20, y + 10, 300, 60);
  
  fill(0);
  textStyle(BOLD);
  textSize(24)
  textFont("Roboto");
  text("Henk", x + 80, y + 12, 240, 64);
  textStyle(NORMAL);
  textSize(28)

  portrait(sheet_portrait, x, y, Math.floor((frameCount % 45) / 30), cur_player);
}


function drawPlayerHealth() {
  fill(255);
  for (i = 0; i < MAX_HEALTH; i++) {
    image(sheet_health, width * (pX - 0.05) - (32 * i), 96 + (i < health ? 2 : 0) * sin((frameCount + i * 10) / 5), 32, 32, (i < health ? 0 : 32), 0, 32, 32);
  }
}