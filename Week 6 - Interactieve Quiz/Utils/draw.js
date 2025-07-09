
function drawPlayer(x, y, frame) {
  character(sheet_player, x, y, frame, cur_player);
}

function drawPlayerPortrait(x, y) {
  nineSlice(panel_name, x - 280, y + 10, 600, 60);
  portrait(sheet_portrait, x, y, Math.floor((frameCount % 45) / 30), cur_player);
}

function drawEnemyPortrait(x, y) {
  nineSlice(panel_name, x - 280, y + 10, 600, 60);
  portrait(sheet_portrait, x, y, Math.floor((frameCount % 75) / 50), 7 + level);
}

function drawEnemy(x, y, frame) {
  character(sheet_enemy, x, y, frame, level - 1);
}

function drawPlayerHealth() {
  fill(255);
  for (i = 0; i < MAX_HEALTH; i++) {
    image(ui_health, width * (pX - 0.05) - (32 * i), 96 + (i < health ? 2 : 0) * sin((frameCount + i * 10) / 5), 32, 32, (i < health ? 0 : 32), 0, 32, 32);
  }
}

function drawEnemyHealth() {
  fill(255);
  for (i = 0; i < MAX_ENEMY_HEALTH; i++) {
    image(ui_health, width * (eX + 0.1) + (32 * i), 96 + (i < enemyHealth ? 2 : 0) * sin((frameCount + i * 10) / 5), 32, 32, (i < enemyHealth ? 0 : 32), 0, 32, 32);
  }
}

function drawButton(value, loc, color) {
  tint(color);
  nineSlice(panel_answer, loc.x1, loc.y1, loc.x2, loc.y2, 48);

  fill(0);
  text(value, loc.x1, loc.y1, loc.x2, loc.y2);
  tint(255);
  if (mouseX > loc.x1 && mouseX < loc.x1 + loc.x2 && mouseY > loc.y1 && mouseY < loc.y1 + loc.y2) {
    tint(0, 0, 255, 64);
  }
  nineSlice(panel_answer_border, loc.x1, loc.y1, loc.x2, loc.y2, 48);
  tint(255)
}