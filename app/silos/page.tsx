'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const VIDEO_ID = 'kCa5jGxJ080'

const dores = [
  {
    num: '01',
    title: 'Janela de colheita tem 45 dias. Não tem segunda chance.',
    desc: 'Em Goiás, a soja tem uma janela. Pátio enlameado na chuva — caminhão não entra, grão fica no campo, colheita estende, risco de perda sobe. O grão que devia entrar no seu silo vai para a cooperativa no pico da baixa. Exatamente o que você construiu o silo para evitar.',
    destaque: '45 dias',
    destaqueLabel: 'janela de colheita em GO',
  },
  {
    num: '02',
    title: 'Quem tem pátio bom agenda caminhão primeiro.',
    desc: 'Na safra, caminhão é escasso. Transportadora escolhe quem tem infraestrutura. Pátio ruim significa frete mais caro ou fila maior de agendamento. Enquanto você espera, seu concorrente encheu o silo e já está negociando preço.',
    destaque: 'Frete +30%',
    destaqueLabel: 'no pico da safra sem estrutura',
  },
  {
    num: '03',
    title: 'Poeira de terra entra no grão. Desconto na balança.',
    desc: 'Pátio sem asfalto levanta poeira na descarga. O grão absorve impureza. Você guardou 6 meses para vender na hora certa — e na classificação, o desconto por impureza come parte da margem que a entressafra deu.',
    destaque: 'Desconto',
    destaqueLabel: 'por impureza na classificação',
  },
  {
    num: '04',
    title: 'Chuva fecha o pátio. Você vende na hora errada.',
    desc: 'Em GO, a transição entre safra e chuva é rápida. Um pátio de terra fica intransitável em horas. Dias sem receber caminhão — e você pode ser forçado a tomar decisão de venda antes da hora. O silo que devia te dar controle vira pressão.',
    destaque: 'Venda forçada',
    destaqueLabel: 'na hora que o mercado manda',
  },
]

const solucoes = [
  {
    num: '01',
    title: 'Terra preparada antes do asfalto',
    desc: 'Terraplanagem, nivelamento e compactação do solo antes de asfaltar. Base errada é o principal motivo de pátio que afunda com caminhão carregado.',
  },
  {
    num: '02',
    title: 'Asfalto de alta resistência',
    desc: 'Massa produzida nas nossas 3 usinas, dosada e certificada para eixo de 74 toneladas. Não é asfalto de rua — é pavimento dimensionado para graneleiro pesado em operação diária.',
  },
  {
    num: '03',
    title: 'Uma empresa do início ao fim',
    desc: 'Terraplanagem, base, massa e aplicação — tudo nosso. Sem depender de terceiro para produzir o asfalto, sem surpresa no prazo.',
  },
  {
    num: '04',
    title: 'Documentação completa',
    desc: 'Laudo técnico, ART de execução, licença ambiental ativa. Para quem precisa de papel para financiamento, auditoria ou compliance corporativo.',
  },
]

const specs = [
  { key: 'Carga de projeto',    value: '74 t',        sub: 'por eixo' },
  { key: 'Usinas próprias',     value: '3',           sub: 'Rio Verde, GO' },
  { key: 'Tipo de pavimento',   value: 'CBUQ',        sub: 'dosagem Marshall' },
  { key: 'Norma de referência', value: 'DNIT',        sub: '/ NBR 7207' },
  { key: 'Licença ambiental',   value: 'LO Ativa',    sub: 'SEMAD-GO' },
  { key: 'Ensaio Marshall',     value: 'Certificado', sub: 'por traço' },
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
      'Olá! Tenho interesse em asfaltar o pátio do meu silo/armazém.\n' +
      'Nome: ' + form.nome + '\n' +
      'Fazenda/Empresa: ' + (form.empresa || 'Não informado') + '\n' +
      'Cidade: ' + (form.cidade || 'Não informado') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + company.whatsapp + '?text=' + msg, '_blank')
    setSent(true)
  }

  return (
    <div className="bg-[#070e1a] text-cream font-body">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 md:px-12 h-[72px] bg-[#070e1a]/96 backdrop-blur-sm border-b border-white/[.06]">
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={200} height={56} className="h-16 md:h-20 w-auto object-contain" />
        </Link>
        <button onClick={scrollToForm}
          className="text-[11px] font-medium tracking-[.14em] uppercase
            text-white bg-green px-5 py-2.5 hover:bg-green2 transition-colors">
          Quero asfaltar meu pátio
        </button>
      </header>

      {/* HERO — vídeo YouTube */}
      <section className="relative min-h-screen flex items-end pb-16 pt-[72px]">

        {/* VIDEO BG */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=3&enablejsapi=1`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '177.78vh',
              minWidth: '100%',
              height: '56.25vw',
              minHeight: '100%',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 z-[1]" style={{
          background: [
            'linear-gradient(to right, rgba(4,10,22,.96) 0%, rgba(4,10,22,.7) 50%, rgba(4,10,22,.2) 100%)',
            'linear-gradient(to top, rgba(4,10,22,.99) 0%, rgba(4,10,22,.45) 38%, transparent 62%)',
          ].join(',')
        }} />

        {/* CONTENT */}
        <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.28em] uppercase text-green">
              Asfalto para Silos e Armazéns · Goiás e região
            </span>
          </div>

          <h1 className="font-display font-black text-white leading-[.86] mb-7"
            style={{ fontSize: 'clamp(44px, 7.5vw, 112px)' }}>
            VOCÊ CONSTRUIU<br />O SILO PARA<br />DECIDIR QUANDO<br />
            <span className="text-green">VENDER.</span>
          </h1>

          <p className="text-[17px] md:text-[20px] font-light text-white/55
            leading-[1.75] max-w-[480px] mb-3">
            O pátio não pode tirar esse poder de você.
          </p>
          <p className="text-[14px] md:text-[15px] font-light text-white/38
            leading-[1.8] max-w-[500px] mb-10">
            Pátio sem asfalto fecha na primeira chuva da safra. Caminhão não
            entra, grão fica no campo e a decisão de venda sai do seu controle.
            A GP asfalta pátio de silo há mais de 40 anos —
            terraplanagem, base e asfalto resistente, uma empresa só.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <button onClick={scrollToForm}
              className="text-[13px] font-medium tracking-[.14em] uppercase
                text-white bg-green px-10 py-4 hover:bg-green2 transition-colors">
              Quero asfaltar meu pátio
            </button>
            <a href={'https://wa.me/' + company.whatsapp} target="_blank"
              className="text-[13px] font-medium tracking-[.14em] uppercase
                text-white/45 border border-white/18 px-10 py-4
                hover:border-green hover:text-white transition-colors text-center">
              Falar no WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              '40+ anos asfaltando no Cerrado',
              '3 usinas de asfalto próprias',
              'Licença ambiental ativa',
              'Documentação completa',
            ].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-3">
                <span className="text-[11px] font-medium tracking-[.08em] uppercase text-white/28">{t}</span>
                {i < arr.length - 1 && <span className="text-white/12 hidden sm:block">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="py-14 px-6 md:px-12" style={{ background: '#e8e3da' }}>
        <p className="text-[10px] font-medium tracking-[.28em] uppercase text-navy/30
          text-center mb-10">
          Fazemos parte da infraestrutura dessas operações
        </p>
        <div className="flex justify-center items-center">
          <img
            src="/images/lp/logos_strip.png"
            alt="LDC, COMIGO, Raízen, Nutrien, Mosaic, Fetz, Grupo Cereal, Cereal Ouro, Mercado Livre"
            className="h-12 md:h-14 w-auto"
          />
        </div>
      </section>

      {/* CONCEITO */}
      <section className="py-24 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-px bg-green block" />
              <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
                O que está em jogo
              </span>
            </div>
            <h2 className="font-display font-black text-white leading-[.9] mb-8"
              style={{ fontSize: 'clamp(34px, 4vw, 60px)' }}>
              SILO BOM<br />COM PÁTIO RUIM<br />
              <span className="text-green">NÃO FECHA A CONTA.</span>
            </h2>
            <p className="text-[15px] font-light text-white/45 leading-[1.9] mb-5">
              Quem tem armazém próprio pode guardar a safra e vender
              quando o mercado manda — não quando a cooperativa enche.
              Produtores que armazenam chegam a ganhar 20% a mais
              sobre o preço de colheita na hora que vendem.
            </p>
            <p className="text-[15px] font-light text-white/45 leading-[1.9]">
              Mas esse ganho depende de um pátio que funciona.
              Na chuva, na lama, com 60 caminhões por dia.
              É isso que a GP entrega.
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {[
              { label: 'Ganho médio vendendo na entressafra vs. colheita',  value: '6–20%',   cor: 'text-green' },
              { label: 'Produtores em GO que guardam 4 a 6 meses',          value: '54%',     cor: 'text-white' },
              { label: 'Tempo médio de retorno do investimento no silo',    value: '5 anos',  cor: 'text-white' },
              { label: 'Potencial de ganho com armazenagem estratégica',    value: 'até 55%', cor: 'text-green' },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-baseline py-5
                border-b border-white/[.06] first:border-t">
                <span className="text-[13px] text-white/35 max-w-[260px] leading-snug">{s.label}</span>
                <span className={'font-display font-black text-[24px] ' + s.cor}>{s.value}</span>
              </div>
            ))}
            <p className="text-[10px] text-white/20 mt-3 leading-relaxed">
              Fontes: CNA — Pesquisa Nacional de Armazenagem (2022), Aegro.
            </p>
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-5 h-px bg-green block" />
          <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
            O que acontece sem asfalto
          </span>
        </div>
        <h2 className="font-display font-black text-white mb-16 leading-[.9]"
          style={{ fontSize: 'clamp(34px, 5vw, 66px)' }}>
          CADA SAFRA SEM ASFALTO<br />
          <span className="text-white/22">É UMA DECISÃO QUE O PÁTIO TOMA POR VOCÊ</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {dores.map((d) => (
            <div key={d.num}
              className="border-b border-r border-white/[.07]
                [&:nth-child(2n)]:border-r-0
                [&:nth-child(n+3)]:border-b-0
                p-8 md:p-10 hover:bg-white/[.025] transition-colors">
              <span className="font-display font-black text-[11px] tracking-[.2em] text-green/40 block mb-4">
                {d.num}
              </span>
              <div className="mb-4">
                <span className="font-display font-black text-[34px] text-white leading-none block">
                  {d.destaque}
                </span>
                <span className="text-[11px] text-white/30 tracking-[.04em]">{d.destaqueLabel}</span>
              </div>
              <h3 className="font-display font-bold text-[19px] text-white uppercase mb-3 leading-tight">
                {d.title}
              </h3>
              <p className="text-[14px] font-light leading-[1.85] text-white/38">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section className="py-24 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Como fazemos
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-3 leading-[.9]"
            style={{ fontSize: 'clamp(34px, 5vw, 66px)' }}>
            DA TERRA AO ASFALTO<br />
            <span className="text-green">UMA EMPRESA SÓ</span>
          </h2>
          <p className="text-[15px] font-light text-white/38 mb-16 max-w-xl leading-relaxed">
            Produzimos nosso próprio asfalto em três usinas em Rio Verde.
            Fazemos a terraplanagem, preparamos a base e aplicamos o asfalto —
            tudo com nossa equipe. Sem subcontratação, sem surpresa no prazo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {solucoes.map((s) => (
              <div key={s.num}
                className="border-b sm:border-b-0 border-r border-white/[.07]
                  last:border-r-0 p-8 lg:p-10 first:pl-0 last:pr-0
                  [&:nth-child(2)]:sm:border-r-0 lg:[&:nth-child(2)]:border-r">
                <div className="w-8 h-8 border border-green/40 flex items-center
                  justify-center mb-6">
                  <span className="font-display font-black text-[11px] text-green">{s.num}</span>
                </div>
                <h3 className="font-display font-bold text-[17px] text-white uppercase mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.85] text-white/38">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Ficha técnica
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-4 leading-[.9]"
            style={{ fontSize: 'clamp(34px, 4vw, 60px)' }}>
            ASFALTO DIMENSIONADO<br />
            <span className="text-white/22">PARA GRANELEIRO PESADO</span>
          </h2>
          <p className="text-[14px] font-light text-white/35 mb-16 max-w-lg leading-relaxed">
            Para quem precisa de especificação técnica, documentação ou laudo — temos tudo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-14">
            {specs.map((s, i) => (
              <div key={i}
                className="flex justify-between items-baseline py-5
                  border-b border-white/[.06] border-t-0
                  first:border-t
                  md:[&:nth-child(odd)]:pr-16
                  md:[&:nth-child(even)]:pl-16
                  md:[&:nth-child(even)]:border-l
                  md:[&:nth-child(2)]:border-t
                  md:border-white/[.06]">
                <span className="text-[13px] font-normal text-white/28">{s.key}</span>
                <span className="font-display font-bold text-[22px] text-white">
                  {s.value}
                  {s.sub && <small className="text-[11px] text-green ml-2">{s.sub}</small>}
                </span>
              </div>
            ))}
          </div>

          {/* LOGOS dentro de specs */}
          <div className="py-10 px-8 md:px-10" style={{ background: '#e8e3da' }}>
            <p className="text-[10px] font-medium tracking-[.24em] uppercase text-navy/30 mb-7">
              Operações que confiam na GP Asfalto
            </p>
            <img
              src="/images/lp/logos_strip.png"
              alt="LDC, COMIGO, Raízen, Nutrien, Mosaic e outros"
              className="h-10 md:h-12 w-auto"
            />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="py-24 px-6 md:px-12" style={{ background: '#0b1828' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Visita técnica gratuita
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-4 leading-[.9]"
            style={{ fontSize: 'clamp(34px, 4.5vw, 60px)' }}>
            A GENTE VAI<br />ATÉ VOCÊ.<br />
            <span className="text-green">SEM COMPROMISSO.</span>
          </h2>
          <p className="text-[15px] font-light text-white/38 mb-12 leading-relaxed max-w-md">
            Nossa equipe visita sua propriedade, avalia o pátio e
            apresenta uma proposta com preço e prazo. Você decide
            se quer avançar — sem pressão.
          </p>

          {sent ? (
            <div className="border border-green/30 p-10 text-center">
              <div className="w-12 h-12 border border-green flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-black text-green text-lg">OK</span>
              </div>
              <h3 className="font-display font-bold text-[28px] text-white mb-3">
                Recebemos sua solicitação!
              </h3>
              <p className="text-[14px] text-white/38 mb-8 max-w-xs mx-auto leading-relaxed">
                Nosso time entra em contato em até 24 horas para agendar a visita.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ nome: '', empresa: '', whatsapp: '', cidade: '' }) }}
                className="text-[11px] font-medium tracking-[.14em] uppercase
                  text-green border border-green/30 px-6 py-3
                  hover:bg-green hover:text-white transition-colors">
                Nova solicitação
              </button>
            </div>
          ) : (
            <div>
              <input name="website" tabIndex={-1} autoComplete="off"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
                onChange={e => setHoneypot(e.target.value)} />

              <div className="flex flex-col gap-0">
                {[
                  { key: 'nome',    label: 'Seu nome',          type: 'text', ph: 'Como você se chama?',  req: true  },
                  { key: 'empresa', label: 'Fazenda ou empresa', type: 'text', ph: 'Nome da propriedade', req: false },
                  { key: 'cidade',  label: 'Cidade',             type: 'text', ph: 'Onde fica o silo?',   req: false },
                ].map(f => (
                  <div key={f.key} className="flex flex-col border-b border-white/[.08] first:border-t">
                    <label className="text-[10px] font-medium tracking-[.22em] uppercase
                      text-white/22 pt-4 pb-1">
                      {f.label}{f.req && <span className="text-green ml-1">*</span>}
                    </label>
                    <input type={f.type} placeholder={f.ph}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="bg-transparent border-none outline-none text-[16px] font-light
                        text-white pb-4 placeholder:text-white/13 caret-green" />
                  </div>
                ))}

                <div className="flex flex-col border-b border-white/[.08]">
                  <label className="text-[10px] font-medium tracking-[.22em] uppercase text-white/22 pt-4 pb-1">
                    WhatsApp <span className="text-green">*</span>
                  </label>
                  <input type="tel" placeholder="(64) 9 0000-0000"
                    value={form.whatsapp}
                    onChange={e => setForm(p => ({ ...p, whatsapp: maskPhone(e.target.value) }))}
                    className="bg-transparent border-none outline-none text-[16px] font-light
                      text-white pb-4 placeholder:text-white/13 caret-green" />
                </div>
              </div>

              <button onClick={handleSend}
                disabled={!form.nome || !form.whatsapp}
                className="mt-8 w-full flex items-center justify-between px-8 py-5
                  bg-green text-white text-[13px] font-medium tracking-[.14em] uppercase
                  hover:bg-green2 transition-colors
                  disabled:opacity-30 disabled:cursor-not-allowed">
                Quero agendar visita técnica
                <span className="text-[18px]">↗</span>
              </button>

              <p className="text-[11px] text-white/18 text-center mt-4 leading-relaxed">
                Retorno em até 24 horas · Visita gratuita · Sem compromisso
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[.06] px-6 md:px-12 py-6
        flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ background: '#040a14' }}>
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={140} height={40}
            className="h-10 w-auto object-contain opacity-45 hover:opacity-85 transition-opacity" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <span className="text-[10px] tracking-[.1em] uppercase text-white/18">{company.cnpj}</span>
          <a href={'tel:+55' + company.phone.replace(/\D/g,'')}
            className="text-[12px] text-white/32 hover:text-white transition-colors">
            {company.phone}
          </a>
          <a href={'https://wa.me/' + company.whatsapp} target="_blank"
            className="text-[11px] font-medium tracking-[.1em] uppercase
              text-white/28 hover:text-green transition-colors">
            WhatsApp
          </a>
        </div>
        <span className="text-[10px] text-white/14">Rio Verde · GO · Brasil</span>
      </footer>

    </div>
  )
}
