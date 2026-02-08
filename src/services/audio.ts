let ctx: AudioContext | null = null
let osc: OscillatorNode | null = null

export function playFreq(freq: number) {
  stopAudio()
  ctx = new AudioContext()
  osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = freq
  osc.connect(ctx.destination)
  osc.start()
}

export function stopAudio() {
  if (osc) {
    osc.stop()
    osc.disconnect()
    osc = null
  }
  if (ctx) {
    ctx.close()
    ctx = null
  }
}
