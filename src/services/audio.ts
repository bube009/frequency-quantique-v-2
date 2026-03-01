let audioCtx: AudioContext | null = null
let oscillator: OscillatorNode | null = null
let gainNode: GainNode | null = null

export function playFrequency(freq: number) {
  stopFrequency()

  audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()

  oscillator = audioCtx.createOscillator()
  gainNode = audioCtx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = freq
  gainNode.gain.value = 0.15

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()
}

export function stopFrequency() {
  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
  }

  if (gainNode) {
    gainNode.disconnect()
    gainNode = null
  }

  if (audioCtx) {
    audioCtx.close()
    audioCtx = null
  }
}
