import { ArrowUpRight, Target, Eye, Award, MapPin } from 'lucide-react'
import { site } from '@/data/content'

export const metadata = {
  title: 'Sobre · GP Asfalto Brasil',
  description: 'Conheça a GP Asfalto: mais de 40 anos pavimentando o Centro-Oeste com CBUQ próprio, engenharia aplicada e cronograma cumprido.',
}

const valores = [
  {
    icon: Target,
    titulo: 'Missão',
    texto: 'Entregar obras de pavimentação, terraplenagem e infraestrutura com controle técnico, equipe própria e compromisso de cronograma — gerando previsibilidade para o agronegócio, loteadores e empresas do Centro-Oeste.',
  },
  {
    icon: Eye,
    titulo: 'Visão',
    texto: 'Ser a referência regional em infraestrutura asfáltica de Goiás, reconhecida pela engenharia aplicada na prática, controle de qualidade certificado e palavra cumprida em cada obra entregue.',
  },
  {
    icon: Award,
    titulo: 'Política de Qualidade',
    texto: 'Operar com produção própria de CBUQ controlada em laboratório (ensaio Marshall por traço), licença ambiental ativa SEMAD-GO e execução conforme normas DNIT e NBR 7207 em todas as etapas.',
  },
]

export default function SobrePage() {
  return (
    <div className="bg-gp-navy">
      {/* HERO da página /sobre */}
      <section className="relative overflow-hidden bg-gp-navy-deep pb-24 pt-[calc(var(--header-h)+5rem)]">
        <div className="container-gp">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gp-green-bright" />
            <span className="eyebrow">A empresa</span>
          </div>
          <h1 className="font-display text-display-xl uppercase leading-[0.95] text-gp-bone">
            Mais de 40 anos pavimentando
            <br />
            <span className="text-gp-green-bright">o Centro-Oeste.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-gp-bone/75 sm:text-xl">
            A GP Asfalto opera há mais de 40 anos em Rio Verde, GO, com produção própria
            de CBUQ, frota dedicada e equipe técnica especializada. Atendemos o
            agronegócio, loteadores e empresas do Centro-Oeste com obras
            entregues no prazo.
          </p>
        </div>
      </section>

      {/* MISSÃO / VISÃO / POLÍTICA DE QUALIDADE */}
      <section className="py-24">
        <div className="container-gp">
          <div className="mb-16 flex items-center gap-4">
            <span className="h-px w-12 bg-gp-green-bright" />
            <span className="eyebrow">Princípios</span>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {valores.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.titulo}
                  className="group border-l-2 border-gp-steel/20 p-6 transition-colors hover:border-gp-green-bright"
                >
                  <Icon
                    size={28}
                    className="text-gp-green-bright"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-6 font-display text-2xl uppercase text-gp-bone">
                    {v.titulo}
                  </h3>
                  <p className="mt-4 text-gp-bone/70">{v.texto}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* SEDE */}
      <section className="py-24">
        <div className="container-gp">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-gp-green-bright" />
                <span className="eyebrow">Sede</span>
              </div>
              <h2 className="font-display text-display-lg uppercase text-gp-bone">
                Rio Verde, <span className="text-gp-green-bright">Goiás.</span>
              </h2>
              <div className="mt-8 flex items-start gap-4 text-gp-bone/80">
                <MapPin size={24} className="mt-1 shrink-0 text-gp-green-bright" />
                <address className="not-italic">
                  {site.company.address}
                  <br />
                  CNPJ {site.company.cnpj}
                </address>
              </div>
            </div>
            <div className="flex justify-start lg:justify-end">
              <a
                href={`https://wa.me/${site.company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar Orçamento
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
