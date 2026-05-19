import { site } from '@/data/content'

export function UsinasSection() {
  return (
    <section id="usinas" className="relative overflow-hidden bg-gp-navy-deep py-32">
      <div className="container-gp">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-12 bg-gp-green-bright" />
            <span className="eyebrow">Capacidade produtiva</span>
          </div>
          <h2 className="font-display text-display-xl uppercase text-gp-bone">
            3 usinas CBUQ
            <br />
            <span className="text-gp-green-bright">próprias</span> em operação.
          </h2>
          <p className="mt-6 max-w-lg text-gp-bone/65">
            Produção contínua com controle tecnológico em laboratório e fornecimento
            disponível para obras de terceiros sob contrato.
          </p>
        </div>

        {/* Usinas grid */}
        <div className="grid gap-px border border-gp-steel/10 md:grid-cols-3">
          {site.usinas.map((usina) => (
            <div
              key={usina.number}
              className="group relative bg-gp-navy p-8 transition-colors hover:bg-gp-green/10"
            >
              <div className="font-display text-6xl text-gp-green-bright/40 transition-colors group-hover:text-gp-green-bright">
                {usina.number}
              </div>
              <h3 className="mt-8 font-display text-xl uppercase text-gp-bone">
                {usina.name}
              </h3>
              <p className="mt-2 text-sm text-gp-steel">{usina.location}</p>
              <div className="mt-8 line-shimmer" />
            </div>
          ))}
        </div>

        {/* Especificações técnicas */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {site.specs.map((spec) => (
            <div key={spec.key} className="border-l-2 border-gp-green-bright pl-4">
              <div className="font-mono text-xs uppercase tracking-wider text-gp-steel">
                {spec.key}
              </div>
              <div className="mt-2 font-display text-lg text-gp-bone">{spec.value}</div>
              <div className="text-xs text-gp-steel">{spec.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
