'use client'

import { useEffect, useState } from 'react'

/* Page indicator estilo G Mining adaptado pro site de ROLAGEM normal (não
   scroll-snap). Bolinhas fixas na direita que destacam a seção ativa conforme
   você rola, via IntersectionObserver. Só desktop (lg+), some no mobile pra
   não brigar com o botão de WhatsApp. Sem custom cursor. */

const sections = [
  { id: 'inicio',  label: 'Início'  },
  { id: 'obras',   label: 'Obras'   },
  { id: 'usinas',  label: 'Usinas'  },
  { id: 'contato', label: 'Contato' },
]

export function PageIndicator() {
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      // Considera "ativa" a seção que cruza a faixa central da tela
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      aria-label="Navegação por seções"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-gp-bone/0 transition-colors duration-300 group-hover:text-gp-bone/70">
              {s.label}
            </span>
            <span
              className={
                'h-2 w-2 rounded-full border transition-all duration-300 ' +
                (isActive
                  ? 'scale-100 border-gp-green-bright bg-gp-green-bright'
                  : 'scale-75 border-gp-steel/50 bg-transparent group-hover:border-gp-bone')
              }
            />
          </a>
        )
      })}
    </nav>
  )
}
