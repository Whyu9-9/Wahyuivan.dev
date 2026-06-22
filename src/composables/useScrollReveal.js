import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(refs) {
  let observer = null

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip animation entirely — mark all visible immediately
      refs.forEach((ref) => {
        if (ref.value) ref.value.classList.add('reveal-visible')
      })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.1 }
    )

    refs.forEach((ref) => {
      if (ref.value) {
        ref.value.classList.add('reveal')
        observer.observe(ref.value)
      }
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
