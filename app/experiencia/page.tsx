'use client'

/* =============================================================
   ROTA PARALELA — /experiencia
   Demo isolada da experiência estilo G Mining (scroll-snap).
   Tem o PRÓPRIO container de rolagem, então NÃO depende de
   mudar o globals.css e NÃO afeta a home nem nenhuma outra
   página. É um laboratório seguro: mexe só aqui.
   ============================================================= */

import { useEffect, useRef, useState } from 'react'
import { site } from '@/data/content'

const panels = [
  { id: 'entrada', label: 'Entrada' },
  { id: 'numeros', label: 'Números' },
  { id: 'usinas',  label: 'Usinas'  },
  { id: 'contato', label: 'Contato' },
]

export default function ExperienciaPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('entrada')

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const els = panels
      .map((p) => root.querySelector<HTMLElement>('#' + p.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        }),
      { root, threshold: 0.6 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const goTo = (id: string) =>
    scrollRef.current
      ?.querySelector<HTMLElement>('#' + id)
      ?.scrollIntoView({ behavior: 'smooth' })

  const c = site.company

  return (
    <div
      ref={scrollRef}
      className="bg-gp-navy text-gp-bone"
      style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}
    >
      {/* Selo de preview + voltar ao site */}
      <div className="fixed left-5 top-5 z-50 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
        <span className="rounded-sm bg-gp-green-bright px-2 py-1 text-gp-navy-deep">Preview · experiência</span>
        <a href="/" className="text-gp-bone/60 transition-colors hover:text-gp-bone">← voltar ao site</a>
      </div>

      {/* Page indicator (escopo deste container) */}
      <nav
        aria-label="Seções"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
      >
        {panels.map((p) => {
          const on = active === p.id
          return (
            <button
              key={p.id}
              onClick={() => goTo(p.id)}
              aria-label={p.label}
              aria-current={on ? 'true' : undefined}
              className="group flex items-center gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-gp-bone/0 transition-colors duration-300 group-hover:text-gp-bone/70">
                {p.label}
              </span>
              <span
                className={
                  'h-2 w-2 rounded-full border transition-all duration-300 ' +
                  (on
                    ? 'scale-100 border-gp-green-bright bg-gp-green-bright'
                    : 'scale-75 border-gp-steel/50 bg-transparent group-hover:border-gp-bone')
                }
              />
            </button>
          )
        })}
      </nav>

      {/* PAINEL 1 — ENTRADA */}
      <section
        id="entrada"
        style={{ scrollSnapAlign: 'start' }}
        className="relative flex h-screen flex-col justify-between overflow-hidden bg-gp-navy px-6 py-20 md:px-16"
      >
        <div className="absolute inset-0 bg-gp-navy-deep/40" />
        <div className="relative flex items-center gap-2.5 pt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-gp-green-bright">
          <span className="inline-block h-px w-6 bg-gp-green-bright" />
          {site.hero.eyebrow}
        </div>

        <div className="relative">
          <h1 className="font-display text-[clamp(2.75rem,9vw,8rem)] uppercase leading-[0.85] tracking-[-0.03em]">
            {site.hero.line1}
            <br />
            <span className="text-gp-green-bright">{site.hero.line2}</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-gp-bone/70">
            {site.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => goTo('contato')}
              className="rounded-sm bg-gp-green-bright px-5 py-3 font-mono text-xs uppercase tracking-wider text-gp-navy-deep"
            >
              Solicitar orçamento ↗
            </button>
            <button
              onClick={() => goTo('numeros')}
              className="rounded-sm border border-gp-steel/50 px-5 py-3 font-mono text-xs uppercase tracking-wider text-gp-bone"
            >
              Conhecer ↓
            </button>
          </div>
        </div>

        <div className="relative flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-wider text-gp-bone/55">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gp-green-bright" />
          <span>Rio Verde · -17.79, -50.91 · Raio 90 km · LO Ativa SEMAD-GO</span>
        </div>
      </section>

      {/* PAINEL 2 — NÚMEROS */}
      <section
        id="numeros"
        style={{ scrollSnapAlign: 'start' }}
        className="flex h-screen flex-col justify-center bg-gp-navy-deep px-6 md:px-16"
      >
        <div className="mb-12 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gp-green-bright">
          <span className="inline-block h-px w-6 bg-gp-green-bright" />
          Em números
        </div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {site.numbers.map((n) => (
            <div key={n.label} className="border-l border-gp-steel/25 pl-5">
              <div className="font-display text-[clamp(3rem,7vw,6rem)] leading-none">
                {n.value}
                <span className="text-gp-green-bright">{n.suffix}</span>
              </div>
              <div className="mt-4 whitespace-pre-line font-mono text-[10px] uppercase tracking-wider text-gp-bone/55">
                {n.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAINEL 3 — USINAS */}
      <section
        id="usinas"
        style={{ scrollSnapAlign: 'start' }}
        className="flex h-screen flex-col justify-center bg-gp-navy px-6 md:px-16"
      >
        <div className="mb-10 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gp-green-bright">
          <span className="inline-block h-px w-6 bg-gp-green-bright" />
          Estrutura própria
        </div>
        <h2 className="mb-12 font-display text-display-lg uppercase leading-none">
          3 usinas CBUQ <span className="text-gp-green-bright">próprias.</span>
        </h2>
        <div className="grid gap-px bg-gp-steel/20 md:grid-cols-3">
          {site.usinas.map((u) => (
            <div key={u.number} className="bg-gp-navy p-7">
              <div className="font-display text-4xl text-gp-green-bright">{u.number}</div>
              <div className="mt-3 font-display text-xl uppercase">{u.name}</div>
              <div className="mt-2 text-sm text-gp-bone/60">{u.location}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PAINEL 4 — CONTATO */}
      <section
        id="contato"
        style={{ scrollSnapAlign: 'start' }}
        className="flex h-screen flex-col justify-center bg-gp-navy-deep px-6 md:px-16"
      >
        <div className="mb-8 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gp-green-bright">
          <span className="inline-block h-px w-6 bg-gp-green-bright" />
          Orçamento
        </div>
        <h2 className="max-w-xl font-display text-display-xl uppercase leading-[0.9]">
          Solicite uma <span className="text-gp-green-bright">análise técnica.</span>
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-gp-bone/70">
          Conte o que precisa. A equipe técnica retorna com cotação preliminar e, quando fizer sentido, agenda visita técnica.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${c.whatsapp}`}
            className="rounded-sm bg-gp-green-bright px-5 py-3 font-mono text-xs uppercase tracking-wider text-gp-navy-deep"
          >
            WhatsApp {site.phones[0].number} ↗
          </a>
          <a
            href={`mailto:${c.email}`}
            className="rounded-sm border border-gp-steel/50 px-5 py-3 font-mono text-xs uppercase tracking-wider text-gp-bone"
          >
            {c.email}
          </a>
        </div>
        <div className="mt-14 font-mono text-[10px] uppercase tracking-wider text-gp-bone/40">
          {c.address}
        </div>
      </section>
    </div>
  )
}
