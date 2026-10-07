// Game state management for the quiz game

// Game state variables
let level = 1;
let health;
let enemyHealth;
let enemyMaxHealth;
let cur_player = 0;

// Question-related state
let question_table = new Map();
let questions = [];
let currentQuestion = 0;
let currentAnswer = -1;
let revealCountdown = 0;

// Initialize the state machine
const states = new stateMachine();

// Initialize the game state
function initializeStatemachine() {
  // Register all game states
  states.Add("splashScreen", onSplashScreen, onSplashScreenClick);

  states.Add("initLevel", onInitLevel);
  states.Add("initRound", onInitRound);
  states.Add("gameplay", onGameplay, onGameplayClick);
  states.Add("result", onResult);
  states.Add("levelUp", onLevelUp);
  states.Add("gameOver", onGameOver);
  
  // Start with the init state
  states.Goto("splashScreen");
}