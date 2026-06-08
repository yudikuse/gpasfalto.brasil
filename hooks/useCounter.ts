'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Hook que anima um contador de 0 até `target` quando o elemento entra
 * no viewport (Intersection Observer). Funciona com SSR (estado inicial = 0
 * no client antes do observer, depois anima).
 *
 * Uso:
 *   const { ref, value } = useCounter(28, { duration: 1800 })
 *   return <div ref={ref}>{value}</div>
 */
export function useCounter(
  target: number,
  opts: { duration?: number; threshold?: number; once?: boolean } = {}
) {
  const { duration = 1800, threshold = 0.4, once = true } = opts
  const ref = useRef<HTMLElement | null>(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Se IntersectionObserver não estiver disponível (SSR, navegadores antigos),
    // anima na hora pra evitar ficar travado em 0
    if (typeof IntersectionObserver === 'undefined') {
      animate()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && startedRef.current) return
            startedRef.current = true
            animate()
            if (once) observer.disconnect()
          }
        })
      },
      { threshold }
    )

    observer.observe(node)

    function animate() {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    return () => observer.disconnect()
  }, [target, duration, threshold, once])

  return { ref, value }
}
