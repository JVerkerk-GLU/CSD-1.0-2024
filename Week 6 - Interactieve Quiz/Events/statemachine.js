// Game state management for the quiz game

// Game state variables
let level = 1;
let health;
let enemyHealth;
let cur_player = 0;

// Question-related state
let question_table = new Map();
let questions = [];
let currentQuestion = 9;
let currentAnswer = -1;
let revealCountdown = 0;

// Initialize the state machine
const states = new stateMachine();

// Initialize the game state
function initializeStatemachine() {
  // Register all game states
  states.Add("init", onInit);
  states.Add("start", onStartRound);
  states.Add("gameplay", onGameplay, onGameplayClick);
  states.Add("result", onResult);
  states.Add("levelUp", onLevelUp);
  
  // Start with the init state
  states.Goto("init");
}