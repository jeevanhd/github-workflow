// Game state variables
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;
let gameEnded = false;

// DOM elements
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const startGameBtn = document.getElementById("start-game-btn");
const backToWelcomeBtn = document.getElementById("back-to-welcome-btn");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const currentRoundElement = document.getElementById("current-round");
const playerChoiceDisplay = document.getElementById("player-choice-display");
const computerChoiceDisplay = document.getElementById(
  "computer-choice-display"
);
const roundResultElement = document.getElementById("round-result");
const finalResultElement = document.getElementById("final-result");
const finalMessageElement = document.getElementById("final-message-text");
const playAgainBtn = document.getElementById("play-again-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");

// Choice emojis for display
const choiceEmojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

// Game state management functions
function startGame() {
  console.log("Starting game...");
  if (welcomeScreen) welcomeScreen.style.display = "none";
  if (gameScreen) gameScreen.style.display = "block";

  // Initialize the game
  resetGame();

  // Add welcome animation to choice buttons
  choiceButtons.forEach((btn, index) => {
    setTimeout(() => {
      btn.style.transform = "translateY(-5px)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 200);
    }, index * 100);
  });
}

function returnToWelcome() {
  gameScreen.style.display = "none";
  welcomeScreen.style.display = "block";
  resetGame();
}

// Game logic functions
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function updateDisplay() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
  currentRoundElement.textContent = currentRound;
}

function displayChoices(playerChoice, computerChoice) {
  playerChoiceDisplay.textContent = choiceEmojis[playerChoice];
  computerChoiceDisplay.textContent = choiceEmojis[computerChoice];

  // Reset previous styling
  playerChoiceDisplay.className = "choice-display";
  computerChoiceDisplay.className = "choice-display";
}

function showRoundResult(result, playerChoice, computerChoice) {
  let message = "";
  let messageClass = "";

  if (result === "tie") {
    message = "It's a tie! Both chose the same.";
    messageClass = "tie";
  } else if (result === "player") {
    message = `You win this round! ${getWinMessage(
      playerChoice,
      computerChoice
    )}`;
    messageClass = "win";
    playerChoiceDisplay.classList.add("winner");
    computerChoiceDisplay.classList.add("loser");
  } else {
    message = `Computer wins this round! ${getWinMessage(
      computerChoice,
      playerChoice
    )}`;
    messageClass = "lose";
    computerChoiceDisplay.classList.add("winner");
    playerChoiceDisplay.classList.add("loser");
  }

  roundResultElement.textContent = message;
  roundResultElement.className = messageClass;
}

function getWinMessage(winnerChoice, loserChoice) {
  const winMessages = {
    "rock-scissors": "Rock crushes Scissors",
    "paper-rock": "Paper covers Rock",
    "scissors-paper": "Scissors cuts Paper",
  };

  return winMessages[`${winnerChoice}-${loserChoice}`] || "";
}

function checkGameEnd() {
  if (currentRound > maxRounds) {
    gameEnded = true;
    showFinalResult();
    return true;
  }
  return false;
}

function showFinalResult() {
  let finalMessage = "";
  let messageClass = "";

  if (playerScore > computerScore) {
    finalMessage = "Congratulations! You Won The Game! 🎉";
    messageClass = "win";
  } else if (computerScore > playerScore) {
    finalMessage = "Game Over! Computer Wins The Game! 🤖";
    messageClass = "lose";
  } else {
    finalMessage = "It's a Tie Game! Try Again! 🤝";
    messageClass = "tie";
  }

  finalMessageElement.textContent = finalMessage;
  finalMessageElement.className = messageClass;
  finalResultElement.style.display = "flex";

  // Disable choice buttons
  choiceButtons.forEach((btn) => {
    btn.disabled = true;
  });
}

function resetGame() {
  // Reset game state
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  gameEnded = false;

  // Reset display
  updateDisplay();
  playerChoiceDisplay.textContent = "?";
  computerChoiceDisplay.textContent = "?";
  playerChoiceDisplay.className = "choice-display";
  computerChoiceDisplay.className = "choice-display";
  roundResultElement.textContent = "Choose your weapon!";
  roundResultElement.className = "";
  finalResultElement.style.display = "none";

  // Re-enable choice buttons
  choiceButtons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("selected");
  });
}

function playRound(playerChoice) {
  if (gameEnded) return;

  // Highlight selected button
  choiceButtons.forEach((btn) => {
    btn.classList.remove("selected");
    if (btn.dataset.choice === playerChoice) {
      btn.classList.add("selected");
    }
  });

  // Generate computer choice
  const computerChoice = getComputerChoice();

  // Display choices
  displayChoices(playerChoice, computerChoice);

  // Determine winner
  const result = determineWinner(playerChoice, computerChoice);

  // Update scores
  if (result === "player") {
    playerScore++;
  } else if (result === "computer") {
    computerScore++;
  }

  // Show round result
  showRoundResult(result, playerChoice, computerChoice);

  // Update display
  updateDisplay();

  // Move to next round
  currentRound++;

  // Check if game ended
  setTimeout(() => {
    checkGameEnd();
  }, 2000); // Delay to show round result
}

// Event listeners
function initializeEventListeners() {
  // Start game button event listener
  if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
      console.log("Start button clicked!");
      startGame();
    });
  }

  // Choice button event listeners
  choiceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const choice = e.currentTarget.dataset.choice;
      playRound(choice);
    });
  });

  // Play again button event listener
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", resetGame);
  }

  // Back to welcome button event listener
  if (backToWelcomeBtn) {
    backToWelcomeBtn.addEventListener("click", returnToWelcome);
  }

  // Keyboard support (optional enhancement)
  document.addEventListener("keydown", (e) => {
    if (gameEnded || welcomeScreen.style.display !== "none") return;

    switch (e.key.toLowerCase()) {
      case "r":
        playRound("rock");
        break;
      case "p":
        playRound("paper");
        break;
      case "s":
        playRound("scissors");
        break;
    }
  });
}

// Initialize the game
function initializeGame() {
  // Debug: Check if elements exist
  console.log("Welcome screen:", welcomeScreen);
  console.log("Game screen:", gameScreen);
  console.log("Start button:", startGameBtn);

  // Start with welcome screen visible, game screen hidden
  if (welcomeScreen) welcomeScreen.style.display = "block";
  if (gameScreen) gameScreen.style.display = "none";

  // Initialize event listeners
  initializeEventListeners();
}

// Start the game when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeGame);

// Additional utility functions for enhanced user experience
function addHoverEffects() {
  choiceButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      if (!button.disabled && !gameEnded) {
        button.style.transform = "translateY(-5px) scale(1.05)";
      }
    });

    button.addEventListener("mouseleave", () => {
      if (!button.disabled && !gameEnded) {
        button.style.transform = "";
      }
    });
  });
}

// Initialize hover effects
document.addEventListener("DOMContentLoaded", addHoverEffects);
