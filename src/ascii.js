/**
 * Seeded random number generator.
 *
 * @param {number} seed - Seed value
 * @returns {Function} Random number generator function
 */
const createRandom = (seed) => {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

/**
 * Generate a wave pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateWave = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['~', '≈', '∼', '⌇', '≋']
  const frequency = 0.3 + random() * 0.5
  const amplitude = rows * (0.2 + random() * 0.3)
  const phase = random() * Math.PI * 2

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      const wave = Math.sin(x * frequency + phase) * amplitude + rows / 2
      const distance = Math.abs(y - wave)

      if (distance < 1) {
        row.push(chars[Math.floor(random() * chars.length)])
      } else if (distance < 2) {
        row.push(chars[0])
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Generate a diagonal lines pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateDiagonal = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['/', '\\', '│', '─', '┼', '┤', '├', '┴', '┬']
  const spacing = Math.floor(3 + random() * 5)
  const direction = random() > 0.5 ? 1 : -1

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      const value = (x * direction + y) % spacing
      if (value === 0) {
        row.push(chars[Math.floor(random() * chars.length)])
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Generate a circle/radial pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateCircle = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['○', '◎', '●', '◉', '◌', '⊙', '⊚']
  const centerX = columns / 2 + (random() - 0.5) * columns * 0.3
  const centerY = rows / 2 + (random() - 0.5) * rows * 0.3
  const radiusStep = 2 + random() * 3

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      const dx = x - centerX
      const dy = (y - centerY) * 2 // Adjust for character aspect ratio
      const distance = Math.hypot(dx, dy)
      const ring = Math.floor(distance / radiusStep) % chars.length

      if (distance % radiusStep < 0.5) {
        row.push(chars[ring])
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Generate a grid pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateGrid = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['┼', '│', '─', '┤', '├', '┴', '┬', '╬', '║', '═']
  const spacingX = Math.floor(4 + random() * 6)
  const spacingY = Math.floor(2 + random() * 4)

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      const isVertical = x % spacingX === 0
      const isHorizontal = y % spacingY === 0

      if (isVertical && isHorizontal) {
        row.push(chars[0]) // Intersection
      } else if (isVertical) {
        row.push(chars[1]) // Vertical line
      } else if (isHorizontal) {
        row.push(chars[2]) // Horizontal line
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Generate a random noise pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateNoise = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['·', '•', '∘', '○', '◦', '⋅', '∙']
  const density = 0.1 + random() * 0.3

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      if (random() < density) {
        row.push(chars[Math.floor(random() * chars.length)])
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Generate a chevron/zigzag pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateChevron = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['˄', '˅', '˂', '˃', '∧', '∨', '⌃', '⌄']
  const width = Math.floor(4 + random() * 8)
  const offset = Math.floor(random() * width)

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      const pattern = ((x + offset) % (width * 2)) - width
      const shouldDraw = Math.abs(pattern) === Math.abs((y % width) - width / 2)

      if (shouldDraw) {
        row.push(chars[Math.floor(random() * chars.length)])
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Generate a spiral pattern.
 *
 * @param {number} columns - Number of columns
 * @param {number} rows - Number of rows
 * @param {number} salt - Seed for randomization
 * @returns {string[][]} 2D array of characters
 */
export const generateSpiral = (columns, rows, salt = 0) => {
  const random = createRandom(salt)
  const chars = ['◦', '◌', '○', '◎', '●', '⊙', '⊚', '⊛']
  const centerX = columns / 2
  const centerY = rows / 2
  const rotation = random() * Math.PI * 2
  const tightness = 0.2 + random() * 0.5

  const grid = []

  for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < columns; x++) {
      const dx = x - centerX
      const dy = (y - centerY) * 2
      const distance = Math.hypot(dx, dy)
      const angle = Math.atan2(dy, dx) + rotation
      const spiral = (angle + distance * tightness) % (Math.PI * 2)
      const segment = Math.floor((spiral / (Math.PI * 2)) * chars.length)

      if (Math.abs(spiral - Math.PI) < 0.3) {
        row.push(chars[segment % chars.length])
      } else {
        row.push(' ')
      }
    }
    grid.push(row)
  }

  return grid
}

/**
 * Render a pattern grid to a string
 *
 * @param {string[][]} grid - 2D array of characters
 * @returns {string} Rendered pattern
 */
export const renderPattern = (grid) => {
  return grid.map((row) => row.join('')).join('\n')
}
