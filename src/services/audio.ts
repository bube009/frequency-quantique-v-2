let ctx: AudioContext | null = null
let osc: OscillatorNode | null = null
let gain: GainNode | null = null

function ensureContext() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export async function playFrequency(freqHz: number, volume = 0.12) {
  const c = ensureContext()
  if (c.state !== 'running') await c.resume()

  stopFrequency()

  osc = c.createOscillator()
  gain = c.createGain()

  osc.type = 'sine'
  osc.frequency.value = Math.max(1, freqHz)

  gain.gain.value = Math.max(0, Math.min(volume, 1))

  osc.connect(gain)
  gain.connect(c.destination)

  osc.start()
}

export function stopFrequency() {
  try {
    if (osc) {
      osc.stop()
      osc.disconnect()
    }
  } catch {}
  try {
    if (gain) gain.disconnect()
  } catch {}

  osc = null
  gain = null
}

export function isPlaying() {
  return !!osc
}
