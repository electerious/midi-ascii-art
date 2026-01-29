import easymidi from 'easymidi'

/**
 * List and display available MIDI devices.
 *
 * @param {string} type - 'input' or 'output'
 * @returns {string[]} Array of device names
 */
export const listDevices = (type) => {
  const devices = type === 'input' ? easymidi.getInputs() : easymidi.getOutputs()

  if (devices.length === 0) {
    throw new Error(`No MIDI ${type}s found`)
  }

  return devices
}

/**
 * Connect to a MIDI device.
 *
 * @param {string} deviceName - Name of the device to connect to
 * @param {string} type - 'input' or 'output'
 * @returns {*} Connected device
 */
export const connectToDevice = (deviceName, type) => {
  return type === 'input' ? new easymidi.Input(deviceName) : new easymidi.Output(deviceName)
}
