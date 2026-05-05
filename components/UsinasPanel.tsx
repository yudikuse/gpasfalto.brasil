import { site } from '@/data/content'

export default function UsinasPanel() {
  const { usinas, specs } = site

  return (
    <section className="panel bg-navy2" id="usinas">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 overflow-y-auto md:overflow-hidden">

        {/* LEFT */}
        <div className="flex flex-col justify-center px-10 py-16 md:px-12
          border-b md:border-b-0 md:border-r border-white/[.06]">

          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-green block" />
            <span className="text-[12px] font-medium tracking-[.22em] uppercase text-green">
              Produção Própria
            </span>
          </div>

          <h2 className="font-display font-black text-white leading-[.92]"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
            3 Usinas<br />CBUQ<br />Próprias
          </h2>

          <p className="text-[15px] font-light leading-[1.85] text-white/45 mt-7 max-w-[380px]">
            Produção e controle tecnológico do Concreto Betuminoso Usinado a Quente.
            Dosagem Marshall certificada, filtro de mangas ativo, rastreabilidade total.
          </p>

          <div className="mt-8 flex flex-col gap-0.5">
            {usinas.map(u => (
              <div key={u.number}
                className="flex items-center gap-5 px-5 py-4
                  bg-white/[.04] hover:bg-white/[.07] transition-colors
                  border-l-[3px] border-green">
                <span className="font-display font-black text-white/[.06] text-4xl w-11 flex-shrink-0">
                  {u.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-[17px] tracking-[.08em] uppercase text-white">
                    {u.name}
                  </div>
                  <div className="text-[12px] text-white/30 mt-0.5 tracking-[.04em]">
                    {u.location}
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#4ade80] flex-shrink-0 blink" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-10 py-16 md:px-12">

          <div className="flex flex-col">
            {specs.map((s, i) => (
              <div key={i}
                className="flex justify-between items-baseline py-4
                  border-b border-white/[.06] first:border-t">
                <span className="text-[13px] font-normal tracking-[.04em] text-white/35">
                  {s.key}
                </span>
                <span className="font-display font-bold text-[20px] text-white tracking-[.04em]">
                  {s.value}
                  {s.sub && (
                    <small className="text-[12px] text-green ml-1">{s.sub}</small>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 px-5 py-5 bg-white/[.04] border-l-[3px] border-green">
            <p className="text-[13px] font-light leading-[1.75] text-white/45">
              <strong className="text-white font-medium">Fornecimento para licitantes:</strong>
              {' '}empresas participantes de concorrências na região adquirem CBUQ
              com documentação técnica completa, laudos e ART.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
