import chalk from 'chalk'
import { renderPattern } from './ascii.js'

/**
 * Available color names that can be used
 */
const colorNames = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
]

/**
 * Get a random color from the available colors
 *
 * @returns {string} Random color name
 */
export const getRandomColor = () => {
  return colorNames[Math.floor(Math.random() * colorNames.length)]
}

/**
 * Apply color to text
 *
 * @param {string} text - Text to colorize
 * @param {string} color - Color name or 'random'
 * @returns {string} Colored text
 */
export const applyColor = (text, color) => {
  if (color === 'random') {
    const randomColor = getRandomColor()
    return chalk[randomColor](text)
  }

  if (colorNames.includes(color)) {
    return chalk[color](text)
  }

  // Default to white if color not found
  return chalk.white(text)
}

/**
 * Render a pattern grid with color
 *
 * @param {string[][]} grid - 2D array of characters
 * @param {string} color - Color name or 'random'
 * @returns {string} Rendered colored pattern
 */
export const renderPatternWithColor = (grid, color) => {
  const rendered = renderPattern(grid)
  return applyColor(rendered, color)
}
