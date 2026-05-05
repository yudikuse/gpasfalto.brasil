'use client'
import { useEffect, useState } from 'react'

export default function PageIndicator() {
  const [active, setActive] = useState(0)
  const [total,  setTotal]  = useState(0)

  useEffect(() => {
    const el = document.getElementById('scrl')
    if (!el) return
    const panels = el.querySelectorAll('.panel')
    setTotal(panels.length)
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight)
      setActive(Math.min(idx, panels.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (total === 0) return null

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40
      hidden md:flex flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i}
          onClick={() => {
            const el = document.getElementById('scrl')
            el?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' })
          }}
          className={`page-dot transition-all ${active === i ? 'active' : ''}`}
          aria-label={'Painel ' + (i + 1)}
        />
      ))}
    </div>
  )
}
