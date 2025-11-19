# Developer Guide

Technical documentation for developers working with the Tic-Tac-Toe game codebase.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Code Organization](#code-organization)
- [HTML Structure](#html-structure)
- [CSS Architecture](#css-architecture)
- [JavaScript Implementation](#javascript-implementation)
- [Event System](#event-system)
- [State Management](#state-management)
- [Adding New Features](#adding-new-features)
- [Testing](#testing)
- [Performance Optimization](#performance-optimization)
- [Best Practices](#best-practices)

---

## Architecture Overview

### Design Philosophy

The game follows these architectural principles:

1. **Separation of Concerns**: HTML (structure), CSS (presentation), JavaScript (behavior)
2. **Object-Oriented Design**: Single class encapsulating all game logic
3. **Event-Driven Architecture**: User interactions drive state changes
4. **Declarative UI**: State changes automatically update UI
5. **Progressive Enhancement**: Core functionality works without JavaScript enhancements

### Technology Stack

```
┌─────────────────────────────────┐
│         User Interface          │
│  (HTML5 + CSS3 + Vanilla JS)   │
├─────────────────────────────────┤
│       TicTacToeGame Class       │
│    (ES6 Class-based OOP)       │
├─────────────────────────────────┤
│        DOM Manipulation         │
│   (Native DOM APIs + Events)   │
├─────────────────────────────────┤
│          Browser APIs           │
│  (localStorage, setTimeout)    │
└─────────────────────────────────┘
```

### Component Architecture

```
Application Root
│
├── HTML Structure (index.html)
│   ├── Container
│   ├── Game Info (status display)
│   ├── Game Board (3x3 grid)
│   ├── Controls (reset button)
│   └── Scoreboard
│
├── Styling (styles.css)
│   ├── Layout (Flexbox/Grid)
│   ├── Visual Design (Glassmorphism)
│   ├── Animations (CSS Transitions)
│   └── Responsive (Media Queries)
│
└── Game Logic (script.js)
    ├── TicTacToeGame Class
    │   ├── State Management
    │   ├── Game Logic
    │   ├── UI Updates
    │   └── Event Handlers
    └── Global Initialization
```

---

## Project Structure

### File Organization

```
demos-tic-tac-toe/
│
├── index.html              # Main HTML file (entry point)
├── styles.css              # All CSS styling
├── script.js               # Game logic and JavaScript
│
├── README.md               # Project documentation
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
├── CHANGELOG.md            # Version history
│
└── docs/                   # Documentation directory
    ├── api.md              # API reference
    ├── user-guide.md       # User documentation
    ├── developer-guide.md  # This file
    ├── deployment.md       # Deployment guide
    ├── customization.md    # Customization guide
    └── accessibility.md    # Accessibility docs
```

### File Dependencies

```
index.html
  ├── requires: styles.css (linked)
  └── requires: script.js (loaded at end of body)

styles.css
  └── standalone (no dependencies)

script.js
  ├── requires: index.html (DOM elements)
  └── requires: modern browser (ES6+ support)
```

---

## Code Organization

### HTML Structure

**Philosophy**: Semantic, accessible markup with minimal classes

```html
<!-- Semantic container structure -->
<div class="container">          <!-- Main wrapper -->
  <h1>Tic Tac Toe</h1>            <!-- Semantic heading -->
  
  <div class="game-info">         <!-- Status section -->
    <div id="game-status">...</div>
  </div>
  
  <div class="game-board">        <!-- Game grid -->
    <div class="cell" data-index="0"></div>
    <!-- 8 more cells... -->
  </div>
  
  <div class="game-controls">     <!-- Actions -->
    <button id="reset-button">...</button>
  </div>
  
  <div class="score-board">       <!-- Scoring -->
    <!-- Score displays... -->
  </div>
</div>
```

**Key Patterns**:
- **IDs** for unique elements (game-status, reset-button)
- **Classes** for styled groups (cell, score)
- **Data attributes** for JavaScript interaction (data-index)
- **Semantic HTML5** elements where appropriate

### CSS Structure

**Organization**: Top-down from global to specific

```css
/* 1. CSS Reset */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 2. Global Styles */
body { /* ... */ }

/* 3. Layout Components */
.container { /* ... */ }

/* 4. Game Elements */
.game-board { /* ... */ }
.cell { /* ... */ }

/* 5. Interactive States */
.cell:hover { /* ... */ }
.cell.winning-cell { /* ... */ }

/* 6. Animations */
@keyframes pulse { /* ... */ }

/* 7. Responsive Design */
@media (max-width: 480px) { /* ... */ }
```

### JavaScript Structure

**Organization**: Class-based with clear method grouping

```javascript
// 1. Class Definition
class TicTacToeGame {
  // 2. Constructor (initialization)
  constructor() { /* ... */ }
  
  // 3. Setup Methods
  initializeGame() { /* ... */ }
  
  // 4. Event Handlers
  handleCellClick(event) { /* ... */ }
  
  // 5. Game Logic
  makeMove(index, cell) { /* ... */ }
  checkWin() { /* ... */ }
  checkDraw() { /* ... */ }
  
  // 6. UI Update Methods
  updateGameStatus(message) { /* ... */ }
  updateScoreBoard() { /* ... */ }
  
  // 7. State Management
  getGameState() { /* ... */ }
  setGameState(state) { /* ... */ }
}

// 8. Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize game
  // Setup global event listeners
});
```

---

## HTML Structure

### Semantic Elements

```html
<!-- Proper heading hierarchy -->
<h1>Tic Tac Toe</h1>              <!-- Main heading (h1) -->

<!-- Interactive elements -->
<button id="reset-button">...</button>  <!-- Not <div> styled as button -->

<!-- Meaningful structure -->
<div class="score">
  <span>Player X: </span>         <!-- Label -->
  <span id="score-x">0</span>     <!-- Value -->
</div>
```

### Data Attributes

Used for JavaScript interaction without polluting classes:

```html
<div class="cell" data-index="0"></div>
<div class="cell" data-index="1"></div>
<!-- ... -->
```

**Usage in JavaScript**:
```javascript
const cellIndex = parseInt(cell.getAttribute('data-index'));
```

### Accessibility Considerations

```html
<!-- Proper language attribute -->
<html lang="en">

<!-- Viewport for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Semantic and descriptive -->
<button id="reset-button">Reset Game</button>  <!-- Clear label -->
```

---

## CSS Architecture

### Design System

#### Color Palette

```css
/* Primary Colors */
--gradient-start: #667eea;     /* Purple-blue */
--gradient-end: #764ba2;       /* Deep purple */

/* Player Colors */
--player-x-color: #ff6b6b;     /* Red for X */
--player-o-color: #4ecdc4;     /* Teal for O */

/* Accent Colors */
--winning-color: #ffd700;      /* Gold for wins */
--reset-start: #ff6b6b;        /* Red gradient start */
--reset-end: #ee5a24;          /* Orange gradient end */
```

#### Spacing System

```css
/* Consistent spacing scale */
--space-xs: 0.3rem;   /* 4.8px */
--space-sm: 0.8rem;   /* 12.8px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
```

### Layout Techniques

#### Glassmorphism Effect

```css
.container {
  background: rgba(255, 255, 255, 0.1);  /* Semi-transparent */
  backdrop-filter: blur(10px);            /* Blur background */
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}
```

#### Grid Layout

```css
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-gap: 10px;                          /* Space between cells */
}
```

#### Flexbox Centering

```css
body {
  display: flex;
  justify-content: center;  /* Horizontal center */
  align-items: center;      /* Vertical center */
  min-height: 100vh;        /* Full viewport height */
}
```

### Animation System

#### CSS Transitions

```css
.cell {
  transition: all 0.3s ease;  /* Smooth state changes */
}

.cell:hover {
  transform: scale(1.05);     /* Grow on hover */
}
```

#### Keyframe Animations

```css
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.cell.winning-cell {
  animation: pulse 1s infinite;  /* Apply animation */
}
```

#### JavaScript-Triggered Animations

```javascript
// Scale animation on click
cell.style.transform = 'scale(0.8)';
setTimeout(() => {
  cell.style.transform = 'scale(1)';
}, 150);
```

### Responsive Design

```css
/* Mobile-first approach */
@media (max-width: 480px) {
  .cell {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .score-board {
    flex-direction: column;  /* Stack scores vertically */
  }
}
```

---

## JavaScript Implementation

### ES6 Features Used

#### Classes

```javascript
class TicTacToeGame {
  constructor() {
    this.board = Array(9).fill('');
  }
  
  makeMove(index) {
    // Method implementation
  }
}
```

#### Arrow Functions

```javascript
// Preserve 'this' context
this.cells.forEach(cell => {
  cell.addEventListener('click', this.handleCellClick.bind(this));
});

// Concise callbacks
const emptyCells = this.board
  .map((val, idx) => val === '' ? idx : null)
  .filter(val => val !== null);
```

#### Template Literals

```javascript
updateGameStatus() {
  this.gameStatus.textContent = `Player ${this.currentPlayer}'s Turn`;
}
```

#### Destructuring

```javascript
const [a, b, c] = condition;  // Destructure winning positions
const { X, O, draw } = this.scores;  // Destructure scores
```

#### Spread Operator

```javascript
// Create copies (avoid mutations)
getGameState() {
  return {
    board: [...this.board],
    scores: { ...this.scores }
  };
}
```

### Design Patterns

#### Singleton Pattern

```javascript
// Only one game instance
window.ticTacToeGame = new TicTacToeGame();
```

#### Observer Pattern

```javascript
// Event-driven updates
cell.addEventListener('click', this.handleCellClick.bind(this));

// State changes trigger UI updates
makeMove(index, cell) {
  this.board[index] = this.currentPlayer;  // Update state
  cell.textContent = this.currentPlayer;    // Update UI
}
```

#### Command Pattern

```javascript
// Encapsulated actions
resetGame() {
  // All reset logic in one method
}

resetAllScores() {
  // All score reset logic in one method
}
```

### State Management

#### State Structure

```javascript
{
  board: ['', 'X', 'O', '', '', '', '', '', ''],  // 9 cells
  currentPlayer: 'X',                              // Current turn
  gameActive: true,                                // Game status
  scores: { X: 2, O: 1, draw: 0 }                 // Score tracking
}
```

#### State Updates

```javascript
// Immutable state retrieval
getGameState() {
  return {
    board: [...this.board],        // Copy array
    scores: { ...this.scores }      // Copy object
  };
}

// State restoration
setGameState(state) {
  this.board = [...state.board];   // Set from copy
  // Update UI to reflect state
}
```

---

## Event System

### Event Flow

```
User Action (click/keypress)
        ↓
Event Listener Triggered
        ↓
Event Handler Method
        ↓
Validate Action
        ↓
Update State
        ↓
Update UI
        ↓
Check Win/Draw Conditions
        ↓
Handle Game End (if applicable)
```

### Event Binding

#### Cell Click Events

```javascript
this.cells.forEach(cell => {
  // Bind to preserve 'this' context
  cell.addEventListener('click', this.handleCellClick.bind(this));
});
```

#### Keyboard Events

```javascript
document.addEventListener('keydown', (event) => {
  const key = parseInt(event.key);
  
  if (key >= 1 && key <= 9) {
    // Number key pressed
    const cell = document.querySelector(`[data-index="${key - 1}"]`);
    cell?.click();  // Trigger click event
  }
  
  if (event.key.toLowerCase() === 'r') {
    // Reset key pressed
    window.ticTacToeGame.resetGame();
  }
});
```

#### Double-Click Event

```javascript
resetButton.addEventListener('dblclick', () => {
  if (confirm('Reset all scores? This cannot be undone.')) {
    window.ticTacToeGame.resetAllScores();
  }
});
```

### Event Delegation

While not extensively used (due to small DOM size), event delegation could be implemented:

```javascript
// Alternative approach (more efficient for larger games)
gameBoard.addEventListener('click', (event) => {
  if (event.target.classList.contains('cell')) {
    const index = parseInt(event.target.getAttribute('data-index'));
    // Handle click
  }
});
```

---

## State Management

### State Principles

1. **Single Source of Truth**: `this.board` is the authoritative state
2. **Derived UI**: DOM reflects state, not vice versa
3. **Immutable Getters**: State retrieval doesn't modify state
4. **Controlled Updates**: State changes only through methods

### State Flow

```
Initial State (constructor)
        ↓
User Interaction
        ↓
State Validation (is move valid?)
        ↓
State Update (modify board/player/scores)
        ↓
UI Synchronization (update DOM)
        ↓
Condition Check (win/draw/continue)
        ↓
State Transition (switch player/end game)
```

### State Persistence

#### Save State

```javascript
// Get current state
const state = window.ticTacToeGame.getGameState();

// Save to localStorage
localStorage.setItem('tic-tac-toe-state', JSON.stringify(state));
```

#### Restore State

```javascript
// Load from localStorage
const savedState = localStorage.getItem('tic-tac-toe-state');

if (savedState) {
  const state = JSON.parse(savedState);
  window.ticTacToeGame.setGameState(state);
}
```

---

## Adding New Features

### Feature Development Process

1. **Plan**: Define feature requirements
2. **Design**: Plan state/UI changes
3. **Implement**: Write code
4. **Test**: Verify functionality
5. **Document**: Update documentation

### Example: Adding Undo Functionality

#### 1. Add State History

```javascript
class TicTacToeGame {
  constructor() {
    // ... existing code ...
    this.history = [];  // Add history array
  }
}
```

#### 2. Save State After Each Move

```javascript
makeMove(index, cell) {
  // Save state before move
  this.history.push(this.getGameState());
  
  // ... existing move logic ...
}
```

#### 3. Implement Undo Method

```javascript
undo() {
  if (this.history.length === 0) return;
  
  const previousState = this.history.pop();
  this.setGameState(previousState);
}
```

#### 4. Add UI Button

```html
<button id="undo-button">Undo</button>
```

#### 5. Wire Up Event

```javascript
document.getElementById('undo-button')
  .addEventListener('click', () => {
    window.ticTacToeGame.undo();
  });
```

### Example: Adding AI Player

#### 1. Extend Class or Create New Class

```javascript
class TicTacToeWithAI extends TicTacToeGame {
  makeAIMove() {
    if (this.currentPlayer !== 'O') return;
    
    // Simple AI: random move
    const emptyCells = this.board
      .map((val, idx) => val === '' ? idx : null)
      .filter(val => val !== null);
    
    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[
        Math.floor(Math.random() * emptyCells.length)
      ];
      
      const cell = this.cells[randomIndex];
      this.makeMove(randomIndex, cell);
    }
  }
  
  switchPlayer() {
    super.switchPlayer();
    
    // AI moves automatically when it's O's turn
    if (this.currentPlayer === 'O' && this.gameActive) {
      setTimeout(() => this.makeAIMove(), 500);
    }
  }
}
```

#### 2. Use AI Class

```javascript
// Replace in DOMContentLoaded
window.ticTacToeGame = new TicTacToeWithAI();
```

---

## Testing

### Manual Testing Checklist

- [ ] All cells clickable
- [ ] X and O alternate correctly
- [ ] All 8 win conditions detected
- [ ] Draw detected when board full
- [ ] Scores update correctly
- [ ] Reset button works
- [ ] Double-click reset works
- [ ] Keyboard controls work (1-9, R)
- [ ] Animations play smoothly
- [ ] Mobile responsive
- [ ] Works in all browsers

### Unit Testing (If Adding Test Framework)

Example with Jest:

```javascript
describe('TicTacToeGame', () => {
  let game;
  
  beforeEach(() => {
    document.body.innerHTML = `
      <!-- HTML structure -->
    `;
    game = new TicTacToeGame();
  });
  
  test('initializes with empty board', () => {
    expect(game.board).toEqual(Array(9).fill(''));
  });
  
  test('switches player after move', () => {
    expect(game.currentPlayer).toBe('X');
    game.switchPlayer();
    expect(game.currentPlayer).toBe('O');
  });
  
  test('detects horizontal win', () => {
    game.board = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(game.checkWin()).toBe(true);
  });
  
  test('detects draw', () => {
    game.board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(game.checkDraw()).toBe(true);
  });
});
```

---

## Performance Optimization

### Current Optimizations

1. **CSS Transforms**: Hardware-accelerated animations
2. **Event Delegation**: Single listener per cell (not multiple)
3. **Cached DOM Queries**: Elements queried once in `initializeGame()`
4. **Minimal Reflows**: Batch DOM updates where possible

### Potential Improvements

#### Debounce Rapid Clicks

```javascript
handleCellClick(event) {
  if (this.clickDebounce) return;
  
  this.clickDebounce = true;
  setTimeout(() => this.clickDebounce = false, 100);
  
  // ... existing logic ...
}
```

#### Virtual DOM (Advanced)

For larger games, consider virtual DOM:

```javascript
// Instead of direct DOM manipulation
updateBoard() {
  const newState = this.board.map((cell, idx) => ({
    index: idx,
    value: cell
  }));
  
  // Diff and patch only changed cells
  this.patchDOM(this.lastState, newState);
  this.lastState = newState;
}
```

---

## Best Practices

### Code Style

```javascript
// Use descriptive names
const isGameActive = true;  // Good
const ga = true;            // Bad

// Consistent formatting
if (condition) {
  doSomething();
}

// Single responsibility
updateGameStatus() {
  // Only updates status display
}
```

### Error Handling

```javascript
makeMove(index, cell) {
  // Validate inputs
  if (typeof index !== 'number' || index < 0 || index > 8) {
    console.error('Invalid cell index');
    return;
  }
  
  if (!cell || !cell.classList) {
    console.error('Invalid cell element');
    return;
  }
  
  // ... proceed with move ...
}
```

### Documentation

```javascript
/**
 * Makes a move on the game board
 * @param {number} index - Board position (0-8)
 * @param {HTMLElement} cell - The cell DOM element
 * @returns {void}
 */
makeMove(index, cell) {
  // ...
}
```

### Security Considerations

```javascript
// Avoid innerHTML with user input
cell.textContent = this.currentPlayer;  // Good
// cell.innerHTML = userInput;          // Bad (XSS risk)

// Validate all inputs
if (this.board[cellIndex] !== '' || !this.gameActive) {
  return;  // Don't process invalid moves
}
```

---

## Development Workflow

### Local Development

1. **Make Changes**: Edit files in your editor
2. **Test Locally**: Open in browser, refresh to see changes
3. **Check Console**: Look for JavaScript errors (F12)
4. **Test Interactions**: Click all features
5. **Test Responsive**: Resize browser, test mobile

### Debugging Tips

```javascript
// Add console logs
console.log('Current board:', this.board);
console.log('Current player:', this.currentPlayer);

// Breakpoint in code
debugger;  // Execution pauses here when DevTools open

// Inspect game state
console.log(window.ticTacToeGame.getGameState());
```

### Browser DevTools

- **Elements Tab**: Inspect HTML/CSS
- **Console Tab**: JavaScript errors and logs
- **Sources Tab**: Debug JavaScript with breakpoints
- **Network Tab**: Check file loading
- **Application Tab**: Inspect localStorage

---

## Contributing to Codebase

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.

**Quick Tips**:
- Follow existing code style
- Add comments for complex logic
- Test all changes thoroughly
- Update documentation
- Keep commits atomic and descriptive

---

*For API details, see [API Documentation](api.md) | For deployment, see [Deployment Guide](deployment.md)*
