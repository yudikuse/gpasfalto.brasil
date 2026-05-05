'use client'

const segmentos = [
  {
    code: '01',
    title: 'Agronegócio',
    desc: 'Estradas rurais, pátios de máquinas, acessos a silos e armazéns. Infraestrutura que opera o ano todo — do plantio à colheita.',
    items: ['Estradas e acessos rurais', 'Pátios de máquinas e armazéns', 'Plataformas de silo', 'Terraplanagem e drenagem'],
    cta: 'Quero orçamento para minha fazenda',
  },
  {
    code: '02',
    title: 'Loteamentos',
    desc: 'Da gleba à infraestrutura completa. Mais de 50 loteamentos entregues com água, esgoto, drenagem e pavimentação.',
    items: ['Implantação viária completa', 'Rede de água e esgoto', 'Galerias pluviais', 'Pavimentação CBUQ'],
    cta: 'Quero orçamento para meu loteamento',
  },
  {
    code: '03',
    title: 'Empresas Privadas',
    desc: 'Pátios industriais, acessos logísticos e áreas de manobra para cooperativas, frigoríficos e plantas industriais.',
    items: ['Pátios de carga e descarga', 'Áreas de manobra para carretas', 'Estacionamentos e acessos', 'Pavimentação industrial'],
    cta: 'Quero orçamento para minha empresa',
  },
  {
    code: '04',
    title: 'Obras Públicas',
    desc: 'Estrutura técnica e documentação completa para licitações de pavimentação, drenagem e saneamento no Centro-Oeste.',
    items: ['Pavimentação e recapeamento', 'Fornecimento CBUQ p/ licitantes', 'Drenagem e saneamento', 'Laudos e ART disponíveis'],
    cta: 'Ver capacidade técnica',
  },
]

export default function SegmentosPanel() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="panel bg-navy" id="segs" style={{ height: 'auto', minHeight: '100svh' }}>
      <div className="flex flex-col justify-center px-6 md:px-12 py-24 md:py-20">

        <div className="flex items-center gap-3 mb-4">
          <span className="w-5 h-px bg-green block flex-shrink-0" />
          <span className="text-[12px] font-medium tracking-[.22em] uppercase text-green">
            Para quem atendemos
          </span>
        </div>
        <h2 className="font-display font-black text-cream mb-12 leading-[.9]"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
          CADA PROJETO<br />
          <span style={{ WebkitTextStroke: '1.5px rgba(240,235,226,.2)', color: 'transparent' }}>
            TEM UM CAMINHO
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {segmentos.map((s) => (
            <div key={s.code}
              className="group border-b border-white/8 last:border-b-0
                md:[&:nth-child(odd)]:border-r md:border-white/8
                p-8 md:p-10 hover:bg-white/[.03] transition-colors cursor-pointer"
              onClick={() => scrollTo('p7')}>

              <div className="flex items-start justify-between mb-5">
                <span className="font-display font-black text-[12px] tracking-[.2em] text-green/50">
                  {s.code}
                </span>
                <span className="text-white/20 text-[18px] group-hover:text-green
                  group-hover:translate-x-1 transition-all duration-200">→</span>
              </div>

              <h3 className="font-display font-bold text-cream mb-3 leading-tight"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>
                {s.title}
              </h3>

              <p className="text-[14px] font-light leading-[1.85] text-cream/45 mb-6 max-w-sm">
                {s.desc}
              </p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {s.items.map(item => (
                  <li key={item}
                    className="flex items-center gap-2 text-[13px] tracking-[.03em] text-cream/35">
                    <span className="w-3 h-px bg-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <span className="text-[11px] font-medium tracking-[.16em] uppercase text-green">
                {s.cta} →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
