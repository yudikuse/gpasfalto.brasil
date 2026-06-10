'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'

/* ───────────────────────────────────────────────────────────────────────
   DESTINO DO LEAD — cole aqui a URL do Web App do Apps Script (termina em
   /exec). É o script que grava na planilha E dispara o e-mail pros 4
   destinatários. Passo a passo no arquivo apps-script/contato.gs.
   Enquanto estiver com o placeholder, o form mostra sucesso mas NÃO envia.
   ─────────────────────────────────────────────────────────────────────── */
const LEAD_WEBHOOK = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT_/exec'

const tipos = [
  'Agronegócio',
  'Loteamento',
  'Empresa privada',
  'Obra pública',
  'Fornecimento CBUQ',
  'Outro',
]

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return '(' + d
  if (d.length <= 7) return '(' + d.slice(0, 2) + ') ' + d.slice(2)
  return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7)
}

export function ContactSection() {
  const { company } = site
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [cidade, setCidade] = useState('')
  const [tipo, setTipo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const valido = nome.trim() && whatsapp.trim() && cidade.trim()

  const submit = async () => {
    if (!valido || sending) return
    setSending(true)
    try {
      await fetch(LEAD_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nome, whatsapp, email, cidade, tipo, descricao,
          origem: 'site-institucional',
        }),
      })
    } catch {
      /* no-cors: não dá pra ler a resposta; segue otimista */
    }
    setSending(false)
    setSent(true)
  }

  const waLink = () => {
    const msg = encodeURIComponent(
      'Olá! Meu nome é ' + (nome || '...') + '.\n' +
      'Cidade: ' + (cidade || '—') + '\n' +
      'Tipo: ' + (tipo || '—') + '\n' +
      (descricao ? 'Descrição: ' + descricao : '')
    )
    return 'https://wa.me/' + company.whatsapp + '?text=' + msg
  }

  const reset = () => {
    setSent(false); setNome(''); setWhatsapp(''); setEmail('')
    setCidade(''); setTipo(''); setDescricao('')
  }

  return (
    <section id="contato" className="bg-gp-navy-deep py-24 md:py-32">
      <div className="container-gp grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ESQUERDA — pitch + contatos diretos */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">Orçamento</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.02em] text-gp-bone">
              Solicite uma{' '}
              <span className="text-gp-green-bright">análise técnica.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-gp-bone/70">
              Conte o que precisa. Nossa equipe técnica retorna com cotação
              preliminar e, quando fizer sentido, agenda visita técnica.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-px">
            {[
              { label: 'WhatsApp', value: '(64) 99931-7039', href: 'https://wa.me/' + company.whatsapp },
              { label: 'Telefone', value: company.phone, href: 'tel:+55' + company.phone.replace(/\D/g, '') },
              { label: 'E-mail', value: company.email, href: 'mailto:' + company.email },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-4 border-b border-gp-steel/15 py-4 first:border-t"
              >
                <span className="w-24 font-mono text-xs uppercase tracking-wider text-gp-steel">
                  {c.label}
                </span>
                <span className="font-display text-lg text-gp-bone transition-colors group-hover:text-gp-green-bright">
                  {c.value}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* DIREITA — formulário (card claro pra destacar) */}
        <div className="bg-gp-bone p-8 md:p-10">
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center border-2 border-gp-green">
                <span className="font-display text-2xl font-black text-gp-green">OK</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-black uppercase text-gp-navy-deep">
                Pedido enviado!
              </h3>
              <p className="mt-3 max-w-xs text-sm text-gp-navy-deep/60">
                Nossa equipe técnica retorna em até 24h úteis. Se preferir, fale
                agora pelo WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={'https://wa.me/' + company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#052f1a]"
                >
                  Abrir WhatsApp
                  <ArrowUpRight size={14} />
                </a>
                <button
                  onClick={reset}
                  className="border border-gp-navy-deep/30 px-6 py-3 text-xs font-medium uppercase tracking-wider text-gp-navy-deep transition-colors hover:bg-gp-navy-deep hover:text-gp-bone"
                >
                  Novo orçamento
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gp-green">
                Conte sobre a obra
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nome*" value={nome} onChange={setNome} placeholder="Seu nome" />
                <Field label="Cidade*" value={cidade} onChange={setCidade} placeholder="Onde fica a obra?" />
                <Field
                  label="WhatsApp*"
                  value={whatsapp}
                  onChange={(v) => setWhatsapp(maskPhone(v))}
                  placeholder="(64) 9 0000-0000"
                  type="tel"
                />
                <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="email" />
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gp-navy-deep/40">
                  Tipo de projeto
                </label>
                <div className="flex flex-wrap gap-2">
                  {tipos.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTipo(t === tipo ? '' : t)}
                      className={
                        'border px-3 py-2 text-xs font-medium transition-colors ' +
                        (tipo === t
                          ? 'border-gp-green bg-gp-green/10 text-gp-navy-deep'
                          : 'border-gp-navy-deep/15 text-gp-navy-deep/60 hover:border-gp-navy-deep/40')
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-gp-navy-deep/40">
                  Descrição (opcional)
                </label>
                <textarea
                  rows={2}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Extensão, prazo, outras informações..."
                  className="w-full resize-none border border-gp-navy-deep/15 bg-white px-3 py-3 text-[15px] text-gp-navy-deep caret-gp-green outline-none placeholder:text-gp-navy-deep/30 focus:border-gp-green"
                />
              </div>

              <button
                onClick={submit}
                disabled={!valido || sending}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 bg-gp-green-bright px-6 py-4 text-sm font-medium uppercase tracking-wider text-gp-navy-deep transition-colors hover:bg-gp-green hover:text-gp-bone disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sending ? 'Enviando...' : 'Solicitar orçamento'}
                {!sending && <ArrowUpRight size={16} />}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gp-navy-deep/40">
                <span>Prefere o WhatsApp?</span>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gp-green underline-offset-2 hover:underline"
                >
                  Falar agora
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gp-navy-deep/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gp-navy-deep/15 bg-white px-3 py-3 text-[15px] text-gp-navy-deep caret-gp-green outline-none placeholder:text-gp-navy-deep/30 focus:border-gp-green"
      />
    </label>
  )
}
