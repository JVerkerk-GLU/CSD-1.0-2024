const WINDOW_SIZE = 1024;
const C_WIDTH = 8;
const C_HEIGHT = 8;

const BUTTON_WIDTH = 128;
const BUTTON_HEIGHT = 32;
const BUTTON_SPACE = 16;

let images = [];
let art = [[[]]];

let currentArt = -1;

// Load all texture files to read the pixels from
function preload() {
  images.push({image: loadImage("Assets/CactiCat.png"), text: "Cacti", width: 128, height: 128 });
  images.push({image: loadImage("Assets/DeathstarCat.png"), text: "Deathstar", width: 128, height: 128 });
  images.push({image: loadImage("Assets/FatCat.png"), text: "Fat", width: 128, height: 128 });
  images.push({image: loadImage("Assets/IslandCat.png"), text: "Island", width: 128, height: 128 });
  images.push({image: loadImage("Assets/KingCat.png"), text: "King", width: 128, height: 128 });
  images.push({image: loadImage("Assets/MexiCat.png"), text: "Mexi", width: 128, height: 128 });
  images.push({image: loadImage("Assets/PinkCat.png"), text: "Pink", width: 128, height: 128 });
  images.push({image: loadImage("Assets/RamenCat.png"), text: "Ramen", width: 128, height: 128 });
  images.push({image: loadImage("Assets/RoundCat.png"), text: "Round", width: 128, height: 128 });
  images.push({image: loadImage("Assets/SlimeCat.png"), text: "Slime", width: 128, height: 128 });
  images.push({image: loadImage("Assets/SquareCat.png"), text: "Square", width: 128, height: 128 });
  images.push({image: loadImage("Assets/SuperCat.png"), text: "Super", width: 128, height: 128 });
  images.push({image: loadImage("Assets/TriangleCat.png"), text: "Triangle", width: 128, height: 128 });
}

function setup() {
  frameRate(60);
  createCanvas(1184, 1024);
  noStroke();
  LoadArt();
  // Add a clear button
  let button = createButton("Clear");
  let bY = 1024 - BUTTON_HEIGHT - BUTTON_SPACE;
  button.position(1024 + BUTTON_SPACE, bY);
  button.size(BUTTON_WIDTH, BUTTON_HEIGHT);
  button.mousePressed(function() {
    currentArt = -1;
  });
}

function draw() {
  // Draws the empty background
  background(0);
  fill(32, 32, 32);
  rect(0, 0, WINDOW_SIZE, WINDOW_SIZE);
  // Draw the rainbow background
  drawBackground();
  // Draw the selected texture
  drawArt();
}

function drawArt()
{
  if (currentArt < 0 || currentArt >= art.length)
    return;

  colorMode(RGB, 255, 255, 255);
  
  // Loop through the selected array and render each pixel individually
  for (let y = 0; y < art[currentArt].length; y++) {
    for (let x = 0; x < art[currentArt][y].length; x++) {
      fill(art[currentArt][y][x]);
      rect(x * C_WIDTH, y * C_HEIGHT, C_WIDTH, C_HEIGHT);
    }
  }
}

function drawBackground() 
{
  if (currentArt < 0 || currentArt >= art.length)
    return;

  // Loop through each row and alter the color based on its position
  colorMode(HSB, 255, 255, 255);
  let offset = frameCount * 2;
  for(let i = 0; i < WINDOW_SIZE; i+=C_HEIGHT)
  {
    fill((((i / WINDOW_SIZE) * 64.0) + offset) % 255.0, 255, 255);
    rect(0, i, WINDOW_SIZE, C_HEIGHT);
  }
}

function LoadArt()
{
  // Loop through the texture's pixels and store their colors in a 2d array
  for (let i = 0; i < images.length; i++)
  {
    art.push([]);
    for (y = 0; y < images[i].height; y++)
    {
      art[i].push([]);
      for (x = 0; x < images[i].width; x++)
      {
        let c = images[i].image.get(x, y);
        art[i][y].push(color(c[0], c[1], c[2], c[3]));
      }
    }
    // Add a button to select it
    let button = createButton(images[i].text);
    let bY = (BUTTON_SPACE + BUTTON_HEIGHT) * i + BUTTON_SPACE;
    button.position(1024 + BUTTON_SPACE, bY);
    button.size(BUTTON_WIDTH, BUTTON_HEIGHT);
    button.mousePressed(function() {
      currentArt = i;
    });
  }
}