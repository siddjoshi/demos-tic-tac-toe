# Contributing Guidelines

Thank you for your interest in contributing to the Tic-Tac-Toe Game project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Code Review Checklist](#code-review-checklist)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards

**Positive behavior includes:**
- Being kind and courteous
- Providing constructive feedback
- Focusing on the issue, not the person
- Acknowledging good work

**Unacceptable behavior includes:**
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing others' private information

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- A GitHub account
- Git installed on your local machine
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor or IDE (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Fork and Clone

1. **Fork the repository**
   - Visit https://github.com/siddjoshi/demos-tic-tac-toe
   - Click the "Fork" button in the top right

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/demos-tic-tac-toe.git
   cd demos-tic-tac-toe
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/siddjoshi/demos-tic-tac-toe.git
   ```

### Development Setup

1. **Open the project**
   ```bash
   # Open in VS Code
   code .
   
   # Or use your preferred editor
   ```

2. **Start a local server** (optional but recommended)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Or directly open `index.html` in your browser

---

## Development Process

### Workflow

1. **Create a branch** for your work
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write code following our style guide
   - Test your changes thoroughly
   - Add/update documentation as needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```

4. **Keep your fork updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template

### Branch Naming

Use descriptive branch names:

- `feature/add-ai-player` - New features
- `fix/score-reset-bug` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/cleanup-css` - Code refactoring
- `test/add-unit-tests` - Test additions

---

## Code Standards

### JavaScript Style Guide

#### General Rules

```javascript
// Use ES6+ features
const myConst = 'value';    // Use const for constants
let myVariable = 'value';   // Use let for variables (not var)

// Use arrow functions for callbacks
array.map(item => item.value);

// Use template literals
const message = `Player ${player} wins!`;

// Use destructuring
const { X, O, draw } = scores;
```

#### Naming Conventions

```javascript
// Classes: PascalCase
class TicTacToeGame { }

// Functions/Methods: camelCase
function handleCellClick() { }

// Constants: UPPER_SNAKE_CASE
const MAX_PLAYERS = 2;

// Variables: camelCase
let currentPlayer = 'X';
```

#### Code Organization

```javascript
// Group related functionality
class TicTacToeGame {
  // 1. Constructor
  constructor() { }
  
  // 2. Initialization methods
  initializeGame() { }
  
  // 3. Event handlers
  handleCellClick() { }
  
  // 4. Game logic
  makeMove() { }
  checkWin() { }
  
  // 5. UI updates
  updateGameStatus() { }
  
  // 6. Utilities
  getGameState() { }
}
```

#### Comments

```javascript
/**
 * JSDoc for public methods
 * @param {number} index - The cell index
 * @returns {boolean} Success status
 */
makeMove(index) {
  // Inline comment for complex logic
  const winningConditions = this.getWinningConditions();
  
  // TODO: Add AI player support
}
```

### CSS Style Guide

#### Organization

```css
/* 1. Group by component */
/* Game Board */
.game-board {
  /* Layout first */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  /* Visual properties */
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  
  /* Spacing */
  padding: 15px;
  margin: 2rem auto;
}

/* 2. Mobile-last media queries */
@media (max-width: 480px) {
  .game-board {
    max-width: 220px;
  }
}
```

#### Naming

```css
/* Use descriptive, hyphenated names */
.game-board { }         /* Good */
.gb { }                 /* Bad - too cryptic */

/* State classes */
.cell.winning-cell { }  /* Good - describes state */
.cell.active { }        /* Bad - too generic */
```

### HTML Style Guide

```html
<!-- Use semantic HTML5 -->
<button>Click Me</button>          <!-- Good -->
<div onclick="...">Click Me</div>  <!-- Bad -->

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <div class="content">
    <p>Text</p>
  </div>
</div>

<!-- Descriptive IDs and classes -->
<div id="game-status"></div>       <!-- Good -->
<div id="gs"></div>                <!-- Bad -->

<!-- Self-documenting attributes -->
<div class="cell" data-index="0"></div>
```

---

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code follows style guidelines
- [ ] All tests pass (if applicable)
- [ ] Changes are tested in multiple browsers
- [ ] Documentation is updated
- [ ] Commit messages are clear and descriptive
- [ ] No merge conflicts with main branch
- [ ] Code is properly commented

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
How the changes were tested

## Screenshots (if applicable)
Visual changes shown here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Changes tested in multiple browsers
- [ ] Documentation updated
```

### PR Title Format

```
feat: Add AI player option
fix: Correct score reset bug
docs: Update API documentation
refactor: Simplify win check logic
style: Improve mobile responsiveness
test: Add unit tests for game logic
```

### Review Process

1. **Automated Checks**: Ensure all checks pass
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address any requested changes
4. **Approval**: PR approved by maintainer
5. **Merge**: Changes merged into main branch

---

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Try the latest version** to see if already fixed
3. **Gather information** about your environment

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 91
- OS: Windows 10
- Screen size: 1920x1080

## Screenshots
If applicable

## Additional Context
Any other relevant information
```

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Problem It Solves
What problem does this address?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Examples, mockups, etc.
```

### Issue Labels

Use appropriate labels:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

---

## Code Review Checklist

### For Authors (Self-Review)

**Before submitting PR:**
- [ ] Code is self-documenting with clear names
- [ ] Complex logic has explanatory comments
- [ ] No console.log statements left in code
- [ ] No commented-out code blocks
- [ ] Functions are small and focused
- [ ] No code duplication (DRY principle)
- [ ] Error cases are handled
- [ ] Changes work on mobile and desktop

**Testing:**
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari (if available)
- [ ] Tested on mobile device or emulator
- [ ] All features work as expected
- [ ] No console errors

### For Reviewers

**Code Quality:**
- [ ] Code is readable and maintainable
- [ ] Follows project style guidelines
- [ ] No unnecessary complexity
- [ ] Appropriate comments and documentation
- [ ] No security vulnerabilities

**Functionality:**
- [ ] Changes work as described
- [ ] No breaking changes to existing features
- [ ] Edge cases are handled
- [ ] Performance is acceptable

**Documentation:**
- [ ] README updated if needed
- [ ] API docs updated if needed
- [ ] Code comments are clear
- [ ] CHANGELOG updated

---

## Contribution Types

### Code Contributions

- New features
- Bug fixes
- Performance improvements
- Refactoring
- Test additions

### Documentation Contributions

- README improvements
- Code comments
- API documentation
- Guides and tutorials
- Typo fixes

### Design Contributions

- UI/UX improvements
- Accessibility enhancements
- Responsive design fixes
- Animation improvements

### Community Contributions

- Answering questions in issues
- Helping other contributors
- Improving contribution guidelines
- Testing and reporting bugs

---

## Development Tips

### Testing Your Changes

```javascript
// Use browser console to test
const game = window.ticTacToeGame;
console.log(game.getGameState());

// Test edge cases
game.board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
console.log(game.checkDraw());  // Should be true
```

### Debugging

```javascript
// Add breakpoints
debugger;  // Execution pauses here

// Log state changes
console.log('Before:', this.board);
this.makeMove(index, cell);
console.log('After:', this.board);
```

### Browser DevTools

- **F12** - Open DevTools
- **Ctrl+Shift+M** - Toggle device toolbar (mobile view)
- **Ctrl+Shift+C** - Inspect element
- **Ctrl+Shift+I** - Open DevTools (alternative)

---

## Resources

### Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript
- [JavaScript.info](https://javascript.info/) - Modern JavaScript
- [CSS Tricks](https://css-tricks.com/) - CSS techniques

### Tools

- [VS Code](https://code.visualstudio.com/) - Code editor
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Debugging
- [Git Documentation](https://git-scm.com/doc) - Version control

### Project Resources

- [API Documentation](docs/api.md)
- [Developer Guide](docs/developer-guide.md)
- [User Guide](docs/user-guide.md)

---

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Create a new issue with the `question` label
4. Be patient - we're all volunteers!

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🎉

---

*Last updated: November 2024*
