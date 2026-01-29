# MIDI ASCII Art - Copilot Instructions

## Project Overview

This is a real-time MIDI visualizer that generates ASCII art patterns in the terminal when MIDI keys are pressed. Each of the 88 piano keys is mapped to one of 7 patterns (wave, diagonal, circle, grid, noise, chevron, spiral) using modulo arithmetic.

- Connects to first available MIDI input device
- Maps each MIDI note to a pattern generator function
- Maintains per-note salt values for consistent randomization
- Clears terminal and renders full-screen ASCII art on each key press

## Structure

- `bin/` CLI and main entry point
- `src/` directory contains pure functions with no side effects:

## Code Conventions

- **Arrow functions only** - No function declarations, use `const funcName = () => {}`
- **Pure utilities** - Scripts in `src/` directory never call console.log or process.exit; they throw errors instead
- **Error handling boundary** - Main file (index.js) catches errors from utilities and handles logging/exit
- **JSDoc comments** - All exported functions have complete JSDoc with @param and @returns
- **ESM imports** - Using ES modules (`type: "module"` in package.json)

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
