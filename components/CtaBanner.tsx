import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'

export function CtaBanner() {
  return (
    <section id="contato" className="relative overflow-hidden bg-gp-navy">
      {/* Padrão de fundo: faixas de pista sutis */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        <defs>
          <pattern id="road-lines" width="80" height="80" patternTransform="rotate(8)" patternUnits="userSpaceOnUse">
            <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" strokeWidth="2" className="text-gp-green-bright" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" className="text-gp-bone" />
            <line x1="10" y1="40" x2="10" y2="60" stroke="currentColor" strokeWidth="1" className="text-gp-bone" />
            <line x1="70" y1="0" x2="70" y2="20" stroke="currentColor" strokeWidth="1" className="text-gp-bone" />
            <line x1="70" y1="40" x2="70" y2="60" stroke="currentColor" strokeWidth="1" className="text-gp-bone" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#road-lines)" />
      </svg>

      <div className="container-gp relative py-32 md:py-48">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-gp-green-bright" />
              <span className="eyebrow">Próximo passo</span>
            </div>
            <h2 className="font-display text-hero uppercase leading-none text-gp-bone">
              Construa
              <br />
              <span className="text-gp-green-bright">com a GP.</span>
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-lg text-gp-bone/70">
              Conte sua obra. Nossa equipe técnica retorna em até 48 horas com
              análise de viabilidade e proposta comercial.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${site.company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base"
              >
                WhatsApp
                <ArrowUpRight size={18} />
              </a>
              <a href={`mailto:${site.company.email}`} className="btn-ghost text-base">
                E-mail
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Contatos diretos */}
            <dl className="space-y-2 border-t border-gp-steel/15 pt-6 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="uppercase tracking-wider text-gp-steel">Tel</dt>
                <dd className="text-gp-bone">{site.company.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="uppercase tracking-wider text-gp-steel">E-mail</dt>
                <dd className="text-gp-bone">{site.company.email}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
