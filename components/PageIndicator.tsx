'use client'
import { useEffect, useState } from 'react'

const TOTAL = 7

export default function PageIndicator() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = document.getElementById('scrl')
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight)
      setActive(Math.min(idx, TOTAL - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {Array.from({ length: TOTAL }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            document.getElementById('scrl')?.scrollTo({
              top: i * window.innerHeight,
              behavior: 'smooth',
            })
          }}
          className={`page-dot ${active === i ? 'active' : ''}`}
          aria-label={`Ir para painel ${i + 1}`}
        />
      ))}
    </div>
  )
}
