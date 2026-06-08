'use client'

import { site } from '@/data/content'

export function ClientLogos() {
  return (
    <section className="relative border-t border-gp-steel/10 bg-gp-navy-deep py-20">
      <div className="container-gp">
        {/* Heading discreto (prova social não precisa gritar) */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">Confiam na GP Asfalto</span>
            </div>
            <h2 className="max-w-2xl font-display text-display-md uppercase text-gp-bone">
              Cooperativas, agroindústrias e <span className="text-gp-green-bright">construtoras.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-gp-bone/55">
            Empresas que já contrataram nossas usinas e equipes de campo em
            obras de pavimentação, infraestrutura e loteamento.
          </p>
        </div>

        {/* Grid de logos com proporção fixa e respiro generoso */}
        <div className="grid grid-cols-2 gap-px bg-gp-steel/10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
          {site.clients.map((client) => (
            <div
              key={client.slug}
              className="group relative flex aspect-[5/3] items-center justify-center bg-gp-navy-deep px-3 py-4 transition-all duration-400 ease-out-expo hover:bg-gp-navy"
              title={client.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/clients/${client.slug}.png`}
                alt={client.name}
                className="h-auto max-h-[70%] w-auto max-w-[85%] object-contain opacity-60 grayscale-[20%] transition-all duration-400 ease-out-expo group-hover:scale-[1.08] group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Linha sutil de "ver mais" */}
        <div className="mt-12 flex items-center justify-center gap-3 text-gp-bone/45">
          <span className="h-px w-12 bg-gp-steel/20" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            E muitos outros · {site.clients.length}+ clientes atendidos
          </span>
          <span className="h-px w-12 bg-gp-steel/20" />
        </div>
      </div>
    </section>
  )
}
