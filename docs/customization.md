# Customization Guide

Complete guide for customizing and extending the Tic-Tac-Toe game.

## Table of Contents

- [CSS Theming](#css-theming)
- [Color Schemes](#color-schemes)
- [Custom Animations](#custom-animations)
- [Layout Modifications](#layout-modifications)
- [Game Rules Customization](#game-rules-customization)
- [Extending Functionality](#extending-functionality)
- [Adding Sound Effects](#adding-sound-effects)
- [Custom Win Conditions](#custom-win-conditions)

---

## CSS Theming

### Creating a Custom Theme

#### Step 1: Define Color Variables

Add CSS custom properties for easy theming:

```css
:root {
  /* Primary Colors */
  --bg-gradient-start: #667eea;
  --bg-gradient-end: #764ba2;
  
  /* Player Colors */
  --player-x-color: #ff6b6b;
  --player-o-color: #4ecdc4;
  
  /* UI Colors */
  --container-bg: rgba(255, 255, 255, 0.1);
  --cell-bg: rgba(255, 255, 255, 0.2);
  --winning-color: #ffd700;
  
  /* Button Colors */
  --button-gradient-start: #ff6b6b;
  --button-gradient-end: #ee5a24;
  
  /* Text Colors */
  --text-primary: #ffffff;
  --text-shadow: rgba(0, 0, 0, 0.3);
}
```

#### Step 2: Apply Variables

Replace hard-coded colors with variables:

```css
body {
  background: linear-gradient(135deg, 
    var(--bg-gradient-start) 0%, 
    var(--bg-gradient-end) 100%);
  color: var(--text-primary);
}

.cell.x {
  color: var(--player-x-color);
}

.cell.o {
  color: var(--player-o-color);
}
```

### Pre-built Themes

#### Dark Theme

```css
/* Dark Theme */
.theme-dark {
  --bg-gradient-start: #1a1a2e;
  --bg-gradient-end: #16213e;
  --container-bg: rgba(255, 255, 255, 0.05);
  --cell-bg: rgba(255, 255, 255, 0.1);
  --player-x-color: #ff6b6b;
  --player-o-color: #4ecdc4;
  --text-primary: #eee;
}
```

**Apply:**
```html
<body class="theme-dark">
```

#### Ocean Theme

```css
/* Ocean Theme */
.theme-ocean {
  --bg-gradient-start: #2e3192;
  --bg-gradient-end: #1bffff;
  --player-x-color: #ffdd00;
  --player-o-color: #ff6b9d;
  --winning-color: #ffffff;
}
```

#### Sunset Theme

```css
/* Sunset Theme */
.theme-sunset {
  --bg-gradient-start: #ff512f;
  --bg-gradient-end: #f09819;
  --player-x-color: #ffffff;
  --player-o-color: #2d3561;
  --cell-bg: rgba(255, 255, 255, 0.25);
}
```

#### Forest Theme

```css
/* Forest Theme */
.theme-forest {
  --bg-gradient-start: #134e5e;
  --bg-gradient-end: #71b280;
  --player-x-color: #ffd700;
  --player-o-color: #ff6b6b;
  --container-bg: rgba(0, 0, 0, 0.15);
}
```

### Theme Switcher

Add theme switching functionality:

```html
<!-- Add to index.html -->
<div class="theme-selector">
  <button onclick="setTheme('default')">Default</button>
  <button onclick="setTheme('dark')">Dark</button>
  <button onclick="setTheme('ocean')">Ocean</button>
  <button onclick="setTheme('sunset')">Sunset</button>
</div>
```

```javascript
// Add to script.js
function setTheme(themeName) {
  // Remove all theme classes
  document.body.classList.remove('theme-dark', 'theme-ocean', 'theme-sunset', 'theme-forest');
  
  // Add selected theme
  if (themeName !== 'default') {
    document.body.classList.add(`theme-${themeName}`);
  }
  
  // Save preference
  localStorage.setItem('theme', themeName);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }
});
```

---

## Color Schemes

### Monochrome Scheme

```css
.theme-monochrome {
  --bg-gradient-start: #000000;
  --bg-gradient-end: #434343;
  --player-x-color: #ffffff;
  --player-o-color: #aaaaaa;
  --winning-color: #00ff00;
  --cell-bg: rgba(255, 255, 255, 0.1);
}
```

### Neon Scheme

```css
.theme-neon {
  --bg-gradient-start: #0a0a0a;
  --bg-gradient-end: #1a1a1a;
  --player-x-color: #00ffff;
  --player-o-color: #ff00ff;
  --winning-color: #ffff00;
  --cell-bg: rgba(0, 255, 255, 0.1);
  --cell-border: rgba(0, 255, 255, 0.5);
}

.theme-neon .cell {
  border-color: var(--cell-border);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.theme-neon .cell:hover {
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
}
```

### Pastel Scheme

```css
.theme-pastel {
  --bg-gradient-start: #ffeaa7;
  --bg-gradient-end: #dfe6e9;
  --player-x-color: #fd79a8;
  --player-o-color: #74b9ff;
  --winning-color: #00b894;
  --text-primary: #2d3436;
}
```

### High Contrast (Accessibility)

```css
.theme-high-contrast {
  --bg-gradient-start: #000000;
  --bg-gradient-end: #000000;
  --player-x-color: #ffff00;
  --player-o-color: #00ffff;
  --winning-color: #00ff00;
  --cell-bg: #000000;
  --cell-border: #ffffff;
  --text-primary: #ffffff;
}

.theme-high-contrast .cell {
  border: 3px solid var(--cell-border);
  background: var(--cell-bg);
}
```

---

## Custom Animations

### Entrance Animations

```css
/* Fade in cells on load */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cell {
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: both;
}

/* Stagger animation for each cell */
.cell:nth-child(1) { animation-delay: 0.05s; }
.cell:nth-child(2) { animation-delay: 0.1s; }
.cell:nth-child(3) { animation-delay: 0.15s; }
.cell:nth-child(4) { animation-delay: 0.2s; }
.cell:nth-child(5) { animation-delay: 0.25s; }
.cell:nth-child(6) { animation-delay: 0.3s; }
.cell:nth-child(7) { animation-delay: 0.35s; }
.cell:nth-child(8) { animation-delay: 0.4s; }
.cell:nth-child(9) { animation-delay: 0.45s; }
```

### Custom Win Animations

```css
/* Bounce animation for winning cells */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.cell.winning-cell {
  animation: bounce 0.6s ease-in-out infinite;
}

/* Glow effect for winner */
@keyframes glow {
  0%, 100% { 
    box-shadow: 0 0 10px var(--winning-color);
  }
  50% { 
    box-shadow: 0 0 30px var(--winning-color);
  }
}

.cell.winning-cell {
  animation: glow 1s ease-in-out infinite;
}

/* Rotate animation */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cell.winning-cell {
  animation: rotate 2s linear infinite;
}
```

### Mark Placement Animations

```javascript
// In script.js, modify makeMove method
makeMove(index, cell) {
  // ... existing code ...
  
  // Custom animation options
  const animations = ['scale', 'rotate', 'bounce', 'flip'];
  const animation = animations[0]; // Choose animation
  
  switch(animation) {
    case 'scale':
      cell.style.transform = 'scale(0)';
      setTimeout(() => cell.style.transform = 'scale(1)', 10);
      break;
      
    case 'rotate':
      cell.style.transform = 'rotate(180deg) scale(0)';
      setTimeout(() => cell.style.transform = 'rotate(0deg) scale(1)', 10);
      break;
      
    case 'bounce':
      cell.classList.add('bounce-in');
      setTimeout(() => cell.classList.remove('bounce-in'), 500);
      break;
      
    case 'flip':
      cell.classList.add('flip-in');
      setTimeout(() => cell.classList.remove('flip-in'), 500);
      break;
  }
}
```

```css
/* Supporting CSS for animations */
@keyframes bounce-in {
  0% { transform: scale(0) translateY(-50px); }
  50% { transform: scale(1.2) translateY(10px); }
  100% { transform: scale(1) translateY(0); }
}

@keyframes flip-in {
  0% { transform: rotateY(90deg); opacity: 0; }
  100% { transform: rotateY(0deg); opacity: 1; }
}

.bounce-in {
  animation: bounce-in 0.5s ease-out;
}

.flip-in {
  animation: flip-in 0.4s ease-out;
}
```

---

## Layout Modifications

### Larger Board Size

```css
/* Increase cell size */
.cell {
  width: 100px;
  height: 100px;
  font-size: 2.5rem;
}

.game-board {
  max-width: 360px; /* 100px * 3 + gaps */
}
```

### Vertical Layout

```css
.container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.game-board {
  order: 2;
}

.score-board {
  order: 1;
  margin-bottom: 2rem;
}
```

### Side-by-Side Layout (Wide Screens)

```css
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    max-width: 1000px;
  }
  
  .game-board {
    grid-column: 2;
  }
  
  .score-board {
    grid-column: 3;
    flex-direction: column;
  }
}
```

### Rounded vs. Square Cells

```css
/* Circular cells */
.cell {
  border-radius: 50%;
}

/* Sharp square cells */
.cell {
  border-radius: 0;
}

/* Heavily rounded */
.cell {
  border-radius: 20px;
}
```

---

## Game Rules Customization

### Custom Board Size (4x4)

```javascript
class TicTacToe4x4 extends TicTacToeGame {
  constructor() {
    super();
    this.board = Array(16).fill('');
    this.winningConditions = [
      // Rows
      [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
      // Columns
      [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
      // Diagonals
      [0, 5, 10, 15], [3, 6, 9, 12]
    ];
  }
}
```

```html
<!-- 4x4 HTML -->
<div class="game-board game-board-4x4">
  <!-- 16 cells instead of 9 -->
  <div class="cell" data-index="0"></div>
  <!-- ... 15 more cells ... -->
</div>
```

```css
/* 4x4 CSS */
.game-board-4x4 {
  grid-template-columns: repeat(4, 1fr);
}
```

### First to Score X Wins

```javascript
class TicTacToeMatch extends TicTacToeGame {
  constructor(winsNeeded = 3) {
    super();
    this.winsNeeded = winsNeeded;
  }
  
  handleGameEnd(result) {
    super.handleGameEnd(result);
    
    // Check if someone reached target wins
    if (this.scores.X >= this.winsNeeded) {
      alert(`Player X wins the match ${this.scores.X}-${this.scores.O}!`);
      this.resetAllScores();
    } else if (this.scores.O >= this.winsNeeded) {
      alert(`Player O wins the match ${this.scores.O}-${this.scores.X}!`);
      this.resetAllScores();
    }
  }
}
```

### Timed Turns

```javascript
class TicTacToeTimed extends TicTacToeGame {
  constructor(timeLimit = 10) {
    super();
    this.timeLimit = timeLimit; // seconds
    this.timeRemaining = timeLimit;
    this.timer = null;
  }
  
  switchPlayer() {
    super.switchPlayer();
    this.startTimer();
  }
  
  startTimer() {
    clearInterval(this.timer);
    this.timeRemaining = this.timeLimit;
    
    this.timer = setInterval(() => {
      this.timeRemaining--;
      this.updateGameStatus(
        `Player ${this.currentPlayer}'s Turn (${this.timeRemaining}s)`
      );
      
      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.switchPlayer(); // Skip turn
      }
    }, 1000);
  }
}
```

---

## Extending Functionality

### Add Player Names

```javascript
class TicTacToeNamed extends TicTacToeGame {
  constructor() {
    super();
    this.playerNames = {
      X: 'Player 1',
      O: 'Player 2'
    };
  }
  
  setPlayerNames(nameX, nameO) {
    this.playerNames.X = nameX || 'Player 1';
    this.playerNames.O = nameO || 'Player 2';
    this.updateGameStatus();
  }
  
  updateGameStatus(message = null) {
    if (message) {
      this.gameStatus.textContent = message;
    } else {
      const name = this.playerNames[this.currentPlayer];
      this.gameStatus.textContent = `${name}'s Turn (${this.currentPlayer})`;
    }
  }
}
```

```html
<!-- Add name inputs -->
<div class="player-names">
  <input type="text" id="player-x-name" placeholder="Player X Name">
  <input type="text" id="player-o-name" placeholder="Player O Name">
  <button onclick="updateNames()">Set Names</button>
</div>
```

```javascript
function updateNames() {
  const nameX = document.getElementById('player-x-name').value;
  const nameO = document.getElementById('player-o-name').value;
  window.ticTacToeGame.setPlayerNames(nameX, nameO);
}
```

### Move History

```javascript
class TicTacToeHistory extends TicTacToeGame {
  constructor() {
    super();
    this.moveHistory = [];
  }
  
  makeMove(index, cell) {
    this.moveHistory.push({
      index: index,
      player: this.currentPlayer,
      board: [...this.board]
    });
    
    super.makeMove(index, cell);
    this.displayHistory();
  }
  
  displayHistory() {
    const historyDiv = document.getElementById('move-history');
    historyDiv.innerHTML = '<h3>Move History:</h3>';
    
    this.moveHistory.forEach((move, i) => {
      historyDiv.innerHTML += `
        <div>Move ${i + 1}: ${move.player} → Cell ${move.index + 1}</div>
      `;
    });
  }
  
  undo() {
    if (this.moveHistory.length === 0) return;
    
    this.moveHistory.pop();
    const previousState = this.moveHistory.length > 0
      ? this.moveHistory[this.moveHistory.length - 1].board
      : Array(9).fill('');
    
    this.board = [...previousState];
    this.setGameState(this.getGameState());
  }
}
```

---

## Adding Sound Effects

### Setup Audio

```html
<!-- Add audio elements -->
<audio id="sound-move" src="sounds/move.mp3" preload="auto"></audio>
<audio id="sound-win" src="sounds/win.mp3" preload="auto"></audio>
<audio id="sound-draw" src="sounds/draw.mp3" preload="auto"></audio>
```

### Integrate Sounds

```javascript
class TicTacToeSound extends TicTacToeGame {
  constructor() {
    super();
    this.sounds = {
      move: document.getElementById('sound-move'),
      win: document.getElementById('sound-win'),
      draw: document.getElementById('sound-draw')
    };
    this.soundEnabled = true;
  }
  
  playSound(soundName) {
    if (!this.soundEnabled) return;
    
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }
  
  makeMove(index, cell) {
    super.makeMove(index, cell);
    this.playSound('move');
  }
  
  handleGameEnd(result) {
    super.handleGameEnd(result);
    this.playSound(result === 'win' ? 'win' : 'draw');
  }
  
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
  }
}
```

### Sound Toggle Button

```html
<button id="sound-toggle" onclick="toggleSound()">
  🔊 Sound On
</button>
```

```javascript
function toggleSound() {
  window.ticTacToeGame.toggleSound();
  const btn = document.getElementById('sound-toggle');
  btn.textContent = window.ticTacToeGame.soundEnabled 
    ? '🔊 Sound On' 
    : '🔇 Sound Off';
}
```

---

## Custom Win Conditions

### Connect 4 in a Row (any direction)

```javascript
class ConnectFour extends TicTacToeGame {
  constructor() {
    super();
    this.board = Array(42).fill(''); // 7 columns × 6 rows
    this.winningConditions = this.generateWinConditions();
  }
  
  generateWinConditions() {
    const conditions = [];
    
    // Horizontal (4 in a row)
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        conditions.push([
          row * 7 + col,
          row * 7 + col + 1,
          row * 7 + col + 2,
          row * 7 + col + 3
        ]);
      }
    }
    
    // Add vertical and diagonal conditions...
    return conditions;
  }
}
```

### Three in a Row Anywhere

```javascript
checkWin() {
  // Original 8 winning conditions
  const standardWin = super.checkWin();
  
  if (standardWin) return true;
  
  // Check for ANY three in a row (not just winning positions)
  for (let i = 0; i < 9; i++) {
    for (let j = i + 1; j < 9; j++) {
      for (let k = j + 1; k < 9; k++) {
        if (this.board[i] && 
            this.board[i] === this.board[j] && 
            this.board[i] === this.board[k]) {
          // Check if they're in a line
          if (this.inLine(i, j, k)) {
            this.highlightWinningCells([i, j, k]);
            return true;
          }
        }
      }
    }
  }
  
  return false;
}
```

---

## Best Practices

### Performance
- Cache DOM queries
- Use CSS transforms for animations
- Minimize reflows and repaints
- Debounce rapid interactions

### Maintainability
- Keep customizations modular
- Document changes
- Use CSS variables for themes
- Extend classes rather than modifying core

### User Experience
- Test all customizations
- Ensure mobile compatibility
- Maintain accessibility
- Provide clear feedback

---

*For more details, see [Developer Guide](developer-guide.md) and [API Documentation](api.md)*
