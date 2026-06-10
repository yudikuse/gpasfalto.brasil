import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'
import { HeroVideo } from './HeroVideo'

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-gp-navy">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-10">
        <HeroVideo />

        {/* OVERLAY 1: Gradient vertical leve, escurece só pro fim */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gp-navy/15 to-gp-navy/95" />

        {/* OVERLAY 2: Gradient lateral — mais escuro no mobile, leve no desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-gp-navy/75 via-gp-navy/40 to-gp-navy/20 md:from-gp-navy/55 md:via-transparent md:to-transparent" />
      </div>

      {/* LINHAS-GUIA GEOMÉTRICAS — vibe blueprint de engenharia.
          Ficam acima do vídeo/overlay e atrás do texto. Desenham de cima
          pra baixo no load (.guide-v). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
        <span
          className="guide-v absolute inset-y-0 left-[18%] w-px bg-gradient-to-b from-transparent via-gp-bone/12 to-transparent"
          style={{ ['--draw-delay' as string]: '250ms' } as CSSProperties}
        />
        <span
          className="guide-v absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-gp-bone/[0.07] to-transparent md:block"
          style={{ ['--draw-delay' as string]: '400ms' } as CSSProperties}
        />
        <span
          className="guide-v absolute inset-y-0 right-[14%] hidden w-px bg-gradient-to-b from-transparent via-gp-green-bright/20 to-transparent md:block"
          style={{ ['--draw-delay' as string]: '550ms' } as CSSProperties}
        />
        {/* Cruzetas / ticks de engenharia */}
        <span
          className="guide-mark absolute left-[18%] top-[26%] h-3.5 w-3.5 -translate-x-1/2"
          style={{ ['--draw-delay' as string]: '900ms' } as CSSProperties}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gp-green-bright/70" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gp-green-bright/70" />
        </span>
        <span
          className="guide-mark absolute right-[14%] bottom-[22%] hidden h-3.5 w-3.5 translate-x-1/2 md:block"
          style={{ ['--draw-delay' as string]: '1050ms' } as CSSProperties}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gp-bone/40" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gp-bone/40" />
        </span>
      </div>

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
        <div className="max-w-6xl">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-gp-bone drop-shadow-[0_2px_8px_rgba(13,17,66,0.6)]">
            <span
              className="hero-rise block"
              style={{ ['--rise-delay' as string]: '350ms' } as CSSProperties}
            >
              {site.hero.line1}
            </span>
            <span
              className="hero-rise block text-gp-green-bright"
              style={{ ['--rise-delay' as string]: '490ms' } as CSSProperties}
            >
              {site.hero.line2}
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
