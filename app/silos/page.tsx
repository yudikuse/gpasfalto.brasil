'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const VIDEO_ID = 'kCa5jGxJ080'

const dores = [
  {
    num: '01',
    stat: '45 dias',
    title: 'Janela de colheita',
    desc: 'Pátio enlameado na chuva — caminhão não entra, grão fica no campo. O que devia ir pro seu silo vai pra cooperativa no pico da baixa.',
  },
  {
    num: '02',
    stat: 'Frete +30%',
    title: 'Transportadora evita pátio ruim',
    desc: 'Na safra, caminhão é escasso. Quem tem estrutura agenda primeiro. Pátio ruim significa fila maior e frete mais caro quando mais precisa.',
  },
  {
    num: '03',
    stat: 'Desconto',
    title: 'Poeira entra no grão',
    desc: 'Terra levanta poeira na descarga. Grão absorve impureza, classificação cai. Você guardou 6 meses pra vender bem — e perde na balança.',
  },
]

const como = [
  { n: '01', t: 'Visita técnica gratuita',  d: 'Nossa equipe vai até sua propriedade avaliar o pátio e apresentar proposta com preço e prazo.' },
  { n: '02', t: 'Terraplanagem e base',      d: 'Solo nivelado, drenado e compactado. Base certa é o que garante que o asfalto aguenta graneleiro pesado.' },
  { n: '03', t: 'Asfalto aplicado',          d: 'Massa produzida nas nossas 3 usinas em Rio Verde. Da produção à aplicação — uma empresa só.' },
]

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2)  return '(' + d
  if (d.length <= 7)  return '(' + d.slice(0,2) + ') ' + d.slice(2)
  if (d.length <= 11) return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7)
  return v
}

function Form({ dark = true }: { dark?: boolean }) {
  const { company } = site
  const [form, setForm]     = useState({ nome: '', empresa: '', whatsapp: '', cidade: '' })
  const [sent, setSent]     = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTime = useRef(Date.now())

  const handleSend = () => {
    if (honeypot) return
    if (Date.now() - loadTime.current < 5000) return
    if (!form.nome || !form.whatsapp) return
    const msg = encodeURIComponent(
      'Olá! Tenho interesse em asfaltar o pátio do meu silo.\n' +
      'Nome: ' + form.nome + '\n' +
      'Fazenda/Empresa: ' + (form.empresa || 'Não informado') + '\n' +
      'Cidade: ' + (form.cidade || 'Não informado') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + company.whatsapp + '?text=' + msg, '_blank')
    setSent(true)
  }

  const border  = dark ? 'border-white/[.08]'  : 'border-navy/10'
  const label   = dark ? 'text-white/22'        : 'text-navy/30'
  const input   = dark ? 'text-white placeholder:text-white/12' : 'text-navy placeholder:text-navy/20'

  if (sent) return (
    <div className="border border-green/30 p-8 text-center">
      <div className="w-10 h-10 border border-green flex items-center justify-center mx-auto mb-4">
        <span className="font-display font-black text-green text-sm">OK</span>
      </div>
      <p className={`font-display font-bold text-[22px] mb-2 ${dark ? 'text-white' : 'text-navy'}`}>
        Recebemos!
      </p>
      <p className={`text-[13px] ${dark ? 'text-white/40' : 'text-navy/40'}`}>
        Retorno em até 24 horas.
      </p>
    </div>
  )

  return (
    <div>
      <input name="website" tabIndex={-1} autoComplete="off"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        onChange={e => setHoneypot(e.target.value)} />

      <div className="flex flex-col gap-0">
        {[
          { key: 'nome',    label: 'Seu nome',     type: 'text', ph: 'Como você se chama?',  req: true  },
          { key: 'empresa', label: 'Fazenda',       type: 'text', ph: 'Nome da propriedade',  req: false },
          { key: 'cidade',  label: 'Cidade',        type: 'text', ph: 'Onde fica o silo?',    req: false },
        ].map(f => (
          <div key={f.key} className={`flex flex-col border-b ${border} first:border-t`}>
            <label className={`text-[10px] font-medium tracking-[.2em] uppercase ${label} pt-3 pb-1`}>
              {f.label}{f.req && <span className="text-green ml-1">*</span>}
            </label>
            <input type={f.type} placeholder={f.ph}
              value={form[f.key as keyof typeof form]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              className={`bg-transparent border-none outline-none text-[15px] font-light
                pb-3 caret-green ${input}`} />
          </div>
        ))}

        <div className={`flex flex-col border-b ${border}`}>
          <label className={`text-[10px] font-medium tracking-[.2em] uppercase ${label} pt-3 pb-1`}>
            WhatsApp <span className="text-green">*</span>
          </label>
          <input type="tel" placeholder="(64) 9 0000-0000"
            value={form.whatsapp}
            onChange={e => setForm(p => ({ ...p, whatsapp: maskPhone(e.target.value) }))}
            className={`bg-transparent border-none outline-none text-[15px] font-light
              pb-3 caret-green ${input}`} />
        </div>
      </div>

      <button onClick={handleSend}
        disabled={!form.nome || !form.whatsapp}
        className="mt-5 w-full flex items-center justify-between px-6 py-4
          bg-green text-white text-[12px] font-medium tracking-[.14em] uppercase
          hover:bg-green2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        Quero agendar visita técnica
        <span className="text-[16px]">↗</span>
      </button>
      <p className={`text-[10px] text-center mt-3 ${dark ? 'text-white/18' : 'text-navy/25'}`}>
        Retorno em até 24 horas · Sem compromisso
      </p>
    </div>
  )
}

export default function LPSilos() {
  const { company } = site

  return (
    <div className="bg-[#070e1a] text-cream font-body">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-10 h-[64px] bg-[#070e1a]/96 backdrop-blur-sm border-b border-white/[.06]">
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={200} height={56} className="h-14 md:h-16 w-auto object-contain" />
        </Link>
        <a href={'https://wa.me/' + company.whatsapp} target="_blank"
          className="text-[11px] font-medium tracking-[.14em] uppercase
            text-white bg-green px-5 py-2.5 hover:bg-green2 transition-colors">
          WhatsApp
        </a>
      </header>

      {/* ── HERO — foto silo + form */}
      <section className="relative min-h-screen pt-[64px]">

        {/* FOTO BG */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lp/silo-cerrado.jpg"
            alt="Silo de grãos no Cerrado goiano"
            fill className="object-cover object-center" priority sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1]" style={{
          background: [
            'linear-gradient(to right, rgba(4,10,22,.97) 0%, rgba(4,10,22,.80) 55%, rgba(4,10,22,.70) 100%)',
            'linear-gradient(to top, rgba(4,10,22,.99) 0%, rgba(4,10,22,.4) 45%, rgba(4,10,22,.2) 75%)',
          ].join(',')
        }} />

        <div className="relative z-[2] min-h-[calc(100svh-64px)] max-w-7xl mx-auto px-6 md:px-12
          grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-green block" />
              <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">
                Asfalto para Silos e Armazéns · Goiás
              </span>
            </div>

            <h1 className="font-display font-black text-white leading-[.86] mb-6"
              style={{ fontSize: 'clamp(42px, 6.5vw, 96px)' }}>
              VOCÊ CONSTRUIU<br />O SILO PARA<br />DECIDIR QUANDO<br />
              <span className="text-green">VENDER.</span>
            </h1>

            {/* Desktop: texto completo */}
            <p className="text-[15px] font-light text-white/50 leading-[1.75] mb-6 max-w-md hidden md:block">
              O pátio não pode tirar esse poder de você.
              Pátio sem asfalto fecha na primeira chuva da safra.
              A GP asfalta pátio de silo há{' '}
              <strong className="text-white/70 font-normal">mais de 40 anos</strong> —
              terraplanagem, base e asfalto resistente, uma empresa só.
            </p>

            {/* Mobile: texto curto */}
            <p className="text-[15px] font-light text-white/50 leading-[1.75] mb-6 md:hidden">
              Pátio sem asfalto fecha na chuva. Caminhão não entra, grão fica no campo.
              A GP resolve — terraplanagem, base e asfalto, uma empresa só.
            </p>

            {/* Bullets — só desktop */}
            <div className="hidden md:flex flex-col gap-2">
              {[
                '3 usinas de asfalto próprias em Rio Verde, GO',
                'Terraplanagem + base + asfalto — sem subcontratação',
                'Documentação completa: laudo, ART, licença ambiental',
              ].map(t => (
                <div key={t} className="flex items-start gap-3">
                  <span className="w-4 h-px bg-green mt-[10px] flex-shrink-0 block" />
                  <span className="text-[13px] text-white/40">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="lg:pl-8">
            <div className="bg-[#0b1828]/90 backdrop-blur-sm p-7 md:p-9 border border-white/[.07]">
              <p className="text-[10px] font-medium tracking-[.22em] uppercase text-green mb-1">
                Visita técnica gratuita
              </p>
              <h3 className="font-display font-black text-white text-[24px] uppercase leading-tight mb-6">
                A gente vai até você.<br />
                <span className="text-green">Sem compromisso.</span>
              </h3>
              <Form dark />
            </div>
          </div>

        </div>
      </section>

      {/* ── LOGOS */}
      <section className="py-7 px-6 md:px-12" style={{ background: '#e8e3da' }}>
        <p className="text-[9px] font-medium tracking-[.22em] uppercase text-navy/28
          text-center mb-5">
          Fazemos parte da infraestrutura dessas operações
        </p>
        <div className="flex justify-center">
          <img
            src="/images/lp/logos_strip.png"
            alt="LDC, COMIGO, Raízen, Nutrien, Mosaic, Fetz, Grupo Cereal, Cereal Ouro, Mercado Livre"
            className="h-7 md:h-9 w-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      </section>

      {/* ── DORES — silo no campo como bg */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lp/silo-campo.jpg"
            alt="Silos no campo"
            fill className="object-cover object-center opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#070e1a]/80" />
        </div>

        <div className="relative z-[1] max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              O que está custando caro agora
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-12 leading-[.9]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            CADA SAFRA SEM ASFALTO<br />
            <span className="text-white/22">O PÁTIO DECIDE POR VOCÊ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {dores.map(d => (
              <div key={d.num}
                className="border-b md:border-b-0 md:border-r border-white/[.07]
                  last:border-0 pb-10 md:pb-0 md:pr-10 last:pr-0
                  [&:nth-child(2)]:md:px-10">
                <span className="font-display font-black text-[11px] tracking-[.2em] text-green/35 block mb-3">
                  {d.num}
                </span>
                <span className="font-display font-black text-[30px] text-white leading-none block mb-1">
                  {d.stat}
                </span>
                <span className="text-[11px] text-white/28 block mb-4">{d.title}</span>
                <p className="text-[13px] font-light leading-[1.8] text-white/38">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA — vídeo como bg */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">

        {/* VIDEO BG */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=5`}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '177.78vh', minWidth: '100%',
              height: '56.25vw', minHeight: '100%',
            }}
            frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen
          />
        </div>
        {/* overlay escuro pesado para texto legível */}
        <div className="absolute inset-0 z-[1]"
          style={{ background: 'rgba(4,10,22,.88)' }} />

        <div className="relative z-[2] max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              Como funciona
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-12 leading-[.9]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            DA TERRA AO ASFALTO<br />
            <span className="text-green">UMA EMPRESA SÓ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {como.map(c => (
              <div key={c.n}
                className="border-b md:border-b-0 md:border-r border-white/[.10]
                  last:border-0 pb-10 md:pb-0 md:pr-10 last:pr-0
                  [&:nth-child(2)]:md:px-10">
                <div className="w-8 h-8 border border-green/50 flex items-center justify-center mb-5">
                  <span className="font-display font-black text-[11px] text-green">{c.n}</span>
                </div>
                <h3 className="font-display font-bold text-[17px] text-white uppercase mb-3 leading-tight">
                  {c.t}
                </h3>
                <p className="text-[13px] font-light leading-[1.8] text-white/45">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-white mb-3 leading-[.9] text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            PRONTO PARA<br />
            <span className="text-green">ASFALTAR SEU PÁTIO?</span>
          </h2>
          <p className="text-[14px] font-light text-white/32 text-center mb-8 leading-relaxed">
            Nossa equipe visita gratuitamente e apresenta proposta com preço e prazo.
          </p>
          <Form dark />
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
          <a href={'tel:+55' + company.phone.replace(/\D/g,'')}
            className="text-[12px] text-white/28 hover:text-white transition-colors">
            {company.phone}
          </a>
          <a href={'https://wa.me/' + company.whatsapp} target="_blank"
            className="text-[11px] font-medium tracking-[.1em] uppercase
              text-white/24 hover:text-green transition-colors">
            WhatsApp
          </a>
        </div>
        <span className="text-[10px] text-white/14">Rio Verde · GO</span>
      </footer>

    </div>
  )
}
