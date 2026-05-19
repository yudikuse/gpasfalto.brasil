import { ArrowUpRight, Phone, MessageCircle } from 'lucide-react'
import { site } from '@/data/content'

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

export function CtaBanner() {
  const whatsapps = site.phones.filter((p) => p.isWhatsApp)
  const fixo = site.phones.find((p) => !p.isWhatsApp)

  return (
    <section id="contato" className="relative overflow-hidden bg-gp-navy">
      {/* Padrão sutil de pista */}
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

      <div className="container-gp relative py-32 md:py-40">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* Coluna esquerda - Heading */}
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
            <p className="mt-8 max-w-lg text-lg text-gp-bone/70">
              Conte sua obra. Nossa equipe técnica retorna em até 48 horas com
              análise de viabilidade e proposta comercial.
            </p>
          </div>

          {/* Coluna direita - Contatos */}
          <div className="lg:pt-4">
            {/* WhatsApps */}
            <div className="space-y-1">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gp-green-bright">
                <WhatsAppIcon size={14} />
                <span>WhatsApp</span>
              </div>
              {whatsapps.map((p) => (
                <a
                  key={p.number}
                  href={`https://wa.me/${p.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-gp-steel/15 py-4 transition-colors hover:border-gp-green-bright"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-gp-steel">
                      {p.label.replace('WhatsApp ', '')}
                    </div>
                    <div className="mt-0.5 font-display text-2xl uppercase text-gp-bone group-hover:text-gp-green-bright">
                      {p.number}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gp-steel transition-all group-hover:rotate-45 group-hover:text-gp-green-bright"
                  />
                </a>
              ))}
            </div>

            {/* Fixo + E-mail */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {fixo && (
                <a
                  href={`tel:+55${fixo.number.replace(/\D/g, '')}`}
                  className="group flex items-start gap-3 border-l-2 border-gp-steel/40 px-4 py-3 transition-all hover:border-gp-bone"
                >
                  <Phone size={16} className="mt-1 shrink-0 text-gp-steel group-hover:text-gp-bone" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-gp-steel">
                      Fixo
                    </div>
                    <div className="mt-0.5 text-sm text-gp-bone">{fixo.number}</div>
                  </div>
                </a>
              )}
              <a
                href={`mailto:${site.company.email}`}
                className="group flex items-start gap-3 border-l-2 border-gp-steel/40 px-4 py-3 transition-all hover:border-gp-bone"
              >
                <MessageCircle size={16} className="mt-1 shrink-0 text-gp-steel group-hover:text-gp-bone" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-gp-steel">
                    E-mail
                  </div>
                  <div className="mt-0.5 text-sm text-gp-bone">{site.company.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
