'use client'
import { useEffect, useState } from 'react'
import { site } from '@/data/content'

export default function Nav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const el = document.getElementById('scrl')
    if (!el) return
    const onScroll = () => setSolid(el.scrollTop > window.innerHeight * 0.4)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-10 h-[68px] border-b border-transparent
        transition-all duration-300
        ${solid ? 'nav-solid' : 'bg-transparent'}`}
    >
      {/* LOGO */}
      <button
        onClick={() => scrollTo('p1')}
        className="flex items-center gap-2.5 text-cream hover:opacity-90 transition-opacity"
      >
        <div className="w-9 h-9 border-2 border-green bg-navy3 rounded-sm
          flex items-center justify-center
          font-display font-black text-[13px] tracking-wider text-white">
          GP
        </div>
        <span className="font-display font-bold text-[17px] tracking-[.1em] uppercase text-white">
          GP<span className="text-green">.</span>ASFALTO
        </span>
      </button>

      {/* LINKS */}
      <ul className="hidden md:flex gap-8 list-none">
        {[
          { label: 'Empresa',   id: 'p2' },
          { label: 'Obras',     id: 'p3' },
          { label: 'Usinas',    id: 'p6' },
        ].map(l => (
          <li key={l.id}>
            <button
              onClick={() => scrollTo(l.id)}
              className="text-[12px] font-medium tracking-[.1em] uppercase
                text-white/50 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => scrollTo('p7')}
        className="text-[12px] font-medium tracking-[.1em] uppercase
          text-white bg-green px-6 py-2.5 hover:bg-green2 transition-colors"
      >
        Orçamento
      </button>
    </nav>
  )
}
