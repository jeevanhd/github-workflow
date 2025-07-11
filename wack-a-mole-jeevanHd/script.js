class WhackAMoleGame {
  constructor() {
    // Game state
    this.score = 0;
    this.timeLeft = 30;
    this.level = 1;
    this.isGameActive = false;
    this.currentMole = null;
    this.currentBomb = null;
    this.moleTimeout = null;
    this.bombTimeout = null;
    this.gameTimer = null;
    this.difficultyTimer = null;
    this.moleAppearInterval = 2500; // Start with 2.5 seconds - slower pace
    this.hits = 0;
    this.totalClicks = 0;

    // DOM elements
    this.welcomeScreen = document.getElementById("welcome-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.startGameBtn = document.getElementById("start-game-btn");
    this.scoreElement = document.getElementById("score");
    this.timerElement = document.getElementById("timer");
    this.levelElement = document.getElementById("level");
    this.startBtn = document.getElementById("startBtn");
    this.restartBtn = document.getElementById("restartBtn");
    this.gameBoard = document.getElementById("gameBoard");
    this.feedback = document.getElementById("feedback");
    this.gameOverModal = document.getElementById("gameOverModal");
    this.playAgainBtn = document.getElementById("playAgainBtn");
    this.homeScreenBtn = document.getElementById("homeScreenBtn");
    this.holes = document.querySelectorAll(".hole");
    this.moles = document.querySelectorAll(".mole");
    this.bombs = document.querySelectorAll(".bomb");

    this.initializeGame();
  }

  initializeGame() {
    // Add event listeners
    this.startGameBtn.addEventListener("click", () => this.showGameScreen());
    this.startBtn.addEventListener("click", () => this.startGame());
    this.restartBtn.addEventListener("click", () => this.restartGame());
    this.playAgainBtn.addEventListener("click", () => this.playAgain());
    this.homeScreenBtn.addEventListener("click", () => this.goToHomeScreen());

    // Add click listeners to holes for whacking moles and bombs
    this.holes.forEach((hole, index) => {
      hole.addEventListener("click", (e) => this.handleHoleClick(index, e));
    });

    // Prevent context menu on right click
    this.gameBoard.addEventListener("contextmenu", (e) => e.preventDefault());

    // Add touch support for mobile
    this.holes.forEach((hole, index) => {
      hole.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.handleHoleClick(index, e);
      });
    });
  }

  showGameScreen() {
    this.welcomeScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.startBtn.style.display = "inline-block";
  }

  startGame() {
    this.isGameActive = true;
    this.score = 0;
    this.timeLeft = 30;
    this.level = 1;
    this.hits = 0;
    this.totalClicks = 0;
    this.moleAppearInterval = 2500; // Start slower - 2.5 seconds between appearances
    this.currentMole = null;
    this.currentBomb = null;

    this.updateDisplay();
    this.startBtn.style.display = "none";
    this.restartBtn.style.display = "inline-block";

    // Start the game timer
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();

      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    // Start difficulty progression (increase speed every 15 seconds - more manageable)
    this.difficultyTimer = setInterval(() => {
      if (this.isGameActive) {
        this.increaseDifficulty();
      }
    }, 15000);

    // Start showing moles
    this.showMole();
    this.showFeedback("Game Started! 🎮", "hit");
  }

  restartGame() {
    this.clearTimers();
    this.hideMole();
    this.hideBomb();
    this.startGame();
    this.showFeedback("Game Restarted! 🔄", "hit");
  }

  endGame() {
    this.isGameActive = false;
    this.clearTimers();
    this.hideMole();
    this.hideBomb();
    this.showGameOverModal();
  }

  playAgain() {
    this.gameOverModal.style.display = "none";
    this.restartGame();
  }

  goToHomeScreen() {
    this.gameOverModal.style.display = "none";
    this.gameScreen.style.display = "none";
    this.welcomeScreen.style.display = "block";

    // Reset game state
    this.clearTimers();
    this.hideMole();
    this.hideBomb();
    this.isGameActive = false;

    // Reset UI buttons
    this.startBtn.style.display = "none";
    this.restartBtn.style.display = "none";

    // Reset game values for clean start
    this.score = 0;
    this.timeLeft = 30;
    this.level = 1;
    this.hits = 0;
    this.totalClicks = 0;
    this.currentMole = null;
    this.currentBomb = null;
    this.moleAppearInterval = 2500;
  }

  handleHoleClick(holeIndex, event) {
    if (!this.isGameActive) return;

    this.totalClicks++;

    // Check if it's a bomb click
    if (this.currentBomb === holeIndex) {
      this.explodeBomb(holeIndex);
      return;
    }

    // Check if it's a mole click
    if (this.currentMole === holeIndex) {
      this.whackMole(holeIndex, event);
      return;
    }

    // Miss - neither mole nor bomb
    this.showFeedback("Try Again! 🎯", "miss");

    // Add hole click animation
    const hole = document.querySelector(`[data-index="${holeIndex}"]`);
    hole.style.transform = "scale(0.95)";
    setTimeout(() => {
      hole.style.transform = "";
    }, 100);

    this.updateDisplay();
  }

  explodeBomb(holeIndex) {
    // Bomb explosion penalty
    const penalty = 20 * this.level;
    this.score = Math.max(0, this.score - penalty); // Don't go below 0

    const bomb = document.getElementById(`bomb-${holeIndex}`);

    // Add explosion animation
    bomb.classList.add("explode");
    setTimeout(() => {
      bomb.classList.remove("explode", "show");
    }, 600);

    this.currentBomb = null;
    clearTimeout(this.bombTimeout);

    // Show bomb feedback
    this.showFeedback(`💥 BOMB! -${penalty} points!`, "miss");
    this.addScreenShake();

    this.updateDisplay();
  }

  showMole() {
    if (!this.isGameActive) return;

    // Hide current mole and bomb if any
    this.hideMole();
    this.hideBomb();

    // Decide whether to show mole or bomb (bombs only from level 2+)
    const shouldShowBomb = this.level >= 2 && Math.random() < 0.4; // 40% chance for bomb at level 2+

    if (shouldShowBomb) {
      this.showBomb();
    } else {
      // Choose random hole for mole
      const randomHole = Math.floor(Math.random() * 9);
      this.currentMole = randomHole;

      // Show mole with animation
      const mole = document.getElementById(`mole-${randomHole}`);
      mole.classList.add("show");

      // Set timeout to hide mole (difficulty based) - longer duration
      const showDuration = Math.max(1500, this.moleAppearInterval - 300);
      this.moleTimeout = setTimeout(() => {
        if (this.currentMole === randomHole) {
          this.hideMole();
          this.showFeedback("Missed! 😅", "miss");
        }
      }, showDuration);
    }

    // Schedule next appearance
    setTimeout(() => {
      if (this.isGameActive) {
        this.showMole();
      }
    }, this.moleAppearInterval);
  }

  showBomb() {
    // Choose random hole for bomb
    const randomHole = Math.floor(Math.random() * 9);
    this.currentBomb = randomHole;

    // Show bomb with animation
    const bomb = document.getElementById(`bomb-${randomHole}`);
    bomb.classList.add("show");

    // Set timeout to hide bomb - bombs now stay longer than moles
    const showDuration = Math.max(2000, this.moleAppearInterval);
    this.bombTimeout = setTimeout(() => {
      if (this.currentBomb === randomHole) {
        this.hideBomb();
      }
    }, showDuration);
  }

  hideMole() {
    if (this.currentMole !== null) {
      const mole = document.getElementById(`mole-${this.currentMole}`);
      mole.classList.remove("show");
      this.currentMole = null;
    }
    if (this.moleTimeout) {
      clearTimeout(this.moleTimeout);
      this.moleTimeout = null;
    }
  }

  hideBomb() {
    if (this.currentBomb !== null) {
      const bomb = document.getElementById(`bomb-${this.currentBomb}`);
      bomb.classList.remove("show");
      this.currentBomb = null;
    }
    if (this.bombTimeout) {
      clearTimeout(this.bombTimeout);
      this.bombTimeout = null;
    }
  }

  whackMole(holeIndex, event) {
    // Hit!
    this.hits++;
    this.score += 10 * this.level; // Score increases with level
    const mole = document.getElementById(`mole-${holeIndex}`);

    // Add hit animation
    mole.classList.add("hit");
    setTimeout(() => {
      mole.classList.remove("hit", "show");
    }, 400);

    this.currentMole = null;
    clearTimeout(this.moleTimeout);

    // Show hit feedback
    const hitMessages = [
      "Great Hit! 🎯",
      "Awesome! 💥",
      "Perfect! ⭐",
      "Excellent! 🔥",
    ];
    const randomMessage =
      hitMessages[Math.floor(Math.random() * hitMessages.length)];
    this.showFeedback(`${randomMessage} +${10 * this.level}`, "hit");

    // Add screen shake effect for satisfying feedback
    this.addScreenShake();

    this.updateDisplay();
  }

  increaseDifficulty() {
    this.level++;
    this.moleAppearInterval = Math.max(1000, this.moleAppearInterval - 100); // Minimum 1000ms, slower decrease

    if (this.level === 2) {
      this.showFeedback(`Level ${this.level}! Watch out for bombs! 💣`, "hit");
    } else {
      this.showFeedback(`Level ${this.level}! Faster moles! ⚡`, "hit");
    }

    // Add level up animation
    this.levelElement.style.transform = "scale(1.3)";
    this.levelElement.style.color = "#ff6b6b";
    setTimeout(() => {
      this.levelElement.style.transform = "";
      this.levelElement.style.color = "";
    }, 500);
  }

  addScreenShake() {
    const container = document.querySelector(".container");
    container.style.animation = "shake 0.3s ease-in-out";
    setTimeout(() => {
      container.style.animation = "";
    }, 300);

    // Add shake keyframes if not already present
    if (!document.querySelector("#shake-keyframes")) {
      const style = document.createElement("style");
      style.id = "shake-keyframes";
      style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
            `;
      document.head.appendChild(style);
    }
  }

  showFeedback(message, type) {
    this.feedback.textContent = message;
    this.feedback.className = `feedback ${type}`;

    setTimeout(() => {
      this.feedback.textContent = "";
      this.feedback.className = "feedback";
    }, 1500);
  }

  showGameOverModal() {
    const accuracy =
      this.totalClicks > 0
        ? Math.round((this.hits / this.totalClicks) * 100)
        : 0;

    document.getElementById("finalScore").textContent = this.score;
    document.getElementById("finalLevel").textContent = this.level;
    document.getElementById("accuracy").textContent = accuracy + "%";

    this.gameOverModal.style.display = "flex";

    // Add celebration effect if high score
    if (this.score > 200) {
      this.addCelebrationEffect();
    }
  }

  addCelebrationEffect() {
    const modalContent = document.querySelector(".modal-content");
    modalContent.style.animation = "celebration 1s ease-in-out";

    // Add celebration keyframes if not already present
    if (!document.querySelector("#celebration-keyframes")) {
      const style = document.createElement("style");
      style.id = "celebration-keyframes";
      style.textContent = `
                @keyframes celebration {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(1.05) rotate(1deg); }
                    50% { transform: scale(1.1) rotate(-1deg); }
                    75% { transform: scale(1.05) rotate(1deg); }
                }
            `;
      document.head.appendChild(style);
    }
  }

  updateDisplay() {
    this.scoreElement.textContent = this.score;
    this.timerElement.textContent = this.timeLeft;
    this.levelElement.textContent = this.level;

    // Add warning color when time is low
    if (this.timeLeft <= 10) {
      this.timerElement.style.color = "#e74c3c";
      this.timerElement.style.animation = "pulse 1s infinite";
    } else {
      this.timerElement.style.color = "";
      this.timerElement.style.animation = "";
    }

    // Add pulse keyframes if not already present
    if (!document.querySelector("#pulse-keyframes")) {
      const style = document.createElement("style");
      style.id = "pulse-keyframes";
      style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `;
      document.head.appendChild(style);
    }
  }

  clearTimers() {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    if (this.difficultyTimer) {
      clearInterval(this.difficultyTimer);
      this.difficultyTimer = null;
    }
    if (this.moleTimeout) {
      clearTimeout(this.moleTimeout);
      this.moleTimeout = null;
    }
    if (this.bombTimeout) {
      clearTimeout(this.bombTimeout);
      this.bombTimeout = null;
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WhackAMoleGame();
});

// Add keyboard support for accessibility
document.addEventListener("keydown", (e) => {
  // Press spacebar to start/restart game
  if (e.code === "Space") {
    e.preventDefault();
    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");

    if (startBtn.style.display !== "none") {
      startBtn.click();
    } else if (restartBtn.style.display !== "none") {
      restartBtn.click();
    }
  }

  // Press numbers 1-9 to whack moles in corresponding holes
  if (e.code >= "Digit1" && e.code <= "Digit9") {
    const holeIndex = parseInt(e.code.slice(-1)) - 1;
    const hole = document.querySelector(`[data-index="${holeIndex}"]`);
    if (hole) {
      hole.click();
    }
  }
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (e) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
