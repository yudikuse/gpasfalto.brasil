'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const VIDEO_CLOUDINARY = 'https://res.cloudinary.com/dfw7h9c2j/video/upload/vc_h264,q_auto/silo-bg_tjhnws.mp4#t=5'
const WA = '5564993273958'

// ── CORES
const BG      = '#0D0D0D'  // preto técnico — diferente do navy da LP1
const BG2     = '#141414'  // seção alternada
const GREEN   = '#2C8836'
const BORDER  = 'rgba(255,255,255,.07)'

// ── ÍCONES SVG
const IconTruck = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="8" width="18" height="14" rx="1"/><path d="M19 12h7l3 5v5h-10V12z"/>
    <circle cx="7" cy="24" r="2.5"/><circle cx="24" cy="24" r="2.5"/>
  </svg>
)
const IconFactory = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 28V14l8-6v6l8-6v6l8-6v20H2z"/>
    <rect x="12" y="20" width="4" height="8"/><rect x="6" y="20" width="3" height="5"/><rect x="19" y="20" width="3" height="5"/>
  </svg>
)
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10l14-7 14 7v12l-14 7L2 22V10z"/><path d="M2 10l14 7 14-7"/>
    <line x1="16" y1="17" x2="16" y2="29"/>
  </svg>
)
const IconCrane = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" y1="4" x2="10" y2="28"/><line x1="10" y1="4" x2="28" y2="4"/>
    <line x1="28" y1="4" x2="28" y2="12"/><line x1="10" y1="10" x2="28" y2="4"/>
    <line x1="18" y1="4" x2="18" y2="16"/><rect x="15" y="16" width="6" height="5" rx="1"/>
    <line x1="6" y1="28" x2="14" y2="28"/>
  </svg>
)

const segmentos = [
  {
    id: 'transportadora', label: 'Transportadora', Icon: IconTruck,
    headline: 'Pátio que não atrasa sua frota.',
    items: ['Suporte a carretas 74t sem afundamento', 'Drenagem lateral — opera na chuva', 'Raio de manobra para bi-trem e rodotrem', 'Ciclo de carga e descarga mais rápido'],
  },
  {
    id: 'frigorifico', label: 'Frigorífico & Agroindústria', Icon: IconFactory,
    headline: 'Documentação que a engenharia da planta aprova.',
    items: ['Laudo técnico de resistência incluso', 'ART assinada em cada obra', 'Pátio de recepção e área de expedição', 'Documentação completa para auditoria'],
  },
  {
    id: 'cd', label: 'Centro de Distribuição', Icon: IconBox,
    headline: 'Pátio que não limita seu throughput.',
    items: ['Projeto de docas e manobra integrado', 'Superfície que opera 24h sem degradação', 'Raio de giro para rodotrem e bi-trem', 'Sinalização e controle de fluxo'],
  },
  {
    id: 'industrial', label: 'Parque Industrial & Galpão', Icon: IconCrane,
    headline: 'Pátio pronto antes do primeiro inquilino.',
    items: ['Novo empreendimento ou revitalização', 'Vias internas, acesso e pátio', 'Documentação para condomínio ou locatário', 'Terraplenagem + base + asfalto, um contrato'],
  },
]

const dores = [
  { num: '+40min', label: 'por ciclo', desc: 'Pátio degradado transforma 15 minutos de manobra em 40. Em 50 veículos por dia, são horas perdidas — custo real, não estimado.' },
  { num: '3×',    label: 'você paga pelo mesmo m²', desc: 'Base mal compactada colapsa em 2 anos. Você executa, remenda e reexecuta. Asfalto bem feito dura 15 a 20 anos sem intervenção.' },
  { num: '1 dia', label: 'de atraso tem custo fixo', desc: 'Contrato começa na data combinada. Aluguel, equipe e penalidade contratual não esperam o pátio ficar pronto.' },
]

const diferenciais = [
  { t: 'Laudo técnico incluso',    d: 'Resistência à compressão e espessura verificadas em laboratório. Documentação para engenharia do seu cliente.' },
  { t: 'ART assinada',             d: 'Anotação de Responsabilidade Técnica em cada obra. Necessária para aprovação interna e auditoria.' },
  { t: 'CBUQ próprio',             d: '3 usinas em Rio Verde, GO. Produção e aplicação sem depender de fornecedor externo.' },
  { t: 'Um contrato, um responsável', d: 'Terraplenagem, base e asfalto: uma empresa. Sem interface de subcontratado, sem atraso por culpa de terceiro.' },
  { t: 'Mobilização rápida em GO', d: 'Equipamento e equipe próprios em Rio Verde. Menos logística, menos atraso, mais previsibilidade.' },
  { t: '+40 anos no Cerrado',      d: 'LDC, COMIGO, Raízen, Nutrien, Mercado Livre. Infra que funciona em operações reais.' },
]

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2)  return '(' + d
  if (d.length <= 7)  return '(' + d.slice(0,2) + ') ' + d.slice(2)
  if (d.length <= 11) return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7)
  return v
}

// ── FORM HERO — 3 campos apenas
function FormHero() {
  const [form, setForm]         = useState({ nome: '', segmento: '', whatsapp: '' })
  const [sent, setSent]         = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTime                = useRef(Date.now())

  const send = () => {
    if (honeypot || Date.now() - loadTime.current < 5000) return
    if (!form.nome || !form.whatsapp) return
    const msg = encodeURIComponent(
      'Olá! Interesse em pavimentação industrial.\n' +
      'Nome: ' + form.nome + '\n' +
      'Segmento: ' + (form.segmento || 'Não informado') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + WA + '?text=' + msg, '_blank')
    setSent(true)
  }

  if (sent) return (
    <div className="border p-6 text-center" style={{ borderColor: `${GREEN}40` }}>
      <div className="w-9 h-9 border border-green flex items-center justify-center mx-auto mb-3">
        <span className="font-display font-black text-xs" style={{ color: GREEN }}>OK</span>
      </div>
      <p className="font-display font-black text-white text-[18px] uppercase mb-1">Recebemos!</p>
      <p className="text-[12px] mb-4" style={{ color: 'rgba(255,255,255,.30)' }}>Retorno em até 24 horas.</p>
      <button onClick={() => { setSent(false); setForm({ nome: '', segmento: '', whatsapp: '' }) }}
        className="text-[9px] font-medium tracking-[.16em] uppercase px-4 py-2 border transition-colors hover:text-white"
        style={{ color: GREEN, borderColor: `${GREEN}40` }}>
        Nova solicitação
      </button>
    </div>
  )

  return (
    <div>
      <input name="website" tabIndex={-1} autoComplete="off"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        onChange={e => setHoneypot(e.target.value)} />

      {/* NOME */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <label className="block text-[9px] font-medium tracking-[.22em] uppercase pt-3 pb-0.5"
          style={{ color: 'rgba(255,255,255,.28)' }}>
          Nome <span style={{ color: GREEN }}>*</span>
        </label>
        <input type="text" placeholder="Seu nome" value={form.nome}
          onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
          className="w-full bg-transparent border-none outline-none text-[14px] text-white pb-3 placeholder:text-white/15 caret-green" />
      </div>

      {/* SEGMENTO */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <label className="block text-[9px] font-medium tracking-[.22em] uppercase pt-3 pb-0.5"
          style={{ color: 'rgba(255,255,255,.28)' }}>
          Segmento
        </label>
        <select value={form.segmento}
          onChange={e => setForm(p => ({ ...p, segmento: e.target.value }))}
          className="w-full bg-transparent border-none outline-none text-[14px] pb-3 appearance-none"
          style={{ color: form.segmento ? 'white' : 'rgba(255,255,255,.25)' }}>
          <option value="" disabled style={{ background: '#1a1a1a', color: 'white' }}>Selecione</option>
          {['Transportadora','Frigorífico / Agroindústria','Centro de Distribuição','Parque Industrial / Galpão','Outro'].map(o => (
            <option key={o} style={{ background: '#1a1a1a', color: 'white' }}>{o}</option>
          ))}
        </select>
      </div>

      {/* WHATSAPP */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: 16 }}>
        <label className="block text-[9px] font-medium tracking-[.22em] uppercase pt-3 pb-0.5"
          style={{ color: 'rgba(255,255,255,.28)' }}>
          WhatsApp <span style={{ color: GREEN }}>*</span>
        </label>
        <input type="tel" placeholder="(64) 9 0000-0000" value={form.whatsapp}
          onChange={e => setForm(p => ({ ...p, whatsapp: maskPhone(e.target.value) }))}
          className="w-full bg-transparent border-none outline-none text-[14px] text-white pb-3 placeholder:text-white/15 caret-green" />
      </div>

      <button onClick={send}
        disabled={!form.nome || !form.whatsapp}
        className="w-full flex items-center justify-between px-5 py-3.5 text-white text-[11px] font-medium tracking-[.14em] uppercase transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        style={{ background: GREEN }}
        onMouseEnter={e => (e.currentTarget.style.background = '#1e6b28')}
        onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
        Solicitar orçamento técnico
        <span className="text-[15px]">↗</span>
      </button>
      <p className="text-[9px] text-center mt-2" style={{ color: 'rgba(255,255,255,.20)' }}>
        Retorno em até 24h · Visita técnica gratuita
      </p>
    </div>
  )
}

// ── FORM CTA — mais campos para qualificação
function FormCTA() {
  const [form, setForm]         = useState({ nome: '', empresa: '', segmento: '', area: '', whatsapp: '', cidade: '' })
  const [sent, setSent]         = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTime                = useRef(Date.now())

  const send = () => {
    if (honeypot || Date.now() - loadTime.current < 5000) return
    if (!form.nome || !form.whatsapp) return
    const msg = encodeURIComponent(
      'Olá! Interesse em pavimentação industrial.\n' +
      'Nome: ' + form.nome + '\n' +
      'Empresa: ' + (form.empresa || '—') + '\n' +
      'Segmento: ' + (form.segmento || '—') + '\n' +
      'Área: ' + (form.area || '—') + '\n' +
      'Cidade: ' + (form.cidade || '—') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + WA + '?text=' + msg, '_blank')
    setSent(true)
  }

  if (sent) return (
    <div className="border p-6 text-center" style={{ borderColor: `${GREEN}40` }}>
      <div className="w-9 h-9 border flex items-center justify-center mx-auto mb-3" style={{ borderColor: GREEN }}>
        <span className="font-display font-black text-xs" style={{ color: GREEN }}>OK</span>
      </div>
      <p className="font-display font-black text-white text-[18px] uppercase mb-1">Recebemos!</p>
      <p className="text-[12px] mb-4" style={{ color: 'rgba(255,255,255,.30)' }}>Retorno em até 24 horas.</p>
    </div>
  )

  const Field = ({ k, label, ph, req = false, type = 'text' }: { k: string; label: string; ph: string; req?: boolean; type?: string }) => (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <label className="block text-[9px] font-medium tracking-[.22em] uppercase pt-3 pb-0.5"
        style={{ color: 'rgba(255,255,255,.28)' }}>
        {label}{req && <span className="ml-1" style={{ color: GREEN }}>*</span>}
      </label>
      <input type={type} placeholder={ph}
        value={form[k as keyof typeof form]}
        onChange={e => setForm(p => ({ ...p, [k]: type === 'tel' ? maskPhone(e.target.value) : e.target.value }))}
        className="w-full bg-transparent border-none outline-none text-[14px] text-white pb-3 placeholder:text-white/15 caret-green" />
    </div>
  )

  return (
    <div>
      <input name="website" tabIndex={-1} autoComplete="off"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        onChange={e => setHoneypot(e.target.value)} />
      <Field k="nome"    label="Nome"        ph="Seu nome"            req />
      <Field k="empresa" label="Empresa"     ph="Nome da empresa"          />
      <Field k="cidade"  label="Cidade / UF" ph="Onde fica a unidade?"     />
      <Field k="area"    label="Área (m²)"   ph="Ex: 5.000 m²"            />
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <label className="block text-[9px] font-medium tracking-[.22em] uppercase pt-3 pb-0.5"
          style={{ color: 'rgba(255,255,255,.28)' }}>Segmento</label>
        <select value={form.segmento}
          onChange={e => setForm(p => ({ ...p, segmento: e.target.value }))}
          className="w-full bg-transparent border-none outline-none text-[14px] pb-3 appearance-none"
          style={{ color: form.segmento ? 'white' : 'rgba(255,255,255,.25)' }}>
          <option value="" disabled style={{ background: '#1a1a1a', color: 'white' }}>Selecione</option>
          {['Transportadora','Frigorífico / Agroindústria','Centro de Distribuição','Parque Industrial / Galpão','Outro'].map(o => (
            <option key={o} style={{ background: '#1a1a1a', color: 'white' }}>{o}</option>
          ))}
        </select>
      </div>
      <Field k="whatsapp" label="WhatsApp" ph="(64) 9 0000-0000" req type="tel" />
      <div style={{ height: 16 }} />
      <button onClick={send}
        disabled={!form.nome || !form.whatsapp}
        className="w-full flex items-center justify-between px-5 py-3.5 text-white text-[11px] font-medium tracking-[.14em] uppercase transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        style={{ background: GREEN }}
        onMouseEnter={e => (e.currentTarget.style.background = '#1e6b28')}
        onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
        Solicitar orçamento técnico
        <span className="text-[15px]">↗</span>
      </button>
      <p className="text-[9px] text-center mt-2" style={{ color: 'rgba(255,255,255,.20)' }}>
        Retorno em até 24h · Proposta com preço e prazo
      </p>
    </div>
  )
}

export default function LPIndustrial() {
  const { company } = site
  const [activeSeg, setActiveSeg] = useState(0)
  const seg = segmentos[activeSeg]

  return (
    <div className="font-body" style={{ background: BG, color: 'rgba(255,255,255,.85)' }}>

      {/* ── NAV — sem links de navegação */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-[60px]"
        style={{ background: 'rgba(13,13,13,.97)', borderBottom: `1px solid ${BORDER}`, backdropFilter: 'blur(8px)' }}>
        {/* Logo sem link — LP não deve ter saída */}
        <Image src="/images/logo-white.png" alt="GP Asfalto" width={160} height={44}
          className="h-10 w-auto object-contain" />
        <a href={'https://wa.me/' + WA} target="_blank"
          className="text-[10px] font-medium tracking-[.16em] uppercase text-white px-4 py-2.5 transition-colors"
          style={{ background: GREEN }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1e6b28')}
          onMouseLeave={e => (e.currentTarget.style.background = GREEN)}>
          WhatsApp
        </a>
      </header>

      {/* ── HERO */}
      <section className="relative min-h-screen pt-[60px]">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/lp/industrial-bg.jpg" alt="Pátio industrial em Goiás"
            fill className="object-cover object-center" priority sizes="100vw" />
          <div className="absolute inset-0" style={{
            background: [
              'linear-gradient(to right, rgba(13,13,13,.99) 0%, rgba(13,13,13,.96) 50%, rgba(13,13,13,.65) 75%, rgba(13,13,13,.30) 100%)',
              'linear-gradient(to top, rgba(13,13,13,.95) 0%, rgba(13,13,13,.10) 60%, transparent 100%)',
            ].join(',')
          }} />
        </div>

        <div className="relative z-[1] max-w-7xl mx-auto px-6 md:px-12 min-h-[calc(100svh-60px)]
          grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 items-center py-16">

          {/* COPY */}
          <div className="lg:pr-16">
            {/* TRUST BAR */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-8">
              {['+ 40 anos', '3 usinas GO', 'Laudo incluso', 'ART inclusa'].map((t, i) => (
                <span key={i} className="flex items-center gap-2 text-[9px] tracking-[.2em] uppercase"
                  style={{ color: 'rgba(255,255,255,.30)' }}>
                  {i > 0 && <span className="w-1 h-1 rounded-full" style={{ background: GREEN }} />}
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-display font-black text-white leading-[.84] mb-5"
              style={{ fontSize: 'clamp(42px, 6vw, 92px)' }}>
              SUA OPERAÇÃO<br />NÃO PARA<br />POR CAUSA<br />
              <span style={{ color: GREEN }}>DO PÁTIO.</span>
            </h1>

            <p className="text-[14px] font-light leading-[1.8] mb-6 max-w-md hidden md:block"
              style={{ color: 'rgba(255,255,255,.40)' }}>
              Novo ou reforma — terraplenagem, base e CBUQ próprio em um contrato só.
              Laudo técnico e ART em cada obra. Um responsável, do projeto à entrega.
            </p>

            <div className="hidden md:flex flex-col gap-2">
              {['Transportadoras · Frigoríficos · CDs · Parques industriais', 'Rio Verde e todo o estado de Goiás'].map(t => (
                <div key={t} className="flex items-center gap-3">
                  <span className="w-4 h-px flex-shrink-0" style={{ background: GREEN }} />
                  <span className="text-[12px]" style={{ color: 'rgba(255,255,255,.35)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM + LOGOS ABAIXO */}
          <div className="hidden lg:block">
            <div className="sticky top-[76px]">
              {/* CARD FORM */}
              <div className="p-6 mb-4" style={{ background: BG2, border: `1px solid ${BORDER}` }}>
                <p className="text-[9px] font-medium tracking-[.22em] uppercase mb-0.5" style={{ color: GREEN }}>
                  Orçamento técnico · gratuito
                </p>
                <h3 className="font-display font-black text-white text-[18px] uppercase leading-tight mb-5">
                  Proposta em 24h.<br />
                  <span style={{ color: GREEN }}>Visita gratuita.</span>
                </h3>
                <FormHero />
              </div>

              {/* LOGOS — imediatamente abaixo do form */}
              <div style={{ borderTop: `1px solid ${BORDER}` }} className="pt-4">
                <p className="text-[8px] tracking-[.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,.20)' }}>
                  Essas operações confiam na GP Asfalto
                </p>
                <img src="/images/lp/logos_strip.png" alt="Clientes"
                  className="h-7 w-auto" style={{ filter: 'brightness(0) invert(1)', opacity: .25 }} />
              </div>
            </div>
          </div>

          {/* FORM MOBILE */}
          <div className="lg:hidden">
            <div className="p-6 mb-4" style={{ background: BG2, border: `1px solid ${BORDER}` }}>
              <p className="text-[9px] font-medium tracking-[.22em] uppercase mb-0.5" style={{ color: GREEN }}>
                Orçamento técnico · gratuito
              </p>
              <h3 className="font-display font-black text-white text-[18px] uppercase leading-tight mb-5">
                Proposta em 24h.<br /><span style={{ color: GREEN }}>Visita gratuita.</span>
              </h3>
              <FormHero />
            </div>
            <div className="pt-3" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p className="text-[8px] tracking-[.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,.20)' }}>
                Operações que confiam na GP Asfalto
              </p>
              <img src="/images/lp/logos_strip.png" alt="Clientes"
                className="h-6 w-auto" style={{ filter: 'brightness(0) invert(1)', opacity: .22 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── DORES */}
      <section className="py-20 px-6 md:px-12" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: GREEN }} />
            <span className="text-[9px] font-medium tracking-[.24em] uppercase" style={{ color: GREEN }}>
              O que está custando
            </span>
          </div>
          <h2 className="font-display font-black text-white leading-[.9] mb-14"
            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}>
            PÁTIO RUIM TEM CUSTO REAL<br />
            <span style={{ color: 'rgba(255,255,255,.12)' }}>E MENSURÁVEL</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {dores.map((d, i) => (
              <div key={i} className="py-8 md:pr-10 last:pr-0 [&:nth-child(2)]:md:px-10"
                style={{
                  borderTop: `1px solid ${BORDER}`,
                  borderRight: i < 2 ? `1px solid ${BORDER}` : 'none',
                }}>
                <span className="font-display font-black block mb-0.5"
                  style={{ fontSize: 'clamp(44px, 4.5vw, 64px)', color: GREEN, lineHeight: 1 }}>
                  {d.num}
                </span>
                <span className="text-[9px] font-medium tracking-[.18em] uppercase block mb-4"
                  style={{ color: 'rgba(255,255,255,.28)' }}>
                  {d.label}
                </span>
                <p className="text-[13px] font-light leading-[1.85]"
                  style={{ color: 'rgba(255,255,255,.45)' }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARA QUEM — abas */}
      <section className="py-20 px-6 md:px-12" style={{ background: BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: GREEN }} />
            <span className="text-[9px] font-medium tracking-[.24em] uppercase" style={{ color: GREEN }}>
              Para quem fazemos
            </span>
          </div>
          <h2 className="font-display font-black text-white leading-[.9] mb-10"
            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}>
            SEU SEGMENTO,<br />
            <span style={{ color: 'rgba(255,255,255,.12)' }}>SUA ESPECIFICAÇÃO</span>
          </h2>

          {/* TABS */}
          <div className="flex flex-wrap -mb-px" style={{ borderBottom: `1px solid ${BORDER}` }}>
            {segmentos.map((s, i) => (
              <button key={s.id} onClick={() => setActiveSeg(i)}
                className="flex items-center gap-2 px-4 py-3 text-[10px] font-medium tracking-[.1em] uppercase transition-all -mb-px"
                style={{
                  color: activeSeg === i ? 'white' : 'rgba(255,255,255,.25)',
                  borderBottom: activeSeg === i ? `2px solid ${GREEN}` : '2px solid transparent',
                }}>
                <span style={{ color: activeSeg === i ? GREEN : 'rgba(255,255,255,.22)' }}>
                  <s.Icon />
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
            <div>
              <h3 className="font-display font-black text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(20px, 2.5vw, 34px)' }}>
                {seg.headline}
              </h3>
              {seg.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 mb-3">
                  <span className="w-4 h-px mt-[10px] flex-shrink-0" style={{ background: GREEN }} />
                  <span className="text-[13px] font-light leading-[1.7]"
                    style={{ color: 'rgba(255,255,255,.50)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ background: BG2, border: `1px solid ${BORDER}` }}>
              <p className="text-[9px] font-medium tracking-[.22em] uppercase mb-1" style={{ color: GREEN }}>
                Fale com um especialista
              </p>
              <p className="font-display font-black text-white text-[15px] uppercase leading-tight mb-5">
                Solicitar orçamento para<br />{seg.label.toLowerCase()}
              </p>
              <FormHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS */}
      <section className="py-20 px-6 md:px-12" style={{ background: BG2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: GREEN }} />
            <span className="text-[9px] font-medium tracking-[.24em] uppercase" style={{ color: GREEN }}>
              Por que GP Asfalto
            </span>
          </div>
          <h2 className="font-display font-black text-white leading-[.9] mb-12"
            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}>
            DOCUMENTAÇÃO, PRAZO<br />
            <span style={{ color: 'rgba(255,255,255,.12)' }}>E RESPONSABILIDADE ÚNICA</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d, i) => (
              <div key={i} className="py-7 flex items-start gap-4"
                style={{
                  borderBottom: `1px solid ${BORDER}`,
                  borderRight: i % 2 === 0 ? `1px solid ${BORDER}` : 'none',
                  paddingLeft: i % 2 !== 0 ? 32 : 0,
                  paddingRight: i % 2 === 0 ? 32 : 0,
                }}>
                <span className="w-4 h-px mt-[10px] flex-shrink-0" style={{ background: GREEN }} />
                <div>
                  <h4 className="font-display font-bold text-white text-[14px] uppercase mb-1 leading-tight">
                    {d.t}
                  </h4>
                  <p className="text-[12px] font-light leading-[1.7]"
                    style={{ color: 'rgba(255,255,255,.38)' }}>
                    {d.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FAZEMOS */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video autoPlay muted loop playsInline style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '177.78vh', minWidth: '100%',
            height: '56.25vw', minHeight: '100%', objectFit: 'cover',
          }}>
            <source src={VIDEO_CLOUDINARY} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(13,13,13,.90)' }} />

        <div className="relative z-[2] max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: GREEN }} />
            <span className="text-[9px] font-medium tracking-[.24em] uppercase" style={{ color: GREEN }}>Como fazemos</span>
          </div>
          <h2 className="font-display font-black text-white leading-[.9] mb-14"
            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}>
            DA TERRA AO ASFALTO<br />
            <span style={{ color: 'rgba(255,255,255,.12)' }}>UMA EMPRESA SÓ</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { n: '01', t: 'Visita técnica e projeto', d: 'Análise de solo, tráfego e dimensões. Projeto com espessura de base, drenagem e CBUQ adequados à carga e ao segmento.' },
              { n: '02', t: 'Terraplenagem e base', d: 'Escavação, aterro por camadas, sub-base e base granular. A fundação certa é o que separa asfalto que dura 15 anos de asfalto que dura 2.' },
              { n: '03', t: 'Asfalto + documentação', d: 'CBUQ das 3 usinas em Rio Verde, GO. Laudo de resistência e ART entregues com a obra. Documentação completa para engenharia do seu cliente.' },
            ].map(c => (
              <div key={c.n}
                className="pb-10 md:pb-0 md:pr-10 last:pr-0 [&:nth-child(2)]:md:px-10"
                style={{ borderRight: c.n !== '03' ? `1px solid ${BORDER}` : 'none' }}>
                <div className="w-8 h-8 border flex items-center justify-center mb-5"
                  style={{ borderColor: `${GREEN}50` }}>
                  <span className="font-display font-black text-[11px]" style={{ color: GREEN }}>{c.n}</span>
                </div>
                <h3 className="font-display font-bold text-white text-[16px] uppercase mb-3 leading-tight">{c.t}</h3>
                <p className="text-[13px] font-light leading-[1.85]" style={{ color: 'rgba(255,255,255,.40)' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL */}
      <section className="py-20 px-6 md:px-12" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-black text-white leading-[.88] mb-4"
              style={{ fontSize: 'clamp(30px, 4vw, 60px)' }}>
              PRONTO PARA<br />RESOLVER<br /><span style={{ color: GREEN }}>O PÁTIO?</span>
            </h2>
            <p className="text-[14px] font-light leading-[1.8] mb-6 max-w-md"
              style={{ color: 'rgba(255,255,255,.38)' }}>
              GP Asfalto — mais de 40 anos em Goiás. Terraplenagem, base e CBUQ próprio.
              Laudo e ART em cada obra. Proposta em 24 horas, visita técnica gratuita.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['+ 40 anos', 'Laudo incluso', 'ART inclusa', '3 usinas GO', 'Rio Verde e GO'].map(t => (
                <span key={t} className="text-[8px] tracking-[.2em] uppercase px-3 py-1.5 border"
                  style={{ color: 'rgba(255,255,255,.28)', borderColor: BORDER }}>
                  {t}
                </span>
              ))}
            </div>
            {/* LOGOS no CTA também */}
            <div>
              <p className="text-[8px] tracking-[.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,.18)' }}>
                Operações que confiam
              </p>
              <img src="/images/lp/logos_strip.png" alt="Clientes"
                className="h-6 w-auto" style={{ filter: 'brightness(0) invert(1)', opacity: .20 }} />
            </div>
          </div>
          <div className="p-7" style={{ background: BG2, border: `1px solid ${BORDER}` }}>
            <FormCTA />
          </div>
        </div>
      </section>

      {/* ── FOOTER */}
      <footer className="px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ background: '#080808', borderTop: `1px solid ${BORDER}` }}>
        <Image src="/images/logo-white.png" alt="GP Asfalto" width={110} height={30}
          className="h-7 w-auto" style={{ opacity: .25 }} />
        <div className="flex flex-wrap items-center justify-center gap-5">
          <span className="text-[9px]" style={{ color: 'rgba(255,255,255,.18)' }}>{company.cnpj}</span>
          <a href={'https://wa.me/' + WA} target="_blank"
            className="text-[9px] tracking-[.1em] uppercase transition-colors"
            style={{ color: 'rgba(255,255,255,.25)' }}>
            (64) 99327-3958
          </a>
        </div>
        <span className="text-[9px]" style={{ color: 'rgba(255,255,255,.15)' }}>Rio Verde · GO · Brasil</span>
      </footer>

    </div>
  )
}
