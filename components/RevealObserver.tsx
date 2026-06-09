'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Observa todos os elementos .reveal e adiciona .is-visible quando entram
 * na viewport. Re-roda a cada mudança de rota (pathname) pra pegar seções
 * de páginas novas. Fallback: se IntersectionObserver não existir, revela tudo.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    )
    if (els.length === 0) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
