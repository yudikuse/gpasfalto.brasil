'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const VIDEO_CLOUDINARY = 'https://res.cloudinary.com/dfw7h9c2j/video/upload/vc_h264,q_auto/silo-bg_tjhnws.mp4#t=5'
const WA = '5564993273958'

const segmentos = [
  {
    icon: '🚛',
    label: 'Transportadora',
    desc: 'Pátio de manobra, estacionamento de frota e pátio de manutenção. Suporte a carretas 74t com ciclo de entrada e saída sem afundamento.',
  },
  {
    icon: '🏭',
    label: 'Frigorífico & Agroindústria',
    desc: 'Pátio de recepção de gado, acesso de caminhões e área de expedição. Laudo técnico e ART inclusa para engenharia da planta.',
  },
  {
    icon: '📦',
    label: 'Centro de Distribuição',
    desc: 'Área de docas, manobra e estacionamento. Projeto com raio de giro correto para bi-trem e rodotrem.',
  },
  {
    icon: '🏗️',
    label: 'Parque Industrial & Galpão',
    desc: 'Acesso, pátio interno e vias de circulação. Novo empreendimento ou revitalização — entregamos com documentação completa.',
  },
]

const dores = [
  {
    num: '01',
    stat: 'Operação mais cara',
    title: 'Pátio ruim aumenta custo por ciclo.',
    desc: 'Caminhão que leva 15 minutos para manobrar em pátio degradado leva 40 em dia de chuva. Para uma transportadora com 50 veículos por dia, isso é horas de operação perdida. Para um CD, é throughput menor. Para um frigorífico, é fila na doca e linha de produção esperando.',
    fonte: 'Ref: CNT — Análise do Impacto das Condições de Pavimento no Custo Operacional',
  },
  {
    num: '02',
    stat: 'Você paga 3 vezes',
    title: 'Manutenção recorrente é execução ruim.',
    desc: 'Pátio patched a cada chuva não é manutenção normal — é execução errada na origem. Base mal compactada, drenagem inexistente e CBUQ de má qualidade colapsam em 2 anos. Asfalto bem executado, com base e drenagem corretas, tem vida útil de 15 a 20 anos sem intervenção.',
    fonte: '',
  },
  {
    num: '03',
    stat: 'Custo de atraso',
    title: 'Nova unidade sem pátio = inauguração atrasada.',
    desc: 'Contrato com cliente começa na data acordada — não quando o pátio ficar pronto. Cada dia de atraso tem custo real: aluguel da estrutura, equipe mobilizada, penalidade contratual. Terraplenagem e asfalto no mesmo contrato, com um responsável, reduz interface e risco de atraso.',
    fonte: '',
  },
]

const como = [
  {
    n: '01',
    t: 'Visita técnica e projeto',
    d: 'Nossa equipe visita a área, coleta dados de solo, tráfego previsto e dimensões. Apresentamos projeto com espessura de base, drenagem e CBUQ adequados à carga.',
  },
  {
    n: '02',
    t: 'Terraplenagem e base',
    d: 'Escavação, aterro compactado por camadas, sub-base e base granular. A fundação certa é o que separa asfalto que dura 15 anos de asfalto que dura 2.',
  },
  {
    n: '03',
    t: 'Asfalto com documentação',
    d: 'CBUQ produzido nas nossas 3 usinas em Rio Verde, GO. Aplicação, laudo de resistência e ART — documentação completa para engenharia do seu cliente ou do condomínio.',
  },
]

const diferenciais = [
  { label: 'Laudo técnico incluso',   desc: 'Resistência à compressão e espessura verificados em laboratório.' },
  { label: 'ART assinada',            desc: 'Anotação de Responsabilidade Técnica em cada obra.' },
  { label: 'CBUQ próprio',            desc: '3 usinas em Rio Verde — sem depender de fornecedor externo.' },
  { label: 'Um contrato só',          desc: 'Terraplenagem, base e asfalto: um responsável, sem interface de subcontratado.' },
  { label: 'Mobilização rápida em GO',desc: 'Equipamento próprio, equipe local. Menos logística, menos atraso.' },
  { label: '+40 anos de experiência', desc: 'LDC, COMIGO, Raízen, Nutrien, Mercado Livre — infra que funciona.' },
]

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2)  return '(' + d
  if (d.length <= 7)  return '(' + d.slice(0,2) + ') ' + d.slice(2)
  if (d.length <= 11) return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7)
  return v
}

function Form() {
  const [form, setForm]         = useState({ nome: '', empresa: '', segmento: '', area: '', whatsapp: '', cidade: '' })
  const [sent, setSent]         = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTime                = useRef(Date.now())

  const handleSend = () => {
    if (honeypot) return
    if (Date.now() - loadTime.current < 5000) return
    if (!form.nome || !form.whatsapp) return
    const msg = encodeURIComponent(
      'Olá! Tenho interesse em pavimentação industrial.\n' +
      'Nome: ' + form.nome + '\n' +
      'Empresa: ' + (form.empresa || 'Não informado') + '\n' +
      'Segmento: ' + (form.segmento || 'Não informado') + '\n' +
      'Área estimada: ' + (form.area || 'Não informado') + '\n' +
      'Cidade: ' + (form.cidade || 'Não informado') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + WA + '?text=' + msg, '_blank')
    setSent(true)
  }

  if (sent) return (
    <div className="border border-green/30 p-8 text-center">
      <div className="w-10 h-10 border border-green flex items-center justify-center mx-auto mb-4">
        <span className="font-display font-black text-green text-sm">OK</span>
      </div>
      <p className="font-display font-bold text-[22px] text-white mb-2">Recebemos!</p>
      <p className="text-[13px] text-white/40 mb-6">Retorno em até 24 horas.</p>
      <button
        onClick={() => { setSent(false); setForm({ nome: '', empresa: '', segmento: '', area: '', whatsapp: '', cidade: '' }) }}
        className="text-[11px] font-medium tracking-[.14em] uppercase
          text-green border border-green/30 px-6 py-2.5
          hover:bg-green hover:text-white transition-colors">
        Nova solicitação
      </button>
    </div>
  )

  return (
    <div>
      <input name="website" tabIndex={-1} autoComplete="off"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        onChange={e => setHoneypot(e.target.value)} />

      <div className="flex flex-col gap-0">
        {[
          { key: 'nome',    label: 'Seu nome',   type: 'text', ph: 'Como você se chama?',    req: true  },
          { key: 'empresa', label: 'Empresa',    type: 'text', ph: 'Nome da empresa',         req: false },
          { key: 'cidade',  label: 'Cidade',     type: 'text', ph: 'Onde fica a unidade?',    req: false },
          { key: 'area',    label: 'Área aprox.', type: 'text', ph: 'Ex: 5.000 m²',           req: false },
        ].map(f => (
          <div key={f.key} className="flex flex-col border-b border-white/[.08] first:border-t">
            <label className="text-[10px] font-medium tracking-[.2em] uppercase text-white/22 pt-3 pb-1">
              {f.label}{f.req && <span className="text-green ml-1">*</span>}
            </label>
            <input type={f.type} placeholder={f.ph}
              value={form[f.key as keyof typeof form]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              className="bg-transparent border-none outline-none text-[15px] font-light
                text-white pb-3 placeholder:text-white/12 caret-green" />
          </div>
        ))}

        <div className="flex flex-col border-b border-white/[.08]">
          <label className="text-[10px] font-medium tracking-[.2em] uppercase text-white/22 pt-3 pb-1">
            Segmento
          </label>
          <select
            value={form.segmento}
            onChange={e => setForm(p => ({ ...p, segmento: e.target.value }))}
            className="bg-transparent border-none outline-none text-[15px] font-light
              text-white pb-3 appearance-none [&>option]:bg-[#0b1828] [&>option]:text-white">
            <option value="" disabled>Selecione o segmento</option>
            <option value="Transportadora">Transportadora</option>
            <option value="Frigorífico / Agroindústria">Frigorífico / Agroindústria</option>
            <option value="Centro de Distribuição">Centro de Distribuição</option>
            <option value="Parque Industrial / Galpão">Parque Industrial / Galpão</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="flex flex-col border-b border-white/[.08]">
          <label className="text-[10px] font-medium tracking-[.2em] uppercase text-white/22 pt-3 pb-1">
            WhatsApp <span className="text-green">*</span>
          </label>
          <input type="tel" placeholder="(64) 9 0000-0000"
            value={form.whatsapp}
            onChange={e => setForm(p => ({ ...p, whatsapp: maskPhone(e.target.value) }))}
            className="bg-transparent border-none outline-none text-[15px] font-light
              text-white pb-3 placeholder:text-white/12 caret-green" />
        </div>
      </div>

      <button onClick={handleSend}
        disabled={!form.nome || !form.whatsapp}
        className="mt-5 w-full flex items-center justify-between px-6 py-4
          bg-green text-white text-[12px] font-medium tracking-[.14em] uppercase
          hover:bg-green2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        Solicitar orçamento técnico
        <span className="text-[16px]">↗</span>
      </button>
      <p className="text-[10px] text-white/18 text-center mt-3">
        Retorno em até 24 horas · Proposta com preço e prazo
      </p>
    </div>
  )
}

export default function LPIndustrial() {
  const { company } = site

  return (
    <div className="bg-[#070e1a] text-cream font-body">

      {/* ── NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-10 h-[64px] bg-[#070e1a]/96 backdrop-blur-sm border-b border-white/[.06]">
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={200} height={56} className="h-14 md:h-16 w-auto object-contain" />
        </Link>
        <a href={'https://wa.me/' + WA} target="_blank"
          className="text-[11px] font-medium tracking-[.14em] uppercase
            text-white bg-green px-5 py-2.5 hover:bg-green2 transition-colors">
          WhatsApp
        </a>
      </header>

      {/* ── HERO */}
      <section className="relative min-h-screen pt-[64px]">

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lp/industrial-bg.jpg"
            alt="Pátio industrial pavimentado em Goiás"
            fill className="object-cover object-center" priority sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 z-[1]" style={{
          background: [
            'linear-gradient(to right, rgba(4,10,22,.98) 0%, rgba(4,10,22,.90) 45%, rgba(4,10,22,.60) 70%, rgba(4,10,22,.40) 100%)',
            'linear-gradient(to top, rgba(4,10,22,.95) 0%, rgba(4,10,22,.2) 50%, transparent 80%)',
          ].join(',')
        }} />

        <div className="relative z-[2] min-h-[calc(100svh-64px)] max-w-7xl mx-auto px-6 md:px-12
          grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-green block" />
              <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">
                Pavimentação Industrial · Goiás
              </span>
            </div>

            <h1 className="font-display font-black text-white leading-[.86] mb-6"
              style={{ fontSize: 'clamp(38px, 5.5vw, 84px)' }}>
              SUA OPERAÇÃO<br />NÃO PARA<br />POR CAUSA<br />
              <span className="text-green">DO PÁTIO.</span>
            </h1>

            <p className="text-[15px] font-light text-white/50 leading-[1.8] mb-6 max-w-md hidden md:block">
              Pátio degradado aumenta custo por ciclo, atrasa inauguração e afasta cliente.
              A GP Asfalto resolve do zero — terraplenagem, base e CBUQ próprio,{' '}
              <strong className="text-white/70 font-normal">mais de 40 anos</strong> em Goiás.
              Novo ou reforma.
            </p>

            <p className="text-[14px] font-light text-white/50 leading-[1.8] mb-6 md:hidden">
              Pátio ruim custa operação. GP Asfalto resolve — terraplenagem, base e asfalto, uma empresa só.
            </p>

            <div className="hidden md:flex flex-col gap-2">
              {[
                'Transportadoras, frigoríficos, CDs e parques industriais',
                'Laudo técnico e ART inclusa em cada obra',
                '3 usinas próprias — produção e aplicação sem subcontratado',
              ].map(t => (
                <div key={t} className="flex items-start gap-3">
                  <span className="w-4 h-px bg-green mt-[10px] flex-shrink-0" />
                  <span className="text-[13px] text-white/40">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="bg-[#0b1828]/92 backdrop-blur-sm p-7 md:p-9 border border-white/[.08]">
              <p className="text-[10px] font-medium tracking-[.22em] uppercase text-green mb-1">
                Orçamento técnico gratuito
              </p>
              <h3 className="font-display font-black text-white text-[22px] uppercase leading-tight mb-6">
                A gente projeta<br />
                <span className="text-green">e entrega.</span>
              </h3>
              <Form />
            </div>
          </div>

        </div>
      </section>

      {/* ── LOGOS */}
      <section className="py-5 px-6 md:px-12 border-y border-black/10"
        style={{ background: '#e8e3da' }}>
        <p className="text-[9px] font-medium tracking-[.22em] uppercase text-navy/50
          text-center mb-4">
          Fazemos parte da infraestrutura dessas operações
        </p>
        <div className="flex justify-center">
          <img
            src="/images/lp/logos_strip.png"
            alt="LDC, COMIGO, Raízen, Nutrien, Mosaic, Fetz, Grupo Cereal, Cereal Ouro, Mercado Livre"
            className="h-9 md:h-11 w-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      </section>

      {/* ── PARA QUEM */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#070e1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              Para quem fazemos
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-12 leading-[.9]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}>
            QUALQUER OPERAÇÃO<br />
            <span className="text-white/20">QUE DEPENDE DO PÁTIO</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {segmentos.map((s, i) => (
              <div key={i}
                className="border-b sm:border-b-0 sm:border-r border-white/[.07]
                  last:border-0 pb-8 sm:pb-0 sm:pr-6 last:pr-0
                  [&:not(:first-child)]:sm:pl-6 [&:not(:first-child)]:lg:pl-6">
                <span className="text-[28px] block mb-4">{s.icon}</span>
                <h3 className="font-display font-black text-white text-[18px] uppercase
                  mb-3 leading-tight">
                  {s.label}
                </h3>
                <p className="text-[13px] font-light leading-[1.85] text-white/40">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DORES */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              O que está custando agora
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-14 leading-[.9]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}>
            PÁTIO RUIM TEM<br />
            <span className="text-white/20">CUSTO REAL E MENSURÁVEL</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {dores.map(d => (
              <div key={d.num}
                className="border-b md:border-b-0 md:border-r border-white/[.07]
                  last:border-0 pb-10 md:pb-0 md:pr-10 last:pr-0
                  [&:nth-child(2)]:md:px-10">
                <span className="font-display font-black text-[11px] tracking-[.2em]
                  text-green/35 block mb-3">
                  {d.num}
                </span>
                <span className="font-display font-black text-[28px] text-white
                  leading-none block mb-1">
                  {d.stat}
                </span>
                <h3 className="font-display font-bold text-[16px] text-white uppercase
                  mb-3 mt-3 leading-tight">
                  {d.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.85] text-white/40 mb-3">
                  {d.desc}
                </p>
                {d.fonte && <p className="text-[10px] text-white/20 italic">{d.fonte}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FAZEMOS — vídeo Cloudinary */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video autoPlay muted loop playsInline style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '177.78vh', minWidth: '100%',
            height: '56.25vw', minHeight: '100%',
            objectFit: 'cover',
          }}>
            <source src={VIDEO_CLOUDINARY} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(4,10,22,.87)' }} />

        <div className="relative z-[2] max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              Como fazemos
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-14 leading-[.9]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}>
            DA TERRA AO ASFALTO<br />
            <span className="text-green">UMA EMPRESA SÓ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {como.map(c => (
              <div key={c.n}
                className="border-b md:border-b-0 md:border-r border-white/[.10]
                  last:border-0 pb-10 md:pb-0 md:pr-10 last:pr-0
                  [&:nth-child(2)]:md:px-10">
                <div className="w-8 h-8 border border-green/50 flex items-center
                  justify-center mb-5">
                  <span className="font-display font-black text-[11px] text-green">{c.n}</span>
                </div>
                <h3 className="font-display font-bold text-[17px] text-white uppercase
                  mb-3 leading-tight">
                  {c.t}
                </h3>
                <p className="text-[13px] font-light leading-[1.85] text-white/45">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#070e1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              Por que GP Asfalto
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-12 leading-[.9]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}>
            DOCUMENTAÇÃO, PRAZO<br />
            <span className="text-green">E RESPONSABILIDADE ÚNICA</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {diferenciais.map((d, i) => (
              <div key={i}
                className="border-b border-white/[.06] py-7
                  odd:sm:border-r odd:sm:pr-8 even:sm:pl-8
                  lg:border-r lg:px-8 first:lg:pl-0 [&:nth-child(3n)]:lg:border-r-0 [&:nth-child(3n)]:lg:pr-0">
                <div className="flex items-start gap-4">
                  <span className="w-4 h-px bg-green mt-[10px] flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-white text-[15px] uppercase mb-1">
                      {d.label}
                    </h4>
                    <p className="text-[13px] font-light text-white/40 leading-[1.7]">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-display font-black text-white mb-3 leading-[.9] text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            PRONTO PARA<br />
            <span className="text-green">RESOLVER O PÁTIO?</span>
          </h2>
          <p className="text-[14px] font-light text-white/32 text-center mb-10 leading-relaxed">
            GP Asfalto — mais de 40 anos em Goiás. Terraplenagem, base e CBUQ próprio.
            Laudo e ART inclusa. Visita técnica gratuita, proposta em 24 horas.
          </p>
          <Form />
        </div>
      </section>

      {/* ── FOOTER */}
      <footer className="border-t border-white/[.06] px-6 md:px-12 py-5
        flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ background: '#040a14' }}>
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={120} height={34}
            className="h-8 w-auto opacity-40 hover:opacity-80 transition-opacity" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <span className="text-[10px] text-white/16">{company.cnpj}</span>
          <a href={'https://wa.me/' + WA} target="_blank"
            className="text-[11px] font-medium tracking-[.1em] uppercase
              text-white/28 hover:text-green transition-colors">
            (64) 99327-3958
          </a>
        </div>
        <span className="text-[10px] text-white/14">Rio Verde · GO · Brasil</span>
      </footer>

    </div>
  )
}
