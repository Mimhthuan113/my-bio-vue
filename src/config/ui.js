export const uiConfig = {
  bokeh: {
    sizes: [40, 60, 80, 100, 120, 160],
    colors: [
      'rgba(135,206,235,0.25)',
      'rgba(0,212,255,0.2)',
      'rgba(123,47,255,0.18)',
      'rgba(0,198,255,0.22)'
    ],
    count: 12,
    spawnInterval: 2500,
    baseDuration: 12,
    randomDuration: 10
  },
  tilt: {
    perspective: 900,
    maxRotate: 6,
    scale: 1.02
  },
  trail: {
    particleCount: 2,
    fadeSpeed: 0.025,
    shrinkSpeed: 0.95,
    colors: ['#00d4ff', '#87ceeb', '#ffffff']
  }
}
