/**
 * Tic Tac Toe Game Implementation
 * 
 * A complete interactive tic-tac-toe game with scoring system, keyboard controls,
 * and smooth animations. Implements classic tic-tac-toe rules with modern UX.
 * 
 * @class TicTacToeGame
 * @author Tic-Tac-Toe Game Contributors
 * @license MIT
 * @version 1.0.0
 * 
 * @example
 * // Game is automatically initialized on page load
 * const game = new TicTacToeGame();
 * 
 * @example
 * // Access the global instance
 * window.ticTacToeGame.resetGame();
 */

class TicTacToeGame {
    /**
     * Creates a new TicTacToeGame instance
     * 
     * Initializes the game board, sets Player X as the starting player,
     * creates the winning condition patterns, and sets up the DOM.
     * 
     * @constructor
     */
    constructor() {
        /**
         * Game board state - array of 9 cells
         * @type {string[]}
         * @description Empty string for empty cell, 'X' or 'O' for marked cells
         * @example ['X', 'O', '', '', 'X', '', '', '', 'O']
         */
        this.board = Array(9).fill('');
        
        /**
         * Current player's turn
         * @type {string}
         * @description Either 'X' or 'O', alternates each turn
         */
        this.currentPlayer = 'X';
        
        /**
         * Game active status
         * @type {boolean}
         * @description False when game is over (win or draw), true during gameplay
         */
        this.gameActive = true;
        
        /**
         * Score tracking for both players and draws
         * @type {Object}
         * @property {number} X - Player X's win count
         * @property {number} O - Player O's win count
         * @property {number} draw - Number of draw games
         */
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };

        /**
         * All possible winning combinations (8 total)
         * @type {number[][]}
         * @description Array of 8 arrays, each containing 3 indices representing a winning line
         * @constant
         */
        this.winningConditions = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal: top-left to bottom-right
            [2, 4, 6]  // Diagonal: top-right to bottom-left
        ];

        // Initialize the game DOM and event listeners
        this.initializeGame();
    }

    /**
     * Initialize game elements and event listeners
     * 
     * Queries and caches all necessary DOM elements, attaches event listeners
     * for user interactions, and initializes the display.
     * 
     * @returns {void}
     * @fires click - Attaches click handlers to cells and reset button
     */
    initializeGame() {
        // Cache DOM element references for performance
        /**
         * Game board container element
         * @type {HTMLElement}
         */
        this.gameBoard = document.getElementById('game-board');
        
        /**
         * Status display element
         * @type {HTMLElement}
         */
        this.gameStatus = document.getElementById('game-status');
        
        /**
         * Reset button element
         * @type {HTMLButtonElement}
         */
        this.resetButton = document.getElementById('reset-button');
        
        /**
         * Player X score display element
         * @type {HTMLElement}
         */
        this.scoreX = document.getElementById('score-x');
        
        /**
         * Player O score display element
         * @type {HTMLElement}
         */
        this.scoreO = document.getElementById('score-o');
        
        /**
         * Draw count display element
         * @type {HTMLElement}
         */
        this.scoreDraw = document.getElementById('score-draw');
        
        /**
         * All cell elements (NodeList of 9 cells)
         * @type {NodeListOf<Element>}
         */
        this.cells = document.querySelectorAll('.cell');

        // Attach event listeners for cell clicks
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });

        // Attach event listener for reset button
        this.resetButton.addEventListener('click', this.resetGame.bind(this));

        // Initialize display with starting state
        this.updateGameStatus();
        this.updateScoreBoard();
    }

    /**
     * Handle cell click events
     * 
     * Processes clicks on game board cells. Validates that the cell is empty
     * and the game is active before processing the move.
     * 
     * @param {Event} event - The click event object
     * @returns {void}
     */
    handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        // Validate move: check if cell is empty and game is active
        if (this.board[cellIndex] !== '' || !this.gameActive) {
            return; // Ignore invalid moves
        }

        // Execute the move
        this.makeMove(cellIndex, cell);
    }

    /**
     * Execute a move on the board
     * 
     * Updates the board state, displays the player's mark, applies animations,
     * and checks for win/draw conditions. Switches players if game continues.
     * 
     * @param {number} index - The board index (0-8) where the move is made
     * @param {HTMLElement} cell - The DOM element of the clicked cell
     * @returns {void}
     * 
     * @example
     * const cell = document.querySelector('[data-index="4"]');
     * game.makeMove(4, cell); // Places current player's mark in center
     */
    makeMove(index, cell) {
        // Update internal board state
        this.board[index] = this.currentPlayer;
        
        // Update cell visual display
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());

        // Apply scale animation for visual feedback
        cell.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 150);

        // Check game end conditions
        if (this.checkWin()) {
            this.handleGameEnd('win');
        } else if (this.checkDraw()) {
            this.handleGameEnd('draw');
        } else {
            // Game continues: switch to next player
            this.switchPlayer();
            this.updateGameStatus();
        }
    }

    /**
     * Check if current player has won
     * 
     * Iterates through all winning combinations to determine if the current
     * player has three marks in a row. Highlights winning cells if found.
     * 
     * @returns {boolean} True if current player has won, false otherwise
     * 
     * @example
     * if (game.checkWin()) {
     *   console.log('Game over - current player wins!');
     * }
     */
    checkWin() {
        // Check each winning condition
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            
            // Verify all three positions have the same mark (and aren't empty)
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                
                // Highlight the winning cells for visual feedback
                this.highlightWinningCells(condition);
                return true;
            }
            return false;
        });
    }

    /**
     * Check if the game is a draw
     * 
     * A draw occurs when all cells are filled and no player has won.
     * 
     * @returns {boolean} True if all cells are filled (draw), false otherwise
     * 
     * @example
     * if (game.checkDraw()) {
     *   console.log('Game over - draw!');
     * }
     */
    checkDraw() {
        // Check if every cell on the board has been filled
        return this.board.every(cell => cell !== '');
    }

    /**
     * Highlight the winning combination cells
     * 
     * Adds a visual class to the cells that form the winning line,
     * triggering the pulse animation defined in CSS.
     * 
     * @param {number[]} winningCells - Array of 3 indices representing winning cells
     * @returns {void}
     * 
     * @example
     * game.highlightWinningCells([0, 1, 2]); // Highlights top row
     */
    highlightWinningCells(winningCells) {
        winningCells.forEach(index => {
            this.cells[index].classList.add('winning-cell');
        });
    }

    /**
     * Handle game end (win or draw)
     * 
     * Manages the end of game state including updating scores, displaying
     * messages, and scheduling automatic reset.
     * 
     * @param {string} result - Either 'win' or 'draw'
     * @returns {void}
     * 
     * @fires setTimeout - Schedules automatic game reset after 3 seconds
     */
    handleGameEnd(result) {
        // Deactivate the game to prevent further moves
        this.gameActive = false;

        if (result === 'win') {
            // Increment winner's score
            this.scores[this.currentPlayer]++;
            this.updateGameStatus(`Player ${this.currentPlayer} Wins! 🎉`);
            this.showGameOverMessage(`Player ${this.currentPlayer} Wins!`, 'Congratulations! 🎉');
        } else {
            // Increment draw counter
            this.scores.draw++;
            this.updateGameStatus("It's a Draw! 🤝");
            this.showGameOverMessage("It's a Draw!", 'Good game! 🤝');
        }

        // Update scoreboard display
        this.updateScoreBoard();
        
        // Schedule automatic reset after 3 seconds
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }

    /**
     * Show game over message overlay
     * 
     * Creates or updates a full-screen overlay with the game result message.
     * The overlay automatically fades out after 2.5 seconds.
     * 
     * @param {string} title - Main message heading
     * @param {string} subtitle - Additional message or subtitle
     * @returns {void}
     * 
     * @example
     * game.showGameOverMessage('Player X Wins!', 'Congratulations! 🎉');
     */
    showGameOverMessage(title, subtitle) {
        // Check if overlay already exists, create if not
        let overlay = document.querySelector('.game-over-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'game-over-overlay';
            overlay.innerHTML = `
                <div class="game-over-message">
                    <h2 id="game-over-title"></h2>
                    <p id="game-over-subtitle"></p>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        // Update message content
        document.getElementById('game-over-title').textContent = title;
        document.getElementById('game-over-subtitle').textContent = subtitle;

        // Display overlay with fade-in animation
        overlay.classList.add('show');

        // Schedule overlay removal after 2.5 seconds
        setTimeout(() => {
            overlay.classList.remove('show');
        }, 2500);
    }

    /**
     * Switch to the next player
     * 
     * Toggles currentPlayer between 'X' and 'O'.
     * 
     * @returns {void}
     */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    /**
     * Update the game status display
     * 
     * Updates the status text to show either whose turn it is or a custom message.
     * 
     * @param {string} [message] - Optional custom message. If omitted, shows turn message.
     * @returns {void}
     * 
     * @example
     * game.updateGameStatus(); // Shows "Player X's Turn"
     * game.updateGameStatus('Player X Wins!'); // Shows custom message
     */
    updateGameStatus(message = null) {
        if (message) {
            this.gameStatus.textContent = message;
        } else {
            this.gameStatus.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
    }

    /**
     * Update the score board display
     * 
     * Synchronizes the scoreboard UI with the current scores object.
     * 
     * @returns {void}
     */
    updateScoreBoard() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreDraw.textContent = this.scores.draw;
    }

    /**
     * Reset the current game (keep scores)
     * 
     * Clears the board and resets the game state while preserving player scores.
     * This is called after each game ends or when the reset button is clicked.
     * 
     * @returns {void}
     * 
     * @example
     * game.resetGame(); // Start new game, scores remain
     */
    resetGame() {
        // Reset game state to initial values
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        // Clear all cell contents and styling
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
            cell.style.transform = '';
        });

        // Update status to show new game
        this.updateGameStatus();

        // Hide game over overlay if it's visible
        const overlay = document.querySelector('.game-over-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    /**
     * Reset all scores (complete reset)
     * 
     * Resets all scores to 0 and starts a fresh game. This provides a
     * complete reset of the entire game session.
     * 
     * @returns {void}
     * 
     * @example
     * game.resetAllScores(); // Complete reset: board and scores
     */
    resetAllScores() {
        this.scores = { X: 0, O: 0, draw: 0 };
        this.updateScoreBoard();
        this.resetGame();
    }

    /**
     * Get current game state
     * 
     * Returns a copy of the current game state for saving or inspection.
     * Creates new objects/arrays to prevent external mutation.
     * 
     * @returns {Object} Current game state
     * @returns {string[]} return.board - Copy of board array
     * @returns {string} return.currentPlayer - Current player ('X' or 'O')
     * @returns {boolean} return.gameActive - Whether game is in progress
     * @returns {Object} return.scores - Copy of scores object
     * 
     * @example
     * const state = game.getGameState();
     * localStorage.setItem('savedGame', JSON.stringify(state));
     */
    getGameState() {
        return {
            board: [...this.board],
            currentPlayer: this.currentPlayer,
            gameActive: this.gameActive,
            scores: { ...this.scores }
        };
    }

    /**
     * Set game state (for loading saved games)
     * 
     * Restores the game to a previously saved state. Useful for implementing
     * save/load functionality or undo features.
     * 
     * @param {Object} state - Game state to restore
     * @param {string[]} state.board - Board state array
     * @param {string} state.currentPlayer - Current player
     * @param {boolean} state.gameActive - Game active status
     * @param {Object} state.scores - Scores object
     * @returns {void}
     * 
     * @example
     * const savedState = JSON.parse(localStorage.getItem('savedGame'));
     * game.setGameState(savedState);
     */
    setGameState(state) {
        // Restore game state from provided state object
        this.board = [...state.board];
        this.currentPlayer = state.currentPlayer;
        this.gameActive = state.gameActive;
        this.scores = { ...state.scores };

        // Update UI to reflect restored state
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            cell.classList.remove('x', 'o', 'winning-cell');
            if (this.board[index]) {
                cell.classList.add(this.board[index].toLowerCase());
            }
        });

        // Update status and scoreboard displays
        this.updateGameStatus();
        this.updateScoreBoard();
    }
}

/**
 * Global initialization when DOM content is loaded
 * 
 * Sets up the game instance, keyboard controls, and additional event handlers
 * when the page has finished loading.
 * 
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Global game instance
     * @type {TicTacToeGame}
     * @global
     */
    window.ticTacToeGame = new TicTacToeGame();

    /**
     * Keyboard event handler for game controls
     * 
     * Supports:
     * - Number keys 1-9: Select corresponding cell
     * - 'R' key: Reset game
     * 
     * @listens keydown
     * @param {KeyboardEvent} event - The keyboard event
     */
    document.addEventListener('keydown', (event) => {
        // Cell selection with number keys (1-9)
        const key = parseInt(event.key);
        if (key >= 1 && key <= 9) {
            const cell = document.querySelector(`[data-index="${key - 1}"]`);
            if (cell) {
                cell.click(); // Trigger cell click
            }
        }
        
        // Reset game with 'R' key
        if (event.key.toLowerCase() === 'r') {
            window.ticTacToeGame.resetGame();
        }
    });

    /**
     * Double-click handler for complete score reset
     * 
     * Allows users to reset all scores by double-clicking the reset button.
     * Shows confirmation dialog to prevent accidental resets.
     * 
     * @listens dblclick
     */
    document.getElementById('reset-button').addEventListener('dblclick', () => {
        if (confirm('Reset all scores? This cannot be undone.')) {
            window.ticTacToeGame.resetAllScores();
        }
    });

    // Log initialization success and available controls
    console.log('Tic Tac Toe game initialized successfully!');
    console.log('Keyboard controls: 1-9 for cells, R for reset');
    console.log('Double-click reset button to clear all scores');
});