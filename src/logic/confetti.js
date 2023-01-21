import confetti from 'canvas-confetti'

export function createConfetti({
  during = 500,
  disableForReducedMotion = false
} = {}) {
  const end = Date.now() + during
  ;(function frame() {
    // launch a few confetti from the left edge
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      disableForReducedMotion
    })
    // and launch a few from the right edge
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      disableForReducedMotion
    })

    // keep going until we are out of time
    if (!disableForReducedMotion && Date.now() < end) {
      window.requestAnimationFrame(frame)
    }
  })()
}

export function resetConfetti() {
  confetti.reset()
}
