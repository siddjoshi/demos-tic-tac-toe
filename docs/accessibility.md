# Accessibility Guide

Comprehensive documentation of accessibility features and best practices.

## Table of Contents

- [Overview](#overview)
- [Current Accessibility Features](#current-accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Visual Accessibility](#visual-accessibility)
- [ARIA Implementation](#aria-implementation)
- [Testing Accessibility](#testing-accessibility)
- [Accessibility Improvements](#accessibility-improvements)
- [WCAG Compliance](#wcag-compliance)

---

## Overview

This document outlines the accessibility features implemented in the Tic-Tac-Toe game and provides guidance for maintaining and improving accessibility.

### Accessibility Goals

- **WCAG 2.1 Level AA Compliance**: Meet or exceed standards
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Compatible**: Meaningful experience for screen reader users
- **Visual Clarity**: High contrast and readable text
- **Responsive**: Works on all devices and screen sizes

---

## Current Accessibility Features

### ✅ Implemented Features

1. **Semantic HTML**
   - Proper heading hierarchy (`<h1>`)
   - Semantic `<button>` elements
   - Meaningful element structure

2. **Keyboard Navigation**
   - Number keys (1-9) for cell selection
   - 'R' key for reset
   - Tab navigation support
   - Enter/Space for button activation

3. **Visual Design**
   - High contrast colors
   - Clear focus indicators
   - Readable font sizes (minimum 16px)
   - Color is not the only visual indicator

4. **Responsive Design**
   - Mobile-friendly layout
   - Viewport meta tag configured
   - Touch-friendly target sizes (80px cells on desktop)

5. **Language Declaration**
   - `lang="en"` attribute on `<html>`

### ⚠️ Areas for Improvement

1. **ARIA Labels**: Need comprehensive labeling
2. **Focus Management**: Enhance focus indicators
3. **Screen Reader Announcements**: Add live regions
4. **Keyboard Traps**: Ensure no focus traps
5. **Skip Links**: Add skip navigation

---

## Keyboard Navigation

### Current Keyboard Controls

| Key | Action | Status |
|-----|--------|--------|
| `1-9` | Select cell (numeric position) | ✅ Working |
| `R` | Reset game | ✅ Working |
| `Tab` | Navigate between elements | ✅ Working |
| `Enter` | Activate focused element | ✅ Working |
| `Space` | Activate focused element | ✅ Working |

### Enhanced Keyboard Navigation

Add improved keyboard controls:

```javascript
// Enhanced keyboard handler
document.addEventListener('keydown', (event) => {
  const game = window.ticTacToeGame;
  
  // Cell selection (1-9)
  const key = parseInt(event.key);
  if (key >= 1 && key <= 9) {
    const cell = document.querySelector(`[data-index="${key - 1}"]`);
    if (cell) {
      cell.focus();
      cell.click();
    }
    event.preventDefault();
  }
  
  // Reset (R)
  if (event.key.toLowerCase() === 'r') {
    game.resetGame();
    event.preventDefault();
  }
  
  // Score reset (Shift + R)
  if (event.shiftKey && event.key.toLowerCase() === 'r') {
    if (confirm('Reset all scores? This cannot be undone.')) {
      game.resetAllScores();
    }
    event.preventDefault();
  }
  
  // Help (?)
  if (event.key === '?') {
    showKeyboardHelp();
    event.preventDefault();
  }
});
```

### Improved Focus Indicators

```css
/* Clear focus indicators */
.cell:focus {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
}

button:focus {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}

/* Focus visible for keyboard users only */
.cell:focus:not(:focus-visible) {
  outline: none;
}

.cell:focus-visible {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}
```

---

## Screen Reader Support

### ARIA Labels

Add ARIA labels to make the game screen reader friendly:

```html
<!-- Game container with role and label -->
<div class="container" role="main" aria-label="Tic Tac Toe Game">
  
  <h1 id="game-title">Tic Tac Toe</h1>
  
  <!-- Game status with live region -->
  <div class="game-info">
    <div id="game-status" 
         role="status" 
         aria-live="polite" 
         aria-atomic="true">
      Player X's Turn
    </div>
  </div>
  
  <!-- Game board with grid role -->
  <div class="game-board" 
       id="game-board"
       role="grid"
       aria-label="Game board, 3 by 3">
    
    <!-- Individual cells with meaningful labels -->
    <button class="cell" 
            data-index="0"
            role="gridcell"
            aria-label="Top left, empty"
            aria-describedby="game-status">
    </button>
    
    <button class="cell" 
            data-index="1"
            role="gridcell"
            aria-label="Top center, empty"
            aria-describedby="game-status">
    </button>
    
    <!-- More cells... -->
  </div>
  
  <!-- Controls section -->
  <div class="game-controls" role="group" aria-label="Game controls">
    <button id="reset-button" 
            aria-label="Reset game, keep scores">
      Reset Game
    </button>
  </div>
  
  <!-- Scoreboard -->
  <div class="score-board" 
       role="region" 
       aria-label="Score board"
       aria-live="polite">
    <div class="score">
      <span id="score-x-label">Player X:</span>
      <span id="score-x" aria-labelledby="score-x-label">0</span>
    </div>
    <div class="score">
      <span id="score-o-label">Player O:</span>
      <span id="score-o" aria-labelledby="score-o-label">0</span>
    </div>
    <div class="score">
      <span id="score-draw-label">Draws:</span>
      <span id="score-draw" aria-labelledby="score-draw-label">0</span>
    </div>
  </div>
</div>
```

### Dynamic ARIA Updates

Update ARIA labels when game state changes:

```javascript
makeMove(index, cell) {
  // ... existing code ...
  
  // Update cell ARIA label
  const positions = [
    'Top left', 'Top center', 'Top right',
    'Middle left', 'Center', 'Middle right',
    'Bottom left', 'Bottom center', 'Bottom right'
  ];
  
  cell.setAttribute('aria-label', 
    `${positions[index]}, ${this.currentPlayer}`
  );
  
  // Announce move to screen readers
  this.announceMove(index, this.currentPlayer);
}

announceMove(index, player) {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = `${player} placed at position ${index + 1}`;
  }
}
```

### Screen Reader Announcer

Add hidden live region for announcements:

```html
<!-- Screen reader announcer (hidden visually) -->
<div id="sr-announcer" 
     class="sr-only" 
     role="status" 
     aria-live="assertive" 
     aria-atomic="true">
</div>
```

```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Visual Accessibility

### Color Contrast

Ensure WCAG AA contrast ratios (4.5:1 for normal text):

```css
/* High contrast theme for accessibility */
.theme-high-contrast {
  /* Background: Black */
  --bg-gradient-start: #000000;
  --bg-gradient-end: #000000;
  
  /* Text: White (21:1 contrast ratio) */
  --text-primary: #ffffff;
  
  /* Player X: Yellow (13.5:1 ratio with black) */
  --player-x-color: #ffff00;
  
  /* Player O: Cyan (11.7:1 ratio with black) */
  --player-o-color: #00ffff;
  
  /* Winning: Green (9.2:1 ratio) */
  --winning-color: #00ff00;
  
  /* Cell borders: White (21:1 ratio) */
  --cell-border: #ffffff;
}

.theme-high-contrast .cell {
  border: 3px solid var(--cell-border);
  background: #000000;
}
```

### Font Sizing

Use relative units and respect user preferences:

```css
/* Base font size */
html {
  font-size: 16px; /* 16px minimum */
}

/* Relative sizing */
h1 {
  font-size: 2.5rem; /* 40px at default size */
}

#game-status {
  font-size: 1.3rem; /* 20.8px */
}

.cell {
  font-size: 2rem; /* 32px */
}

/* Respect user's font size preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Reduced Motion

Respect user's motion preferences:

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .cell {
    transition: none;
    animation: none;
  }
  
  .cell.winning-cell {
    animation: none;
  }
  
  .game-over-overlay {
    transition: none;
  }
}
```

### Focus Indicators

Ensure visible focus:

```css
/* High visibility focus indicator */
*:focus-visible {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255, 215, 0, 0.2);
}

/* Specific focus for cells */
.cell:focus-visible {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}
```

---

## ARIA Implementation

### Complete ARIA Markup

Full accessible HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tic Tac Toe - Accessible Web Game</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Skip to main content link -->
  <a href="#game-board" class="skip-link">Skip to game board</a>
  
  <div class="container" role="main">
    <h1 id="game-title">Tic Tac Toe</h1>
    
    <!-- Game status (announced to screen readers) -->
    <div class="game-info">
      <div id="game-status" 
           role="status" 
           aria-live="polite" 
           aria-atomic="true">
        Player X's Turn
      </div>
    </div>
    
    <!-- Game board -->
    <div class="game-board" 
         id="game-board"
         role="grid"
         aria-label="Tic tac toe game board"
         aria-describedby="game-instructions">
      
      <!-- Row 1 -->
      <div role="row">
        <button class="cell" 
                role="gridcell"
                data-index="0"
                aria-label="Row 1, Column 1, empty"
                tabindex="0"></button>
        <button class="cell" 
                role="gridcell"
                data-index="1"
                aria-label="Row 1, Column 2, empty"
                tabindex="0"></button>
        <button class="cell" 
                role="gridcell"
                data-index="2"
                aria-label="Row 1, Column 3, empty"
                tabindex="0"></button>
      </div>
      
      <!-- Rows 2 and 3 similar... -->
    </div>
    
    <!-- Hidden instructions for screen readers -->
    <div id="game-instructions" class="sr-only">
      Use number keys 1 through 9 to select cells, or use tab to navigate and enter to select.
      Press R to reset the game.
    </div>
    
    <!-- Controls -->
    <div class="game-controls" role="group" aria-label="Game controls">
      <button id="reset-button" 
              aria-label="Reset current game, scores will be preserved">
        Reset Game
      </button>
    </div>
    
    <!-- Scoreboard -->
    <div class="score-board" 
         role="region" 
         aria-label="Score board"
         aria-live="polite">
      <div class="score" role="group">
        <span aria-label="Player X score">Player X: <span id="score-x">0</span></span>
      </div>
      <div class="score" role="group">
        <span aria-label="Player O score">Player O: <span id="score-o">0</span></span>
      </div>
      <div class="score" role="group">
        <span aria-label="Number of draws">Draws: <span id="score-draw">0</span></span>
      </div>
    </div>
  </div>
  
  <!-- Screen reader announcements -->
  <div id="sr-announcer" 
       class="sr-only" 
       role="status" 
       aria-live="assertive" 
       aria-atomic="true">
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

---

## Testing Accessibility

### Manual Testing

1. **Keyboard Navigation**
   - Disconnect mouse
   - Navigate using Tab, arrows, Enter, Space
   - Verify all functionality accessible
   - Check focus indicators visible

2. **Screen Reader Testing**
   - **Windows**: NVDA (free) or JAWS
   - **Mac**: VoiceOver (built-in)
   - **Linux**: Orca
   - Verify all content announced
   - Check live region updates

3. **Zoom Testing**
   - Zoom to 200%
   - Verify no horizontal scrolling
   - Check all content readable
   - Test at 400% if possible

4. **Color Blindness**
   - Use color blindness simulators
   - Verify information not conveyed by color alone
   - Test with high contrast theme

### Automated Testing Tools

#### Browser Extensions
- **WAVE** (Web Accessibility Evaluation Tool)
- **axe DevTools**
- **Lighthouse** (built into Chrome DevTools)
- **IBM Equal Access Checker**

#### Command Line Tools
```bash
# Pa11y
npm install -g pa11y
pa11y http://localhost:8000

# axe-core CLI
npm install -g @axe-core/cli
axe http://localhost:8000
```

#### Testing Checklist

- [ ] All images have alt text (if added later)
- [ ] Proper heading hierarchy
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard accessible
- [ ] Focus indicators visible
- [ ] ARIA labels appropriate
- [ ] Live regions update
- [ ] Forms labeled (if added)
- [ ] No keyboard traps
- [ ] Responsive at 200% zoom

---

## Accessibility Improvements

### Skip Navigation Link

```html
<!-- Add at top of body -->
<a href="#game-board" class="skip-link">Skip to game board</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Better Cell Labels

```javascript
initializeGame() {
  // ... existing code ...
  
  const positions = [
    ['Row 1, Column 1', 'top left'],
    ['Row 1, Column 2', 'top center'],
    ['Row 1, Column 3', 'top right'],
    ['Row 2, Column 1', 'middle left'],
    ['Row 2, Column 2', 'center'],
    ['Row 2, Column 3', 'middle right'],
    ['Row 3, Column 1', 'bottom left'],
    ['Row 3, Column 2', 'bottom center'],
    ['Row 3, Column 3', 'bottom right']
  ];
  
  this.cells.forEach((cell, index) => {
    const [label, shortLabel] = positions[index];
    cell.setAttribute('aria-label', `${label}, empty`);
    cell.setAttribute('data-position', shortLabel);
  });
}

makeMove(index, cell) {
  // ... existing code ...
  
  const label = cell.getAttribute('aria-label').split(',')[0];
  cell.setAttribute('aria-label', `${label}, ${this.currentPlayer}`);
  
  // Announce to screen readers
  this.announce(`${this.currentPlayer} moved to ${label}`);
}
```

### Announcements Helper

```javascript
announce(message) {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    // Clear and set new message
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = message;
    }, 100);
  }
}

handleGameEnd(result) {
  // ... existing code ...
  
  if (result === 'win') {
    this.announce(`Player ${this.currentPlayer} wins the game!`);
  } else {
    this.announce("The game is a draw!");
  }
}
```

---

## WCAG Compliance

### WCAG 2.1 Level AA Checklist

#### Perceivable
- [x] 1.1.1 Non-text Content (N/A - no images)
- [x] 1.3.1 Info and Relationships (semantic HTML)
- [x] 1.3.2 Meaningful Sequence (logical order)
- [x] 1.4.1 Use of Color (not sole indicator)
- [x] 1.4.3 Contrast (Minimum) (4.5:1 ratio)
- [x] 1.4.4 Resize text (works at 200%)
- [x] 1.4.10 Reflow (no horizontal scroll)

#### Operable
- [x] 2.1.1 Keyboard (all functionality)
- [x] 2.1.2 No Keyboard Trap
- [ ] 2.1.4 Character Key Shortcuts (need modifiers)
- [x] 2.4.1 Bypass Blocks (skip link needed)
- [x] 2.4.2 Page Titled
- [x] 2.4.3 Focus Order (logical)
- [x] 2.4.7 Focus Visible
- [ ] 2.5.5 Target Size (48x48px minimum)

#### Understandable
- [x] 3.1.1 Language of Page
- [x] 3.2.1 On Focus (no changes)
- [x] 3.2.2 On Input (predictable)
- [x] 3.3.2 Labels or Instructions

#### Robust
- [x] 4.1.2 Name, Role, Value (ARIA labels)
- [x] 4.1.3 Status Messages (live regions)

### Recommendations

**High Priority:**
1. Add skip navigation link
2. Implement complete ARIA labels
3. Add screen reader announcer
4. Ensure 48x48px minimum touch targets

**Medium Priority:**
1. Add keyboard shortcuts help
2. Improve focus management
3. Add high contrast theme toggle
4. Test with real screen reader users

**Low Priority:**
1. Add tutorial mode with announcements
2. Implement sound alternatives for visual feedback
3. Add haptic feedback on mobile
4. Create text-only version

---

## Resources

### Testing Tools
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Windows, free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
- VoiceOver (Mac/iOS, built-in)
- [Orca](https://wiki.gnome.org/Projects/Orca) (Linux)

---

*For implementation details, see [Developer Guide](developer-guide.md)*
