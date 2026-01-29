/**
 * Setup graceful shutdown handler.
 *
 * @param {*} device - MIDI device to close
 * @param {Function} [onShutdown] - Optional callback before shutdown
 */
export const setupShutdownHandler = (device, onShutdown = null) => {
  process.on('SIGINT', () => {
    if (onShutdown) {
      onShutdown()
    }
    device.close()
    process.exit(0)
  })
}
