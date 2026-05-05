'use client'
import { useState } from 'react'
import { site } from '@/data/content'

export default function ContactPanel() {
  const { company, formOptions } = site
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    // Envia para WhatsApp com mensagem pré-formatada
    const nome    = data.get('nome') as string
    const fone    = data.get('whatsapp') as string
    const projeto = data.get('projeto') as string
    const cliente = data.get('cliente') as string
    const desc    = data.get('descricao') as string
    const msg = encodeURIComponent(
      `Olá! Meu nome é *${nome}*.\n` +
      `📱 WhatsApp: ${fone}\n` +
      `🏗️ Projeto: ${projeto}\n` +
      `👤 Perfil: ${cliente}\n` +
      `📝 Descrição: ${desc}`
    )
    window.open(`https://wa.me/${company.whatsapp}?text=${msg}`, '_blank')
    setLoading(false)
    setSent(true)
    form.reset()
  }

  return (
    <section className="panel bg-cream" id="p7">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 overflow-y-auto md:overflow-hidden">

        {/* LEFT */}
        <div className="flex flex-col justify-between px-10 py-20 md:px-12
          border-b md:border-b-0 md:border-r border-navy/10">

          <h2 className="font-display font-black text-navy leading-[.9]"
            style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
            Solicite<br />um<br />
            <em className="text-green not-italic">orçamento.</em>
          </h2>

          <p className="text-[12px] font-light leading-[1.8] text-navy/50 max-w-xs">
            Equipe técnica retorna em até 24 horas.
            Da visita ao local até a proposta com memorial descritivo e cronograma.
          </p>

          {/* CONTACTS */}
          <div className="flex flex-col">
            {[
              { label: 'WhatsApp', value: `(64) 99931-7039`, href: `https://wa.me/${company.whatsapp}` },
              { label: 'Telefone', value: company.phone,     href: `tel:+55${company.phone.replace(/\D/g,'')}` },
              { label: 'E-mail',   value: company.email,     href: `mailto:${company.email}` },
              { label: 'Endereço', value: company.address,   href: undefined },
            ].map(c => (
              <div key={c.label}
                className="flex flex-col py-3.5 border-b border-navy/8 first:border-t">
                <span className="text-[8px] font-medium tracking-[.26em] uppercase text-navy/30 mb-1">
                  {c.label}
                </span>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                    className="font-display font-bold text-[17px] tracking-[.03em] text-navy
                      hover:text-green transition-colors">
                    {c.value}
                  </a>
                ) : (
                  <span className="font-display font-bold text-[15px] tracking-[.02em] text-navy">
                    {c.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="flex flex-col justify-center px-10 py-16 md:px-12">
          {sent ? (
            <div className="text-center">
              <p className="font-display font-bold text-4xl text-navy mb-4">Mensagem enviada!</p>
              <p className="text-[13px] text-navy/50 mb-8">Nossa equipe entrará em contato em breve.</p>
              <button onClick={() => setSent(false)}
                className="text-[11px] font-medium tracking-[.14em] uppercase
                  text-green border border-green/40 px-6 py-3 hover:bg-green hover:text-white transition-colors">
                Novo orçamento
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Row: nome + fone */}
              <div className="grid grid-cols-2">
                <div className="flex flex-col border-t border-navy/10 border-r">
                  <label className="text-[8px] font-medium tracking-[.24em] uppercase text-navy/30 pt-3.5 pb-1">Nome</label>
                  <input name="nome" type="text" required placeholder="Seu nome"
                    className="bg-transparent border-none outline-none text-[14px] font-light text-navy pb-3.5
                      placeholder:text-navy/20 caret-green" />
                </div>
                <div className="flex flex-col border-t border-navy/10 pl-4">
                  <label className="text-[8px] font-medium tracking-[.24em] uppercase text-navy/30 pt-3.5 pb-1">WhatsApp</label>
                  <input name="whatsapp" type="tel" required placeholder="(64) 9 0000-0000"
                    className="bg-transparent border-none outline-none text-[14px] font-light text-navy pb-3.5
                      placeholder:text-navy/20 caret-green" />
                </div>
              </div>

              {[
                { name: 'projeto', label: 'Tipo de projeto', options: formOptions.projectTypes },
                { name: 'cliente', label: 'Você representa', options: formOptions.clientTypes },
              ].map(f => (
                <div key={f.name} className="flex flex-col border-t border-navy/10">
                  <label className="text-[8px] font-medium tracking-[.24em] uppercase text-navy/30 pt-3.5 pb-1">
                    {f.label}
                  </label>
                  <select name={f.name} required
                    className="bg-transparent border-none outline-none text-[14px] font-light text-navy pb-3.5
                      appearance-none cursor-pointer caret-green">
                    <option value="" disabled>Selecione...</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}

              <div className="flex flex-col border-t border-navy/10">
                <label className="text-[8px] font-medium tracking-[.24em] uppercase text-navy/30 pt-3.5 pb-1">
                  Descrição do projeto
                </label>
                <textarea name="descricao" rows={3} placeholder="Localização, extensão estimada, prazo desejado..."
                  className="bg-transparent border-none outline-none text-[14px] font-light text-navy pb-3.5
                    resize-none placeholder:text-navy/20 caret-green" />
              </div>

              <button type="submit" disabled={loading}
                className="mt-6 flex items-center justify-between px-6 py-4
                  bg-navy text-white font-body text-[11px] font-medium tracking-[.14em] uppercase
                  hover:bg-navy3 transition-colors disabled:opacity-60">
                {loading ? 'Enviando...' : 'Enviar solicitação'}
                <span>→</span>
              </button>

              <a href={`https://wa.me/${company.whatsapp}`} target="_blank"
                className="mt-1 flex items-center justify-between px-6 py-3.5
                  border border-navy/12 text-navy/35 font-body text-[11px] font-normal
                  tracking-[.14em] uppercase hover:border-[#25D366] hover:text-[#25D366] transition-colors">
                Prefiro falar no WhatsApp
                <span>↗</span>
              </a>
            </form>
          )}
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between
        px-10 py-3.5 bg-navy border-t border-white/5">
        <a href="#p1"
          onClick={e => { e.preventDefault(); document.getElementById('p1')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="font-display font-bold text-[14px] tracking-[.1em] uppercase text-white/70 hover:text-white transition-colors">
          GP<span className="text-green">.</span>ASFALTO BRASIL
        </a>
        <nav className="hidden md:flex gap-5">
          {[
            { l: 'Empresa', id: 'p2' }, { l: 'Obras', id: 'p3' },
            { l: 'Usinas', id: 'p6' },
          ].map(n => (
            <a key={n.id} href={`#${n.id}`}
              onClick={e => { e.preventDefault(); document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' }) }}
              className="text-[9px] tracking-[.14em] uppercase text-white/20 hover:text-white/60 transition-colors">
              {n.l}
            </a>
          ))}
        </nav>
        <span className="text-[9px] tracking-[.08em] text-white/15">
          © 2025 {company.razao} · Rio Verde, GO
        </span>
      </div>
    </section>
  )
}
