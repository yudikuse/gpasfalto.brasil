'use client'

import { useEffect, useRef, useState } from 'react'

export function useCounter(target: number, { duration = 2000, start = 0 } = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const [value, setValue] = useState(start)
  const triggered = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || triggered.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true
            const startTime = performance.now()
            const range = target - start

            const tick = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              setValue(Math.round(start + range * eased))
              if (progress < 1) requestAnimationFrame(tick)
            }

            requestAnimationFrame(tick)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration, start])

  return { ref, value }
}
