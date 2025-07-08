const BUTTON_LAYOUT = [
  { x1: 24, y1: 400, x2: 352, y2: 96 },
  { x1: 424, y1: 400, x2: 352, y2: 96 },
  { x1: 24, y1: 500, x2: 352, y2: 96 },
  { x1: 424, y1: 500, x2: 352, y2: 96 }
]

const states = new stateMachine();

let dungeon_bg;
let panel_default, panel_answer, panel_answer_border, panel_correct, panel_fault;
let char_player;
let char_enemy = [];
let ui_health;

let level = 1;
const MAX_LEVEL = 1;
let health;
const MAX_HEALTH = 3;
let enemyHealth;
const MAX_ENEMY_HEALTH = 5;
let question_table = new Map();
let questions = [];
let currentQuestion = 9;
let currentAnswer = -1;
let MAX_REVEAL_COUNTDOWN = 3;
let revealCountdown = 0;

function preload() {
  for (let i = 1; i <= 1; i++) {
    loadJSON(`Assets/questions_${i}.json`, onLoadQuestions);
  }
  dungeon_bg = loadImage("Assets/dungeon_bg.png");
  panel_question = loadImage("Assets/panel_question.png");
  panel_answer = loadImage("Assets/panel_answer.png");
  panel_answer_border = loadImage("Assets/panel_answer_border.png");

  char_player = loadImage("Assets/player.png");
  for (let i = 1; i <= 5; i++) {
    char_enemy.push(loadImage(`Assets/enemy_${i}.png`));
  }

  ui_health = loadImage("Assets/health.png");
}

function onLoadQuestions(json) {
    question_table.set(json["level"], json["questions"])
}

function setup() {
  createCanvas(800, 600);
  textFont("Cinzel");
  textAlign(CENTER, CENTER);
  textSize(32);
  textWrap(WORD);

  states.Add("init", onInit);
  states.Add("start", onStartRound);
  states.Add("gameplay", onGameplay, onGameplayClick);
  states.Add("result", onResult);


  states.Goto("init");
}

function draw() {
  background(0);
  drawBackground();
  
  states.Draw();
}

function drawBackground() {
  fill(255);
  for (let i = 0; i < width; i += 40) {
    image(dungeon_bg, i, 0, 40, 200);
  }
  
  for (i = 0; i < MAX_HEALTH; i++) {
    image(ui_health, width * 0.35 - (32 * i), 96 + (i < health ? 2 : 0) * sin((frameCount + i * 10) / 5), 32, 32, (i < health ? 0 : 32), 0, 32, 32);
  }

  for (i = 0; i < MAX_ENEMY_HEALTH; i++) {
    image(ui_health, width * 0.7 + (32 * i), 96 + (i < enemyHealth ? 2 : 0) * sin((frameCount + i * 10) / 5), 32, 32, (i < enemyHealth ? 0 : 32), 0, 32, 32);
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

function mouseClicked() {
  states.Click();
}