// app/lp3/page.tsx
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

const WHATSAPP_NUMBER = "5564993273958";

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
    text: "Reduza poeira, lama e manutenção provisória em áreas de operação diária.",
  },
  {
    title: "Estacionamentos",
    text: "Melhore circulação, aparência e experiência de clientes, equipes e fornecedores.",
  },
  {
    title: "Acessos e entradas",
    text: "Transforme entradas irregulares em áreas mais seguras e trafegáveis.",
  },
  {
    title: "Vias internas",
    text: "Aplicação para circulação de veículos, caminhões e operação logística.",
  },
  {
    title: "Recapeamento",
    text: "Recuperação de pavimento desgastado com nova camada de CBUQ, conforme avaliação.",
  },
  {
    title: "Áreas rurais e industriais",
    text: "Acessos, balanças, pátios de carga, cerealistas, fazendas e áreas produtivas.",
  },
];

const priceFactors = [
  "Metragem da área",
  "Espessura da camada",
  "Tipo de tráfego",
  "Condição da base",
  "Distância e logística",
  "Acesso para caminhões",
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
        <div className="heroShade" />

        <header className="topbar">
          <a className="brand" href="/">
            <img src="/images/logo-white.png" alt="GP Asfalto" />
          </a>

          <a className="topCta" href={whatsappHref} target="_blank" rel="noreferrer">
            Pedir avaliação
          </a>
        </header>

        <div className="heroInner">
          <div className="heroCopy">
            <div className="eyebrow">CBUQ aplicado • pátios • acessos • estacionamentos</div>

            <h1>Aplicação de CBUQ para áreas que precisam operar melhor</h1>

            <p>
              Massa asfáltica, equipe e equipamentos no mesmo atendimento para transformar áreas
              com poeira, lama e buracos em pavimento pronto para uso.
            </p>

            <div className="heroActions">
              <a className="primaryButton" href={whatsappHref} target="_blank" rel="noreferrer">
                Pedir avaliação pelo WhatsApp
              </a>

              <a className="ghostButton" href="#formulario">
                Enviar dados da área
              </a>
            </div>

            <p className="microcopy">
              Envie cidade, metragem aproximada e fotos ou vídeos da área.
            </p>
          </div>

          <div className="heroCard">
            <span>Venda com aplicação</span>
            <strong>CBUQ + equipe + compactação</strong>
            <p>Uma solução completa para quem precisa tirar a área do improviso.</p>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="introText">
          <span className="kicker">O ponto central</span>
          <h2>Não é só asfalto. É área pronta para operação.</h2>
        </div>

        <div className="introGrid">
          <article>
            <strong>Menos poeira e lama</strong>
            <p>Mais controle para áreas que sofrem no período seco e chuvoso.</p>
          </article>

          <article>
            <strong>Menos manutenção provisória</strong>
            <p>Reduz a dependência de cascalho, patrola e correções recorrentes.</p>
          </article>

          <article>
            <strong>Melhor circulação</strong>
            <p>Mais condição de tráfego para veículos, caminhões e operação diária.</p>
          </article>
        </div>
      </section>

      <section className="areas">
        <div className="sectionTitle">
          <span className="kicker">Onde aplicar</span>
          <h2>Aplicação de CBUQ para áreas que precisam trabalhar melhor</h2>
        </div>

        <div className="areasGrid">
          {applications.map((item) => (
            <article key={item.title}>
              <span />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split pain">
        <div className="splitImage" />

        <div className="splitCopy">
          <span className="kicker">Custo escondido</span>
          <h2>O chão ruim custa mais do que parece</h2>

          <p>
            Buracos, poeira, lama e correções provisórias atrapalham a operação, desgastam veículos
            e passam uma imagem ruim para clientes, fornecedores e motoristas.
          </p>

          <div className="tagList">
            <span>Buracos recorrentes</span>
            <span>Poeira em período seco</span>
            <span>Lama em período de chuva</span>
            <span>Caminhões com dificuldade</span>
            <span>Aparência improvisada</span>
            <span>Manutenção frequente</span>
          </div>
        </div>
      </section>

      <section className="solution">
        <div className="sectionTitle left">
          <span className="kicker">Solução GP Asfalto</span>
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
            <div key={item}>
              <span />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="sectionTitle">
          <span className="kicker">Como funciona</span>
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
        <div>
          <span className="kicker">Orçamento responsável</span>
          <h2>O preço depende da área, da base e da logística</h2>
          <p>
            Para passar uma estimativa séria, é preciso entender metragem, espessura, tráfego,
            distância, acesso e condição atual da base.
          </p>
        </div>

        <div className="factorGrid">
          {priceFactors.map((factor) => (
            <article key={factor}>{factor}</article>
          ))}
        </div>
      </section>

      <section className="comparison">
        <div className="sectionTitle">
          <span className="kicker">Comparativo</span>
          <h2>Cascalho resolve hoje. CBUQ resolve a operação.</h2>
        </div>

        <div className="compareGrid">
          <article>
            <h3>Solução provisória</h3>
            <p>Buracos recorrentes</p>
            <p>Poeira e lama</p>
            <p>Manutenção frequente</p>
            <p>Aparência improvisada</p>
          </article>

          <article className="featured">
            <h3>CBUQ aplicado</h3>
            <p>Superfície mais uniforme</p>
            <p>Área mais limpa</p>
            <p>Melhor trafegabilidade</p>
            <p>Imagem mais profissional</p>
          </article>
        </div>
      </section>

      <section className="proof">
        <div className="mosaic">
          <div className="photo photoA" />
          <div className="photo photoB" />
          <div className="photo photoC" />
        </div>

        <div className="proofText">
          <span className="kicker">Estrutura de campo</span>
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
          <span className="kicker">Avaliação inicial</span>
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
        <div className="sectionTitle">
          <span className="kicker">Dúvidas comuns</span>
          <h2>Antes de pedir orçamento</h2>
        </div>

        <div className="faqList">
          {faq.map((item, index) => (
            <button
              key={item.q}
              className={openFaq === index ? "active" : ""}
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
        <img src="/images/logo-white.png" alt="GP Asfalto" />
        <h2>Transforme uma área ruim em pavimento pronto para operação</h2>
        <p>
          Envie cidade, metragem e fotos da área. A equipe avalia o melhor caminho para aplicação de CBUQ.
        </p>

        <a href={whatsappHref} target="_blank" rel="noreferrer">
          Pedir avaliação pelo WhatsApp
        </a>
      </section>

      <a className="mobileSticky" href={whatsappHref} target="_blank" rel="noreferrer">
        Avaliar pelo WhatsApp
      </a>

      <style>{`
        :root {
          --bg: #f5f7f6;
          --paper: #ffffff;
          --text: #151719;
          --muted: #667085;
          --blue: #171b3f;
          --blue2: #0f1432;
          --green: #137a0b;
          --green2: #083d05;
          --silver: #aeb3b8;
          --line: rgba(23, 27, 63, 0.12);
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
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          color: white;
          background:
            linear-gradient(90deg, rgba(15, 20, 50, 0.92) 0%, rgba(15, 20, 50, 0.76) 34%, rgba(15, 20, 50, 0.36) 72%),
            url("/images/lp3/hero-cbuq.jpg") center / cover no-repeat;
          padding: 26px clamp(20px, 5vw, 72px) 70px;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 18% 18%, rgba(19, 122, 11, 0.28), transparent 32%),
            linear-gradient(180deg, rgba(15, 20, 50, 0.18), rgba(15, 20, 50, 0.82));
        }

        .topbar,
        .heroInner {
          position: relative;
          z-index: 1;
        }

        .topbar {
          max-width: 1220px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .brand img {
          width: 178px;
          height: auto;
          display: block;
        }

        .topCta {
          color: white;
          background: var(--green);
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 850;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.24);
        }

        .heroInner {
          max-width: 1220px;
          margin: 128px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 44px;
          align-items: end;
        }

        .heroCopy {
          max-width: 840px;
        }

        .eyebrow,
        .kicker {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          color: white;
          background: var(--green);
          border-radius: 999px;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .hero h1 {
          margin: 24px 0 0;
          font-size: clamp(46px, 7vw, 88px);
          line-height: 0.94;
          letter-spacing: -0.075em;
          max-width: 960px;
        }

        .heroCopy > p {
          max-width: 680px;
          color: rgba(255, 255, 255, 0.84);
          font-size: clamp(18px, 2vw, 23px);
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
        .ghostButton,
        .leadForm button,
        .finalCta a {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 900;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .primaryButton,
        .leadForm button,
        .finalCta a {
          color: white;
          background: var(--green);
          border: 0;
          padding: 0 24px;
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.24);
        }

        .ghostButton {
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.36);
          background: rgba(255, 255, 255, 0.08);
          padding: 0 22px;
        }

        .primaryButton:hover,
        .ghostButton:hover,
        .leadForm button:hover,
        .finalCta a:hover {
          transform: translateY(-2px);
        }

        .microcopy {
          color: rgba(255, 255, 255, 0.66) !important;
          font-size: 14px !important;
          margin-top: 14px !important;
        }

        .heroCard {
          padding: 24px;
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.24);
        }

        .heroCard span {
          display: block;
          color: rgba(255, 255, 255, 0.62);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .heroCard strong {
          display: block;
          font-size: 30px;
          line-height: 1.05;
          letter-spacing: -0.045em;
        }

        .heroCard p {
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.5;
          margin: 16px 0 0;
        }

        section {
          padding: 86px clamp(20px, 5vw, 72px);
        }

        .sectionTitle {
          max-width: 820px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .sectionTitle.left {
          margin-left: 0;
          text-align: left;
        }

        .sectionTitle h2,
        .introText h2,
        .splitCopy h2,
        .pricing h2,
        .proofText h2,
        .formCopy h2,
        .finalCta h2 {
          margin: 13px 0 0;
          color: var(--blue);
          font-size: clamp(32px, 4.8vw, 62px);
          line-height: 0.98;
          letter-spacing: -0.06em;
        }

        .sectionTitle p,
        .splitCopy p,
        .pricing p,
        .proofText p,
        .formCopy p,
        .finalCta p {
          color: var(--muted);
          font-size: 18px;
          line-height: 1.62;
          margin-top: 18px;
        }

        .intro {
          background: var(--paper);
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 38px;
          align-items: start;
        }

        .introGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .introGrid article {
          min-height: 210px;
          padding: 22px;
          border-radius: 22px;
          background: #f7f9f8;
          border: 1px solid var(--line);
        }

        .introGrid strong {
          display: block;
          color: var(--blue);
          font-size: 22px;
          line-height: 1.12;
          letter-spacing: -0.035em;
        }

        .introGrid p {
          color: var(--muted);
          line-height: 1.55;
          margin: 18px 0 0;
        }

        .areas {
          background: var(--bg);
        }

        .areasGrid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .areasGrid article {
          min-height: 215px;
          padding: 24px;
          border-radius: 22px;
          background: var(--paper);
          border: 1px solid var(--line);
          box-shadow: 0 14px 36px rgba(15, 20, 50, 0.05);
        }

        .areasGrid article > span {
          display: block;
          width: 46px;
          height: 5px;
          border-radius: 99px;
          background: var(--green);
          margin-bottom: 42px;
        }

        .areasGrid h3 {
          color: var(--blue);
          font-size: 24px;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin: 0 0 10px;
        }

        .areasGrid p {
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 46px;
          align-items: center;
          background: var(--paper);
        }

        .splitImage {
          min-height: 620px;
          border-radius: 30px;
          background:
            linear-gradient(180deg, rgba(15, 20, 50, 0.02), rgba(15, 20, 50, 0.18)),
            url("/images/lp3/patio-logistico.jpg") center / cover no-repeat;
          box-shadow: 0 30px 80px rgba(15, 20, 50, 0.12);
        }

        .tagList {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 28px;
        }

        .tagList span {
          padding: 13px 14px;
          border-radius: 14px;
          background: #f5f7f6;
          border: 1px solid var(--line);
          color: var(--blue);
          font-size: 14px;
          font-weight: 800;
        }

        .solution {
          background:
            linear-gradient(180deg, rgba(15, 20, 50, 0.9), rgba(15, 20, 50, 0.96)),
            url("/images/lp3/textura-asfalto.jpg") center / cover no-repeat;
          color: white;
        }

        .solution .sectionTitle h2,
        .solution .sectionTitle p {
          color: white;
        }

        .solution .sectionTitle p {
          color: rgba(255, 255, 255, 0.7);
        }

        .solutionGrid {
          max-width: 1180px;
          margin: 34px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .solutionGrid div {
          min-height: 84px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.13);
          color: rgba(255, 255, 255, 0.86);
          font-weight: 800;
        }

        .solutionGrid span {
          width: 9px;
          height: 9px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--green);
        }

        .process {
          background: var(--bg);
        }

        .timeline {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .timeline article {
          min-height: 200px;
          padding: 22px;
          border-radius: 22px;
          background: var(--paper);
          border: 1px solid var(--line);
          box-shadow: 0 14px 36px rgba(15, 20, 50, 0.05);
        }

        .timeline strong {
          color: var(--green);
          font-size: 38px;
          letter-spacing: -0.07em;
        }

        .timeline p {
          color: var(--blue);
          font-size: 17px;
          line-height: 1.35;
          font-weight: 850;
          margin: 40px 0 0;
        }

        .pricing {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 42px;
          align-items: start;
          background: var(--paper);
        }

        .factorGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .factorGrid article {
          min-height: 90px;
          display: flex;
          align-items: end;
          padding: 16px;
          border-radius: 18px;
          background: #f5f7f6;
          border: 1px solid var(--line);
          color: var(--blue);
          font-weight: 850;
        }

        .comparison {
          background: var(--bg);
        }

        .compareGrid {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .compareGrid article {
          padding: 28px;
          border-radius: 26px;
          background: var(--paper);
          border: 1px solid var(--line);
        }

        .compareGrid article.featured {
          color: white;
          background: var(--blue);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .compareGrid h3 {
          margin: 0 0 22px;
          font-size: 28px;
          letter-spacing: -0.05em;
        }

        .compareGrid p {
          min-height: 46px;
          display: flex;
          align-items: center;
          margin: 0;
          border-top: 1px solid rgba(128, 128, 128, 0.24);
          font-weight: 800;
        }

        .proof {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 46px;
          align-items: center;
          background: var(--paper);
        }

        .mosaic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .photo {
          border-radius: 24px;
          background-size: cover;
          background-position: center;
          border: 1px solid var(--line);
          box-shadow: 0 20px 50px rgba(15, 20, 50, 0.1);
        }

        .photoA {
          min-height: 520px;
          grid-row: span 2;
          background-image: url("/images/lp3/hero-cbuq.jpg");
        }

        .photoB {
          min-height: 254px;
          background-image: url("/images/lp3/patio-logistico.jpg");
        }

        .photoC {
          min-height: 254px;
          background-image: url("/images/lp3/textura-asfalto.jpg");
        }

        .proofStats {
          display: grid;
          gap: 10px;
          margin-top: 28px;
        }

        .proofStats div {
          padding: 17px;
          border-radius: 16px;
          background: #f5f7f6;
          border: 1px solid var(--line);
        }

        .proofStats strong,
        .proofStats span {
          display: block;
        }

        .proofStats strong {
          color: var(--blue);
        }

        .proofStats span {
          color: var(--muted);
          margin-top: 4px;
        }

        .formSection {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 44px;
          align-items: start;
          background: var(--blue);
          color: white;
        }

        .formCopy h2,
        .formCopy p {
          color: white;
        }

        .formCopy p {
          color: rgba(255, 255, 255, 0.72);
        }

        .leadForm {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 24px;
          border-radius: 26px;
          background: white;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
        }

        .leadForm label {
          display: grid;
          gap: 8px;
          color: var(--blue);
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
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
          border-radius: 14px;
          background: #f8faf9;
          padding: 14px;
          color: var(--text);
          font: inherit;
          outline: none;
        }

        .leadForm input:focus,
        .leadForm select:focus,
        .leadForm textarea:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(19, 122, 11, 0.11);
        }

        .leadForm button {
          width: 100%;
          font-size: 16px;
        }

        .leadForm small {
          color: var(--muted);
          text-align: center;
        }

        .faq {
          background: var(--bg);
        }

        .faqList {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 10px;
        }

        .faqList button {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: var(--paper);
          text-align: left;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
        }

        .faqList button > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 19px;
        }

        .faqList strong {
          color: var(--blue);
          font-size: 17px;
        }

        .faqList button span {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 99px;
          background: var(--green);
          color: white;
          font-weight: 900;
        }

        .faqList p {
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
          padding: 0 19px 19px;
        }

        .finalCta {
          text-align: center;
          color: white;
          background:
            linear-gradient(180deg, rgba(15, 20, 50, 0.72), rgba(15, 20, 50, 0.88)),
            url("/images/lp3/hero-cbuq.jpg") center / cover no-repeat;
        }

        .finalCta img {
          width: 190px;
          height: auto;
          margin-bottom: 28px;
        }

        .finalCta h2 {
          color: white;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
        }

        .finalCta p {
          color: rgba(255, 255, 255, 0.76);
          max-width: 700px;
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
            padding-bottom: 96px;
          }

          .heroInner,
          .intro,
          .split,
          .pricing,
          .proof,
          .formSection {
            grid-template-columns: 1fr;
          }

          .heroInner {
            margin-top: 92px;
          }

          .heroCard {
            max-width: 420px;
          }

          .introGrid,
          .areasGrid,
          .solutionGrid,
          .timeline,
          .compareGrid {
            grid-template-columns: 1fr;
          }

          .splitImage {
            min-height: 360px;
          }

          .mosaic {
            grid-template-columns: 1fr;
          }

          .photoA,
          .photoB,
          .photoC {
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
            color: white;
            background: var(--green);
            text-decoration: none;
            font-weight: 950;
            box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding-left: 18px;
            padding-right: 18px;
            background-position: 63% center;
          }

          .brand img {
            width: 146px;
          }

          .topCta {
            display: none;
          }

          .hero h1 {
            font-size: 43px;
          }

          .heroCopy > p {
            font-size: 17px;
          }

          .heroActions {
            display: grid;
          }

          .primaryButton,
          .ghostButton {
            width: 100%;
          }

          section {
            padding: 62px 18px;
          }

          .sectionTitle {
            text-align: left;
          }

          .sectionTitle h2,
          .introText h2,
          .splitCopy h2,
          .pricing h2,
          .proofText h2,
          .formCopy h2,
          .finalCta h2 {
            font-size: 35px;
          }

          .tagList,
          .factorGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
