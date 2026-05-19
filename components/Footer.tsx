import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'

export function Footer() {
  return (
    <footer className="relative bg-gp-navy-deep pt-24">
      <div className="container-gp">
        <div className="grid gap-12 border-b border-gp-steel/10 pb-16 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <Image
              src="/images/logo-white.png"
              alt="GP Asfalto"
              width={280}
              height={84}
              className="h-16 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm text-gp-steel">
              Infraestrutura, pavimentação CBUQ e usinas próprias. Atendendo o
              agronegócio, loteamentos e empresas do Centro-Oeste desde {site.company.founded}.
            </p>
          </div>

          <div>
            <h3 className="font-display text-display-lg uppercase leading-none text-gp-bone">
              Do campo<br/>à <span className="text-gp-green-bright">cidade.</span>
            </h3>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="eyebrow mb-6">Navegação</div>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gp-bone/70 hover:text-gp-green-bright">Início</Link></li>
              <li><Link href="#obras" className="text-gp-bone/70 hover:text-gp-green-bright">Obras</Link></li>
              <li><Link href="#usinas" className="text-gp-bone/70 hover:text-gp-green-bright">Usinas</Link></li>
              <li><Link href="/sobre" className="text-gp-bone/70 hover:text-gp-green-bright">Sobre</Link></li>
              <li><Link href="#contato" className="text-gp-bone/70 hover:text-gp-green-bright">Contato</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-6">Contato</div>
            <ul className="space-y-3 text-gp-bone/70">
              <li>
                <a href={`mailto:${site.company.email}`} className="hover:text-gp-green-bright">
                  {site.company.email}
                </a>
              </li>
              <li>
                <a href={`tel:+55${site.company.whatsapp}`} className="hover:text-gp-green-bright">
                  {site.company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gp-green-bright"
                >
                  WhatsApp <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-6">Sede</div>
            <address className="not-italic text-gp-bone/70">
              {site.company.address}
            </address>
          </div>

          <div>
            <div className="eyebrow mb-6">Siga</div>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center border border-gp-steel/30 text-gp-bone transition-colors hover:border-gp-green-bright hover:text-gp-green-bright"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={site.company.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center border border-gp-steel/30 text-gp-bone transition-colors hover:border-gp-green-bright hover:text-gp-green-bright"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-gp-steel/10 py-8 md:flex-row md:items-center">
          <div className="font-mono text-xs uppercase tracking-widest text-gp-steel">
            © {new Date().getFullYear()} GP Asfalto — Todos os direitos reservados
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-gp-steel">
            CNPJ {site.company.cnpj}
          </div>
        </div>
      </div>
    </footer>
  )
}
