# 🎮 Tic-Tac-Toe Game

A modern, interactive tic-tac-toe game built with vanilla JavaScript, featuring a beautiful UI, scoring system, and keyboard controls.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Game Features](#game-features)
- [Technical Implementation](#technical-implementation)
- [Documentation](#documentation)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This is a fully-featured, professional-grade tic-tac-toe game implementation that showcases modern web development practices. Built with clean, object-oriented JavaScript and featuring a gorgeous glassmorphic UI design, this project serves as both an enjoyable game and an educational resource for web developers.

### Key Highlights

- **Zero Dependencies**: Pure vanilla JavaScript, HTML, and CSS
- **Modern UI**: Glassmorphic design with smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Accessible**: Keyboard controls and semantic HTML
- **Well-Documented**: Comprehensive JSDoc comments and documentation

## ✨ Features

### Gameplay Features
- ✅ Classic 3x3 tic-tac-toe gameplay
- ✅ Two-player turn-based system
- ✅ Win detection for all 8 possible winning combinations
- ✅ Draw detection when board is full
- ✅ Visual win highlighting with animations
- ✅ Auto-reset after game completion

### Scoring System
- 📊 Persistent score tracking for both players
- 📊 Draw counter
- 📊 Score preservation across game rounds
- 📊 Manual score reset with confirmation

### User Interface
- 🎨 Beautiful glassmorphic design
- 🎨 Gradient backgrounds
- 🎨 Smooth animations and transitions
- 🎨 Game over overlay with celebration messages
- 🎨 Responsive layout for all screen sizes
- 🎨 Hover effects and visual feedback

### Controls
- ⌨️ Mouse/touch input for cell selection
- ⌨️ Keyboard support (numbers 1-9 for cells)
- ⌨️ 'R' key for quick reset
- ⌨️ Double-click reset button to clear all scores

### Technical Features
- 🔧 Object-oriented JavaScript architecture
- 🔧 Event-driven programming
- 🔧 Clean separation of concerns
- 🔧 Modular and maintainable code
- 🔧 State management with getter/setter methods
- 🔧 Extensible class-based design

## 🚀 Demo

### Live Demo
[Play the game here](#) *(Add your GitHub Pages or deployment URL)*

### Screenshots

**Main Game Interface**
```
┌─────────────────────────┐
│     Tic Tac Toe         │
│   Player X's Turn       │
│  ┌───┬───┬───┐          │
│  │ X │   │ O │          │
│  ├───┼───┼───┤          │
│  │   │ X │   │          │
│  ├───┼───┼───┤          │
│  │ O │   │   │          │
│  └───┴───┴───┘          │
│   [Reset Game]          │
│  Player X: 2            │
│  Player O: 1            │
│  Draws: 0               │
└─────────────────────────┘
```

## 🏁 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddjoshi/demos-tic-tac-toe.git
   cd demos-tic-tac-toe
   ```

2. **Open the game**
   
   Simply open `index.html` in your web browser:
   
   - **Double-click** the `index.html` file, or
   - **Drag and drop** `index.html` into your browser, or
   - **Use a local server** (recommended for development):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```
   
   Then navigate to `http://localhost:8000`

3. **Start playing!** 🎮

### Quick Start

No installation needed! Just:
1. Download the three files (`index.html`, `styles.css`, `script.js`)
2. Keep them in the same directory
3. Open `index.html` in your browser

## 🎮 Game Features

### How to Play

1. **Starting the Game**: The game begins with Player X's turn
2. **Making Moves**: Click on any empty cell to place your mark (X or O)
3. **Winning**: Get three of your marks in a row (horizontal, vertical, or diagonal)
4. **Drawing**: If all cells are filled with no winner, the game ends in a draw
5. **Next Round**: The game automatically resets after 3 seconds

### Scoring System

- **Player X Score**: Increments when Player X wins
- **Player O Score**: Increments when Player O wins
- **Draw Score**: Increments when the game ends in a draw
- **Score Persistence**: Scores persist across multiple game rounds
- **Score Reset**: Double-click the "Reset Game" button to clear all scores

### Keyboard Controls

| Key | Action |
|-----|--------|
| `1-9` | Select cell (1 = top-left, 9 = bottom-right) |
| `R` | Reset current game |
| `Double-click Reset` | Clear all scores |

**Cell Numbering Layout:**
```
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```

### Responsive Design

The game automatically adapts to different screen sizes:

- **Desktop**: Full-sized board (80px cells) with all features
- **Tablet**: Optimized layout maintaining all functionality
- **Mobile**: Compact design (60px cells) with stacked score display

## 🔧 Technical Implementation

### Architecture Overview

The game follows a clean, object-oriented architecture:

```
TicTacToeGame (Main Class)
├── State Management
│   ├── board (game grid state)
│   ├── currentPlayer (X or O)
│   ├── gameActive (game in progress flag)
│   └── scores (score tracking)
├── Game Logic
│   ├── makeMove()
│   ├── checkWin()
│   ├── checkDraw()
│   └── switchPlayer()
├── UI Management
│   ├── updateGameStatus()
│   ├── updateScoreBoard()
│   └── showGameOverMessage()
└── Event Handling
    ├── handleCellClick()
    └── Keyboard listeners
```

### Technology Stack

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern styling with:
  - Flexbox and Grid layouts
  - CSS animations and transitions
  - Glassmorphism effects
  - Media queries for responsiveness
- **JavaScript (ES6+)**: 
  - Classes and object-oriented programming
  - Arrow functions
  - Template literals
  - Destructuring
  - Spread operators

### File Structure

```
demos-tic-tac-toe/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # Game logic and interactivity
├── README.md           # This file
├── CONTRIBUTING.md     # Contribution guidelines
├── CHANGELOG.md        # Version history
├── LICENSE             # MIT License
└── docs/
    ├── api.md          # API documentation
    ├── user-guide.md   # User guide
    ├── developer-guide.md   # Developer documentation
    ├── deployment.md   # Deployment instructions
    ├── customization.md     # Customization guide
    └── accessibility.md     # Accessibility documentation
```

### Code Organization Principles

1. **Single Responsibility**: Each method has one clear purpose
2. **DRY (Don't Repeat Yourself)**: Reusable methods and utilities
3. **Separation of Concerns**: UI, logic, and state are separated
4. **Encapsulation**: State is managed within the class
5. **Extensibility**: Easy to add new features

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[API Documentation](docs/api.md)**: Complete TicTacToeGame class reference
- **[User Guide](docs/user-guide.md)**: Detailed gameplay instructions
- **[Developer Guide](docs/developer-guide.md)**: Architecture and development guide
- **[Deployment Guide](docs/deployment.md)**: Hosting and deployment options
- **[Customization Guide](docs/customization.md)**: Theming and modification guide
- **[Accessibility Guide](docs/accessibility.md)**: Accessibility features and implementation

## 🌐 Browser Compatibility

This game works on all modern browsers:

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome  | 60+ | ✅ Fully Supported |
| Firefox | 60+ | ✅ Fully Supported |
| Safari  | 12+ | ✅ Fully Supported |
| Edge    | 79+ | ✅ Fully Supported |
| Opera   | 47+ | ✅ Fully Supported |

**Mobile Browsers**: Fully supported on iOS Safari, Chrome Mobile, and Firefox Mobile.

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using vanilla JavaScript
- Inspired by classic tic-tac-toe gameplay
- Designed for learning and portfolio demonstration

## 📞 Contact

**Project Link**: [https://github.com/siddjoshi/demos-tic-tac-toe](https://github.com/siddjoshi/demos-tic-tac-toe)

---

⭐ If you found this project helpful, please consider giving it a star!

**Made with passion for clean code and great UX** 🚀
