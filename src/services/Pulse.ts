export function suggestFrequency(bpm: number) {
  if (bpm > 95) return { freq: 396, label: "Stress" }
  if (bpm < 55) return { freq: 528, label: "Fatigue" }
  return { freq: 432, label: "Cohérence" }
}
