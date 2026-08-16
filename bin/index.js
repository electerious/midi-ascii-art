#!/usr/bin/env node

import { Command } from 'commander'
import packageInfo from '../package.json' with { type: 'json' }
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
  .version(packageInfo.version)
  .option('-c, --columns <number>', 'Number of columns', String(process.stdout.columns || 80))
  .option('-r, --rows <number>', 'Number of rows', String(process.stdout.rows || 20))
  .option('--color <color>', 'Color for ASCII art (color name or "random")', 'white')
  .option('-v, --verbose', 'Show note info when keys are pressed', false)
  .parse()

const options = program.opts()

const verbose = options.verbose
const columns = Number(options.columns)
const rows = Number(options.rows) - (verbose ? 2 : 0)
const color = options.color

if (Number.isNaN(columns) || columns <= 0) {
  console.error('❌ Invalid columns value')
  process.exit(1)
}

if (Number.isNaN(rows) || rows <= 0) {
  console.error('❌ Invalid rows value')
  process.exit(1)
}

const patterns = [
  { name: 'wave', generator: generateWave },
  { name: 'diagonal', generator: generateDiagonal },
  { name: 'circle', generator: generateCircle },
  { name: 'grid', generator: generateGrid },
  { name: 'noise', generator: generateNoise },
  { name: 'chevron', generator: generateChevron },
  { name: 'spiral', generator: generateSpiral },
]

const noteSalts = new Map()

/**
 * Get or create a salt for a MIDI note.
 *
 * @param {number} note - MIDI note number
 * @returns {number} Salt value for this note
 */
const getSaltForNote = (note) => {
  if (!noteSalts.has(note)) {
    noteSalts.set(note, note * 1000 + Date.now())
  }
  return noteSalts.get(note)
}

/**
 * Display ASCII art for a MIDI note.
 *
 * @param {number} note - MIDI note number
 * @param {number} velocity - Note velocity
 * @param {boolean} verbose - Whether to show note info
 */
const displayAsciiForNote = (note, velocity, verbose) => {
  const salt = getSaltForNote(note)
  const pattern = patterns[note % patterns.length]

  console.clear()

  if (verbose) {
    console.log(`🎹 Note: ${note} | Velocity: ${velocity} | Pattern: ${pattern.name}`)
    console.log()
  }

  const grid = pattern.generator(columns, rows, salt)
  const output = renderPatternWithColor(grid, color)

  process.stdout.write(output)
}

console.log('🎹 MIDI ASCII Art Generator Started')

try {
  const inputs = listDevices('input')

  console.log('Available MIDI inputs:')
  for (const [index, name] of inputs.entries()) {
    console.log(`  ${index + 1}. ${name}`)
  }
  console.log()

  const inputName = inputs[0]
  console.log(`🔌 Connecting to: ${inputName}`)

  const input = connectToDevice(inputName, 'input')

  input.on('noteon', (message) => {
    const { note, velocity } = message

    if (velocity > 0) {
      displayAsciiForNote(note, velocity, verbose)
    }
  })

  hideCursor()

  console.log('✅ Listening for MIDI notes...')
  console.log(`Pattern assignment: Each key assigned to one of ${patterns.length} patterns`)
  console.log('Press any MIDI key to generate ASCII art')
  console.log('Press Ctrl+C to exit')

  setupShutdownHandler(input, () => {
    showCursor()
    console.log('\n👋 Closing MIDI connection...')
  })
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
