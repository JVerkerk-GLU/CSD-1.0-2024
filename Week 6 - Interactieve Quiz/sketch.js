const BUTTON_LAYOUT = [
  { x1: 24, y1: 400, x2: 352, y2: 96 },
  { x1: 424, y1: 400, x2: 352, y2: 96 },
  { x1: 24, y1: 500, x2: 352, y2: 96 },
  { x1: 424, y1: 500, x2: 352, y2: 96 }
]

let dungeon_bg;
let panel_default, panel_answer, panel_answer_border, panel_correct, panel_fault;
let char_player;
let char_enemy = [];
let ui_health;

let level = 0;
const MAX_LEVEL = 1;
let health;
const MAX_HEALTH = 3;
let enemyHealth;
const MAX_ENEMY_HEALTH = 5;
let questions = [];
let currentQuestion = 9;
let currentAnswer = -1;
let MAX_REVEAL_COUNTDOWN = 3;
let revealCountdown = 0;

function preload() {
  for (let i = 1; i <= 1; i++) {
    let array = loadJSON(`Assets/questions_${i}.json`);
    console.log(array);
    questions.push(array);
  }
  console.log(questions);
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

function setup() {
  createCanvas(800, 600);
  textFont("Cinzel");
  textAlign(CENTER, CENTER);
  textSize(32);
  textWrap(WORD);

  StartGame();
  LoadQuestion();
}

function draw() {
  background(0);
  drawBackground();

  fill(255);
  nineSlice(panel_question, 24, 240, 752, 158, 48);
  fill(0);
  textStyle(BOLD);
  text(questions[level][currentQuestion].question, 24, 240, 752, 158);

  for (let i = 0; i < 4; i++) {
    fill(255);
    textStyle(NORMAL);
    let c = color(255, 255, 255);
    if (currentAnswer === i) {
      c = color(196, 196, 255);
    }
    drawButton(questions[level][currentQuestion].answers[i], BUTTON_LAYOUT[i], c);
  }
}

function StartGame() {
  health = MAX_HEALTH;
  enemyHealth = MAX_ENEMY_HEALTH;
  level = 0;
  questions[level] = shuffle(questions[level]);
  currentQuestion = -1;
}

function LoadQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions[level].length) {
    level++;
    questions = 0;
    questions[level] = shuffle(questions[level]);
  }
  currentAnswer = -1;
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
  
  character(char_player, width * 0.4, 64, floor(frameCount / 30) % 2);
  character(char_enemy[0], width * 0.6, 64, floor(frameCount / 30) % 2);
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
  if (currentAnswer === -1) {
    for(let i = 0; i < 4; i++) {
      if (mouseX > BUTTON_LAYOUT[i].x1 && mouseX < BUTTON_LAYOUT[i].x1 + BUTTON_LAYOUT[i].x2 &&
        mouseY > BUTTON_LAYOUT[i].y1 && mouseY < BUTTON_LAYOUT[i].y1 + BUTTON_LAYOUT[i].y2) {
          currentAnswer = i;
      }
    }
  }
}