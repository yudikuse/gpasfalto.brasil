import CamadaRail from "../../components/CamadaRail";
import Reveal from "../../components/Reveal";

/**
 * /experiencia — pagina de testes do conceito "corte de pavimento".
 * - CamadaRail: trilho lateral fixo (amostra de pavimento) na direita.
 * - Reveal: revelacao discreta por foco (blur->nitido) em cada secao.
 *
 * Esta pagina é so pra validar o comportamento no scroll/celular antes de
 * levar o trilho + o foco pra home. O conteudo aqui é representativo.
 */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-5 flex items-center gap-2 text-[11px] tracking-[0.18em] text-gp-green-bright"
      style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
    >
      <span className="inline-block h-px w-6 bg-gp-green-bright" />
      {children}
    </div>
  );
}

export default function ExperienciaPage() {
  return (
    <main className="relative min-h-screen bg-gp-navy-deep text-gp-bone">
      <CamadaRail />

      <div className="mx-auto max-w-5xl px-6 lg:pr-40">
        {/* superficie / capa */}
        <Reveal>
          <section className="flex min-h-[80vh] flex-col justify-center py-24">
            <Eyebrow>PAVIMENTAÇÃO · TERRAPLENAGEM · INFRAESTRUTURA</Eyebrow>
            <h1 className="text-5xl font-extrabold leading-[0.9] sm:text-7xl">
              CBUQ PRÓPRIO.
              <br />
              <span className="text-gp-green-bright">ENTREGA NO PRAZO.</span>
            </h1>
            <p className="mt-6 max-w-xl text-gp-steel">
              Da usina à compactação final, a GP Asfalto entrega pavimentação, terraplenagem e infraestrutura com
              controle técnico e equipe própria.
            </p>
          </section>
        </Reveal>

        {/* ligacao / numeros */}
        <Reveal>
          <section className="border-t border-gp-green-bright/20 py-24">
            <Eyebrow>EM NÚMEROS</Eyebrow>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["40+", "ANOS DE MERCADO"],
                ["300+", "OBRAS ENTREGUES"],
                ["3", "USINAS CBUQ"],
                ["28", "MUNICÍPIOS"],
              ].map(([n, l]) => (
                <div key={l} className="border-l border-gp-steel/30 pl-3">
                  <div className="text-4xl font-extrabold leading-none">{n}</div>
                  <div
                    className="mt-2 text-[9px] tracking-[0.1em] text-gp-steel"
                    style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* base / o que fazemos */}
        <Reveal>
          <section className="border-t border-gp-green-bright/20 py-24">
            <Eyebrow>O QUE FAZEMOS</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-[0.92]">
              SOLUÇÕES VERTICAIS EM <span className="text-gp-green-bright">INFRAESTRUTURA.</span>
            </h2>
            <p className="mt-4 max-w-lg text-gp-steel">
              Pavimentação CBUQ, terraplenagem, drenagem e saneamento — com controle tecnológico em cada etapa.
            </p>
          </section>
        </Reveal>

        {/* sub-base / pra cada obra */}
        <Reveal>
          <section className="border-t border-gp-green-bright/20 py-24">
            <Eyebrow>PRA CADA OBRA</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-[0.92]">
              A FRENTE <span className="text-gp-green-bright">CERTA.</span>
            </h2>
            <p className="mt-4 max-w-lg text-gp-steel">
              Do agro ao poder público, a GP adapta a solução ao tipo de projeto — com a mesma frota e equipe técnica.
            </p>
          </section>
        </Reveal>

        {/* subleito / contato */}
        <Reveal>
          <section className="border-t border-gp-green-bright/20 py-24 pb-40">
            <Eyebrow>PRÓXIMO PASSO</Eyebrow>
            <h2 className="text-4xl font-extrabold leading-[0.9]">
              CONSTRUA COM A <span className="text-gp-green-bright">GP ASFALTO.</span>
            </h2>
            <p
              className="mt-6 text-[10px] tracking-[0.1em] text-gp-steel"
              style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
            >
              RIO VERDE · GO · CONTATO@GPASFALTO.COM.BR
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
