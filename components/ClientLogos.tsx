'use client'

import { useState } from 'react'
import { site } from '@/data/content'

export function ClientLogos() {
  // Estado de hover por logo (pra controlar scale composto)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <section className="relative border-t border-gp-steel/10 bg-gp-navy-deep py-20">
      <div className="container-gp">
        {/* Heading discreto */}
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

        {/* Grid de logos */}
        <div className="grid grid-cols-2 gap-px bg-gp-steel/10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
          {site.clients.map((client) => {
            const baseScale = client.visualScale ?? 1
            const isHovered = hoveredSlug === client.slug
            // Hover multiplica scale base por 1.10
            const finalScale = isHovered ? baseScale * 1.1 : baseScale
            const opacity = isHovered ? 1 : 0.65

            return (
              <div
                key={client.slug}
                className="group relative flex aspect-[5/3] items-center justify-center overflow-hidden bg-gp-navy-deep transition-colors duration-400 hover:bg-gp-navy"
                title={client.name}
                onMouseEnter={() => setHoveredSlug(client.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/clients/${client.slug}.png`}
                  alt={client.name}
                  style={{
                    transform: `scale(${finalScale})`,
                    opacity,
                  }}
                  className="h-auto max-h-[75%] w-auto max-w-[80%] object-contain transition-all duration-400 ease-out"
                  loading="lazy"
                />
              </div>
            )
          })}
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
