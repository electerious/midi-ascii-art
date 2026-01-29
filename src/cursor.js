/**
 * Hide the terminal cursor
 */
export const hideCursor = () => {
  process.stdout.write('\u001B[?25l')
}

/**
 * Show the terminal cursor
 */
export const showCursor = () => {
  process.stdout.write('\u001B[?25h')
}
