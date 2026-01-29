#!/usr/bin/env node

import { Command } from 'commander'
import {
  generateChevron,
  generateCircle,
  generateDiagonal,
  generateGrid,
  generateNoise,
  generateSpiral,
  generateWave,
} from '../src/ascii.js'
import { renderPatternWithColor } from '../src/colors.js'
import { hideCursor, showCursor } from '../src/cursor.js'
import { connectToDevice, listDevices } from '../src/devices.js'
import { setupShutdownHandler } from '../src/shutdown.js'

const program = new Command()

program
  .name('midi-ascii-art')
  .description('Generate ASCII art patterns when MIDI keys are pressed')
  .option('-c, --columns <number>', 'Number of columns', String(process.stdout.columns || 80))
  .option('-r, --rows <number>', 'Number of rows', String(process.stdout.rows - 2 || 20))
  .option('--color <color>', 'Color for ASCII art (color name or "random")', 'white')
  .parse()

const options = program.opts()

const columns = Number.parseInt(options.columns, 10)
const rows = Number.parseInt(options.rows, 10)
const color = options.color

if (Number.isNaN(columns) || columns <= 0) {
  console.error('❌ Invalid columns value')
  process.exit(1)
}

if (Number.isNaN(rows) || rows <= 0) {
  console.error('❌ Invalid rows value')
  process.exit(1)
}

// Map pattern names to generator functions
const patterns = [
  { name: 'wave', generator: generateWave },
  { name: 'diagonal', generator: generateDiagonal },
  { name: 'circle', generator: generateCircle },
  { name: 'grid', generator: generateGrid },
  { name: 'noise', generator: generateNoise },
  { name: 'chevron', generator: generateChevron },
  { name: 'spiral', generator: generateSpiral },
]

// Store salt assignments for each MIDI note
const noteSalts = new Map()

/**
 * Get or create a salt for a MIDI note
 *
 * @param {number} note - MIDI note number
 * @returns {number} Salt value for this note
 */
const getSaltForNote = (note) => {
  if (!noteSalts.has(note)) {
    // Generate a unique salt based on note number and timestamp
    const salt = note * 1000 + Date.now()
    noteSalts.set(note, salt)
  }
  return noteSalts.get(note)
}

/**
 * Display ASCII art for a MIDI note
 *
 * @param {number} note - MIDI note number
 * @param {number} velocity - Note velocity
 */
const displayAsciiForNote = (note, velocity) => {
  // Get salt for this note
  const salt = getSaltForNote(note)

  // Select pattern based on note (modulo pattern count)
  const patternIndex = note % patterns.length
  const pattern = patterns[patternIndex]

  // Clear screen
  console.clear()

  // Show note info
  console.log(`🎹 Note: ${note} | Velocity: ${velocity} | Pattern: ${pattern.name}`)
  console.log()

  // Generate and render pattern
  const grid = pattern.generator(columns, rows, salt)
  const output = renderPatternWithColor(grid, color)

  process.stdout.write(output)
}

console.log('🎹 MIDI ASCII Art Generator Started')

try {
  // List all available MIDI inputs
  const inputs = listDevices('input')

  console.log('Available MIDI inputs:')
  for (const [index, name] of inputs.entries()) {
    console.log(`  ${index + 1}. ${name}`)
  }
  console.log()

  // Connect to the first available MIDI input
  const inputName = inputs[0]
  console.log(`🔌 Connecting to: ${inputName}`)

  const input = connectToDevice(inputName, 'input')

  // Listen for note on events
  input.on('noteon', (msg) => {
    const { note, velocity } = msg

    // Only display when note is actually pressed (velocity > 0)
    if (velocity > 0) {
      displayAsciiForNote(note, velocity)
    }
  })

  // Hide cursor
  hideCursor()

  console.log('✅ Listening for MIDI notes...')
  console.log(`Pattern assignment: Each key assigned to one of ${patterns.length} patterns`)
  console.log('Press any MIDI key to generate ASCII art')
  console.log('Press Ctrl+C to exit')

  // Handle graceful shutdown
  setupShutdownHandler(input, () => {
    // Show cursor again
    showCursor()
    console.log('\n👋 Closing MIDI connection...')
  })
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
