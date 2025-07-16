
function preload() {
  preloadAssets();
}

function setup() {
  createCanvas(800, 600);
  frameRate(30);
  textFont("Cinzel");
  textAlign(CENTER, CENTER);
  textSize(32);
  textWrap(WORD);

  initializeStatemachine();
}

function draw() {
  background(0);
  drawBackground();

  states.Draw();
}


function mouseClicked() {
  states.Click();
}
