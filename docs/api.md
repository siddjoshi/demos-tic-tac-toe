# API Documentation

Complete reference for the TicTacToeGame class and all its methods.

## Table of Contents

- [Class: TicTacToeGame](#class-tictactoegame)
  - [Constructor](#constructor)
  - [Properties](#properties)
  - [Methods](#methods)
    - [Initialization Methods](#initialization-methods)
    - [Game Logic Methods](#game-logic-methods)
    - [UI Update Methods](#ui-update-methods)
    - [State Management Methods](#state-management-methods)

---

## Class: TicTacToeGame

The main game class that handles all game logic, state management, and UI updates.

### Constructor

```javascript
new TicTacToeGame()
```

Creates a new instance of the tic-tac-toe game.

**Parameters:** None

**Example:**
```javascript
const game = new TicTacToeGame();
```

**Behavior:**
- Initializes game state with an empty board
- Sets Player X as the starting player
- Sets game as active
- Initializes scores to 0 for all players
- Automatically calls `initializeGame()` to set up DOM elements

---

### Properties

#### board
- **Type:** `Array<string>`
- **Description:** Array of 9 strings representing the game board state
- **Values:** `''` (empty), `'X'`, or `'O'`
- **Index mapping:**
  ```
  0 | 1 | 2
  ---------
  3 | 4 | 5
  ---------
  6 | 7 | 8
  ```

#### currentPlayer
- **Type:** `string`
- **Description:** The current player's mark
- **Values:** `'X'` or `'O'`
- **Default:** `'X'`

#### gameActive
- **Type:** `boolean`
- **Description:** Whether the game is currently active
- **Values:** `true` (game in progress), `false` (game ended)

#### scores
- **Type:** `Object`
- **Description:** Score tracking object
- **Properties:**
  - `X` (number): Player X's win count
  - `O` (number): Player O's win count
  - `draw` (number): Number of draws

#### winningConditions
- **Type:** `Array<Array<number>>`
- **Description:** All possible winning combinations
- **Value:** 8 arrays of 3 indices each representing winning patterns

---

### Methods

#### Initialization Methods

##### initializeGame()

```javascript
initializeGame()
```

Initializes DOM elements and sets up event listeners.

**Parameters:** None

**Returns:** `void`

**Behavior:**
- Queries and stores references to all DOM elements
- Attaches click event listeners to cells
- Attaches click listener to reset button
- Updates initial game status and scoreboard displays

**Called by:** Constructor (automatically)

**Example:**
```javascript
// Called automatically during construction
const game = new TicTacToeGame();
```

---

#### Game Logic Methods

##### handleCellClick(event)

```javascript
handleCellClick(event)
```

Handles click events on game board cells.

**Parameters:**
- `event` (Event): The click event object

**Returns:** `void`

**Behavior:**
- Extracts cell index from clicked element
- Validates that cell is empty and game is active
- Calls `makeMove()` if valid
- Ignores invalid moves

**Example:**
```javascript
// Automatically attached to cells, but can be called manually
const event = new MouseEvent('click', { target: cellElement });
game.handleCellClick(event);
```

---

##### makeMove(index, cell)

```javascript
makeMove(index, cell)
```

Executes a move on the game board.

**Parameters:**
- `index` (number): Board index (0-8) where move is made
- `cell` (HTMLElement): The DOM element of the clicked cell

**Returns:** `void`

**Behavior:**
1. Updates board state at given index
2. Sets cell text content to current player's mark
3. Adds player-specific CSS class (`'x'` or `'o'`)
4. Applies scale animation to cell
5. Checks for win condition
6. Checks for draw condition
7. Switches player if game continues

**Example:**
```javascript
const cell = document.querySelector('[data-index="4"]');
game.makeMove(4, cell);
```

---

##### checkWin()

```javascript
checkWin()
```

Checks if the current player has won the game.

**Parameters:** None

**Returns:** `boolean` - `true` if current player has won, `false` otherwise

**Behavior:**
- Iterates through all winning combinations
- Checks if current player has marks in all three positions of any combination
- Calls `highlightWinningCells()` if win is found

**Algorithm:**
```javascript
// Checks all 8 winning patterns
for each winning condition [a, b, c]:
  if board[a] && board[a] === board[b] && board[a] === board[c]:
    return true (win found)
return false (no win)
```

**Example:**
```javascript
if (game.checkWin()) {
  console.log('Current player has won!');
}
```

---

##### checkDraw()

```javascript
checkDraw()
```

Checks if the game has ended in a draw.

**Parameters:** None

**Returns:** `boolean` - `true` if board is full (draw), `false` otherwise

**Behavior:**
- Checks if all cells in the board array are filled
- Returns `true` only if no empty cells remain

**Example:**
```javascript
if (game.checkDraw()) {
  console.log('Game ended in a draw!');
}
```

---

##### highlightWinningCells(winningCells)

```javascript
highlightWinningCells(winningCells)
```

Highlights the cells that form the winning combination.

**Parameters:**
- `winningCells` (Array<number>): Array of 3 indices representing winning cells

**Returns:** `void`

**Behavior:**
- Adds `'winning-cell'` CSS class to each winning cell
- Triggers pulse animation on winning cells

**Example:**
```javascript
game.highlightWinningCells([0, 1, 2]); // Highlight top row
```

---

##### handleGameEnd(result)

```javascript
handleGameEnd(result)
```

Handles the end of a game (win or draw).

**Parameters:**
- `result` (string): Either `'win'` or `'draw'`

**Returns:** `void`

**Behavior:**
1. Sets `gameActive` to `false`
2. Updates appropriate score (player or draw)
3. Updates game status display
4. Shows game over overlay message
5. Updates scoreboard display
6. Schedules automatic reset after 3 seconds

**Example:**
```javascript
game.handleGameEnd('win');  // Handle a win
game.handleGameEnd('draw'); // Handle a draw
```

---

##### switchPlayer()

```javascript
switchPlayer()
```

Switches the current player from X to O or O to X.

**Parameters:** None

**Returns:** `void`

**Behavior:**
- Toggles `currentPlayer` between `'X'` and `'O'`

**Example:**
```javascript
console.log(game.currentPlayer); // 'X'
game.switchPlayer();
console.log(game.currentPlayer); // 'O'
```

---

#### UI Update Methods

##### updateGameStatus(message)

```javascript
updateGameStatus(message)
```

Updates the game status display text.

**Parameters:**
- `message` (string, optional): Custom status message. If omitted, displays turn message.

**Returns:** `void`

**Default Behavior:**
- Without message: Displays `"Player X's Turn"` or `"Player O's Turn"`
- With message: Displays the provided custom message

**Example:**
```javascript
game.updateGameStatus(); // "Player X's Turn"
game.updateGameStatus('Player X Wins! 🎉'); // Custom message
```

---

##### updateScoreBoard()

```javascript
updateScoreBoard()
```

Updates the scoreboard display with current scores.

**Parameters:** None

**Returns:** `void`

**Behavior:**
- Updates Player X score display
- Updates Player O score display
- Updates draws count display

**Example:**
```javascript
game.scores.X = 5;
game.scores.O = 3;
game.updateScoreBoard(); // UI now shows X: 5, O: 3
```

---

##### showGameOverMessage(title, subtitle)

```javascript
showGameOverMessage(title, subtitle)
```

Displays a game over overlay with custom message.

**Parameters:**
- `title` (string): Main message heading
- `subtitle` (string): Subtitle or additional message

**Returns:** `void`

**Behavior:**
1. Creates overlay element if it doesn't exist
2. Updates message content
3. Shows overlay with fade-in animation
4. Automatically hides overlay after 2.5 seconds

**Example:**
```javascript
game.showGameOverMessage('Player X Wins!', 'Congratulations! 🎉');
```

---

##### resetGame()

```javascript
resetGame()
```

Resets the current game while preserving scores.

**Parameters:** None

**Returns:** `void`

**Behavior:**
1. Clears board array to all empty strings
2. Resets current player to 'X'
3. Sets game as active
4. Clears all cell text content
5. Removes player and winning cell CSS classes
6. Resets cell transforms
7. Updates game status display
8. Hides game over overlay if visible

**Note:** Does NOT reset scores. Use `resetAllScores()` for complete reset.

**Example:**
```javascript
game.resetGame(); // Start new game, keep scores
```

---

##### resetAllScores()

```javascript
resetAllScores()
```

Resets all scores and the game to initial state.

**Parameters:** None

**Returns:** `void`

**Behavior:**
1. Resets all scores to 0 (X, O, draw)
2. Updates scoreboard display
3. Calls `resetGame()` to reset board

**Example:**
```javascript
game.resetAllScores(); // Complete reset
```

---

#### State Management Methods

##### getGameState()

```javascript
getGameState()
```

Returns a copy of the current game state.

**Parameters:** None

**Returns:** `Object` - Game state object containing:
- `board` (Array<string>): Copy of board array
- `currentPlayer` (string): Current player ('X' or 'O')
- `gameActive` (boolean): Game active status
- `scores` (Object): Copy of scores object

**Use Cases:**
- Saving game state to localStorage
- Implementing undo functionality
- Debugging game state

**Example:**
```javascript
const state = game.getGameState();
console.log(state);
/* Output:
{
  board: ['X', 'O', '', '', 'X', '', '', '', 'O'],
  currentPlayer: 'X',
  gameActive: true,
  scores: { X: 2, O: 1, draw: 0 }
}
*/

// Save to localStorage
localStorage.setItem('gameState', JSON.stringify(state));
```

---

##### setGameState(state)

```javascript
setGameState(state)
```

Restores game to a previously saved state.

**Parameters:**
- `state` (Object): Game state object with properties:
  - `board` (Array<string>): Board state
  - `currentPlayer` (string): Current player
  - `gameActive` (boolean): Game active status
  - `scores` (Object): Scores object

**Returns:** `void`

**Behavior:**
1. Restores board, player, active status, and scores
2. Updates all cell displays to match board state
3. Applies appropriate CSS classes to cells
4. Updates game status and scoreboard displays

**Use Cases:**
- Loading saved games
- Implementing undo/redo
- Testing specific game states

**Example:**
```javascript
// Load from localStorage
const savedState = JSON.parse(localStorage.getItem('gameState'));
game.setGameState(savedState);

// Or set a specific state for testing
game.setGameState({
  board: ['X', 'O', 'X', 'O', 'X', 'O', '', '', ''],
  currentPlayer: 'O',
  gameActive: true,
  scores: { X: 5, O: 3, draw: 1 }
});
```

---

## Usage Examples

### Basic Game Creation and Play

```javascript
// Game is automatically created when DOM loads
// Access via window.ticTacToeGame

// Manual creation (if needed)
const myGame = new TicTacToeGame();
```

### Programmatic Move

```javascript
// Make a move at position 4 (center)
const centerCell = document.querySelector('[data-index="4"]');
window.ticTacToeGame.makeMove(4, centerCell);
```

### Save and Restore Game

```javascript
// Save current game
const savedGame = window.ticTacToeGame.getGameState();
localStorage.setItem('myGame', JSON.stringify(savedGame));

// Later, restore the game
const restoredGame = JSON.parse(localStorage.getItem('myGame'));
window.ticTacToeGame.setGameState(restoredGame);
```

### Check Game Status

```javascript
const state = window.ticTacToeGame.getGameState();

if (!state.gameActive) {
  console.log('Game is over');
} else {
  console.log(`It's player ${state.currentPlayer}'s turn`);
}

console.log('Scores:', state.scores);
```

### Custom Game Logic Extension

```javascript
// Extend the class to add AI player
class TicTacToeWithAI extends TicTacToeGame {
  makeAIMove() {
    // Find empty cells
    const emptyCells = this.board
      .map((val, idx) => val === '' ? idx : null)
      .filter(val => val !== null);
    
    if (emptyCells.length > 0 && this.currentPlayer === 'O') {
      // Pick random empty cell
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const cell = this.cells[randomIndex];
      this.makeMove(randomIndex, cell);
    }
  }
}
```

---

## Event Handling

The game automatically sets up these event listeners:

### Cell Clicks
```javascript
// Each cell listens for clicks
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
```

### Reset Button
```javascript
// Single click - reset current game
resetButton.addEventListener('click', resetGame);

// Double click - reset all scores (with confirmation)
resetButton.addEventListener('dblclick', resetAllScores);
```

### Keyboard Controls
```javascript
// Number keys 1-9 for cell selection
document.addEventListener('keydown', (event) => {
  if (event.key >= '1' && event.key <= '9') {
    // Click corresponding cell
  }
});

// 'R' key for reset
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r') {
    resetGame();
  }
});
```

---

## Type Definitions

For TypeScript users, here are the type definitions:

```typescript
interface GameState {
  board: string[];
  currentPlayer: 'X' | 'O';
  gameActive: boolean;
  scores: {
    X: number;
    O: number;
    draw: number;
  };
}

interface TicTacToeGame {
  board: string[];
  currentPlayer: 'X' | 'O';
  gameActive: boolean;
  scores: { X: number; O: number; draw: number };
  winningConditions: number[][];
  
  initializeGame(): void;
  handleCellClick(event: Event): void;
  makeMove(index: number, cell: HTMLElement): void;
  checkWin(): boolean;
  checkDraw(): boolean;
  highlightWinningCells(winningCells: number[]): void;
  handleGameEnd(result: 'win' | 'draw'): void;
  switchPlayer(): void;
  updateGameStatus(message?: string): void;
  updateScoreBoard(): void;
  showGameOverMessage(title: string, subtitle: string): void;
  resetGame(): void;
  resetAllScores(): void;
  getGameState(): GameState;
  setGameState(state: GameState): void;
}
```

---

## Notes and Best Practices

### Performance Considerations
- The game uses event delegation efficiently
- DOM queries are cached during initialization
- Animations use CSS transforms for optimal performance

### State Management
- Always use `getGameState()` and `setGameState()` for state persistence
- The board array is the source of truth
- UI updates are derived from state changes

### Extensibility
- The class can be extended for additional features
- All methods are designed to be overridable
- Use public methods, avoid directly manipulating properties

### Browser Compatibility
- Uses ES6 classes (requires modern browsers or transpilation)
- Uses modern array methods (map, filter, every, some)
- CSS animations require browser support for transforms and transitions

---

*For more information, see the [Developer Guide](developer-guide.md)*
