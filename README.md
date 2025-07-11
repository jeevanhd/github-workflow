# github-workflow

## Project Overview

### Livebooks: Workverse – Code, Create, Conquer

This repository contains materials and instructions for **Project Sprint #1 – Coding with AI**.

---

## 1. Project Scope

**Main Goal:** Our team is building a Mini Game Arcade using HTML, CSS, and JavaScript. The main objective is to deliver a collection of simple, browser-based games that are both fun and user-friendly, all accessible through a central landing page.

**Key Features / Deliverables:**

- A clean, responsive landing page with links to all games.
- At least two fully functional games like Rock Paper Scissors and Tic Tac Toe.
- Each game will have a consistent UI/UX, with smooth navigation.
- A scoreboard or result display integrated into each game.
- Fully responsive design compatible with both desktop and mobile devices.

**Out of Scope (Currently):**

- Persistent data storage (e.g., saving scores after the session ends).
- User accounts or login systems.
- Multiplayer or online real-time gameplay features.

---

## 2. Milestones and Timeline

- **Sprint Kickoff:**
  - Finalize game ideas and divide roles based on skills.
  - Set up a shared GitHub repository with folders for each component (landing page, games, shared styles, etc.).
- **By “Game Structure with Copilot” Session:**
  - Use GitHub Copilot to help build logic for one game (e.g., Rock Paper Scissors).
  - Begin implementing the basic layout for the landing page.
  - Decide on a shared design language (colors, fonts, layout structure).
- **By “Mid-Sprint Demo + Feedback” Session:**
  - Have two games functional, with interactive elements and basic CSS.
  - Complete navigation between the landing page and games.
  - Run internal testing, gather feedback, and make initial bug fixes.
- **By Sprint End:**
  - Deploy final version using GitHub Pages or Netlify.
  - Ensure games are fully tested, styled, and responsive.
  - Optionally add a third game (e.g., Whack-a-Mole) if time allows.
  - Prepare short documentation and walkthrough for presentation.

---

## 3. Team Roles and Responsibilities

- **My Role:**
  - Design and develop the landing page, acting as the hub for the entire arcade.
  - Ensure all games are integrated smoothly and that navigation works as expected.
  - Contribute to styling consistency across all pages and manage transitions.
- **Other Team Members:**
  - **Varsha:** Build the Rock Paper Scissors game; lead UI styling shared across games.
  - **Jessica:** Develop Tic Tac Toe; ensure mobile responsiveness for all components.
  - **Tejas:** Build Whack-a-Mole; assist with logic debugging and shared JavaScript functions.
- **Collaboration and Communication:**
  - Fixed roles, but with flexibility to help others when needed.
  - Short daily sync-ups (standups) to track progress and resolve blockers.
  - Use GitHub PRs, branching, and a WhatsApp group for smooth collaboration and quick feedback.

---

## 4. Anticipated Challenges and Strategies

**Expected Challenges:**

- Merging different coding styles into a cohesive, consistent experience.
- Managing time effectively within the sprint.
- Testing and debugging games across various screen sizes and devices.

**Planned Strategies to Manage Them:**

- Follow a shared code style and naming convention from the beginning.
- Use modular components for reusable code (like buttons, modals, etc.).
- Conduct frequent testing after each commit to avoid bugs piling up.
- Provide peer support during blockers, especially in game logic or styling.
- Maintain a clean GitHub workflow using branches and PR reviews to avoid merge conflicts.

---

## Progress Updates

## Progress Update 1

### ✅ Game Structure with Copilot - COMPLETED

**Date:** July 8, 2025

**Accomplished:**

- **Rock Paper Scissors Game - FULLY IMPLEMENTED** 🎮
  - Built complete game from scratch using HTML, CSS, and JavaScript
  - Implemented welcome screen with game rules and start button
  - Created 5-round gameplay system with score tracking
  - Added visual feedback with winner/loser highlighting
  - Included proper game flow: Welcome → Game → Results → Play Again/Menu
  - Responsive design that works on desktop and mobile
  - Keyboard controls (R, P, S) for enhanced accessibility
  - Modern UI with gradient backgrounds and smooth animations

**Technical Implementation:**

- **HTML Structure:** Semantic layout with welcome screen and game screen
- **CSS Styling:** Modern design with glassmorphism effects, responsive grid, hover animations
- **JavaScript Logic:** Event-driven game mechanics, state management, DOM manipulation
- **User Experience:** Smooth transitions, visual feedback, multiple game end options

**Files Created:**

- `rock-paper-scissors-jeevanHd/index.html` - Main game structure
- `rock-paper-scissors-jeevanHd/styles.css` - Complete responsive styling
- `rock-paper-scissors-jeevanHd/script.js` - Full game logic and interactions

**Key Features Delivered:**

- ✅ Welcome screen with start button functionality
- ✅ 5-round game progression with round counter
- ✅ Real-time score tracking (Player vs Computer)
- ✅ Visual choice display with emojis
- ✅ Round-by-round result messages with game rules explanation
- ✅ Final game results with multiple end messages
- ✅ Play Again and Back to Menu options
- ✅ Fully responsive design for all device sizes
- ✅ Smooth animations and hover effects
- ✅ Keyboard accessibility support

**Assignment Requirements Met:**

- ✅ No external frameworks used (pure HTML/CSS/JS)
- ✅ All DOM updates via JavaScript EventListeners
- ✅ Clean, readable, and well-commented code
- ✅ Complete game logic implemented from scratch
- ✅ GitHub Copilot used for suggestions and guidance

**Next Steps:**

- Ready for integration with main arcade landing page
- Game can be linked from central hub
- Consistent styling foundation established for other games

---

## Progress Update 2

### ✅ Whack-a-Mole Game - FULLY IMPLEMENTED

**Date:** July 8, 2025

**Accomplished:**

- **Whack-a-Mole Game - COMPLETE WITH ADVANCED FEATURES** 🔨
  - Built complete interactive game with welcome screen and game mechanics
  - Implemented progressive difficulty system with 15-second level increases
  - Added bomb system starting at Level 2 with penalty mechanics
  - Created comprehensive game over modal with statistics
  - Included home screen navigation and play again functionality
  - Responsive design optimized for desktop, tablet, and mobile
  - Advanced animations and visual feedback systems
  - Keyboard accessibility with number keys (1-9) and spacebar controls

**Technical Implementation:**

- **HTML Structure:** Multi-screen layout with welcome, game, and modal screens
- **CSS Styling:** Modern design with CSS Grid, animations, and responsive breakpoints
- **JavaScript Logic:** Object-oriented game class with comprehensive state management
- **Game Mechanics:** Timer system, difficulty progression, bomb logic, and scoring

**Files Created:**

- `wack-a-mole-jeevanHd/index.html` - Complete game structure with welcome screen
- `wack-a-mole-jeevanHd/styles.css` - Advanced responsive styling with animations
- `wack-a-mole-jeevanHd/script.js` - Full game logic with WhackAMoleGame class
- `wack-a-mole-jeevanHd/README.md` - Comprehensive documentation

**Advanced Features Delivered:**

**Core Gameplay:**

- ✅ 3x3 interactive game board with hole animations
- ✅ Random mole appearances with hamster emoji (🐹)
- ✅ 30-second game timer with countdown
- ✅ Progressive difficulty every 15 seconds (slower, more manageable pace)
- ✅ Real-time score tracking with level multipliers
- ✅ Accuracy percentage calculation

**Bomb System:**

- ✅ Dangerous bombs (💣) appear starting at Level 2
- ✅ 40% bomb appearance chance at higher levels
- ✅ Bombs stay visible longer than moles for better recognition
- ✅ Score penalty system: -20 × current level points
- ✅ Explosive animation effects with screen shake

**User Interface:**

- ✅ Professional welcome screen with game rules
- ✅ Game over modal with comprehensive statistics
- ✅ Home screen button for navigation back to welcome
- ✅ Play again functionality for immediate restart
- ✅ Real-time feedback with animated messages

**Technical Excellence:**

- ✅ Object-oriented JavaScript architecture
- ✅ Comprehensive timer and state management
- ✅ Memory cleanup and proper resource handling
- ✅ Event delegation and touch optimization
- ✅ CSS hardware acceleration for smooth animations
- ✅ Mobile-first responsive design

**Game Balance & Timing:**

- ✅ Initial speed: 2.5 seconds between appearances
- ✅ Mole visibility: 1.5-2.2 seconds (difficulty-based)
- ✅ Bomb visibility: 2+ seconds (longer than moles)
- ✅ Level progression: Every 15 seconds (manageable difficulty curve)
- ✅ Minimum speed: 1 second (prevents game from becoming impossible)

**Visual & Audio Feedback:**

- ✅ Screen shake effects on hits and bomb explosions
- ✅ Color-coded feedback (green for hits, red for misses/bombs)
- ✅ Smooth pop-up animations with bounce effects
- ✅ Level-up animations with scaling and color changes
- ✅ Timer warning with pulse animation at 10 seconds

**Accessibility Features:**

- ✅ Keyboard controls (spacebar for start/restart, 1-9 for holes)
- ✅ Touch optimization with prevent double-tap zoom
- ✅ High contrast colors and readable fonts
- ✅ Semantic HTML structure
- ✅ Responsive text sizing

**Assignment Requirements Met:**

- ✅ Pure vanilla HTML/CSS/JavaScript (no frameworks)
- ✅ Advanced DOM manipulation and event handling
- ✅ Clean, modular, object-oriented code architecture
- ✅ Comprehensive game logic with multiple mechanics
- ✅ GitHub Copilot utilized for iterative development
- ✅ Mobile-responsive design with multiple breakpoints
- ✅ Professional documentation and code comments

**Innovative Features Beyond Requirements:**

- Comprehensive game over statistics (accuracy, speed, score breakdown)
- Progressive difficulty with timed levels and bomb penalties
- Advanced animations for game actions (hits, misses, level ups)
- Responsive design with mobile-first approach and touch optimization
- Keyboard accessibility with number and spacebar controls
- High contrast and readable fonts/colors for visibility
- Semantic HTML for all structures, ensuring proper accessibility
- Detailed README documentation with game rules and development insights

---

## 6. Team Progress Tracker

| Game                | Developer | Status         | Completion Date |
| ------------------- | --------- | -------------- | --------------- |
| Rock Paper Scissors | Jeeva     | ✅ COMPLETE    | July 8, 2025    |
| Whack-a-Mole        | Jeeva     | ✅ COMPLETE    | July 8, 2025    |
| Tic Tac Toe         | Jessica   | 🔄 In Progress | TBD             |
| Landing Page        | Team Lead | 📋 Planned     | TBD             |

---

## 🎮 Games Completed Summary

### 1. Rock Paper Scissors ✅

- **Status:** Production Ready
- **Features:** Welcome screen, 5-round gameplay, responsive design
- **Location:** `rock-paper-scissors-jeevanHd/`

### 2. Whack-a-Mole ✅

- **Status:** Production Ready
- **Features:** Progressive difficulty, bomb system, comprehensive statistics
- **Location:** `wack-a-mole-jeevanHd/`

**Total Games Completed:** 2/3 (66% of planned arcade games)  
**Sprint Progress:** Ahead of schedule with advanced features implemented
