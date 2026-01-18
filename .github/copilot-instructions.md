# MIDI ASCII Art - Copilot Instructions

## Project Overview

This is a real-time MIDI visualizer that generates ASCII art patterns in the terminal when MIDI keys are pressed. Each of the 88 piano keys is mapped to one of 7 patterns (wave, diagonal, circle, grid, noise, chevron, spiral) using modulo arithmetic.

## Architecture

**Main entry point:** `index.js` - CLI application using Commander.js that:

- Connects to first available MIDI input device (via easymidi)
- Maps each MIDI note to a pattern generator function
- Maintains per-note salt values (note \* 1000 + timestamp) for consistent randomization
- Clears terminal and renders full-screen ASCII art on each key press

**Utility modules:**

- `src/` directory contains pure functions with no side effects:
- `ascii.js` - 7 pattern generators, each returns `string[][]` grid. Uses seeded PRNG (`createRandom`) for deterministic output
- `devices.js` - MIDI device listing/connection via easymidi wrapper
- `shutdown.js` - SIGINT handler that restores cursor visibility and closes MIDI connection

## Code Conventions

- **Arrow functions only** - No function declarations, use `const funcName = () => {}`
- **Pure utilities** - Scripts in `src/` directory never call console.log or process.exit; they throw errors instead
- **Error handling boundary** - Main file (index.js) catches errors from utilities and handles logging/exit
- **JSDoc comments** - All exported functions have complete JSDoc with @param and @returns
- **ESM imports** - Using ES modules (`type: "module"` in package.json)

## Pattern Generator Pattern

All 7 pattern functions in `src/ascii.js` follow this signature:

```javascript
export const generatePattern = (columns, rows, salt = 0) => {
  const random = createRandom(salt) // Seeded PRNG
  const chars = ['◦', '○', '●'] // Pattern-specific characters
  const grid = []

  // Build 2D array with mathematical formula
  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      // Math-based pattern logic here
      row.push(char)
    }
    grid.push(row)
  }

  return grid // string[][]
}
```

When adding new patterns:

1. Create deterministic visualization using the seeded random() function
2. Return 2D string array (grid)
3. Add to patterns array in index.js
4. Use Unicode box-drawing or geometric characters for visual interest

## Development Workflow

- `npm start` - Run the application (requires connected MIDI device)
- `npm run lint` - Check ESLint + Prettier formatting
- `npm run format` - Auto-fix linting and formatting issues
- `npm test` - Alias for lint (no unit tests currently)

Uses @electerious/eslint-config and @electerious/prettier-config for consistent code style.

## Key Dependencies

- **easymidi** - Cross-platform MIDI I/O (wraps native bindings)
- **commander** - CLI argument parsing for --columns and --rows options

Note: Terminal dimensions default to `process.stdout.columns` and `process.stdout.rows - 2`
