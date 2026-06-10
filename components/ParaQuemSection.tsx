'use client'

import { Tractor, Building2, Factory, Landmark, ArrowUpRight } from 'lucide-react'

const personas = [
  {
    icon: Tractor,
    title: 'Agronegócio',
    sub: 'Cooperativas, agroindústrias e fazendas',
    desc: 'Pátios de descarga e manobra, acessos para carga pesada e recuperação de vias internas que aguentam o pico de safra — sem travar a operação.',
  },
  {
    icon: Building2,
    title: 'Loteadoras',
    sub: 'Loteadoras e incorporadoras',
    desc: 'Terraplenagem, drenagem, guias, sarjetas e pavimentação CBUQ no mesmo contrato. Infraestrutura completa no prazo do cronograma de registro e vendas.',
  },
  {
    icon: Factory,
    title: 'Indústria privada',
    sub: 'Indústrias, terminais e pátios',
    desc: 'Pátios logísticos, áreas de manobra e estacionamentos dimensionados para o seu tráfego, com controle tecnológico e mínima interferência na rotina.',
  },
  {
    icon: Landmark,
    title: 'Poder público',
    sub: 'Prefeituras e órgãos',
    desc: 'Pavimentação e recapeamento de vias urbanas e estradas municipais, executados conforme DNIT/CTB, com acervo técnico para atender licitações.',
  },
]

export function ParaQuemSection() {
  return (
    <section className="relative py-32">
      <div className="container-gp">
        {/* Heading */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gp-green-bright" />
            <span className="eyebrow">Pra quem trabalhamos</span>
          </div>
          <h2 className="font-display text-display-xl uppercase text-gp-bone">
            Pra cada obra,{' '}
            <span className="text-gp-green-bright">a frente certa.</span>
          </h2>
          <p className="mt-6 text-gp-bone/65">
            Do agro ao poder público, a GP adapta a solução ao seu tipo de
            projeto — com a mesma frota própria, três usinas de CBUQ e equipe
            técnica.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {personas.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="group flex flex-col border border-gp-steel/15 p-8 transition-colors hover:border-gp-green-bright/40 hover:bg-gp-bone/5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-gp-steel/20 text-gp-green-bright transition-all group-hover:border-gp-green-bright group-hover:bg-gp-green-bright group-hover:text-gp-navy-deep">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 font-display text-2xl uppercase text-gp-bone transition-colors group-hover:text-gp-green-bright">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-gp-steel">
                  {p.sub}
                </p>
                <p className="mt-4 flex-1 text-sm text-gp-bone/70">{p.desc}</p>
                <a
                  href="#contato"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gp-steel transition-colors group-hover:text-gp-green-bright"
                >
                  Solicitar visita técnica
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:rotate-45"
                  />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
