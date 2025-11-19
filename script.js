/**
 * Tic Tac Toe Game Implementation
 * A complete interactive tic-tac-toe game with scoring system
 */

class TicTacToeGame {
    constructor() {
        // Game state variables
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };

        // Winning combinations (indices of board array)
        this.winningConditions = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
        ];

        // Initialize the game
        this.initializeGame();
    }

    /**
     * Initialize game elements and event listeners
     */
    initializeGame() {
        // Get DOM elements
        this.gameBoard = document.getElementById('game-board');
        this.gameStatus = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-button');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.scoreDraw = document.getElementById('score-draw');
        this.cells = document.querySelectorAll('.cell');

        // Add event listeners
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });

        this.resetButton.addEventListener('click', this.resetGame.bind(this));

        // Update initial display
        this.updateGameStatus();
        this.updateScoreBoard();
    }

    /**
     * Handle cell click events
     * @param {Event} event - The click event
     */
    handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        // Check if cell is already filled or game is not active
        if (this.board[cellIndex] !== '' || !this.gameActive) {
            return;
        }

        // Make the move
        this.makeMove(cellIndex, cell);
    }

    /**
     * Execute a move on the board
     * @param {number} index - The board index (0-8)
     * @param {HTMLElement} cell - The cell element
     */
    makeMove(index, cell) {
        // Update board state
        this.board[index] = this.currentPlayer;
        
        // Update cell display
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());

        // Add animation effect
        cell.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 150);

        // Check for win or draw
        if (this.checkWin()) {
            this.handleGameEnd('win');
        } else if (this.checkDraw()) {
            this.handleGameEnd('draw');
        } else {
            // Switch player and continue
            this.switchPlayer();
            this.updateGameStatus();
        }
    }

    /**
     * Check if current player has won
     * @returns {boolean} True if current player has won
     */
    checkWin() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                
                // Highlight winning cells
                this.highlightWinningCells(condition);
                return true;
            }
            return false;
        });
    }

    /**
     * Check if the game is a draw
     * @returns {boolean} True if all cells are filled and no winner
     */
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    /**
     * Highlight the winning combination cells
     * @param {number[]} winningCells - Array of winning cell indices
     */
    highlightWinningCells(winningCells) {
        winningCells.forEach(index => {
            this.cells[index].classList.add('winning-cell');
        });
    }

    /**
     * Handle game end (win or draw)
     * @param {string} result - 'win' or 'draw'
     */
    handleGameEnd(result) {
        this.gameActive = false;

        if (result === 'win') {
            this.scores[this.currentPlayer]++;
            this.updateGameStatus(`Player ${this.currentPlayer} Wins! 🎉`);
            this.showGameOverMessage(`Player ${this.currentPlayer} Wins!`, 'Congratulations! 🎉');
        } else {
            this.scores.draw++;
            this.updateGameStatus("It's a Draw! 🤝");
            this.showGameOverMessage("It's a Draw!", 'Good game! 🤝');
        }

        this.updateScoreBoard();
        
        // Auto-reset after 3 seconds
        setTimeout(() => {
            this.resetGame();
        }, 3000);
    }

    /**
     * Show game over message overlay
     * @param {string} title - Main message
     * @param {string} subtitle - Subtitle message
     */
    showGameOverMessage(title, subtitle) {
        // Create overlay if it doesn't exist
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

        // Show overlay
        overlay.classList.add('show');

        // Hide overlay after 2.5 seconds
        setTimeout(() => {
            overlay.classList.remove('show');
        }, 2500);
    }

    /**
     * Switch to the next player
     */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    /**
     * Update the game status display
     * @param {string} message - Optional custom message
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
     */
    updateScoreBoard() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.scoreDraw.textContent = this.scores.draw;
    }

    /**
     * Reset the current game (keep scores)
     */
    resetGame() {
        // Reset game state
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;

        // Clear cell contents and classes
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
            cell.style.transform = '';
        });

        // Update status
        this.updateGameStatus();

        // Hide game over overlay if visible
        const overlay = document.querySelector('.game-over-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    /**
     * Reset all scores (complete reset)
     */
    resetAllScores() {
        this.scores = { X: 0, O: 0, draw: 0 };
        this.updateScoreBoard();
        this.resetGame();
    }

    /**
     * Get current game state
     * @returns {Object} Current game state
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
     * @param {Object} state - Game state to restore
     */
    setGameState(state) {
        this.board = [...state.board];
        this.currentPlayer = state.currentPlayer;
        this.gameActive = state.gameActive;
        this.scores = { ...state.scores };

        // Update display
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index];
            cell.classList.remove('x', 'o', 'winning-cell');
            if (this.board[index]) {
                cell.classList.add(this.board[index].toLowerCase());
            }
        });

        this.updateGameStatus();
        this.updateScoreBoard();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global game instance
    window.ticTacToeGame = new TicTacToeGame();

    // Add keyboard support
    document.addEventListener('keydown', (event) => {
        // Numbers 1-9 for cell selection
        const key = parseInt(event.key);
        if (key >= 1 && key <= 9) {
            const cell = document.querySelector(`[data-index="${key - 1}"]`);
            if (cell) {
                cell.click();
            }
        }
        
        // 'R' key for reset
        if (event.key.toLowerCase() === 'r') {
            window.ticTacToeGame.resetGame();
        }
    });

    // Add double-click to reset all scores
    document.getElementById('reset-button').addEventListener('dblclick', () => {
        if (confirm('Reset all scores? This cannot be undone.')) {
            window.ticTacToeGame.resetAllScores();
        }
    });

    console.log('Tic Tac Toe game initialized successfully!');
    console.log('Keyboard controls: 1-9 for cells, R for reset');
    console.log('Double-click reset button to clear all scores');
});