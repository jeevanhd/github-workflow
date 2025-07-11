// ======================================
// ENHANCED ROCK PAPER SCISSORS GAME
// With sound effects, animations, and visual feedback
// ======================================

// Game state variables
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;
let gameEnded = false;
let soundEnabled = true;

// DOM elements
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const startGameBtn = document.getElementById("start-game-btn");
const backToWelcomeBtn = document.getElementById("back-to-welcome-btn");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const currentRoundElement = document.getElementById("current-round");
const progressBar = document.getElementById("progress-bar");
const playerChoiceDisplay = document.getElementById("player-choice-display");
const computerChoiceDisplay = document.getElementById("computer-choice-display");
const roundResultElement = document.getElementById("round-result");
const finalResultElement = document.getElementById("final-result");
const finalMessageElement = document.getElementById("final-message-text");
const finalTrophy = document.getElementById("final-trophy");
const confettiElement = document.getElementById("confetti");
const playAgainBtn = document.getElementById("play-again-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const soundToggle = document.getElementById("sound-toggle");
const battleEffects = document.getElementById("battle-effects");

// Enhanced choice data with visual elements
const choiceData = {
  rock: {
    emoji: "🪨",
    name: "Rock",
    color: "#ff6b6b",
    wins: ["scissors"],
    loses: ["paper"]
  },
  paper: {
    emoji: "📄",
    name: "Paper", 
    color: "#4ecdc4",
    wins: ["rock"],
    loses: ["scissors"]
  },
  scissors: {
    emoji: "✂️",
    name: "Scissors",
    color: "#45b7d1", 
    wins: ["paper"],
    loses: ["rock"]
  }
};

// Sound effects using Web Audio API and synthetic sounds
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Sound generation functions
function createBeep(frequency, duration, type = 'sine') {
  if (!soundEnabled) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function playClickSound() {
  createBeep(800, 0.1, 'square');
}

function playWinSound() {
  createBeep(523, 0.2); // C5
  setTimeout(() => createBeep(659, 0.2), 100); // E5
  setTimeout(() => createBeep(784, 0.3), 200); // G5
}

function playLoseSound() {
  createBeep(400, 0.2);
  setTimeout(() => createBeep(350, 0.2), 100);
  setTimeout(() => createBeep(300, 0.3), 200);
}

function playTieSound() {
  createBeep(500, 0.15);
  setTimeout(() => createBeep(500, 0.15), 150);
}

function playGameStartSound() {
  createBeep(440, 0.1);
  setTimeout(() => createBeep(554, 0.1), 100);
  setTimeout(() => createBeep(659, 0.2), 200);
}

function playGameEndSound() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((note, index) => {
    setTimeout(() => createBeep(note, 0.2), index * 150);
  });
}

// Particle system for visual effects
function createParticles(element, count = 20, color = '#00f5ff') {
  const particles = [];
  const rect = element.getBoundingClientRect();
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      box-shadow: 0 0 10px ${color};
    `;
    
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 2 + Math.random() * 3;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.body.appendChild(particle);
    
    let frame = 0;
    const animate = () => {
      frame++;
      const x = startX + Math.cos(angle) * velocity * frame;
      const y = startY + Math.sin(angle) * velocity * frame - frame * 0.5;
      const opacity = 1 - frame / 60;
      
      if (opacity > 0) {
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(particle);
      }
    };
    
    animate();
  }
}

// Ripple effect for button clicks
function createRipple(event, element) {
  const ripple = element.querySelector('.btn-ripple');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  ripple.style.animation = 'none';
  setTimeout(() => {
    ripple.style.animation = 'ripple 0.6s linear';
  }, 10);
}

// Enhanced game state management
function startGame() {
  console.log("🎮 Starting enhanced game...");
  
  playGameStartSound();
  
  // Smooth transition with animation
  welcomeScreen.classList.add('fade-out');
  
  setTimeout(() => {
    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";
    gameScreen.classList.add('fade-in');
    
    // Initialize the game
    resetGame();
    
    // Staggered animation for choice buttons
    choiceButtons.forEach((btn, index) => {
      btn.style.transform = 'translateY(50px)';
      btn.style.opacity = '0';
      
      setTimeout(() => {
        btn.style.transition = 'all 0.5s ease-out';
        btn.style.transform = 'translateY(0)';
        btn.style.opacity = '1';
      }, index * 100);
    });
    
    // Create initial particles
    createParticles(gameScreen, 15, '#00f5ff');
  }, 300);
}

function returnToWelcome() {
  playClickSound();
  
  gameScreen.classList.add('fade-out');
  
  setTimeout(() => {
    gameScreen.style.display = "none";
    welcomeScreen.style.display = "block";
    welcomeScreen.classList.add('fade-in');
    resetGame();
  }, 300);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  gameEnded = false;
  
  updateDisplay();
  updateProgressBar();
  resetChoiceDisplays();
  
  // Hide final result
  finalResultElement.style.display = "none";
  
  // Reset result message
  roundResultElement.textContent = "Choose your weapon!";
  roundResultElement.className = "result-text";
  
  // Re-enable choice buttons
  choiceButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('selected');
  });
}

// Enhanced computer choice with thinking animation
function getComputerChoice() {
  return new Promise((resolve) => {
    const choices = ["rock", "paper", "scissors"];
    let thinkingFrames = 0;
    const maxThinking = 15;
    
    // Show thinking animation
    computerChoiceDisplay.querySelector('.choice-name').textContent = 'Thinking';
    
    const thinkingInterval = setInterval(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      const choiceIcon = computerChoiceDisplay.querySelector('.choice-icon');
      choiceIcon.textContent = choiceData[randomChoice].emoji;
      
      thinkingFrames++;
      
      if (thinkingFrames >= maxThinking) {
        clearInterval(thinkingInterval);
        const finalChoice = choices[Math.floor(Math.random() * choices.length)];
        resolve(finalChoice);
      }
    }, 100);
  });
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }
  
  if (choiceData[playerChoice].wins.includes(computerChoice)) {
    return "player";
  } else {
    return "computer";
  }
}

function updateDisplay() {
  // Animate score changes
  animateScoreChange(playerScoreElement, playerScore);
  animateScoreChange(computerScoreElement, computerScore);
  
  currentRoundElement.textContent = currentRound;
  updateProgressBar();
}

function animateScoreChange(element, newValue) {
  const currentValue = parseInt(element.textContent);
  
  if (newValue !== currentValue) {
    element.style.transform = 'scale(1.3)';
    element.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      element.textContent = newValue;
      element.style.transform = 'scale(1)';
      
      // Add glow effect
      element.style.textShadow = '0 0 20px var(--neon-green)';
      setTimeout(() => {
        element.style.textShadow = '0 0 15px var(--neon-green)';
      }, 200);
    }, 150);
  }
}

function updateProgressBar() {
  const progress = ((currentRound - 1) / maxRounds) * 100;
  progressBar.style.width = progress + '%';
}

function resetChoiceDisplays() {
  const resetDisplay = (display, defaultIcon, defaultName) => {
    display.querySelector('.choice-icon').textContent = defaultIcon;
    display.querySelector('.choice-name').textContent = defaultName;
    display.className = 'choice-display pulse';
  };
  
  resetDisplay(playerChoiceDisplay, '❓', 'Choose');
  resetDisplay(computerChoiceDisplay, '❓', 'Thinking');
}

function displayChoices(playerChoice, computerChoice) {
  // Player choice with animation
  const playerIcon = playerChoiceDisplay.querySelector('.choice-icon');
  const playerName = playerChoiceDisplay.querySelector('.choice-name');
  playerIcon.textContent = choiceData[playerChoice].emoji;
  playerName.textContent = choiceData[playerChoice].name;
  
  // Computer choice with animation
  const computerIcon = computerChoiceDisplay.querySelector('.choice-icon');
  const computerName = computerChoiceDisplay.querySelector('.choice-name');
  computerIcon.textContent = choiceData[computerChoice].emoji;
  computerName.textContent = choiceData[computerChoice].name;
  
  // Remove pulse animation and add battle effects
  playerChoiceDisplay.classList.remove('pulse');
  computerChoiceDisplay.classList.remove('pulse');
  
  // Trigger battle animation
  setTimeout(() => {
    triggerBattleEffects();
  }, 500);
}

function triggerBattleEffects() {
  // Create sparks in the battle zone
  const sparks = battleEffects.querySelectorAll('.spark');
  sparks.forEach(spark => {
    spark.style.animation = 'none';
    setTimeout(() => {
      spark.style.animation = 'sparkle 0.5s ease-out';
    }, 10);
  });
  
  // Shake choice displays
  playerChoiceDisplay.style.animation = 'shake 0.5s ease-in-out';
  computerChoiceDisplay.style.animation = 'shake 0.5s ease-in-out';
  
  setTimeout(() => {
    playerChoiceDisplay.style.animation = '';
    computerChoiceDisplay.style.animation = '';
  }, 500);
}

// Add shake animation to CSS if not present
if (!document.getElementById('dynamic-styles')) {
  const style = document.createElement('style');
  style.id = 'dynamic-styles';
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-5px); }
      40% { transform: translateX(5px); }
      60% { transform: translateX(-3px); }
      80% { transform: translateX(3px); }
    }
  `;
  document.head.appendChild(style);
}

function showRoundResult(result, playerChoice, computerChoice) {
  let message = "";
  let messageClass = "result-text";
  
  // Reset previous styling
  playerChoiceDisplay.classList.remove("winner", "loser");
  computerChoiceDisplay.classList.remove("winner", "loser");
  
  if (result === "tie") {
    message = "🤝 It's a tie! Great minds think alike!";
    messageClass += " tie";
    playTieSound();
    createParticles(roundResultElement, 10, '#4ecdc4');
  } else if (result === "player") {
    message = `🎉 You win this round! ${getWinMessage(playerChoice, computerChoice)}`;
    messageClass += " win";
    playerChoiceDisplay.classList.add("winner");
    computerChoiceDisplay.classList.add("loser");
    playWinSound();
    createParticles(playerChoiceDisplay, 15, '#00ff88');
    playerScore++;
  } else {
    message = `🤖 AI wins this round! ${getWinMessage(computerChoice, playerChoice)}`;
    messageClass += " lose";
    computerChoiceDisplay.classList.add("winner");
    playerChoiceDisplay.classList.add("loser");
    playLoseSound();
    createParticles(computerChoiceDisplay, 15, '#ff8800');
    computerScore++;
  }
  
  roundResultElement.textContent = message;
  roundResultElement.className = messageClass;
  
  // Animate result text
  roundResultElement.style.transform = 'scale(0.8)';
  roundResultElement.style.opacity = '0';
  
  setTimeout(() => {
    roundResultElement.style.transition = 'all 0.3s ease-out';
    roundResultElement.style.transform = 'scale(1)';
    roundResultElement.style.opacity = '1';
  }, 100);
}

function getWinMessage(winnerChoice, loserChoice) {
  const winMessages = {
    "rock-scissors": "Rock crushes Scissors! 💥",
    "paper-rock": "Paper covers Rock! 📄",
    "scissors-paper": "Scissors cuts Paper! ✂️",
  };
  
  return winMessages[`${winnerChoice}-${loserChoice}`] || "";
}

function checkGameEnd() {
  if (currentRound > maxRounds) {
    gameEnded = true;
    setTimeout(() => {
      showFinalResult();
    }, 1500);
    return true;
  }
  return false;
}

function showFinalResult() {
  let finalMessage = "";
  let trophyIcon = "🏆";
  
  if (playerScore > computerScore) {
    finalMessage = "🎉 VICTORY! You Conquered the AI! 🎉";
    trophyIcon = "👑";
    playGameEndSound();
    createConfetti();
  } else if (computerScore > playerScore) {
    finalMessage = "😤 Defeat! The AI Wins This Time!";
    trophyIcon = "🤖";
    playLoseSound();
  } else {
    finalMessage = "🤝 It's a Tie! Perfectly Balanced!";
    trophyIcon = "⚖️";
    playTieSound();
  }
  
  finalTrophy.textContent = trophyIcon;
  finalMessageElement.textContent = finalMessage;
  
  // Animate final result appearance
  finalResultElement.style.display = "block";
  finalResultElement.classList.add('scale-in');
  
  // Add final score animation
  setTimeout(() => {
    updateDisplay();
  }, 500);
}

function createConfetti() {
  const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
        left: ${Math.random() * window.innerWidth}px;
        top: -10px;
        z-index: 1000;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
      `;
      
      document.body.appendChild(confetti);
      
      let frame = 0;
      const fallSpeed = 2 + Math.random() * 3;
      const sway = Math.random() * 2 - 1;
      
      const animate = () => {
        frame++;
        const x = parseFloat(confetti.style.left) + sway;
        const y = parseFloat(confetti.style.top) + fallSpeed;
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.transform = `rotate(${frame * 3}deg)`;
        
        if (y < window.innerHeight + 20) {
          requestAnimationFrame(animate);
        } else {
          document.body.removeChild(confetti);
        }
      };
      
      animate();
    }, i * 100);
  }
}

// Enhanced choice handling with improved feedback
async function handlePlayerChoice(playerChoice) {
  if (gameEnded) return;
  
  playClickSound();
  
  // Disable all buttons temporarily
  choiceButtons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('selected');
  });
  
  // Highlight selected choice
  const selectedButton = document.querySelector(`[data-choice="${playerChoice}"]`);
  selectedButton.classList.add('selected');
  
  // Update player display immediately
  const playerIcon = playerChoiceDisplay.querySelector('.choice-icon');
  const playerName = playerChoiceDisplay.querySelector('.choice-name');
  playerIcon.textContent = choiceData[playerChoice].emoji;
  playerName.textContent = choiceData[playerChoice].name;
  playerChoiceDisplay.classList.remove('pulse');
  
  // Get computer choice with animation
  const computerChoice = await getComputerChoice();
  
  // Display both choices
  displayChoices(playerChoice, computerChoice);
  
  // Determine winner after a short delay
  setTimeout(() => {
    const result = determineWinner(playerChoice, computerChoice);
    showRoundResult(result, playerChoice, computerChoice);
    
    // Update game state
    currentRound++;
    updateDisplay();
    
    // Check if game is over
    if (!checkGameEnd()) {
      // Re-enable buttons for next round after a delay
      setTimeout(() => {
        choiceButtons.forEach(btn => {
          btn.disabled = false;
          btn.classList.remove('selected');
        });
        resetChoiceDisplays();
        roundResultElement.textContent = "Choose your next move!";
        roundResultElement.className = "result-text";
      }, 2000);
    }
  }, 1000);
}

// Event Listeners with enhanced feedback
document.addEventListener("DOMContentLoaded", function() {
  console.log("🚀 Enhanced Rock Paper Scissors Game Loaded!");
  
  // Initialize particles in background
  setTimeout(() => {
    createParticles(document.body, 5, '#00f5ff');
    setInterval(() => {
      createParticles(document.body, 3, '#bf00ff');
    }, 5000);
  }, 1000);
  
  // Start game button
  startGameBtn?.addEventListener("click", function(e) {
    createRipple(e, this);
    setTimeout(() => startGame(), 100);
  });
  
  // Back to welcome button
  backToWelcomeBtn?.addEventListener("click", function(e) {
    createRipple(e, this);
    setTimeout(() => returnToWelcome(), 100);
  });
  
  // Play again button
  playAgainBtn?.addEventListener("click", function(e) {
    createRipple(e, this);
    setTimeout(() => {
      finalResultElement.style.display = "none";
      resetGame();
    }, 100);
  });
  
  // Choice buttons with enhanced interactions
  choiceButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      if (!this.disabled) {
        createRipple(e, this);
        const choice = this.getAttribute("data-choice");
        setTimeout(() => handlePlayerChoice(choice), 100);
      }
    });
    
    // Add hover sound effects
    button.addEventListener("mouseenter", function() {
      if (!this.disabled && soundEnabled) {
        createBeep(600, 0.05, 'sine');
      }
    });
  });
  
  // Sound toggle functionality
  soundToggle?.addEventListener("click", function() {
    soundEnabled = !soundEnabled;
    this.classList.toggle("muted");
    
    const soundIcon = this.querySelector('.sound-icon');
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
    
    if (soundEnabled) {
      playClickSound();
    }
  });
  
  // Keyboard controls for accessibility
  document.addEventListener("keydown", function(e) {
    if (gameScreen.style.display === "block" && !gameEnded) {
      switch(e.key.toLowerCase()) {
        case 'r':
        case '1':
          if (!document.querySelector('[data-choice="rock"]').disabled) {
            handlePlayerChoice('rock');
          }
          break;
        case 'p':
        case '2':
          if (!document.querySelector('[data-choice="paper"]').disabled) {
            handlePlayerChoice('paper');
          }
          break;
        case 's':
        case '3':
          if (!document.querySelector('[data-choice="scissors"]').disabled) {
            handlePlayerChoice('scissors');
          }
          break;
        case 'm':
          soundToggle.click();
          break;
      }
    }
  });
  
  // Add keyboard hints
  const keyboardHints = document.createElement('div');
  keyboardHints.innerHTML = `
    <div style="position: fixed; bottom: 20px; left: 20px; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 8px; font-size: 12px; color: white; z-index: 1000;">
      <div>Keyboard: R/1=Rock, P/2=Paper, S/3=Scissors, M=Mute</div>
    </div>
  `;
  document.body.appendChild(keyboardHints);
  
  // Auto-hide keyboard hints after 5 seconds
  setTimeout(() => {
    keyboardHints.style.opacity = '0';
    keyboardHints.style.transition = 'opacity 1s ease-out';
    setTimeout(() => {
      keyboardHints.remove();
    }, 1000);
  }, 5000);
});

// Add CSS for winner/loser effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  .choice-display.winner {
    border-color: var(--neon-green) !important;
    box-shadow: 0 0 30px var(--neon-green) !important;
    animation: winnerGlow 0.6s ease-in-out !important;
  }
  
  .choice-display.loser {
    border-color: var(--neon-orange) !important;
    box-shadow: 0 0 20px var(--neon-orange) !important;
    animation: loserFade 0.6s ease-in-out !important;
  }
  
  @keyframes winnerGlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes loserFade {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;
document.head.appendChild(additionalStyles);

console.log("🎮 Enhanced Rock Paper Scissors - Ready to play!");
console.log("🎵 Sound effects enabled");
console.log("✨ Visual effects loaded");
console.log("⌨️ Keyboard controls: R/1=Rock, P/2=Paper, S/3=Scissors, M=Mute");
