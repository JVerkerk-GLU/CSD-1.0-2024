const BUTTON_LAYOUT = [
  { x1: 24, y1: 400, x2: 352, y2: 96 },
  { x1: 424, y1: 400, x2: 352, y2: 96 },
  { x1: 24, y1: 500, x2: 352, y2: 96 },
  { x1: 424, y1: 500, x2: 352, y2: 96 }
]

let dungeon_bg;
let panel_default, panel_selected, panel_correct, panel_fault;

let questions;
let currentQuestion = 0;

function preload() {
  questions = loadJSON('Assets/questions.json');
  dungeon_bg = loadImage("Assets/dungeon_bg.png");
  panel_question = loadImage("Assets/panel_question.png");
  panel_default = loadImage("Assets/panel_default.png");
  panel_selected = loadImage("Assets/panel_select.png");
  panel_correct = loadImage("Assets/panel_correct.png");
  panel_fault = loadImage("Assets/panel_fault.png");
}

function setup() {
  createCanvas(800, 600);
  textFont("Cinzel");
  textAlign(CENTER, CENTER);
  textSize(32);
  textWrap(WORD);
}

function draw() {
  background(0);
  drawBackground();

  fill(255);
  drawPanel(panel_question, 24, 240, 752, 158, 48);
  fill(0);
  textStyle(BOLD);
  text(questions[currentQuestion].question, 24, 240, 752, 158);

  for (let i = 0; i < 4; i++) {
    fill(255);
    textStyle(NORMAL);
    drawButton(questions[currentQuestion].answers[i], BUTTON_LAYOUT[i]);
  }
}

function startQuiz() {
  currentQuestion = 0;
}

function drawBackground() {
  fill(255);
  for (let i = 0; i < width; i += 40)
  image(dungeon_bg, i, 0, 40, 200);
}

function drawButton(value, loc) {
  fill(255);
  drawPanel(panel_default, loc.x1, loc.y1, loc.x2, loc.y2);

  fill(0);
  text(value, loc.x1, loc.y1, loc.x2, loc.y2);

  if (mouseX > loc.x1 && mouseX < loc.x1 + loc.x2 && mouseY > loc.y1 && mouseY < loc.y1 + loc.y2) {
    fill(0, 64);
    rect(loc.x1, loc.y1, loc.x2, loc.y2);
  }
}

function drawPanel(panel, x1, y1, x2, y2, size = 64) {
    // Corners
    image(panel, x1, y1, 20, 20, 0, 0, 20, 20);
    image(panel, x1 + x2 - 20, y1, 20, 20, size - 20, 0, 20, 20);
    image(panel, x1, y1 + y2 - 20, 20, 20, 0, size - 20, 20, 20);
    image(panel, x1 + x2 - 20, y1 + y2 - 20, 20, 20, size - 20, size - 20, 20, 20);
    // Sides
    image(panel, x1 + 20, y1, x2 - 40, 20, 20, 0, size - 40, 20);
    image(panel, x1 + 20, y1 + y2 - 20, x2 - 40, 20, 20, size - 20, size - 40, 20);
    image(panel, x1, y1 + 20, 20, y2 - 40, 0, 20, 20, size - 40);
    image(panel, x1 + x2 - 20, y1 + 20, 20, y2 - 40, size - 20, 20, 20, size - 40);
    // Fill
    image(panel, x1 + 20, y1 + 20, x2 - 40, y2 - 40, 20, 20, size - 40, size - 40);
}