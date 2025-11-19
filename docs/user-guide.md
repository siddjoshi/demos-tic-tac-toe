# User Guide

A comprehensive guide to playing and enjoying the Tic-Tac-Toe game.

## Table of Contents

- [Introduction](#introduction)
- [Game Rules](#game-rules)
- [Getting Started](#getting-started)
- [Game Interface](#game-interface)
- [How to Play](#how-to-play)
- [Scoring System](#scoring-system)
- [Controls and Shortcuts](#controls-and-shortcuts)
- [Features](#features)
- [Tips and Strategies](#tips-and-strategies)
- [Troubleshooting](#troubleshooting)

---

## Introduction

Welcome to the modern Tic-Tac-Toe game! This classic game has been reimagined with a beautiful interface, smooth animations, and enhanced features while maintaining the simple, fun gameplay you know and love.

Whether you're playing casually with a friend or trying to master strategic play, this guide will help you get the most out of your gaming experience.

---

## Game Rules

### Basic Rules

Tic-Tac-Toe is a two-player game played on a 3×3 grid. The rules are simple:

1. **Players**: Two players take turns - one plays as **X** and the other as **O**
2. **Objective**: Be the first to get three of your marks in a row
3. **Valid Rows**: A row can be:
   - **Horizontal** (across any of the 3 rows)
   - **Vertical** (down any of the 3 columns)
   - **Diagonal** (across either diagonal)

### Winning Conditions

A player wins by placing three of their marks in a row in any of these patterns:

```
Horizontal Wins:
X X X | . . . | . . .
. . . | O O O | . . .
. . . | . . . | X X X

Vertical Wins:
X . . | . O . | . . X
X . . | . O . | . . X
X . . | . O . | . . X

Diagonal Wins:
X . . | . . O
. X . | . O .
. . X | O . .
```

### Draw Condition

The game ends in a draw when:
- All 9 cells are filled
- Neither player has three marks in a row

---

## Getting Started

### Opening the Game

1. Open `index.html` in any modern web browser
2. The game loads immediately - no installation or setup required
3. The game starts with Player X's turn

### First Time Playing

When you first load the game, you'll see:
- An empty 3×3 game board
- Status message showing "Player X's Turn"
- A "Reset Game" button
- Scoreboard showing 0 for all scores

---

## Game Interface

### Interface Elements

```
┌─────────────────────────────────┐
│       Tic Tac Toe               │ ← Game Title
├─────────────────────────────────┤
│     Player X's Turn             │ ← Status Display
├─────────────────────────────────┤
│      ┌────┬────┬────┐           │
│      │ 1  │ 2  │ 3  │           │
│      ├────┼────┼────┤           │
│      │ 4  │ 5  │ 6  │           │ ← Game Board
│      ├────┼────┼────┤           │
│      │ 7  │ 8  │ 9  │           │
│      └────┴────┴────┘           │
├─────────────────────────────────┤
│      [Reset Game]               │ ← Reset Button
├─────────────────────────────────┤
│  Player X: 0                    │
│  Player O: 0                    │ ← Scoreboard
│  Draws: 0                       │
└─────────────────────────────────┘
```

#### 1. Game Title
- Shows "Tic Tac Toe"
- Styled with gradient effect

#### 2. Status Display
- Shows whose turn it is
- Displays win/draw messages
- Updates automatically after each move

#### 3. Game Board
- 3×3 grid of clickable cells
- Cells are numbered 1-9 (for keyboard control)
- Cells highlight on hover
- Shows X in red, O in teal

#### 4. Reset Button
- **Single click**: Starts a new game (keeps scores)
- **Double click**: Resets all scores (asks for confirmation)

#### 5. Scoreboard
- **Player X**: Total wins for Player X
- **Player O**: Total wins for Player O
- **Draws**: Total number of draws
- Scores persist across game rounds

---

## How to Play

### Step-by-Step Gameplay

#### Starting a Game

1. The game begins with Player X's turn
2. The status displays "Player X's Turn"
3. The board is empty and ready

#### Making a Move

**Option 1: Using Mouse/Touch**
1. Click on any empty cell
2. Your mark (X or O) appears with an animation
3. The turn automatically switches to the other player

**Option 2: Using Keyboard**
1. Press a number key (1-9) corresponding to the cell
2. The cell is selected automatically
3. Your mark appears in that cell

```
Cell numbering:
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```

#### During the Game

- **Each Turn**: 
  - Current player selects an empty cell
  - Mark appears with smooth animation
  - Status updates to show next player's turn

- **Invalid Moves**: 
  - Clicking filled cells does nothing
  - No move is made on occupied cells

#### Winning the Game

When a player gets three in a row:
1. Winning cells highlight with gold animation
2. Status displays "Player [X/O] Wins! 🎉"
3. Victory message overlay appears
4. Score updates for the winning player
5. Game automatically resets after 3 seconds

#### Draw Game

When all cells are filled with no winner:
1. Status displays "It's a Draw! 🤝"
2. Draw message overlay appears
3. Draw counter increments
4. Game automatically resets after 3 seconds

#### Starting Next Round

- Game resets automatically after 3 seconds
- Or press 'R' key for immediate reset
- Or click "Reset Game" button
- Scores carry over to next round

---

## Scoring System

### How Scoring Works

The game tracks wins and draws across multiple rounds:

```
┌─────────────────────┐
│  Player X: 3        │ ← X has won 3 games
│  Player O: 2        │ ← O has won 2 games
│  Draws: 1           │ ← 1 game ended in draw
└─────────────────────┘
```

### Score Updates

- **Win**: The winning player's score increases by 1
- **Draw**: The draw counter increases by 1
- **Persistence**: Scores remain until manually reset

### Resetting Scores

**Keep Current Scores:**
- Single-click "Reset Game" button
- Press 'R' key
- Starts new game, scores unchanged

**Clear All Scores:**
- Double-click "Reset Game" button
- Confirm the prompt
- All scores reset to 0
- New game starts fresh

---

## Controls and Shortcuts

### Mouse/Touch Controls

| Action | Description |
|--------|-------------|
| **Click cell** | Place your mark in that cell |
| **Click Reset** | Start new game (keep scores) |
| **Double-click Reset** | Clear all scores (with confirmation) |
| **Hover cell** | Preview cell selection |

### Keyboard Controls

| Key | Action | Description |
|-----|--------|-------------|
| **1-9** | Select cell | Numbers map to board positions |
| **R** | Reset game | Quick reset (keeps scores) |
| **ESC** | (Browser) | Close any dialogs |

### Cell Numbering Reference

Quick reference for keyboard play:

```
Top Row:     1  2  3
Middle Row:  4  5  6
Bottom Row:  7  8  9

Example moves:
- Press '5' for center cell
- Press '1' for top-left corner
- Press '9' for bottom-right corner
```

### Pro Tips for Controls

- **Speed Play**: Use keyboard numbers for faster moves
- **Quick Reset**: Press 'R' to instantly restart
- **Mobile**: Tap cells directly - no keyboard needed
- **Accessibility**: All controls work with keyboard for accessibility

---

## Features

### Visual Features

#### Animations
- **Cell Selection**: Smooth scale animation when marking
- **Win Highlight**: Pulsing animation on winning cells
- **Victory Screen**: Fade-in overlay with celebration message
- **Hover Effects**: Cells glow on mouse hover

#### Color Coding
- **Player X**: Red marks (`#ff6b6b`)
- **Player O**: Teal marks (`#4ecdc4`)
- **Winning Cells**: Gold highlight (`#ffd700`)

#### Responsive Design
- **Desktop**: Full-size board (80px cells)
- **Tablet**: Optimized medium layout
- **Mobile**: Compact board (60px cells)
- **All Devices**: Touch and click support

### Game Features

#### Automatic Features
- **Turn Management**: Automatic player switching
- **Win Detection**: Instant win checking after each move
- **Auto-reset**: Game resets 3 seconds after completion
- **Score Tracking**: Persistent scoring across rounds

#### Interactive Features
- **Real-time Status**: Always shows current game state
- **Visual Feedback**: Immediate response to all actions
- **Victory Celebration**: Special message for winners
- **Draw Recognition**: Acknowledges tied games

---

## Tips and Strategies

### Basic Strategy

#### Opening Moves
1. **Center Control**: Taking the center (cell 5) is often strongest
2. **Corner Start**: Corners (1, 3, 7, 9) offer multiple win paths
3. **Avoid Edges**: Edge cells (2, 4, 6, 8) offer fewer opportunities

#### Winning Tactics
- **Fork Creation**: Set up two winning threats at once
- **Block Opponent**: Always block if opponent has two in a row
- **Think Ahead**: Plan 2-3 moves in advance

### Advanced Tips

#### Perfect Play Strategy
1. **First Move (X)**: Play center or corner
2. **Second Move (O)**: Play center if available, else corner
3. **Force Forks**: Create positions where you threaten multiple wins
4. **Prevent Forks**: Block opponent's fork opportunities

#### Common Patterns

**The Fork:**
```
X . .    X . O    X . O
. X .  → . X .  → . X .
. . .    . . .    X . O  ← X wins next turn (multiple options)
```

**The Block:**
```
X X .    X X O    
. . .  → . . .    ← O must block or lose
. . .    . . .    
```

### Psychological Play

- **Stay Patient**: Don't rush your moves
- **Watch Patterns**: Learn your opponent's tendencies
- **Stay Focused**: One mistake can cost the game
- **Practice**: Improve through repeated play

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Can't Click on Cells

**Possible Causes:**
- Cell already filled
- Game has ended
- Browser issue

**Solutions:**
1. Check if cell is empty
2. Press 'R' to reset game
3. Refresh the browser page
4. Try a different browser

#### Issue: Keyboard Controls Not Working

**Possible Causes:**
- Focus not on game
- Browser compatibility
- Num pad vs number keys

**Solutions:**
1. Click anywhere on the page first
2. Use number row keys (not num pad)
3. Try clicking cells with mouse instead
4. Check browser console for errors

#### Issue: Game Not Displaying Correctly

**Possible Causes:**
- Browser too old
- CSS not loaded
- Zoom level too high/low

**Solutions:**
1. Use a modern browser (Chrome, Firefox, Safari, Edge)
2. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. Reset browser zoom to 100%
4. Clear browser cache

#### Issue: Scores Not Updating

**Possible Causes:**
- Display issue
- JavaScript error

**Solutions:**
1. Refresh the page
2. Check browser console (F12) for errors
3. Try clearing browser cache
4. Restart the browser

#### Issue: Auto-reset Not Working

**Possible Causes:**
- Timer interrupted
- JavaScript issue

**Solutions:**
1. Manually press 'R' to reset
2. Click "Reset Game" button
3. Refresh the page if persistent
4. Check browser console for errors

### Performance Issues

#### Slow Animations

**Solutions:**
1. Close other browser tabs
2. Update your browser
3. Disable browser extensions temporarily
4. Check CPU usage

#### Mobile Issues

**Solutions:**
1. Try landscape/portrait orientation
2. Ensure touch events are enabled
3. Clear mobile browser cache
4. Update mobile browser

### Getting Help

If you encounter issues not covered here:

1. **Check Browser Console**: 
   - Press F12 (or Cmd+Option+I on Mac)
   - Look for error messages in Console tab

2. **Try Different Browser**:
   - Test in Chrome, Firefox, or Safari
   - Ensures browser compatibility

3. **Refresh Page**:
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Clears cached files

4. **Report Issues**:
   - Check the GitHub repository
   - Create an issue with details
   - Include browser and OS information

---

## Frequently Asked Questions

### Gameplay Questions

**Q: Who goes first?**  
A: Player X always starts the first game. After reset, X starts again.

**Q: Can I undo a move?**  
A: No, moves are final. This follows classic tic-tac-toe rules.

**Q: How do I know who won?**  
A: Winning cells highlight in gold, and a victory message appears.

**Q: What happens in a draw?**  
A: Draw counter increases, special message appears, game resets.

### Feature Questions

**Q: Do scores save if I close the browser?**  
A: No, scores reset when you reload the page. This is by design for quick play sessions.

**Q: Can I play against computer?**  
A: Currently only 2-player mode. AI mode is a potential future feature.

**Q: Can I change colors or themes?**  
A: See the [Customization Guide](customization.md) for theming options.

**Q: Is there sound?**  
A: Currently no sound effects. This keeps the game lightweight and universally compatible.

### Technical Questions

**Q: What browsers are supported?**  
A: All modern browsers (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+).

**Q: Does it work offline?**  
A: Yes! Once loaded, no internet connection is needed.

**Q: Can I embed this in my website?**  
A: Yes, see the [Developer Guide](developer-guide.md) for integration instructions.

**Q: Is this open source?**  
A: Yes, under MIT License. See [LICENSE](../LICENSE) file.

---

## Conclusion

Enjoy playing Tic-Tac-Toe! Whether you're playing casually or competitively, we hope this guide enhances your gaming experience.

**Happy gaming! 🎮**

---

*For technical details, see the [Developer Guide](developer-guide.md) | For code documentation, see the [API Reference](api.md)*
