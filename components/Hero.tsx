import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'
import { HeroVideo } from './HeroVideo'
import { HeroTopo } from './HeroTopo'

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-gp-navy">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-zoom absolute inset-0">
          <HeroVideo />
        </div>

        {/* OVERLAY 1: Gradient vertical leve, escurece só pro fim */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gp-navy/15 to-gp-navy/95" />

        {/* OVERLAY 2: Gradient lateral — mais escuro no mobile, leve no desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-gp-navy/75 via-gp-navy/40 to-gp-navy/20 md:from-gp-navy/55 md:via-transparent md:to-transparent" />

        {/* SCRIM DO TOPO: garante contraste do header branco em qualquer frame do vídeo */}
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-gp-navy-deep/85 via-gp-navy-deep/35 to-transparent" />
      </div>

      {/* GEOMETRIA: fragmento de curvas de nível (topografia) no canto inf-direito */}
      <HeroTopo />

      <div className="container-gp relative flex min-h-screen flex-col justify-between pb-12 pt-[calc(var(--header-h)+4rem)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span
            className="guide-h h-px w-12 bg-gp-green-bright"
            style={{ ['--draw-delay' as string]: '150ms' } as CSSProperties}
          />
          <span
            className="eyebrow hero-rise"
            style={{ ['--rise-delay' as string]: '200ms' } as CSSProperties}
          >
            {site.hero.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-7xl">
          <h1 className="font-display text-[clamp(2.75rem,9.5vw,9.5rem)] uppercase leading-[0.85] tracking-[-0.03em] text-gp-bone drop-shadow-[0_2px_14px_rgba(13,17,66,0.7)]">
            <span className="sr-only">
              Pavimentação asfáltica, CBUQ e terraplenagem em Rio Verde e no Sudoeste Goiano — GP Asfalto.{' '}
            </span>
            <span className="line-mask">
              <span
                className="line-inner"
                style={{ ['--rise-delay' as string]: '300ms' } as CSSProperties}
              >
                {site.hero.line1}
              </span>
            </span>
            <span className="line-mask">
              <span
                className="line-inner text-gp-green-bright"
                style={{ ['--rise-delay' as string]: '440ms' } as CSSProperties}
              >
                {site.hero.line2}
              </span>
            </span>
          </h1>
          <p
            className="hero-rise mt-8 max-w-xl text-lg text-gp-bone/85 drop-shadow-[0_2px_6px_rgba(13,17,66,0.7)] sm:text-xl"
            style={{ ['--rise-delay' as string]: '650ms' } as CSSProperties}
          >
            {site.hero.description}
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ ['--rise-delay' as string]: '800ms' } as CSSProperties}
          >
            <a
              href={`https://wa.me/${site.company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Solicitar Orçamento
              <ArrowUpRight size={16} />
            </a>
            <a href="#obras" className="btn-ghost">
              Ver Obras
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom: scroll indicator */}
        <div
          className="hero-rise flex items-end"
          style={{ ['--rise-delay' as string]: '1000ms' } as CSSProperties}
        >
          <div className="flex items-center gap-3 text-gp-bone/60">
            <ArrowDown size={16} className="animate-bounce" />
            <span className="font-mono text-xs uppercase tracking-wider">
              Role para conhecer
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
