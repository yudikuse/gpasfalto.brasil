'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const links = [
  { label: 'Obras',   id: 'obras'   },
  { label: 'Usinas',  id: 'usinas'  },
  { label: 'Contato', id: 'contato' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const el = document.getElementById('scrl')
    if (!el) return
    const onScroll = () => setSolid(el.scrollTop > window.innerHeight * 0.4)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-10 h-[68px] border-b border-transparent transition-all duration-300
        ${solid || open ? 'nav-solid' : 'bg-transparent'}`}>

        <button onClick={() => scrollTo('hero')}
          className="flex items-center hover:opacity-85 transition-opacity">
          <Image src="/images/logo-white.png" alt={site.company.name}
            width={160} height={44} className="h-20 w-auto object-contain" priority />
        </button>

        <ul className="hidden md:flex gap-8 list-none">
          {links.map(l => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)}
                className="text-[12px] font-medium tracking-[.1em] uppercase
                  text-white/50 hover:text-white transition-colors">
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <Link href="/sobre"
              className="text-[12px] font-medium tracking-[.1em] uppercase
                text-white/50 hover:text-white transition-colors">
              Sobre
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button onClick={() => scrollTo('contato')}
            className="text-[11px] md:text-[12px] font-medium tracking-[.1em] uppercase
              text-white bg-green px-4 md:px-6 py-2.5 hover:bg-green2 transition-colors">
            Orçamento
          </button>
          <button onClick={() => setOpen(o => !o)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 flex-shrink-0"
            aria-label="Menu">
            <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center
              ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300
              ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center
              ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-40 transition-all duration-300
        ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black transition-opacity duration-300
            ${open ? 'opacity-60' : 'opacity-0'}`} />
        <div className={`absolute top-0 right-0 bottom-0 w-[280px] bg-navy
          flex flex-col pt-[68px] border-l border-white/8
          transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col px-8 pt-10 gap-1">
            {links.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-left py-4 border-b border-white/8
                  text-[13px] font-medium tracking-[.12em] uppercase
                  text-white/60 hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
            <Link href="/sobre" onClick={() => setOpen(false)}
              className="block py-4 border-b border-white/8
                text-[13px] font-medium tracking-[.12em] uppercase
                text-white/60 hover:text-white transition-colors">
              Sobre
            </Link>
          </nav>
          <div className="px-8 mt-auto pb-12">
            <a href={'https://wa.me/' + site.company.whatsapp} target="_blank"
              className="flex items-center justify-center py-3.5 border border-white/15
                text-white/50 text-[11px] tracking-[.14em] uppercase
                hover:border-green hover:text-green transition-colors">
              Falar no WhatsApp
            </a>
            <div className="text-[9px] tracking-[.1em] uppercase text-white/20 text-center mt-6">
              {site.company.location}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
