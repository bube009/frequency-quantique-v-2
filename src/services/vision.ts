export function applyMirror(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.translate(w, 0)
  ctx.scale(-1, 1)
}

export function increaseContrast(imageData: ImageData) {
  const d = imageData.data
  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.min(255, d[i] * 1.2)
    d[i + 1] = Math.min(255, d[i + 1] * 1.2)
    d[i + 2] = Math.min(255, d[i + 2] * 1.2)
  }
  return imageData
}
