'use client'
import { useState } from 'react'
import { site } from '@/data/content'

type Step = 1 | 2 | 3

const projectTypes = [
  { label: 'Agronegócio',       code: '01', sub: 'Estrada, pátio, silo, fazenda' },
  { label: 'Loteamento',        code: '02', sub: 'Infraestrutura completa' },
  { label: 'Empresa Privada',   code: '03', sub: 'Pátio, acesso, área industrial' },
  { label: 'Obra Pública',      code: '04', sub: 'Prefeitura, licitação' },
  { label: 'Fornecimento CBUQ', code: '05', sub: 'Massa asfáltica para sua obra' },
  { label: 'Outro',             code: '06', sub: 'Descreva seu projeto' },
]

const scopeItems = [
  'Pavimentação CBUQ', 'Terraplenagem', 'Drenagem pluvial',
  'Rede de água', 'Rede de esgoto', 'Meio-fio e sarjeta',
  'Fornecimento CBUQ', 'Projeto completo',
]

export default function ContactPanel() {
  const { company } = site
  const [step, setStep]   = useState<Step>(1)
  const [type, setType]   = useState('')
  const [scope, setScope] = useState<string[]>([])
  const [form, setForm]   = useState({ nome: '', whatsapp: '', cidade: '', desc: '' })
  const [sent, setSent]   = useState(false)

  const toggleScope = (s: string) =>
    setScope(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleSend = () => {
    const msg = encodeURIComponent(
      'Olá! Meu nome é *' + form.nome + '*.\n' +
      '📱 WhatsApp: ' + form.whatsapp + '\n' +
      '📍 Cidade: ' + form.cidade + '\n' +
      '🏗️ Tipo: ' + type + '\n' +
      '📋 Escopo: ' + (scope.length ? scope.join(', ') : 'A definir') + '\n' +
      '📝 ' + form.desc
    )
    window.open('https://wa.me/' + company.whatsapp + '?text=' + msg, '_blank')
    setSent(true)
  }

  if (sent) return (
    <section className="panel bg-cream flex items-center justify-center" id="p7">
      <div className="text-center px-8">
        <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="font-display font-black text-navy text-[40px] mb-3">Mensagem enviada!</h2>
        <p className="text-[14px] text-navy/50 mb-8 max-w-sm mx-auto leading-relaxed">
          Nossa equipe técnica retorna em até 24 horas com uma análise do seu projeto.
        </p>
        <button onClick={() => { setSent(false); setStep(1); setType(''); setScope([]); setForm({ nome: '', whatsapp: '', cidade: '', desc: '' }) }}
          className="text-[11px] font-medium tracking-[.14em] uppercase
            text-green border border-green/40 px-6 py-3 hover:bg-green hover:text-white transition-colors">
          Novo orçamento
        </button>
      </div>
    </section>
  )

  return (
    <section className="panel bg-cream" id="p7">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 overflow-y-auto md:overflow-hidden">

        {/* LEFT */}
        <div className="flex flex-col justify-between px-8 md:px-12 py-20
          border-b md:border-b-0 md:border-r border-navy/10">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-px bg-green block" />
              <span className="text-[10px] font-medium tracking-[.26em] uppercase text-green">
                Orçamento
              </span>
            </div>
            <h2 className="font-display font-black text-navy leading-[.9]"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
              Solicite<br />uma análise<br />
              <em className="text-green not-italic">técnica.</em>
            </h2>
            <p className="text-[13px] font-light leading-[1.8] text-navy/50 mt-5 max-w-xs">
              Preencha em 3 passos. Nossa equipe retorna em até 24h com proposta detalhada.
            </p>
          </div>

          {/* CONTACTS */}
          <div className="flex flex-col mt-8">
            {[
              { label: 'WhatsApp', value: '(64) 99931-7039', href: 'https://wa.me/' + company.whatsapp },
              { label: 'Telefone', value: company.phone,    href: 'tel:+55' + company.phone.replace(/\D/g,'') },
              { label: 'E-mail',   value: company.email,    href: 'mailto:' + company.email },
            ].map(c => (
              <div key={c.label} className="flex flex-col py-3 border-b border-navy/8 first:border-t">
                <span className="text-[8px] font-medium tracking-[.26em] uppercase text-navy/30 mb-1">{c.label}</span>
                <a href={c.href} target="_blank"
                  className="font-display font-bold text-[16px] tracking-[.03em] text-navy hover:text-green transition-colors">
                  {c.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — STEPPED FORM */}
        <div className="flex flex-col px-8 md:px-12 py-16 md:py-20 overflow-y-auto">

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 mb-10">
            {([1,2,3] as Step[]).map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center
                  text-[10px] font-bold transition-all duration-300
                  ${step >= s ? 'bg-green text-white' : 'bg-navy/10 text-navy/30'}`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && <div className={`w-8 h-px transition-colors duration-300
                  ${step > s ? 'bg-green' : 'bg-navy/15'}`} />}
              </div>
            ))}
            <span className="ml-2 text-[10px] tracking-[.12em] uppercase text-navy/40">
              {step === 1 ? 'Tipo de projeto' : step === 2 ? 'Escopo' : 'Seus dados'}
            </span>
          </div>

          {/* STEP 1 — TYPE */}
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-bold text-[22px] text-navy uppercase mb-4">
                Qual é o seu projeto?
              </h3>
              {projectTypes.map(p => (
                <button key={p.label}
                  onClick={() => { setType(p.label); setStep(2) }}
                  className={`flex items-center gap-4 px-5 py-4 border text-left
                    transition-all duration-200 hover:border-green hover:bg-green/5
                    ${type === p.label ? 'border-green bg-green/8' : 'border-navy/12'}`}>
                  <span className="font-display font-black text-[11px] tracking-[.2em] text-green/40 w-8 flex-shrink-0">
  {p.code}
</span>
                  <div>
                    <div className="text-[13px] font-medium text-navy">{p.label}</div>
                    <div className="text-[11px] text-navy/40">{p.sub}</div>
                  </div>
                  <span className="ml-auto text-navy/20 text-sm">→</span>
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — SCOPE */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)}
                className="text-[10px] tracking-[.12em] uppercase text-navy/40
                  hover:text-navy transition-colors mb-6 flex items-center gap-2">
                ← {type}
              </button>
              <h3 className="font-display font-bold text-[22px] text-navy uppercase mb-6">
                O que precisa?
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {scopeItems.map(s => (
                  <button key={s}
                    onClick={() => toggleScope(s)}
                    className={`px-4 py-3 border text-[11px] font-medium tracking-[.04em]
                      text-left transition-all duration-200
                      ${scope.includes(s)
                        ? 'border-green bg-green/8 text-navy'
                        : 'border-navy/12 text-navy/50 hover:border-navy/30'}`}>
                    {scope.includes(s) ? '✓ ' : ''}{s}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(3)}
                className="w-full py-4 bg-navy text-white text-[12px] font-medium
                  tracking-[.14em] uppercase hover:bg-navy3 transition-colors">
                Continuar →
              </button>
            </div>
          )}

          {/* STEP 3 — CONTACT */}
          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)}
                className="text-[10px] tracking-[.12em] uppercase text-navy/40
                  hover:text-navy transition-colors mb-6 flex items-center gap-2">
                ← Voltar
              </button>
              <h3 className="font-display font-bold text-[22px] text-navy uppercase mb-6">
                Seus dados
              </h3>
              <div className="flex flex-col gap-0">
                {[
                  { key: 'nome',      label: 'Nome',     type: 'text', ph: 'Seu nome completo' },
                  { key: 'whatsapp',  label: 'WhatsApp', type: 'tel',  ph: '(64) 9 0000-0000' },
                  { key: 'cidade',    label: 'Cidade',   type: 'text', ph: 'Onde fica a obra?' },
                ].map(f => (
                  <div key={f.key} className="flex flex-col border-b border-navy/10 first:border-t">
                    <label className="text-[8px] font-medium tracking-[.24em] uppercase text-navy/30 pt-3 pb-1">
                      {f.label}
                    </label>
                    <input type={f.type} placeholder={f.ph} required
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="bg-transparent border-none outline-none text-[14px] font-light
                        text-navy pb-3 placeholder:text-navy/20 caret-green" />
                  </div>
                ))}
                <div className="flex flex-col border-b border-navy/10">
                  <label className="text-[8px] font-medium tracking-[.24em] uppercase text-navy/30 pt-3 pb-1">
                    Descrição (opcional)
                  </label>
                  <textarea placeholder="Extensão, prazo, outras informações..." rows={2}
                    value={form.desc}
                    onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
                    className="bg-transparent border-none outline-none text-[14px] font-light
                      text-navy pb-3 resize-none placeholder:text-navy/20 caret-green" />
                </div>
              </div>
              <button onClick={handleSend}
                disabled={!form.nome || !form.whatsapp}
                className="mt-6 w-full flex items-center justify-between px-6 py-4
                  bg-green text-white text-[12px] font-medium tracking-[.14em] uppercase
                  hover:bg-green2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Enviar análise pelo WhatsApp
                <span>↗</span>
              </button>
              <p className="text-[10px] text-navy/30 text-center mt-3">
                Retorno em até 24 horas
              </p>
            </div>
          )}
        </div>

      </div>

      {/* FOOTER */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between
        px-8 md:px-10 py-3.5 bg-navy border-t border-white/5">
        <button onClick={() => document.getElementById('p1')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-display font-bold text-[13px] tracking-[.1em] uppercase
            text-white/60 hover:text-white transition-colors">
          GP<span className="text-green">.</span>ASFALTO
        </button>
        <span className="hidden md:block text-[9px] tracking-[.08em] text-white/15">
          © 2025 {company.razao} · Rio Verde, GO
        </span>
        <a href={'https://wa.me/' + company.whatsapp} target="_blank"
          className="text-[10px] tracking-[.12em] uppercase text-white/30
            hover:text-green transition-colors">
          WhatsApp
        </a>
      </div>
    </section>
  )
}
