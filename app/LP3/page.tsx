// app/LP3/page.tsx
"use client"; 

import { FormEvent, useMemo, useState } from "react";

type FormState = {
  nome: string;
  telefone: string;
  cidade: string;
  tipoArea: string;
  metragem: string;
  mensagem: string;
};

const WHATSAPP_NUMBER = "5564999999999"; // TROCAR PELO NÚMERO REAL DA GP

const areaTypes = [
  "Pátio empresarial",
  "Estacionamento",
  "Acesso / entrada",
  "Via interna",
  "Recapeamento",
  "Área rural",
  "Área industrial/logística",
  "Outro",
];

const applications = [
  {
    title: "Pátios empresariais",
    text: "Mais trafegabilidade, menos poeira e uma área com aparência mais profissional.",
  },
  {
    title: "Estacionamentos",
    text: "Melhore a entrada, circulação e percepção de clientes, fornecedores e motoristas.",
  },
  {
    title: "Acessos e entradas",
    text: "Solução para áreas que sofrem com lama, buracos, poeira ou fluxo intenso.",
  },
  {
    title: "Vias internas",
    text: "Aplicação para circulação de veículos, caminhões e operação diária.",
  },
  {
    title: "Recapeamento",
    text: "Recuperação de áreas desgastadas com nova camada de CBUQ, conforme avaliação.",
  },
  {
    title: "Áreas rurais e logísticas",
    text: "Acessos, balanças, pátios de carga, áreas industriais e pontos de circulação pesada.",
  },
];

const priceFactors = [
  "Metragem da área",
  "Espessura da camada",
  "Tipo de tráfego",
  "Condição da base",
  "Distância e logística",
  "Acesso de caminhões",
  "Imprimação ou pintura de ligação",
  "Acabamento esperado",
];

const faq = [
  {
    q: "Vocês vendem só a massa ou também aplicam?",
    a: "O foco desta página é fornecimento de CBUQ com aplicação. Dependendo da demanda, também podemos avaliar venda da massa separadamente.",
  },
  {
    q: "Atendem obras pequenas?",
    a: "A viabilidade depende da cidade, metragem, acesso, logística e volume necessário. Por isso pedimos uma avaliação inicial pelo WhatsApp.",
  },
  {
    q: "Qual a metragem mínima?",
    a: "A metragem mínima depende da localização e da logística da equipe e dos equipamentos. Envie cidade, fotos e metragem aproximada para análise.",
  },
  {
    q: "Preciso preparar a base antes?",
    a: "Depende da condição atual da área. A equipe avalia se a base está pronta ou se precisa de regularização, imprimação ou outro preparo.",
  },
  {
    q: "Dá para fazer orçamento por foto?",
    a: "Fotos e vídeos ajudam na avaliação inicial. Para proposta final, pode ser necessário confirmar medidas, base, acesso e tipo de tráfego.",
  },
  {
    q: "Atendem minha cidade?",
    a: "A GP Asfalto avalia atendimento conforme localização, distância e agenda operacional. Envie a cidade para verificarmos a viabilidade.",
  },
];

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function maskPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function buildWhatsAppMessage(data: FormState) {
  return [
    "Olá, vim pela landing page de aplicação de CBUQ da GP Asfalto.",
    "",
    `Nome: ${data.nome || "-"}`,
    `WhatsApp: ${data.telefone || "-"}`,
    `Cidade/UF: ${data.cidade || "-"}`,
    `Tipo de área: ${data.tipoArea || "-"}`,
    `Metragem aproximada: ${data.metragem || "-"}`,
    "",
    `Mensagem: ${data.mensagem || "Quero avaliar a aplicação de CBUQ na minha área."}`,
  ].join("\n");
}

export default function LP3Page() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    telefone: "",
    cidade: "",
    tipoArea: "",
    metragem: "",
    mensagem: "",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whatsappHref = useMemo(() => {
    const message = encodeURIComponent(buildWhatsAppMessage(form));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: field === "telefone" ? maskPhone(value) : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const digits = onlyDigits(form.telefone);
    if (digits.length < 10) {
      alert("Informe um WhatsApp válido para contato.");
      return;
    }

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="lp3">
      <section className="hero">
        <div className="heroOverlay" />

        <header className="topbar">
          <div className="brand">
            <div className="brandMark">GP</div>
            <div>
              <strong>GP Asfalto</strong>
              <span>CBUQ com aplicação</span>
            </div>
          </div>

          <a className="topCta" href={whatsappHref} target="_blank" rel="noreferrer">
            Pedir avaliação
          </a>
        </header>

        <div className="heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">CBUQ aplicado • pátios • acessos • estacionamentos</div>

            <h1>Aplicação de CBUQ para áreas que precisam voltar a operar melhor</h1>

            <p>
              Massa asfáltica, equipe e equipamentos no mesmo atendimento para transformar áreas
              com poeira, lama e buracos em pavimento pronto para uso.
            </p>

            <div className="heroActions">
              <a className="primaryButton" href={whatsappHref} target="_blank" rel="noreferrer">
                Pedir avaliação pelo WhatsApp
              </a>

              <a className="secondaryButton" href="#formulario">
                Enviar dados da área
              </a>
            </div>

            <p className="microcopy">
              Envie cidade, metragem aproximada e fotos ou vídeos da área.
            </p>
          </div>

          <div className="heroPanel">
            <div>
              <span>Aplicação com equipe de campo</span>
              <strong>CBUQ + logística + compactação</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="impact">
        <div className="sectionHeader">
          <span>O ponto central</span>
          <h2>Não é só asfalto. É área pronta para operação.</h2>
        </div>

        <div className="impactGrid">
          <article>
            <strong>Menos poeira e lama</strong>
            <p>Uma solução mais adequada para áreas que sofrem no período seco e chuvoso.</p>
          </article>

          <article>
            <strong>Menos manutenção provisória</strong>
            <p>Reduz a dependência de correções recorrentes com cascalho, patrola e remendos.</p>
          </article>

          <article>
            <strong>Melhor circulação</strong>
            <p>Ajuda no fluxo de veículos, caminhões, clientes, fornecedores e operação diária.</p>
          </article>
        </div>
      </section>

      <section className="applications">
        <div className="sectionHeader">
          <span>Onde aplicar</span>
          <h2>Aplicação de CBUQ para áreas que precisam trabalhar melhor</h2>
        </div>

        <div className="applicationGrid">
          {applications.map((item) => (
            <article key={item.title} className="applicationCard">
              <div className="cardLine" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pain">
        <div className="painImage" />

        <div className="painCopy">
          <span>O custo escondido</span>
          <h2>O chão ruim custa mais do que parece</h2>

          <p>
            Buracos, poeira, lama e correções provisórias atrapalham a operação, desgastam veículos
            e passam uma imagem ruim para clientes, fornecedores e motoristas.
          </p>

          <div className="painList">
            <span>Cascalho que volta a abrir buraco</span>
            <span>Poeira em período seco</span>
            <span>Lama e poças em período de chuva</span>
            <span>Caminhões circulando com dificuldade</span>
            <span>Aparência improvisada da área</span>
            <span>Manutenção recorrente</span>
          </div>
        </div>
      </section>

      <section className="solution">
        <div className="sectionHeader left">
          <span>Solução GP Asfalto</span>
          <h2>A GP Asfalto entrega massa, equipe e aplicação</h2>
          <p>
            Em vez de contratar etapas separadas, você fala com uma equipe que entende da produção,
            logística e aplicação do CBUQ. Avaliamos a área, estimamos volume, orientamos a
            preparação da base e executamos a aplicação.
          </p>
        </div>

        <div className="solutionGrid">
          {[
            "Fornecimento da massa asfáltica",
            "Transporte até a obra",
            "Equipe de aplicação",
            "Equipamentos de espalhamento e compactação",
            "Orientação sobre base e espessura",
            "Execução em áreas comerciais, industriais e rurais",
          ].map((item) => (
            <div key={item} className="solutionItem">
              <span />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="sectionHeader">
          <span>Como funciona</span>
          <h2>Do primeiro contato à aplicação</h2>
        </div>

        <div className="timeline">
          {[
            ["01", "Você envia cidade, fotos e metragem"],
            ["02", "A equipe entende o tipo de área e tráfego"],
            ["03", "Estimamos massa, logística e preparação"],
            ["04", "A aplicação é executada com equipe e equipamentos"],
          ].map(([number, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing">
        <div className="pricingCopy">
          <span>Orçamento responsável</span>
          <h2>O preço depende da área, da base e da logística</h2>
          <p>
            Para passar uma estimativa séria, é preciso entender metragem, espessura, tráfego,
            distância, acesso e condição atual da base.
          </p>
        </div>

        <div className="factorGrid">
          {priceFactors.map((factor) => (
            <div key={factor}>{factor}</div>
          ))}
        </div>
      </section>

      <section className="comparison">
        <div className="sectionHeader">
          <span>Comparativo</span>
          <h2>Cascalho resolve hoje. CBUQ resolve a operação.</h2>
        </div>

        <div className="compareGrid">
          <article className="compareBad">
            <h3>Solução provisória</h3>
            <p>Buracos recorrentes</p>
            <p>Poeira e lama</p>
            <p>Manutenção frequente</p>
            <p>Aparência improvisada</p>
          </article>

          <article className="compareGood">
            <h3>CBUQ aplicado</h3>
            <p>Superfície mais uniforme</p>
            <p>Área mais limpa</p>
            <p>Melhor trafegabilidade</p>
            <p>Imagem mais profissional</p>
          </article>
        </div>
      </section>

      <section className="proof">
        <div className="proofMosaic">
          <div className="mosaicLarge" />
          <div className="mosaicSmall one" />
          <div className="mosaicSmall two" />
        </div>

        <div className="proofCopy">
          <span>Estrutura de campo</span>
          <h2>Obra de pavimentação precisa de execução, não só promessa</h2>

          <p>
            A aplicação de CBUQ exige coordenação de massa, transporte, temperatura, equipe,
            equipamento e compactação. Por isso, a avaliação inicial da área é essencial.
          </p>

          <div className="proofStats">
            <div>
              <strong>Rio Verde e região</strong>
              <span>Atendimento conforme logística</span>
            </div>
            <div>
              <strong>Equipe de campo</strong>
              <span>Aplicação com operação técnica</span>
            </div>
            <div>
              <strong>Maquinário</strong>
              <span>Espalhamento e compactação</span>
            </div>
          </div>
        </div>
      </section>

      <section id="formulario" className="formSection">
        <div className="formCopy">
          <span>Avaliação inicial</span>
          <h2>Quer avaliar sua área?</h2>
          <p>
            Envie as informações básicas. Fotos e vídeos ajudam a entender a condição da base,
            acesso, tamanho da área e tipo de uso.
          </p>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              value={form.nome}
              onChange={(event) => updateField("nome", event.target.value)}
              placeholder="Seu nome"
              required
            />
          </label>

          <label>
            WhatsApp
            <input
              value={form.telefone}
              onChange={(event) => updateField("telefone", event.target.value)}
              placeholder="(64) 99999-9999"
              inputMode="tel"
              required
            />
          </label>

          <label>
            Cidade/UF
            <input
              value={form.cidade}
              onChange={(event) => updateField("cidade", event.target.value)}
              placeholder="Ex.: Rio Verde/GO"
              required
            />
          </label>

          <label>
            Tipo de área
            <select
              value={form.tipoArea}
              onChange={(event) => updateField("tipoArea", event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {areaTypes.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>

          <label>
            Metragem aproximada
            <input
              value={form.metragem}
              onChange={(event) => updateField("metragem", event.target.value)}
              placeholder="Ex.: 1.500 m²"
            />
          </label>

          <label className="full">
            Mensagem opcional
            <textarea
              value={form.mensagem}
              onChange={(event) => updateField("mensagem", event.target.value)}
              placeholder="Conte se é pátio, estacionamento, acesso, recapeamento, tráfego pesado etc."
              rows={4}
            />
          </label>

          <button type="submit">Receber avaliação da minha área</button>

          <small>Ao clicar, abriremos o WhatsApp com sua mensagem pronta para envio.</small>
        </form>
      </section>

      <section className="faq">
        <div className="sectionHeader">
          <span>Dúvidas comuns</span>
          <h2>Antes de pedir orçamento</h2>
        </div>

        <div className="faqList">
          {faq.map((item, index) => (
            <button
              key={item.q}
              className={`faqItem ${openFaq === index ? "active" : ""}`}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              type="button"
            >
              <div>
                <strong>{item.q}</strong>
                <span>{openFaq === index ? "−" : "+"}</span>
              </div>

              {openFaq === index && <p>{item.a}</p>}
            </button>
          ))}
        </div>
      </section>

      <section className="finalCta">
        <h2>Transforme uma área ruim em pavimento pronto para operação</h2>
        <p>Envie cidade, metragem e fotos da área. A equipe avalia o melhor caminho para aplicação de CBUQ.</p>

        <a href={whatsappHref} target="_blank" rel="noreferrer">
          Pedir avaliação pelo WhatsApp
        </a>
      </section>

      <a className="mobileSticky" href={whatsappHref} target="_blank" rel="noreferrer">
        Avaliar pelo WhatsApp
      </a>

      <style>{`
        :root {
          --bg: #f4f1ea;
          --paper: #fffaf0;
          --text: #151515;
          --muted: #6f6a60;
          --dark: #181814;
          --dark-2: #24231e;
          --line: rgba(21, 21, 21, 0.12);
          --yellow: #f2b51d;
          --orange: #d96b1b;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .lp3 {
          background: var(--bg);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          background:
            linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.42), rgba(0,0,0,.12)),
            url("/lp3/hero-cbuq.jpg") center / cover no-repeat;
          color: white;
          padding: 28px clamp(20px, 5vw, 72px) 72px;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(242,181,29,.2), transparent 34%),
            linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.68));
          pointer-events: none;
        }

        .topbar,
        .heroGrid {
          position: relative;
          z-index: 1;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brandMark {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.12);
          border-radius: 14px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .brand strong,
        .brand span {
          display: block;
        }

        .brand span {
          color: rgba(255,255,255,.66);
          font-size: 13px;
          margin-top: 2px;
        }

        .topCta {
          color: #171717;
          background: var(--yellow);
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 800;
          box-shadow: 0 14px 28px rgba(0,0,0,.2);
        }

        .heroGrid {
          max-width: 1200px;
          margin: 130px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) 380px;
          gap: 56px;
          align-items: end;
        }

        .eyebrow {
          display: inline-flex;
          color: #171717;
          background: var(--yellow);
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .04em;
          margin-bottom: 26px;
        }

        .hero h1 {
          max-width: 880px;
          margin: 0;
          font-size: clamp(42px, 7vw, 88px);
          line-height: .93;
          letter-spacing: -0.075em;
        }

        .heroCopy > p {
          max-width: 700px;
          color: rgba(255,255,255,.82);
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.45;
          margin: 26px 0 0;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 34px;
        }

        .primaryButton,
        .secondaryButton,
        .finalCta a,
        .leadForm button {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 999px;
          font-weight: 900;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .primaryButton,
        .finalCta a,
        .leadForm button {
          color: #151515;
          background: var(--yellow);
          padding: 0 24px;
          border: none;
          box-shadow: 0 18px 38px rgba(0,0,0,.24);
        }

        .secondaryButton {
          color: white;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.1);
          padding: 0 22px;
        }

        .primaryButton:hover,
        .secondaryButton:hover,
        .finalCta a:hover,
        .leadForm button:hover {
          transform: translateY(-2px);
        }

        .microcopy {
          font-size: 14px !important;
          color: rgba(255,255,255,.62) !important;
          margin-top: 14px !important;
        }

        .heroPanel {
          min-height: 260px;
          display: flex;
          align-items: end;
          border: 1px solid rgba(255,255,255,.24);
          border-radius: 30px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.06)),
            rgba(0,0,0,.22);
          backdrop-filter: blur(10px);
          padding: 28px;
        }

        .heroPanel span,
        .heroPanel strong {
          display: block;
        }

        .heroPanel span {
          color: rgba(255,255,255,.62);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .08em;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .heroPanel strong {
          font-size: 30px;
          line-height: 1.05;
          letter-spacing: -.04em;
        }

        section {
          padding: 88px clamp(20px, 5vw, 72px);
        }

        .sectionHeader {
          max-width: 850px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .sectionHeader.left {
          margin-left: 0;
          text-align: left;
        }

        .sectionHeader span,
        .painCopy span,
        .pricingCopy span,
        .proofCopy span,
        .formCopy span {
          color: var(--orange);
          font-size: 13px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .11em;
        }

        .sectionHeader h2,
        .painCopy h2,
        .pricingCopy h2,
        .proofCopy h2,
        .formCopy h2,
        .finalCta h2 {
          margin: 10px 0 0;
          font-size: clamp(32px, 4.6vw, 62px);
          line-height: .98;
          letter-spacing: -.06em;
        }

        .sectionHeader p,
        .painCopy p,
        .pricingCopy p,
        .proofCopy p,
        .formCopy p,
        .finalCta p {
          color: var(--muted);
          font-size: 18px;
          line-height: 1.6;
          margin-top: 18px;
        }

        .impact {
          background: var(--dark);
          color: white;
        }

        .impact .sectionHeader h2 {
          color: white;
        }

        .impactGrid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .impactGrid article {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: end;
          border-radius: 30px;
          padding: 26px;
          background:
            linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.8)),
            url("/lp3/textura-asfalto.jpg") center / cover no-repeat;
          border: 1px solid rgba(255,255,255,.12);
        }

        .impactGrid strong {
          font-size: 26px;
          letter-spacing: -.04em;
        }

        .impactGrid p {
          color: rgba(255,255,255,.72);
          line-height: 1.5;
          margin-bottom: 0;
        }

        .applications,
        .process,
        .faq {
          background: var(--bg);
        }

        .applicationGrid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .applicationCard {
          position: relative;
          overflow: hidden;
          min-height: 230px;
          padding: 26px;
          border-radius: 28px;
          background: var(--paper);
          border: 1px solid var(--line);
        }

        .applicationCard h3 {
          margin: 50px 0 10px;
          font-size: 25px;
          letter-spacing: -.04em;
        }

        .applicationCard p {
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        .cardLine {
          position: absolute;
          top: 24px;
          left: 26px;
          width: 70px;
          height: 8px;
          background: var(--yellow);
          border-radius: 99px;
        }

        .pain {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 44px;
          align-items: center;
          background: var(--paper);
        }

        .painImage {
          min-height: 620px;
          border-radius: 34px;
          background:
            linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.18)),
            url("/lp3/patio-logistico.jpg") center / cover no-repeat;
          box-shadow: 0 30px 80px rgba(0,0,0,.12);
        }

        .painList {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 28px;
        }

        .painList span {
          color: var(--text);
          background: var(--bg);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 14px;
          font-size: 14px;
          font-weight: 800;
          text-transform: none;
          letter-spacing: 0;
        }

        .solution {
          background: var(--dark);
          color: white;
        }

        .solution .sectionHeader h2,
        .solution .sectionHeader p {
          color: white;
        }

        .solution .sectionHeader p {
          color: rgba(255,255,255,.68);
        }

        .solutionGrid {
          max-width: 1200px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin: 32px auto 0;
        }

        .solutionItem {
          display: flex;
          gap: 12px;
          align-items: center;
          min-height: 86px;
          padding: 20px;
          border-radius: 22px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.86);
          font-weight: 800;
        }

        .solutionItem span {
          width: 10px;
          height: 10px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--yellow);
        }

        .timeline {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .timeline article {
          min-height: 220px;
          padding: 24px;
          border-radius: 28px;
          background: var(--paper);
          border: 1px solid var(--line);
        }

        .timeline strong {
          color: var(--orange);
          font-size: 40px;
          letter-spacing: -.07em;
        }

        .timeline p {
          margin-top: 42px;
          font-size: 18px;
          font-weight: 850;
          line-height: 1.35;
        }

        .pricing {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 40px;
          align-items: start;
          background: var(--paper);
        }

        .factorGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .factorGrid div {
          min-height: 96px;
          display: flex;
          align-items: end;
          padding: 18px;
          border-radius: 20px;
          background: var(--bg);
          border: 1px solid var(--line);
          font-weight: 900;
        }

        .comparison {
          background: var(--bg);
        }

        .compareGrid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .compareGrid article {
          border-radius: 32px;
          padding: 30px;
        }

        .compareBad {
          background: #eee6d9;
          border: 1px solid var(--line);
        }

        .compareGood {
          background: var(--dark);
          color: white;
        }

        .compareGrid h3 {
          font-size: 30px;
          letter-spacing: -.05em;
          margin: 0 0 24px;
        }

        .compareGrid p {
          display: flex;
          align-items: center;
          min-height: 48px;
          border-top: 1px solid rgba(128,128,128,.25);
          margin: 0;
          font-weight: 800;
        }

        .proof {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 44px;
          align-items: center;
          background: var(--dark);
          color: white;
        }

        .proofMosaic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .mosaicLarge,
        .mosaicSmall {
          border-radius: 28px;
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255,255,255,.12);
        }

        .mosaicLarge {
          min-height: 520px;
          grid-row: span 2;
          background-image: url("/lp3/hero-cbuq.jpg");
        }

        .mosaicSmall {
          min-height: 253px;
        }

        .mosaicSmall.one {
          background-image: url("/lp3/patio-logistico.jpg");
        }

        .mosaicSmall.two {
          background-image: url("/lp3/textura-asfalto.jpg");
        }

        .proofCopy h2,
        .proofCopy p {
          color: white;
        }

        .proofCopy p {
          color: rgba(255,255,255,.68);
        }

        .proofStats {
          display: grid;
          gap: 12px;
          margin-top: 28px;
        }

        .proofStats div {
          padding: 18px;
          border-radius: 18px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
        }

        .proofStats strong,
        .proofStats span {
          display: block;
        }

        .proofStats span {
          margin-top: 4px;
          color: rgba(255,255,255,.58);
        }

        .formSection {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 42px;
          align-items: start;
          background: var(--paper);
        }

        .leadForm {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 24px;
          border-radius: 32px;
          background: white;
          border: 1px solid var(--line);
          box-shadow: 0 30px 80px rgba(0,0,0,.08);
        }

        .leadForm label {
          display: grid;
          gap: 8px;
          color: var(--text);
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .leadForm label.full,
        .leadForm button,
        .leadForm small {
          grid-column: 1 / -1;
        }

        .leadForm input,
        .leadForm select,
        .leadForm textarea {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: #fbfaf7;
          padding: 15px 14px;
          color: var(--text);
          font: inherit;
          outline: none;
        }

        .leadForm input:focus,
        .leadForm select:focus,
        .leadForm textarea:focus {
          border-color: var(--orange);
          box-shadow: 0 0 0 4px rgba(217,107,27,.12);
        }

        .leadForm button {
          width: 100%;
          font-size: 16px;
        }

        .leadForm small {
          color: var(--muted);
          text-align: center;
        }

        .faqList {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 10px;
        }

        .faqItem {
          width: 100%;
          text-align: left;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: var(--paper);
          padding: 0;
          cursor: pointer;
          overflow: hidden;
        }

        .faqItem > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          padding: 20px;
        }

        .faqItem strong {
          font-size: 17px;
        }

        .faqItem span {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: var(--yellow);
          font-weight: 950;
        }

        .faqItem p {
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
          padding: 0 20px 20px;
        }

        .finalCta {
          text-align: center;
          background:
            linear-gradient(180deg, rgba(0,0,0,.65), rgba(0,0,0,.78)),
            url("/lp3/hero-cbuq.jpg") center / cover no-repeat;
          color: white;
        }

        .finalCta h2 {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .finalCta p {
          max-width: 720px;
          color: rgba(255,255,255,.74);
          margin-left: auto;
          margin-right: auto;
        }

        .finalCta a {
          margin-top: 18px;
        }

        .mobileSticky {
          display: none;
        }

        @media (max-width: 980px) {
          .hero {
            min-height: auto;
            padding-bottom: 90px;
          }

          .topCta {
            display: none;
          }

          .heroGrid,
          .pain,
          .pricing,
          .proof,
          .formSection {
            grid-template-columns: 1fr;
          }

          .heroGrid {
            margin-top: 84px;
          }

          .heroPanel {
            min-height: 180px;
          }

          .impactGrid,
          .applicationGrid,
          .solutionGrid,
          .timeline,
          .compareGrid {
            grid-template-columns: 1fr;
          }

          .painImage {
            min-height: 360px;
          }

          .proofMosaic {
            grid-template-columns: 1fr;
          }

          .mosaicLarge,
          .mosaicSmall {
            min-height: 280px;
          }

          .leadForm {
            grid-template-columns: 1fr;
          }

          .mobileSticky {
            position: fixed;
            left: 14px;
            right: 14px;
            bottom: 14px;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 54px;
            border-radius: 999px;
            background: var(--yellow);
            color: #151515;
            text-decoration: none;
            font-weight: 950;
            box-shadow: 0 16px 42px rgba(0,0,0,.28);
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding-left: 18px;
            padding-right: 18px;
          }

          .brand span {
            display: none;
          }

          .hero h1 {
            font-size: 44px;
          }

          .heroCopy > p {
            font-size: 17px;
          }

          .heroActions {
            display: grid;
          }

          .primaryButton,
          .secondaryButton {
            width: 100%;
          }

          section {
            padding: 64px 18px;
          }

          .painList,
          .factorGrid {
            grid-template-columns: 1fr;
          }

          .sectionHeader {
            text-align: left;
          }

          .sectionHeader h2,
          .painCopy h2,
          .pricingCopy h2,
          .proofCopy h2,
          .formCopy h2,
          .finalCta h2 {
            font-size: 36px;
          }
        }
      `}</style>
    </main>
  );
}
