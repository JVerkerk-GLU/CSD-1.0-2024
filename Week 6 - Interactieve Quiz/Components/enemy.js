function drawEnemyPortrait(x, y) {
  nineSlice(panel_name, x - 280, y + 10, 300, 60);
  fill(0);
  textStyle(BOLD);
  textSize(24)
  textFont("Roboto");
  text(question_table.get(level).enemy, x - 280, y + 12, 280, 64);
  textStyle(NORMAL);
  textSize(28)

  portrait(sheet_portrait, x, y, Math.floor((frameCount % 75) / 50), 7 + level);
}

function drawEnemy(x, y, frame) {
  character(sheet_enemy, x, y, frame, level - 1);
}

function drawEnemyHealth() {
  fill(255);
  for (i = 0; i < MAX_ENEMY_HEALTH; i++) {
    image(sheet_health, width * (eX + 0.1) + (32 * i), 96 + (i < enemyHealth ? 2 : 0) * sin((frameCount + i * 10) / 5), 32, 32, (i < enemyHealth ? 0 : 32), 0, 32, 32);
  }
}