# Debugging Experience Review

## What the bug was and what you were trying to do

During the development of my Whack-a-Mole game project, I encountered a critical bug where the game scoring system was not working correctly. The issue was that when players clicked on a mole, sometimes the score would increment multiple times for a single click, or worse, wouldn't increment at all. I was trying to implement a reliable scoring mechanism where each successful mole "whack" would add exactly 10 points to the player's score, with proper feedback and smooth gameplay experience.

The game was supposed to randomly display moles in different holes for a limited time, and players needed to click on them before they disappeared. However, the erratic scoring behavior was making the game frustrating and unreliable, essentially breaking the core gameplay loop.

## Initial observations and failed attempts

My first observation was that the bug seemed inconsistent - sometimes clicking worked perfectly, other times it didn't register at all, and occasionally it would register multiple clicks. Initially, I suspected it was a timing issue with the mole display/hide animations.

My failed attempts included:

- **First attempt**: I thought it was a CSS animation conflict, so I tried adjusting the transition timings and z-index values. This didn't solve the problem.
- **Second attempt**: I suspected event propagation issues, so I added `event.preventDefault()` and `event.stopPropagation()` to various click handlers, but the scoring remained unreliable.
- **Third attempt**: I tried adding delays with `setTimeout()` thinking it was a race condition, but this only made the game feel sluggish without fixing the core issue.

## Debugging methods used

I employed several debugging techniques to track down this issue:

**Console logging**: I added extensive `console.log()` statements throughout my click handlers and scoring functions to trace the execution flow. This helped me see that click events were sometimes firing multiple times.

**Breakpoints in DevTools**: I set breakpoints in the browser's developer tools within the scoring function to step through the code line by line. This revealed that the event listener was being attached multiple times to the same mole element.

**Rubber ducking**: I explained the problem out loud to myself (and my cat), walking through each part of the game logic. This helped me realize that my mole generation function was potentially adding multiple event listeners to the same element.

**DOM inspection**: I used the browser's Elements panel to inspect the mole elements and discovered that some moles had multiple click event listeners attached.

**Isolation testing**: I created a minimal test version with just one mole and basic click detection to isolate the problem from the rest of the game logic.

## How you found and fixed the issue

The breakthrough came when I used the console logging combined with DOM inspection. I discovered that my `generateMole()` function was being called multiple times rapidly during certain game states, and each call was adding a new event listener to mole elements without removing the previous ones.

The root cause was in my game loop logic:

```javascript
// Problematic code
function generateMole() {
  const mole = document.querySelector(".mole");
  mole.addEventListener("click", handleMoleClick); // Adding multiple listeners!
  // ... rest of mole generation logic
}
```

The fix involved two key changes:

1. **Removing existing listeners before adding new ones**:

```javascript
function generateMole() {
  const mole = document.querySelector(".mole");
  mole.removeEventListener("click", handleMoleClick); // Remove first
  mole.addEventListener("click", handleMoleClick); // Then add
  // ... rest of logic
}
```

1. **Adding a flag to prevent multiple score increments**:

```javascript
function handleMoleClick(event) {
  if (event.target.classList.contains("clicked")) return; // Prevent double-clicking
  event.target.classList.add("clicked");
  updateScore(10);
  // ... rest of click handling
}
```

## What you learned from the experience

This debugging experience taught me several valuable lessons:

**Event listener management is crucial**: I learned the importance of properly managing event listeners in dynamic web applications. Adding listeners without removing previous ones is a common source of bugs and memory leaks.

**Systematic debugging pays off**: While my initial attempts were somewhat random, the systematic approach using console logs and breakpoints was much more effective. I learned to follow the data flow rather than making assumptions about where the problem might be.

**The power of isolation**: Creating a minimal test case helped me focus on the specific problem without getting distracted by other game features. This is a technique I now use regularly.

**DOM state awareness**: I gained a deeper understanding of how DOM elements maintain state and how JavaScript interactions can create unexpected side effects when not properly managed.

**Documentation and commenting**: This experience made me realize the importance of commenting code, especially around event handling and state management, to make future debugging easier.

The most important takeaway was that debugging is not just about fixing the immediate problem, but understanding the underlying cause to prevent similar issues in the future. This bug taught me to think more carefully about the lifecycle of DOM elements and event handlers in dynamic web applications.
