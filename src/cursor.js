/**
 * Hide the terminal cursor.
 */
export const hideCursor = () => {
  process.stdout.write('\u{1B}[?25l')
}

/**
 * Show the terminal cursor.
 */
export const showCursor = () => {
  process.stdout.write('\u{1B}[?25h')
}
