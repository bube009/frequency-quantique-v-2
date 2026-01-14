let ctx: AudioContext | null = null;
let osc: OscillatorNode | null = null;

export function playFrequency(freq: number) {
  stopFrequency();
  ctx = new AudioContext();
  osc = ctx.createOscillator();
  osc.frequency.value = freq;
  osc.connect(ctx.destination);
  osc.start();
}

export function stopFrequency() {
  osc?.stop();
  ctx?.close();
  osc = null;
  ctx = null;
}