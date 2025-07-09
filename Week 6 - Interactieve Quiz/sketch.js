const BUTTON_LAYOUT = [
  { x1: 24, y1: 400, x2: 352, y2: 96 },
  { x1: 424, y1: 400, x2: 352, y2: 96 },
  { x1: 24, y1: 500, x2: 352, y2: 96 },
  { x1: 424, y1: 500, x2: 352, y2: 96 }
]

const pX = 0.3;
const eX = 0.55;

const states = new stateMachine();

let dungeon_bg;
let panel_default, panel_answer, panel_answer_border, panel_question, panel_name;
let sheet_player;
let cur_player = 0;
let sheet_enemy;
let ui_health;
let sheet_portrait;

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
  panel_name = loadImage("Assets/panel_name.png")

  sheet_player = loadImage("Assets/player.png");
  sheet_enemy = loadImage("Assets/enemies.png");
  sheet_portrait = loadImage("Assets/portraits.png")

  ui_health = loadImage("Assets/health.png");
}

function onLoadQuestions(json) {
    question_table.set(json["level"], json["questions"])
}

function setup() {
  createCanvas(800, 600);
  frameRate(30);
  textFont("Cinzel");
  textAlign(CENTER, CENTER);
  textSize(32);
  textWrap(WORD);

  states.Add("init", onInit);
  states.Add("start", onStartRound);
  states.Add("gameplay", onGameplay, onGameplayClick);
  states.Add("result", onResult);


  states.Add("levelUp", onLevelUp);

  states.Goto("init");
}

function draw() {
  background(0);
  drawBackground();
  
  states.Draw();
}

function drawBackground() {
  for (let i = 0; i < width; i += 40) {
    image(dungeon_bg, i, 0, 40, 200);
  }
}

function mouseClicked() {
  states.Click();
}