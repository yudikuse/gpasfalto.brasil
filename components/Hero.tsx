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

      <div className="container-gp relative flex min-h-screen flex-col justify-between pb-12 pt-[calc(var(--header-h)+4rem)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-gp-green-bright" />
          <span className="eyebrow">{site.hero.eyebrow}</span>
        </div>

        {/* Headline */}
        <div className="max-w-6xl">
          <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-gp-bone drop-shadow-[0_2px_8px_rgba(13,17,66,0.6)]">
            {site.hero.line1}
            <br />
            <span className="text-gp-green-bright">{site.hero.line2}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-gp-bone/85 drop-shadow-[0_2px_6px_rgba(13,17,66,0.7)] sm:text-xl">
            {site.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
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
        <div className="flex items-end">
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
