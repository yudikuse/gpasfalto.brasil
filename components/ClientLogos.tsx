'use client'

import Image from 'next/image'
import { site } from '@/data/content'
import { cn } from '@/lib/cn'

interface Props {
  /** 'color' = logos coloridos originais; 'mono' = todos brancos, hover colore */
  variant?: 'color' | 'mono'
  /** Texto opcional acima da grade (eyebrow) */
  eyebrow?: string
  /** Título opcional */
  title?: string
}

export function ClientLogos({
  variant = 'mono',
  eyebrow = 'Confiam na GP Asfalto',
  title,
}: Props) {
  return (
    <section className="relative border-t border-gp-steel/10 bg-gp-navy-deep py-20">
      <div className="container-gp">
        {/* Heading discreto (prova social não precisa gritar) */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            {title && (
              <h2 className="max-w-2xl font-display text-display-md uppercase text-gp-bone">
                {title}
              </h2>
            )}
          </div>
          <p className="max-w-sm text-sm text-gp-bone/55">
            Cooperativas, agroindústrias e empresas que já contrataram nossas
            usinas e equipes de campo.
          </p>
        </div>

        {/* Grid de logos */}
        <div className="grid grid-cols-3 gap-px bg-gp-steel/15 md:grid-cols-5 lg:grid-cols-9">
          {site.clients.map((client) => (
            <div
              key={client.slug}
              className="group relative flex aspect-[3/2] items-center justify-center bg-gp-navy-deep px-4 py-6 transition-colors hover:bg-gp-navy"
              title={client.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/clients/${client.slug}.png`}
                alt={client.name}
                className={cn(
                  'max-h-12 w-auto max-w-full object-contain transition-all duration-500 ease-out-expo',
                  variant === 'mono'
                    ? // Mono: todos brancos, opacidade 60% → 100% no hover, cor original no hover
                      'brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0'
                    : // Color: opacidade 75% → 100% no hover, sem mexer em cor
                      'opacity-75 group-hover:opacity-100 group-hover:scale-105'
                )}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
