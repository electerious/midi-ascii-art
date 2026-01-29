# MIDI ASCII Art

> Generate beautiful ASCII art patterns in your terminal by playing MIDI keys

> ⚠️ This project has been vibe coded

A real-time MIDI visualizer that transforms your keyboard playing into mesmerizing ASCII art. Each of the 88 piano keys triggers one of seven unique patterns—waves, spirals, grids, and more—creating an interactive visual experience right in your terminal.

## Install

```sh
npm install
```

## Usage

### CLI

```sh
npm start
npm start -- --columns 100 --rows 30
npm start -- --color red
npm start -- --color random
```

#### Options

- `-c, --columns <number>` - Number of columns (default: terminal width)
- `-r, --rows <number>` - Number of rows (default: terminal height - 2)
- `--color <color>` - Color for ASCII art (default: white)
  - Named colors: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`
  - Use `random` for a random color on each run
- `-h, --help` - Display help information
- `-V, --version` - Display version number

#### Requirements

- Node.js (v22 or higher)
- A MIDI keyboard or controller connected to your computer

### How it Works

1. The program lists all available MIDI inputs
2. Connects to the first available MIDI device
3. Each MIDI key is assigned to one of 7 patterns based on its note number
4. When you press a key, the terminal clears and displays the generated ASCII art
5. Each key maintains its own randomization seed for consistent variations
6. Press `Ctrl+C` to exit

### Examples

```sh
# Run with default terminal dimensions
npm start

# Run with custom dimensions
npm start -- --columns 100 --rows 30

# Run with smaller output
npm start -- --columns 50 --rows 20

# Run with colored output
npm start -- --color cyan

# Run with random color
npm start -- --color random
```

Example output when playing a MIDI key:

```
🎹 Note: 60 | Velocity: 100 | Pattern: circle

                    ○
               ◎         ◎
           ●                 ●
        ◉                       ◉
      ◌                           ◌
    ⊙                               ⊙
   ⊚                                 ⊚
  ◌                                   ◌
 ◉                                     ◉
```

## Patterns

The app cycles through 7 patterns based on key number:

- **Wave** - Flowing sine wave patterns with various characters
- **Diagonal** - Angled lines and box-drawing characters
- **Circle** - Radial/circular patterns emanating from center
- **Grid** - Structured box-drawing grid patterns
- **Noise** - Random dot/point distributions
- **Chevron** - Zigzag/chevron arrow patterns
- **Spiral** - Spiraling circular forms

Each of the 88 piano keys maps to one of these 7 patterns using modulo arithmetic. Each key produces consistent but unique variations using seeded randomization.

## Features

- 🎹 Real-time MIDI input detection
- 🎨 7 unique ASCII art patterns (wave, diagonal, circle, grid, noise, chevron, spiral)
- 🌈 Colorful output with 16 color options or random colors
- 🎲 Seeded randomization - each key produces consistent but unique variations
- 📐 Customizable terminal size
- ✨ Clean fullscreen display
- 🛡️ Graceful error handling and shutdown

## Development

```sh
# Install dependencies
npm install

# Run tests
npm test

# Lint and format code
npm run format

# Run the application
npm start
```
