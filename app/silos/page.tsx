'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const VIDEO_CLOUDINARY = 'https://res.cloudinary.com/dfw7h9c2j/video/upload/vc_h264,q_auto/silo-bg_tjhnws.mp4'
const WA = '5564993273958'

const dores = [
  {
    num: '01',
    stat: 'Fila no pátio',
    title: 'Pátio de terra cria fila. Fila custa dinheiro.',
    desc: 'Pátio irregular trava a descarga em qualquer operação. Na armazenadora, cada minuto de fila é custo operacional e produtor que vai buscar outra unidade. Na fazenda, é grão parado no campo enquanto o pátio não abre.',
    fonte: 'Ref: SIACON — Manual de Gestão de Unidades Armazenadoras',
  },
  {
    num: '02',
    stat: 'Desconto na balança',
    title: 'Poeira do pátio entra no grão.',
    desc: 'Pátio de terra levanta poeira na descarga. O grão absorve impureza ainda na recepção. Na armazenadora, isso afeta a classificação do lote inteiro. Na fazenda, come a margem que a entressafra deveria proteger.',
    fonte: 'Ref: EMBRAPA Circular Técnica 196 — Armazenamento de Soja com Qualidade',
  },
  {
    num: '03',
    stat: 'Venda forçada',
    title: 'Pátio fecha na chuva. Você vende na hora errada.',
    desc: 'O Brasil armazena menos de 80% da própria safra. Quem tem silo ou armazém próprio tem vantagem — mas só se conseguir operar no pico. Pátio enlameado fecha a entrada na colheita. Você vende forçado, no preço da baixa.',
    fonte: 'Ref: CONAB — Capacidade Estática de Armazenagem 2024/25',
  },
]

const como = [
  {
    n: '01',
    t: 'Visita técnica gratuita',
    d: 'Nossa equipe vai até sua unidade, avalia o pátio e apresenta proposta com preço e prazo. Sem compromisso.',
  },
  {
    n: '02',
    t: 'Terraplenagem e base',
    d: 'Solo nivelado, drenado e compactado. A base certa é o que garante que o asfalto aguenta graneleiro de 74 toneladas.',
  },
  {
    n: '03',
    t: 'Asfalto aplicado',
    d: 'Massa produzida nas nossas 3 usinas em Rio Verde, GO. Da produção à aplicação — GP Asfalto, uma empresa só.',
  },
]

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2)  return '(' + d
  if (d.length <= 7)  return '(' + d.slice(0,2) + ') ' + d.slice(2)
  if (d.length <= 11) return '(' + d.slice(0,2) + ') ' + d.slice(2,7) + '-' + d.slice(7)
  return v
}

function Form() {
  const [form, setForm]         = useState({ nome: '', perfil: '', whatsapp: '', cidade: '' })
  const [sent, setSent]         = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const loadTime                = useRef(Date.now())

  const handleSend = () => {
    if (honeypot) return
    if (Date.now() - loadTime.current < 5000) return
    if (!form.nome || !form.whatsapp) return
    const msg = encodeURIComponent(
      'Olá! Tenho interesse em asfaltar o pátio.\n' +
      'Nome: ' + form.nome + '\n' +
      'Perfil: ' + (form.perfil || 'Não informado') + '\n' +
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
        onClick={() => { setSent(false); setForm({ nome: '', perfil: '', whatsapp: '', cidade: '' }) }}
        className="text-[11px] font-medium tracking-[.14em] uppercase
          text-green border border-green/30 px-6 py-2.5
          hover:bg-green hover:text-white transition-colors">
        Nova solicitação
      </button>
    </div>
  )

  return (
    <div>
      {/* HONEYPOT */}
      <input name="website" tabIndex={-1} autoComplete="off"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
        onChange={e => setHoneypot(e.target.value)} />

      <div className="flex flex-col gap-0">
        {[
          { key: 'nome',   label: 'Seu nome',  type: 'text', ph: 'Como você se chama?', req: true  },
          { key: 'cidade', label: 'Cidade',    type: 'text', ph: 'Onde fica a unidade?', req: false },
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

        {/* PERFIL SELECT */}
        <div className="flex flex-col border-b border-white/[.08]">
          <label className="text-[10px] font-medium tracking-[.2em] uppercase text-white/22 pt-3 pb-1">
            Você é
          </label>
          <select
            value={form.perfil}
            onChange={e => setForm(p => ({ ...p, perfil: e.target.value }))}
            className="bg-transparent border-none outline-none text-[15px] font-light
              text-white pb-3 caret-green appearance-none
              [&>option]:bg-[#0b1828] [&>option]:text-white">
            <option value="" disabled>Selecione seu perfil</option>
            <option value="Armazenadora / Cooperativa">Armazenadora / Cooperativa</option>
            <option value="Produtor Rural / Fazenda">Produtor Rural / Fazenda</option>
            <option value="Grupo / Holding Rural">Grupo / Holding Rural</option>
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
        Quero agendar visita técnica
        <span className="text-[16px]">↗</span>
      </button>
      <p className="text-[10px] text-white/18 text-center mt-3">
        Retorno em até 24 horas · Sem compromisso
      </p>
    </div>
  )
}

export default function LPSilos() {
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

        {/* OVERLAY */}
        <div className="absolute inset-0 z-[1]" style={{
          background: [
            'linear-gradient(to right, rgba(4,10,22,.98) 0%, rgba(4,10,22,.88) 45%, rgba(4,10,22,.55) 70%, rgba(4,10,22,.40) 100%)',
            'linear-gradient(to top, rgba(4,10,22,.95) 0%, rgba(4,10,22,.2) 50%, transparent 80%)',
          ].join(',')
        }} />

        <div className="relative z-[2] min-h-[calc(100svh-64px)] max-w-7xl mx-auto px-6 md:px-12
          grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

          {/* LEFT — copy */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-green block" />
              <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">
                Asfalto para Silos e Armazéns · Goiás
              </span>
            </div>

            <h1 className="font-display font-black text-white leading-[.86] mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}>
              VOCÊ CONSTRUIU<br />O SILO PARA<br />DECIDIR QUANDO<br />
              <span className="text-green">VENDER.</span>
            </h1>

            <p className="text-[15px] font-light text-white/50 leading-[1.8] mb-6 max-w-md hidden md:block">
              O pátio não pode tirar esse poder de você.
              Pátio sem asfalto fecha na primeira chuva da safra — na fazenda ou no armazém.
              A GP Asfalto resolve: terraplenagem, base e asfalto resistente,{' '}
              <strong className="text-white/70 font-normal">mais de 40 anos</strong> asfaltando
              pátio de silo no Cerrado.
            </p>

            <p className="text-[14px] font-light text-white/50 leading-[1.8] mb-6 md:hidden">
              Pátio sem asfalto fecha na chuva. A GP Asfalto resolve —
              terraplenagem, base e asfalto, uma empresa só.
            </p>

            <div className="hidden md:flex flex-col gap-2">
              {[
                '3 usinas de asfalto próprias em Rio Verde, GO',
                'Terraplenagem + base + asfalto — sem subcontratação',
                'Documentação completa: laudo, ART, licença ambiental',
              ].map(t => (
                <div key={t} className="flex items-start gap-3">
                  <span className="w-4 h-px bg-green mt-[10px] flex-shrink-0" />
                  <span className="text-[13px] text-white/40">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <div className="lg:pl-6">
            <div className="bg-[#0b1828]/92 backdrop-blur-sm p-7 md:p-9 border border-white/[.08]">
              <p className="text-[10px] font-medium tracking-[.22em] uppercase text-green mb-1">
                Visita técnica gratuita
              </p>
              <h3 className="font-display font-black text-white text-[22px] uppercase leading-tight mb-6">
                A gente vai até você.<br />
                <span className="text-green">Sem compromisso.</span>
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

      {/* ── DORES — fundo escuro sólido */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#070e1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[10px] font-medium tracking-[.24em] uppercase text-green">
              O que está custando caro agora
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-14 leading-[.9]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 50px)' }}>
            CADA SAFRA SEM ASFALTO<br />
            <span className="text-white/20">O PÁTIO DECIDE POR VOCÊ</span>
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
                <p className="text-[10px] text-white/20 italic">{d.fonte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA — vídeo Cloudinary nativo */}
      <section className="relative py-20 px-6 md:px-12 overflow-hidden">

        {/* VIDEO BG — Cloudinary */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: '177.78vh', minWidth: '100%',
              height: '56.25vw', minHeight: '100%',
              objectFit: 'cover',
            }}>
            <source src={VIDEO_CLOUDINARY} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-[1]"
          style={{ background: 'rgba(4,10,22,.87)' }} />

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

      {/* ── CTA FINAL */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-display font-black text-white mb-3 leading-[.9] text-center"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            PRONTO PARA<br />
            <span className="text-green">ASFALTAR SEU PÁTIO?</span>
          </h2>
          <p className="text-[14px] font-light text-white/32 text-center mb-10 leading-relaxed">
            GP Asfalto — mais de 40 anos asfaltando pátios de silo no Cerrado.
            Nossa equipe visita gratuitamente e apresenta proposta com preço e prazo.
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
