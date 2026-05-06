'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const clientes = [
  'LDC', 'COMIGO', 'Raízen', 'Nutrien', 'Mosaic',
  'Fetz', 'Grupo Cereal', 'Cereal Ouro', 'Mercado Livre',
]

const dores = [
  {
    num: '01',
    title: 'Pátio de terra vira lodaçal',
    desc: 'Na safra, com chuva e tráfego de graneleiro, o chão cede. Fila de caminhão, operação travada, prejuízo imediato.',
  },
  {
    num: '02',
    title: 'Reforma no pico da colheita',
    desc: 'Problema no pátio sempre aparece quando mais incomoda. Obra emergencial no meio da safra multiplica o custo e o caos.',
  },
  {
    num: '03',
    title: 'Massa de terceiro, prazo incerto',
    desc: 'Quem subcontrata o CBUQ depende de agenda alheia. Atraso na massa = atraso na entrega. A GP produz nas próprias usinas.',
  },
]

const solucoes = [
  { title: 'Terraplanagem de base', desc: 'Solo nivelado, compactado e drenado antes do asfalto. Base errada é o principal motivo de pátio que afunda.' },
  { title: 'CBUQ de alta resistência', desc: 'Massa produzida nas nossas 3 usinas, dosagem Marshall certificada para tráfego de graneleiro pesado.' },
  { title: 'Aplicação própria', desc: 'Da vibroacabadora ao rolo, equipe e equipamento próprios. Sem subcontratação, sem surpresa no prazo.' },
  { title: 'Documentação completa', desc: 'Laudo técnico, ART de execução, LO Ativa SEMAD-GO. Tudo que compliance corporativo exige.' },
]

const specs = [
  { key: 'Carga de projeto',       value: '74 t',         sub: 'graneleiro carregado' },
  { key: 'Norma de referência',    value: 'DNIT',         sub: '/ NBR 7207' },
  { key: 'Raio de atendimento',    value: '90 km',        sub: 'das usinas' },
  { key: 'Usinas próprias',        value: '3',            sub: 'em operação' },
  { key: 'Licença ambiental',      value: 'LO Ativa',     sub: 'SEMAD-GO' },
  { key: 'Ensaio Marshall',        value: 'Certificado',  sub: 'por traço' },
]

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2)  return '(' + d
  if (d.length <= 7)  return '(' + d.slice(0,2) + ') ' + d.slice(2)
  if (d.length <= 11) return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7)
  return v
}

export default function LPSilos() {
  const { company } = site
  const [form, setForm] = useState({ nome: '', empresa: '', whatsapp: '', cidade: '' })
  const [sent, setSent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTime = useRef(Date.now())
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const handleSend = () => {
    if (honeypot) return
    if (Date.now() - loadTime.current < 5000) return
    if (!form.nome || !form.whatsapp) return

    const msg = encodeURIComponent(
      'Olá! Tenho interesse em pavimentação para silo/armazém.\n' +
      'Nome: ' + form.nome + '\n' +
      'Empresa: ' + (form.empresa || 'Não informado') + '\n' +
      'Cidade da obra: ' + (form.cidade || 'Não informado') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + company.whatsapp + '?text=' + msg, '_blank')
    setSent(true)
  }

  return (
    <div className="bg-[#070e1a] text-cream font-body">

      {/* ── NAV MÍNIMO */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-12 h-[64px] bg-[#070e1a]/95 backdrop-blur-sm border-b border-white/[.06]">
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={140} height={40} className="h-10 w-auto object-contain" />
        </Link>
        <button onClick={scrollToForm}
          className="text-[11px] font-medium tracking-[.14em] uppercase
            text-white bg-green px-5 py-2.5 hover:bg-green2 transition-colors">
          Solicitar estudo técnico
        </button>
      </header>

      {/* ── HERO */}
      <section className="relative min-h-screen flex items-end pb-16 pt-[64px]">
        {/* BG PHOTO */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lp/hero-silos.jpg"
            alt="Pavimentação CBUQ em armazém"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 z-[1]" style={{
          background: [
            'linear-gradient(to right, rgba(4,10,22,.92) 0%, rgba(4,10,22,.6) 50%, rgba(4,10,22,.2) 100%)',
            'linear-gradient(to top, rgba(4,10,22,.98) 0%, rgba(4,10,22,.3) 40%, transparent 70%)',
          ].join(',')
        }} />

        {/* CONTENT */}
        <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12">

          {/* EYEBROW */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.28em] uppercase text-green">
              Terraplanagem · Pavimentação CBUQ · Silos e Armazéns
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-black text-white leading-[.88] mb-6"
            style={{ fontSize: 'clamp(52px, 8vw, 118px)' }}>
            SEU SILO<br />
            CUSTA<br />
            <span className="text-green">MILHÕES.</span>
          </h1>

          <p className="text-[18px] md:text-[20px] font-light text-white/60
            leading-[1.7] max-w-[520px] mb-8">
            O pátio não pode ser o elo fraco da operação.
            CBUQ próprio, dimensionado para graneleiro pesado.
            Terraplanagem, base e pavimentação — uma empresa só.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button onClick={scrollToForm}
              className="text-[13px] font-medium tracking-[.14em] uppercase
                text-white bg-green px-10 py-4 hover:bg-green2 transition-colors">
              Solicitar estudo técnico
            </button>
            <a href={'https://wa.me/' + company.whatsapp} target="_blank"
              className="text-[13px] font-medium tracking-[.14em] uppercase
                text-white/50 border border-white/20 px-10 py-4
                hover:border-green hover:text-white transition-colors text-center">
              Falar no WhatsApp
            </a>
          </div>

          {/* TRUST BAR */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {['40+ anos de mercado', '3 usinas CBUQ próprias', 'Raio de 90 km', 'DNIT · LO Ativa'].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-3">
                <span className="text-[11px] font-medium tracking-[.08em] uppercase text-white/30">
                  {t}
                </span>
                {i < arr.length - 1 && <span className="text-white/15 hidden sm:block">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS */}
      <section className="bg-[#0a1525] border-y border-white/[.06] py-12 px-6 md:px-12">
        <p className="text-[10px] font-medium tracking-[.28em] uppercase text-white/25
          text-center mb-8">
          Fazemos parte da infraestrutura dessas operações
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 max-w-5xl mx-auto">
          {clientes.map(c => (
            <span key={c}
              className="font-display font-bold text-[15px] tracking-[.08em] uppercase
                text-white/25 hover:text-white/60 transition-colors">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── DOR */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-5 h-px bg-green block" />
          <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
            O problema
          </span>
        </div>
        <h2 className="font-display font-black text-white mb-16 leading-[.9]"
          style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
          POR QUE SEU PÁTIO<br />
          <span className="text-white/30">FALHA NA HORA ERRADA</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {dores.map((d, i) => (
            <div key={d.num}
              className="border-b md:border-b-0 md:border-r border-white/[.07]
                last:border-0 px-0 md:px-10 py-10 first:pl-0 last:pr-0">
              <span className="font-display font-black text-[11px] tracking-[.2em] text-green/40 block mb-6">
                {d.num}
              </span>
              <h3 className="font-display font-bold text-[22px] text-white uppercase mb-4 leading-tight">
                {d.title}
              </h3>
              <p className="text-[14px] font-light leading-[1.85] text-white/40">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUÇÃO com foto BG */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/obras/comigo-pp.jpg"
            alt="Terraplanagem GP Asfalto"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#070e1a]/80" />
        </div>

        <div className="relative z-[1] max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Como resolvemos
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-16 leading-[.9]"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            DO SOLO AO<br />
            <span className="text-green">ASFALTO ACABADO</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {solucoes.map((s, i) => (
              <div key={i}
                className="border-b sm:border-b-0 border-r border-white/[.07]
                  last:border-r-0 px-0 lg:px-8 py-10 first:pl-0 last:pr-0
                  [&:nth-child(2)]:border-r sm:[&:nth-child(2)]:border-r
                  lg:[&:nth-child(2)]:border-r">
                <div className="w-8 h-8 border border-green/40 flex items-center justify-center mb-6">
                  <span className="font-display font-black text-[12px] text-green">
                    {String(i+1).padStart(2,'0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[18px] text-white uppercase mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.85] text-white/40">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS */}
      <section className="bg-[#0a1525] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Capacidade técnica
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-16 leading-[.9]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            CBUQ CERTIFICADO<br />
            <span className="text-white/30">PARA TRÁFEGO PESADO</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {specs.map((s, i) => (
              <div key={i}
                className="flex justify-between items-baseline py-5
                  border-b border-white/[.06] first:border-t
                  md:[&:nth-child(odd)]:pr-16 md:[&:nth-child(even)]:pl-16
                  md:[&:nth-child(even)]:border-l md:border-white/[.06]">
                <span className="text-[13px] font-normal tracking-[.04em] text-white/30">
                  {s.key}
                </span>
                <span className="font-display font-bold text-[22px] text-white">
                  {s.value}
                  {s.sub && <small className="text-[12px] text-green ml-2">{s.sub}</small>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM */}
      <section ref={formRef} className="py-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Estudo técnico gratuito
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-4 leading-[.9]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            VAMOS AVALIAR<br />
            <span className="text-green">SUA OBRA.</span>
          </h2>
          <p className="text-[15px] font-light text-white/40 mb-12 leading-relaxed">
            Preencha abaixo. Nossa equipe técnica entra em contato
            em até 24 horas com uma análise preliminar.
          </p>

          {sent ? (
            <div className="border border-green/30 p-10 text-center">
              <div className="w-12 h-12 border border-green flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-black text-green text-lg">OK</span>
              </div>
              <h3 className="font-display font-bold text-[28px] text-white mb-3">
                Solicitação enviada!
              </h3>
              <p className="text-[14px] text-white/40 mb-6">
                Nossa equipe retorna em até 24 horas.
              </p>
              <button onClick={() => { setSent(false); setForm({ nome: '', empresa: '', whatsapp: '', cidade: '' }) }}
                className="text-[11px] font-medium tracking-[.14em] uppercase
                  text-green border border-green/30 px-6 py-3
                  hover:bg-green hover:text-white transition-colors">
                Nova solicitação
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {/* HONEYPOT */}
              <input
                name="website" tabIndex={-1} autoComplete="off"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
                onChange={e => setHoneypot(e.target.value)}
              />

              {[
                { key: 'nome',      label: 'Nome',              type: 'text', ph: 'Seu nome completo',     req: true  },
                { key: 'empresa',   label: 'Empresa',           type: 'text', ph: 'Nome da empresa',        req: false },
                { key: 'cidade',    label: 'Cidade da obra',    type: 'text', ph: 'Onde fica o silo?',      req: false },
              ].map(f => (
                <div key={f.key} className="flex flex-col border-b border-white/[.08] first:border-t">
                  <label className="text-[10px] font-medium tracking-[.22em] uppercase
                    text-white/25 pt-4 pb-1">
                    {f.label}{f.req && <span className="text-green ml-1">*</span>}
                  </label>
                  <input type={f.type} placeholder={f.ph}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="bg-transparent border-none outline-none
                      text-[16px] font-light text-white pb-4
                      placeholder:text-white/15 caret-green" />
                </div>
              ))}

              {/* WHATSAPP */}
              <div className="flex flex-col border-b border-white/[.08]">
                <label className="text-[10px] font-medium tracking-[.22em] uppercase
                  text-white/25 pt-4 pb-1">
                  WhatsApp <span className="text-green">*</span>
                </label>
                <input type="tel" placeholder="(64) 9 0000-0000"
                  value={form.whatsapp}
                  onChange={e => setForm(p => ({ ...p, whatsapp: maskPhone(e.target.value) }))}
                  className="bg-transparent border-none outline-none
                    text-[16px] font-light text-white pb-4
                    placeholder:text-white/15 caret-green" />
              </div>

              <button
                onClick={handleSend}
                disabled={!form.nome || !form.whatsapp}
                className="mt-8 flex items-center justify-between px-8 py-5
                  bg-green text-white text-[13px] font-medium tracking-[.14em] uppercase
                  hover:bg-green2 transition-colors
                  disabled:opacity-30 disabled:cursor-not-allowed">
                Solicitar estudo técnico
                <span className="text-[16px]">↗</span>
              </button>

              <p className="text-[11px] text-white/20 text-center mt-4">
                Retorno em até 24 horas · Sem compromisso
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER */}
      <footer className="border-t border-white/[.06] px-6 md:px-12 py-6
        flex flex-col md:flex-row items-center justify-between gap-4 bg-[#040a14]">
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={120} height={34} className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span className="text-[10px] tracking-[.1em] uppercase text-white/20">
            {company.cnpj}
          </span>
          <a href={'tel:+55' + company.phone.replace(/\D/g,'')}
            className="text-[12px] font-medium text-white/40 hover:text-white transition-colors">
            {company.phone}
          </a>
          <a href={'https://wa.me/' + company.whatsapp} target="_blank"
            className="text-[11px] font-medium tracking-[.1em] uppercase
              text-white/30 hover:text-green transition-colors">
            WhatsApp
          </a>
        </div>
        <span className="text-[10px] text-white/15">
          Rio Verde · GO · Brasil
        </span>
      </footer>

    </div>
  )
}
