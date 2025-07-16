// Asset management

// Asset variables
let bg_dungeon, bg_tiles;
let panel_answer, panel_answer_border, panel_question, panel_name;
let sheet_player, sheet_enemy, sheet_portrait, sheet_health;

// Load all game assets
function preloadAssets() {
  // Load question data
  for (let i = 1; i <= MAX_LEVEL; i++) {
    loadJSON(`Assets/questions_${i}.json`, onLoadQuestions);
  }
  
  // Load background
  bg_dungeon = loadImage("Assets/Textures/bg_dungeon.png");
  bg_tiles = loadImage("Assets/Textures/bg_tiles.png");

  // Load UI panels
  panel_question = loadImage("Assets/Textures/panel_question.png");
  panel_answer = loadImage("Assets/Textures/panel_answer.png");
  panel_answer_border = loadImage("Assets/Textures/panel_answer_border.png");
  panel_name = loadImage("Assets/Textures/panel_name.png");
  
  // Load sheets
  sheet_player = loadImage("Assets/Textures/spr_player.png");
  sheet_enemy = loadImage("Assets/Textures/spr_enemies.png");
  sheet_portrait = loadImage("Assets/Textures/spr_portraits.png");
  sheet_health = loadImage("Assets/Textures/spr_health.png");
}

// Callback for loading question data
function onLoadQuestions(json) {
  question_table.set(json["level"], 
    { 
      enemy: json["enemy"],
      questions: json["questions"]
    });
}