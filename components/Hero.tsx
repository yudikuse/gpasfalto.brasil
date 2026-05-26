import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-gp-navy">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-cbuq.jpg"
          className="h-full w-full object-cover"
        >
          <source src={site.hero.videoLocal} type="video/mp4" />
        </video>

        {/* OVERLAY 1: Gradient vertical mais leve no topo,
            só escurece pro fim pra fazer transição com a próxima seção */}
        <div className="absolute inset-0 bg-gradient-to-b from-gp-navy/15 via-gp-navy/30 to-gp-navy" />

        {/* OVERLAY 2: Gradient lateral — escuro à esquerda (onde está texto),
            transparente à direita (deixa o vídeo aparecer bonito) */}
        <div className="absolute inset-0 bg-gradient-to-r from-gp-navy/70 via-gp-navy/20 to-transparent" />
      </div>

      <div className="container-gp relative flex min-h-screen flex-col justify-between pb-12 pt-[calc(var(--header-h)+4rem)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-gp-green-bright" />
          <span className="eyebrow">{site.hero.eyebrow}</span>
        </div>

        {/* Headline */}
        <div className="max-w-6xl">
          <h1 className="font-display text-hero uppercase text-gp-bone">
            {site.hero.line1}
            <br />
            <span className="text-gp-green-bright">{site.hero.line2}</span>
            <br />
            {site.hero.line3}
          </h1>
          <p className="mt-8 max-w-xl text-lg text-gp-bone/75 sm:text-xl">
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

        {/* Bottom: scroll indicator + featured */}
        <div className="flex items-end justify-between gap-8">
          <div className="flex items-center gap-3 text-gp-bone/60">
            <ArrowDown size={16} className="animate-bounce" />
            <span className="font-mono text-xs uppercase tracking-wider">
              Role para conhecer
            </span>
          </div>

          <a
            href="#obras"
            className="group hidden max-w-sm items-center gap-4 border-l-2 border-gp-green-bright pl-4 transition-all hover:pl-6 md:flex"
          >
            <div>
              <div className="eyebrow">Em destaque</div>
              <div className="mt-1 text-sm leading-snug text-gp-bone group-hover:text-gp-green-bright">
                3 usinas CBUQ próprias · 28 municípios atendidos
              </div>
            </div>
            <ArrowUpRight
              size={20}
              className="shrink-0 text-gp-green-bright transition-transform group-hover:rotate-45"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
