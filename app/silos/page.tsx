'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/content'

const dores = [
  {
    num: '01',
    title: 'Cascalho todo ano — conta que nunca fecha',
    desc: 'Patrolagem, cascalho e motoniveladora a cada safra somam R$ 40–80 mil por ano em pátio médio. Em 4 anos você pagou o asfalto — sem ter o asfalto.',
    stat: 'R$ 40–80 mil/ano',
    statlabel: 'em manutenção recorrente',
  },
  {
    num: '02',
    title: 'Caminhão lento = capacidade perdida',
    desc: 'Pátio irregular faz o motorista reduzir velocidade, dificulta a manobra e aumenta o tempo de ciclo. São 15–20 minutos a mais por caminhão. Em safra com 60 carretas/dia, você perde 18 horas de operação.',
    stat: '+18h perdidas',
    statlabel: 'por dia de safra intensa',
  },
  {
    num: '03',
    title: 'Poeira afeta a classificação do grão',
    desc: 'Pátio de terra levanta poeira na descarga. O grão absorve umidade e impureza, a classificação cai e o desconto na balança aparece. Prejuízo invisível que acontece toda safra.',
    stat: 'Desconto na balança',
    statlabel: 'por impureza e umidade',
  },
  {
    num: '04',
    title: 'Transportadora evita pátio ruim',
    desc: 'Buraco e irregular quebram mola e pneu. O caminhoneiro avisa os colegas. Na próxima safra você paga frete mais caro ou espera mais na fila de agendamento — porque o pátio ficou com má fama.',
    stat: 'Frete mais caro',
    statlabel: 'ou fila maior de agendamento',
  },
]

const solucoes = [
  {
    num: '01',
    title: 'Terraplanagem de base',
    desc: 'Solo nivelado, drenado e compactado antes do asfalto. Base errada é o principal motivo de pátio que afunda com carga pesada.',
  },
  {
    num: '02',
    title: 'CBUQ para graneleiro',
    desc: 'Massa produzida nas nossas 3 usinas, dosagem Marshall certificada e dimensionada para eixo de 74 toneladas com tráfego intenso.',
  },
  {
    num: '03',
    title: 'Uma empresa do início ao fim',
    desc: 'Terraplanagem, base, massa e aplicação — sem subcontratação. Menos prazo, menos risco, uma empresa para responder.',
  },
  {
    num: '04',
    title: 'Documentação completa',
    desc: 'Laudo Marshall, ART de execução, LO Ativa SEMAD-GO e NF eletrônica. Tudo que compliance corporativo e auditoria exigem.',
  },
]

const specs = [
  { key: 'Carga de projeto',    value: '74 t',        sub: 'por eixo' },
  { key: 'Raio de atendimento', value: '90 km',       sub: 'das usinas' },
  { key: 'Usinas próprias',     value: '3',           sub: 'em operação' },
  { key: 'Norma',               value: 'DNIT',        sub: '/ NBR 7207' },
  { key: 'Licença ambiental',   value: 'LO Ativa',   sub: 'SEMAD-GO' },
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
      'Olá! Tenho interesse em pavimentação para silo/armazém.\n' +
      'Nome: ' + form.nome + '\n' +
      'Empresa: ' + (form.empresa || 'Não informado') + '\n' +
      'Cidade: ' + (form.cidade || 'Não informado') + '\n' +
      'WhatsApp: ' + form.whatsapp
    )
    window.open('https://wa.me/' + company.whatsapp + '?text=' + msg, '_blank')
    setSent(true)
  }

  return (
    <div className="bg-[#070e1a] text-cream font-body">

      {/* NAV MÍNIMO */}
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

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-16 pt-[64px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lp/hero-silos.jpg"
            alt="Pavimentação CBUQ em armazém industrial"
            fill className="object-cover object-center" priority sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1]" style={{
          background: [
            'linear-gradient(to right, rgba(4,10,22,.95) 0%, rgba(4,10,22,.65) 55%, rgba(4,10,22,.15) 100%)',
            'linear-gradient(to top, rgba(4,10,22,.99) 0%, rgba(4,10,22,.4) 40%, transparent 65%)',
          ].join(',')
        }} />

        <div className="relative z-[2] w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.28em] uppercase text-green">
              Terraplanagem · Pavimentação CBUQ · Silos e Armazéns
            </span>
          </div>

          <h1 className="font-display font-black text-white leading-[.88] mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 118px)' }}>
            SEU PÁTIO<br />
            <span style={{ WebkitTextStroke: '2px rgba(255,255,255,.25)', color: 'transparent' }}>
              AFUNDA TODO ANO.
            </span><br />
            <span className="text-green">A CONTA TAMBÉM.</span>
          </h1>

          <p className="text-[17px] md:text-[19px] font-light text-white/55
            leading-[1.75] max-w-[500px] mb-8">
            Cascalho, patrolagem e reforma emergencial na colheita somam
            mais do que o asfalto custaria. A GP resolve de uma vez —
            terraplanagem, CBUQ próprio e documentação completa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {['40+ anos de mercado', '3 usinas CBUQ próprias', 'Raio de 90 km', 'LO Ativa SEMAD-GO'].map((t, i, arr) => (
              <span key={t} className="flex items-center gap-3">
                <span className="text-[11px] font-medium tracking-[.08em] uppercase text-white/30">{t}</span>
                {i < arr.length - 1 && <span className="text-white/15 hidden sm:block">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS — fundo cream para as logos aparecerem nas cores originais */}
      <section className="py-10 px-6 md:px-12" style={{ background: '#e8e3da' }}>
        <p className="text-[10px] font-medium tracking-[.28em] uppercase text-navy/35
          text-center mb-7">
          Fazemos parte da infraestrutura dessas operações
        </p>
        <div className="flex justify-center items-center">
          <img
            src="/images/lp/logos-clientes.png"
            alt="Clientes GP Asfalto — LDC, COMIGO, Raízen, Nutrien, Mosaic e outros"
            className="h-9 md:h-11 w-auto opacity-75 hover:opacity-100 transition-opacity"
          />
        </div>
      </section>

      {/* CUSTO-BENEFÍCIO — argumento central */}
      <section className="py-20 px-6 md:px-12" style={{ background: '#0d1b2e' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-5 h-px bg-green block" />
                <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
                  Custo-benefício
                </span>
              </div>
              <h2 className="font-display font-black text-white leading-[.9] mb-8"
                style={{ fontSize: 'clamp(36px, 4vw, 64px)' }}>
                EM 3 SAFRAS<br />
                O ASFALTO<br />
                <span className="text-green">JÁ SE PAGOU.</span>
              </h2>
              <p className="text-[15px] font-light text-white/45 leading-[1.85]">
                Pátio médio de silo gasta R$&nbsp;40–80&nbsp;mil por ano em manutenção.
                Em 4 anos esse dinheiro pagaria um pátio asfaltado de qualidade —
                que dura 15 anos sem manutenção estrutural.
              </p>
            </div>

            {/* TABELA COMPARATIVA */}
            <div className="flex flex-col gap-0">
              <div className="flex justify-between items-center py-4 border-b border-white/[.06]">
                <span className="text-[13px] text-white/40">Manutenção anual (terra/cascalho)</span>
                <span className="font-display font-bold text-[20px] text-red-400">R$ 60 mil/ano</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/[.06]">
                <span className="text-[13px] text-white/40">Em 5 anos de manutenção</span>
                <span className="font-display font-bold text-[20px] text-red-400">R$ 300 mil</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/[.06]">
                <span className="text-[13px] text-white/40">Pavimentação CBUQ (estimativa)</span>
                <span className="font-display font-bold text-[20px] text-white">R$ 180–250 mil</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-white/[.06]">
                <span className="text-[13px] text-white/40">Durabilidade do CBUQ</span>
                <span className="font-display font-bold text-[20px] text-green">15+ anos</span>
              </div>
              <div className="flex justify-between items-center py-5 bg-green/10 px-4 mt-2 border border-green/20">
                <span className="text-[13px] font-medium text-white">Economia em 10 anos</span>
                <span className="font-display font-black text-[24px] text-green">R$ 350 mil+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-5 h-px bg-green block" />
          <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
            O que está custando caro agora
          </span>
        </div>
        <h2 className="font-display font-black text-white mb-16 leading-[.9]"
          style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
          CADA SAFRA SEM ASFALTO<br />
          <span className="text-white/25">É DINHEIRO QUE NÃO VOLTA</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {dores.map((d) => (
            <div key={d.num}
              className="border-b border-r border-white/[.06]
                [&:nth-child(2n)]:border-r-0
                [&:nth-child(n+3)]:border-b-0
                p-8 md:p-10 hover:bg-white/[.02] transition-colors">
              <span className="font-display font-black text-[11px] tracking-[.2em] text-green/40 block mb-4">
                {d.num}
              </span>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-display font-black text-[28px] text-white leading-none">
                  {d.stat}
                </span>
                <span className="text-[11px] text-white/30 tracking-[.04em]">{d.statlabel}</span>
              </div>
              <h3 className="font-display font-bold text-[20px] text-white uppercase mb-3 leading-tight">
                {d.title}
              </h3>
              <p className="text-[14px] font-light leading-[1.85] text-white/40">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section className="py-24 px-6 md:px-12" style={{ background: '#0d1b2e' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Como a GP resolve
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-16 leading-[.9]"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
            DO SOLO AO ASFALTO<br />
            <span className="text-green">UMA EMPRESA SÓ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {solucoes.map((s) => (
              <div key={s.num}
                className="border-b sm:border-b-0 border-r border-white/[.07]
                  last:border-r-0 p-8 lg:p-10 first:pl-0 last:pr-0
                  [&:nth-child(2)]:sm:border-r-0 lg:[&:nth-child(2)]:border-r">
                <div className="w-8 h-8 border border-green/40 flex items-center justify-center mb-6">
                  <span className="font-display font-black text-[12px] text-green">{s.num}</span>
                </div>
                <h3 className="font-display font-bold text-[18px] text-white uppercase mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[13px] font-light leading-[1.85] text-white/40">{s.desc}</p>
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
              Capacidade técnica
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-16 leading-[.9]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            CBUQ DIMENSIONADO<br />
            <span className="text-white/25">PARA TRÁFEGO PESADO</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {specs.map((s, i) => (
              <div key={i}
                className="flex justify-between items-baseline py-5
                  border-b border-white/[.06] first:border-t
                  md:[&:nth-child(odd)]:pr-16 md:[&:nth-child(even)]:pl-16
                  md:[&:nth-child(even)]:border-l md:border-white/[.06]">
                <span className="text-[13px] font-normal text-white/30">{s.key}</span>
                <span className="font-display font-bold text-[22px] text-white">
                  {s.value}
                  {s.sub && <small className="text-[12px] text-green ml-2">{s.sub}</small>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="py-24 px-6 md:px-12" style={{ background: '#0d1b2e' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[11px] font-medium tracking-[.24em] uppercase text-green">
              Estudo técnico gratuito
            </span>
          </div>
          <h2 className="font-display font-black text-white mb-4 leading-[.9]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            VAMOS CALCULAR<br />
            <span className="text-green">O RETORNO DA SUA OBRA.</span>
          </h2>
          <p className="text-[15px] font-light text-white/40 mb-12 leading-relaxed">
            Nossa equipe técnica avalia sua área e apresenta um estudo com
            custo estimado, especificações e comparativo com manutenção atual.
            Sem compromisso.
          </p>

          {sent ? (
            <div className="border border-green/30 p-10 text-center">
              <div className="w-12 h-12 border border-green flex items-center justify-center mx-auto mb-6">
                <span className="font-display font-black text-green text-lg">OK</span>
              </div>
              <h3 className="font-display font-bold text-[28px] text-white mb-3">Solicitação enviada!</h3>
              <p className="text-[14px] text-white/40 mb-6">
                Nossa equipe retorna em até 24 horas com a análise.
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
              <input name="website" tabIndex={-1} autoComplete="off"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }}
                onChange={e => setHoneypot(e.target.value)} />

              {[
                { key: 'nome',    label: 'Nome',           type: 'text', ph: 'Seu nome completo',   req: true  },
                { key: 'empresa', label: 'Empresa / Silo', type: 'text', ph: 'Nome da empresa',      req: false },
                { key: 'cidade',  label: 'Cidade da obra', type: 'text', ph: 'Onde fica o silo?',   req: false },
              ].map(f => (
                <div key={f.key} className="flex flex-col border-b border-white/[.08] first:border-t">
                  <label className="text-[10px] font-medium tracking-[.22em] uppercase text-white/25 pt-4 pb-1">
                    {f.label}{f.req && <span className="text-green ml-1">*</span>}
                  </label>
                  <input type={f.type} placeholder={f.ph}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="bg-transparent border-none outline-none text-[16px] font-light
                      text-white pb-4 placeholder:text-white/15 caret-green" />
                </div>
              ))}

              <div className="flex flex-col border-b border-white/[.08]">
                <label className="text-[10px] font-medium tracking-[.22em] uppercase text-white/25 pt-4 pb-1">
                  WhatsApp <span className="text-green">*</span>
                </label>
                <input type="tel" placeholder="(64) 9 0000-0000"
                  value={form.whatsapp}
                  onChange={e => setForm(p => ({ ...p, whatsapp: maskPhone(e.target.value) }))}
                  className="bg-transparent border-none outline-none text-[16px] font-light
                    text-white pb-4 placeholder:text-white/15 caret-green" />
              </div>

              <button onClick={handleSend}
                disabled={!form.nome || !form.whatsapp}
                className="mt-8 flex items-center justify-between px-8 py-5
                  bg-green text-white text-[13px] font-medium tracking-[.14em] uppercase
                  hover:bg-green2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                Solicitar estudo técnico gratuito
                <span className="text-[18px]">↗</span>
              </button>

              <p className="text-[11px] text-white/20 text-center mt-4">
                Retorno em até 24 horas · Sem compromisso · Rio Verde, GO
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[.06] px-6 md:px-12 py-6
        flex flex-col md:flex-row items-center justify-between gap-4 bg-[#040a14]">
        <Link href="/">
          <Image src="/images/logo-white.png" alt="GP Asfalto"
            width={120} height={34} className="h-8 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <span className="text-[10px] tracking-[.1em] uppercase text-white/20">{company.cnpj}</span>
          <a href={'tel:+55' + company.phone.replace(/\D/g,'')}
            className="text-[12px] text-white/35 hover:text-white transition-colors">
            {company.phone}
          </a>
          <a href={'https://wa.me/' + company.whatsapp} target="_blank"
            className="text-[11px] font-medium tracking-[.1em] uppercase text-white/30 hover:text-green transition-colors">
            WhatsApp
          </a>
        </div>
        <span className="text-[10px] text-white/15">Rio Verde · GO · Brasil</span>
      </footer>

    </div>
  )
}
