'use client'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

export default function Sobre() {
  const { company } = site

  return (
    <div className="min-h-screen bg-navy text-cream font-body">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-10 h-[68px] bg-navy border-b border-cream/8">
        <Link href="/" className="flex items-center hover:opacity-85 transition-opacity">
          <Image src="/images/logo-white.png" alt={company.name}
            width={160} height={44} className="h-14 w-auto object-contain" priority />
        </Link>
        <Link href="/#p7"
          className="text-[12px] font-medium tracking-[.1em] uppercase
            text-white bg-green px-6 py-2.5 hover:bg-green2 transition-colors">
          Orçamento
        </Link>
      </nav>

      <section className="pt-[68px]">
        <div className="px-10 md:px-16 py-20 md:py-32 border-b border-cream/8">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">Quem somos</span>
          </div>
          <h1 className="font-display font-black text-cream leading-[.88]"
            style={{ fontSize: 'clamp(56px, 9vw, 130px)' }}>
            MAIS DE 25 ANOS<br />
            <span style={{ WebkitTextStroke: '1.5px rgba(240,235,226,.2)', color: 'transparent' }}>CONSTRUINDO</span><br />
            <span className="text-green">O BRASIL.</span>
          </h1>
        </div>
      </section>

      <section className="px-10 md:px-16 py-20 border-b border-cream/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl">
          <div>
            <h2 className="font-display font-bold text-[32px] text-cream mb-6 uppercase tracking-wide">
              Nossa História
            </h2>
            <p className="text-[15px] font-light leading-[1.9] text-cream/55">
              Fundada em {company.founded} em Rio Verde — GO, a GP Asfalto nasceu para atender
              a crescente demanda por infraestrutura de qualidade no coração do agronegócio brasileiro.
            </p>
            <p className="text-[15px] font-light leading-[1.9] text-cream/55 mt-4">
              Acreditamos que o futuro se constrói com trabalho, desenvolvimento e tecnologia.
              Nossas principais matérias-primas são tradição, seriedade, profissionalismo e
              foco na qualidade.
            </p>
            <p className="text-[15px] font-light leading-[1.9] text-cream/55 mt-4">
              Hoje operamos com três usinas próprias de CBUQ, frota completa de terraplenagem
              e equipe técnica com décadas de obra no Cerrado.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { n: '25+', l: 'Anos de mercado' },
              { n: '50+', l: 'Loteamentos executados' },
              { n: '3',   l: 'Usinas CBUQ próprias' },
              { n: '28',  l: 'Municípios atendidos' },
            ].map(s => (
              <div key={s.n} className="flex items-baseline gap-6 py-5 border-b border-cream/8 first:border-t">
                <span className="font-display font-black text-[48px] text-cream leading-none w-24 flex-shrink-0">{s.n}</span>
                <span className="text-[13px] font-normal tracking-[.06em] text-cream/45 uppercase">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy2 px-10 md:px-16 py-20 border-b border-cream/8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl">
          {[
            { title: 'Missão', text: 'Planejar e executar serviços de infraestrutura urbana, loteamentos, terraplenagem, pavimentação asfáltica, drenagem, saneamento básico e pontes com qualidade e sustentabilidade, em harmonia socioambiental, gerando satisfação para nossos clientes.' },
            { title: 'Visão', text: 'Tornar-se a maior referência no mercado de loteamentos, construção pesada e industrial pela excelência em gerenciamento de projetos públicos e privados, respeitando prazos, colaboradores, clientes e sociedade.' },
            { title: 'Política de Qualidade', text: 'Garantir a satisfação dos clientes, a execução de obras com qualidade, a busca constante de tecnologias inovadoras e o foco em melhoria contínua dos processos.' },
          ].map((item, i) => (
            <div key={i} className="px-8 py-10 border-r border-cream/8 last:border-r-0 first:pl-0 last:pr-0">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-4 h-px bg-green block" />
                <span className="text-[9px] font-medium tracking-[.24em] uppercase text-green">{item.title}</span>
              </div>
              <p className="text-[14px] font-light leading-[1.85] text-cream/50">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 md:px-16 py-20 border-b border-cream/8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">O que fazemos</span>
          </div>
          <h2 className="font-display font-black text-cream uppercase" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Soluções Completas<br />em Infraestrutura
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {[
            { title: 'Usinagem de Asfalto CBUQ', desc: 'Três usinas próprias com filtro de mangas para proteção ambiental. Produção de CBUQ com dosagem Marshall certificada e controle tecnológico completo. Fornecemos também para terceiros licitantes.' },
            { title: 'Terraplanagem', desc: 'Técnicas avançadas, equipamentos de qualidade e profissionais qualificados para execução de processos de drenagem geométrica e geotécnica, com controle tecnológico total.' },
            { title: 'Saneamento Básico', desc: 'Execução de obras de canalização de água tratada, rede de esgoto e galerias pluviais com rigor técnico e normativo.' },
            { title: 'Pavimentação Asfáltica', desc: 'Elevado padrão de pavimentação com CBUQ de qualidade e resistência diferenciadas. Tecnologias inovadoras com resultado comprovadamente superior.' },
            { title: 'Loteamentos', desc: 'Mais de 50 loteamentos executados com infraestrutura completa: ruas asfaltadas, meio-fio, galeria pluvial, rede de água e esgoto com qualidade certificada.' },
            { title: 'Infraestrutura Urbana', desc: 'Estrutura completa para incorporação e infraestrutura em áreas urbanas e rurais, loteamentos abertos ou fechados, com experiência, ética e qualidade.' },
          ].map((s, i) => (
            <div key={i} className="py-10 px-8 border-b border-r border-cream/8
              odd:pl-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:border-r-0
              md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r">
              <h3 className="font-display font-bold text-[22px] text-cream uppercase mb-4 leading-tight">{s.title}</h3>
              <p className="text-[14px] font-light leading-[1.85] text-cream/45">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 md:px-16 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 max-w-6xl">
          <div>
            <h2 className="font-display font-black text-cream uppercase" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Vamos construir<br /><span className="text-green">juntos.</span>
            </h2>
            <p className="text-[15px] font-light text-cream/45 mt-4 max-w-md leading-relaxed">
              Entre em contato com nossa equipe técnica. Respondemos em até 24 horas.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/#p7"
              className="text-[12px] font-medium tracking-[.14em] uppercase
                text-white bg-green px-10 py-4 hover:bg-green2 transition-colors text-center">
              Solicitar Orçamento
            </Link>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank"
              className="text-[12px] font-medium tracking-[.14em] uppercase
                text-cream/40 border border-cream/15 px-10 py-4
                hover:border-green hover:text-green transition-colors text-center">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-cream/8 px-10 py-6 flex items-center justify-between flex-wrap gap-4 bg-navy">
        <Link href="/" className="font-display font-bold text-[14px] tracking-[.1em] uppercase text-cream/60 hover:text-cream transition-colors">
          GP<span className="text-green">.</span>ASFALTO BRASIL
        </Link>
        <span className="text-[9px] tracking-[.08em] text-cream/20">
          © 2025 {company.razao} · Rio Verde, GO
        </span>
      </footer>

    </div>
  )
}
