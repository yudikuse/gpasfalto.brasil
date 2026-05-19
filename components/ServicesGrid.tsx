'use client'

import { Layers, Mountain, Waves, Signpost, Factory, Droplets, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'

const services = [
  {
    icon: Layers,
    title: 'Pavimentação CBUQ',
    subtitle: 'Concreto Betuminoso Usinado a Quente',
    desc: 'Aplicação de CBUQ em rodovias, pátios industriais, loteamentos e vias urbanas com controle tecnológico.',
  },
  {
    icon: Mountain,
    title: 'Terraplenagem',
    subtitle: 'Movimentação de terra completa',
    desc: 'Limpeza, destocamento, cortes e aterros compensados, regularização do subleito.',
  },
  {
    icon: Waves,
    title: 'Drenagem',
    subtitle: 'Bueiros, galerias e sarjetas',
    desc: 'Sistemas completos de drenagem superficial e profunda em concreto armado.',
  },
  {
    icon: Signpost,
    title: 'Sinalização Viária',
    subtitle: 'Horizontal e vertical',
    desc: 'Sinalização termoplástica, placas refletivas, tachas e defensas conforme DNIT/CTB.',
  },
  {
    icon: Factory,
    title: 'Usinas Próprias',
    subtitle: '3 unidades em operação',
    desc: 'Produção própria de CBUQ com raio de atendimento de 90 km e ensaio Marshall certificado.',
  },
  {
    icon: Droplets,
    title: 'Infraestrutura de Loteamento',
    subtitle: 'Solução completa',
    desc: 'Rede de água, esgoto, drenagem pluvial e pavimentação CBUQ para loteamentos.',
  },
]

export function ServicesGrid() {
  return (
    <section className="relative py-32">
      <div className="container-gp">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          {/* Coluna heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">O que fazemos</span>
            </div>
            <h2 className="font-display text-display-xl uppercase text-gp-bone">
              Soluções
              <br />
              <span className="text-gp-green-bright">verticais</span>
              <br />
              em infraestrutura.
            </h2>
            <p className="mt-6 max-w-md text-gp-bone/65">
              Do estudo de viabilidade à entrega da obra. Frota própria, três usinas
              de CBUQ em operação e equipe técnica especializada.
            </p>

            {/* Mini specs */}
            <dl className="mt-10 space-y-3 border-l-2 border-gp-green-bright pl-4">
              {site.specs.slice(0, 3).map((spec) => (
                <div key={spec.key} className="flex items-baseline gap-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-gp-steel">
                    {spec.key}
                  </dt>
                  <dd className="text-sm text-gp-bone">
                    {spec.value} <span className="text-gp-steel">{spec.sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Lista de serviços */}
          <ul className="divide-y divide-gp-steel/10 border-t border-gp-steel/10">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <li key={service.title} className="group">
                  <div className="flex items-start gap-6 py-8 transition-colors hover:bg-gp-bone/5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-gp-steel/20 text-gp-green-bright transition-all group-hover:border-gp-green-bright group-hover:bg-gp-green-bright group-hover:text-gp-navy-deep">
                      <Icon size={20} />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl uppercase text-gp-bone group-hover:text-gp-green-bright">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm text-gp-steel">{service.subtitle}</p>
                      <p className="mt-3 max-w-xl text-sm text-gp-bone/70">{service.desc}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="mt-2 shrink-0 text-gp-steel transition-all group-hover:rotate-45 group-hover:text-gp-green-bright"
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
