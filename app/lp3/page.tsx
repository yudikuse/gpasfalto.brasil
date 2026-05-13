// app/lp3/page.tsx
"use client";

import { FormEvent, useMemo, useState } from "react";

// ── Tipos ──────────────────────────────────────────────────────────────────
type FormState = {
  nome: string;
  telefone: string;
  cidade: string;
  tipoArea: string;
};

// ── Constantes ─────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "5564993273958";

const WHATSAPP_BASE_MSG = encodeURIComponent(
  "Olá, vim pela página de aplicação de CBUQ da GP Asfalto. Gostaria de uma avaliação da minha área."
);

const areaTypes = [
  "Pátio empresarial",
  "Estacionamento",
  "Acesso / entrada",
  "Via interna",
  "Recapeamento",
  "Área rural / fazenda",
  "Área industrial / logística",
  "Outro",
];

const clients = [
  "COMIGO",
  "LDC",
  "Raízen",
  "Nutrien",
  "Mosaic",
  "Mercado Livre",
  "Fetz",
  "Grupo Cereal",
];

const applications = [
  {
    title: "Pátios empresariais",
    text: "Pavimentação para áreas de operação diária. Reduz poeira, lama e custo com manutenção provisória.",
  },
  {
    title: "Estacionamentos",
    text: "Melhora a circulação e a experiência de quem chega — clientes, equipes e fornecedores.",
  },
  {
    title: "Acessos e entradas",
    text: "Transforma entradas irregulares em pavimento seguro e trafegável em qualquer época do ano.",
  },
  {
    title: "Vias internas",
    text: "Circulação de veículos leves, caminhões e operação logística sem improviso.",
  },
  {
    title: "Recapeamento",
    text: "Recuperação de pavimento desgastado com nova camada de CBUQ, conforme avaliação da base.",
  },
  {
    title: "Áreas rurais e industriais",
    text: "Acessos, balanças, pátios de carga, cerealistas, fazendas e áreas produtivas do agronegócio.",
  },
];

const faq = [
  {
    q: "Vocês vendem só a massa ou também aplicam?",
    a: "O foco desta página é fornecimento com aplicação completa: massa, equipe e equipamentos no mesmo atendimento. Para demandas específicas de venda de massa sem aplicação, avaliamos separadamente.",
  },
  {
    q: "Qual a metragem mínima atendida?",
    a: "Não há um mínimo fixo. Para obras em Rio Verde e cidades próximas, conseguimos avaliar áreas a partir de 300–500 m². Para localidades mais distantes, precisamos de mais volume para viabilizar a logística. Manda a cidade e a metragem pelo WhatsApp.",
  },
  {
    q: "Preciso preparar a base antes?",
    a: "Não necessariamente. A equipe avalia a condição da base e orienta o que é necessário. Em muitos casos, a preparação faz parte do escopo — sem precisar contratar etapas separadas.",
  },
  {
    q: "Dá para fazer orçamento por foto?",
    a: "Sim. Fotos e vídeos pelo WhatsApp já resolvem a avaliação inicial. Para proposta final com metragem e espessura, pode ser necessária uma visita, mas o primeiro contato já esclarece a maior parte das dúvidas.",
  },
  {
    q: "Atendem minha cidade?",
    a: "A GP Asfalto atende Rio Verde e cidades da região do Cerrado goiano. Manda a cidade no WhatsApp — confirmamos a viabilidade rapidamente.",
  },
  {
    q: "Quanto tempo leva a aplicação?",
    a: "Depende da metragem e do escopo. Obras de pátios e estacionamentos costumam ser executadas em poucos dias após a preparação da base. A equipe estima o prazo na avaliação inicial.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function maskPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function buildWhatsAppMessage(data: FormState) {
  return [
    "Olá, vim pela página de aplicação de CBUQ da GP Asfalto.",
    "",
    `Nome: ${data.nome || "-"}`,
    `WhatsApp: ${data.telefone || "-"}`,
    `Cidade/UF: ${data.cidade || "-"}`,
    `Tipo de área: ${data.tipoArea || "-"}`,
    "",
    "Gostaria de uma avaliação da minha área.",
  ].join("\n");
}

// ── Componente ─────────────────────────────────────────────────────────────
export default function LP3Page() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    telefone: "",
    cidade: "",
    tipoArea: "",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whatsappHref = useMemo(() => {
    const msg = encodeURIComponent(buildWhatsAppMessage(form));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }, [form]);

  const whatsappBase = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_BASE_MSG}`;

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: field === "telefone" ? maskPhone(value) : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onlyDigits(form.telefone).length < 10) {
      alert("Informe um WhatsApp válido para contato.");
      return;
    }
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="lp3">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="heroShade" />

        <header className="topbar">
          {/* Logo sem link — não vazar tráfego pago de volta ao site */}
          <span className="brand">
            <img src="/images/logo-white.png" alt="GP Asfalto" />
          </span>
          <a className="topCta" href={whatsappBase} target="_blank" rel="noreferrer">
            Falar com a equipe
          </a>
        </header>

        <div className="heroInner">
          <div className="heroCopy">
            <div className="eyebrow">CBUQ • Pátios • Cerrado</div>

            <h1>Seu pátio sem poeira, lama ou buraco.</h1>

            <p>
              Fornecemos o CBUQ, levamos a equipe e compactamos o pavimento.
              Um único atendimento para pátios, estacionamentos e acessos no Cerrado.
            </p>

            <div className="heroActions">
              <a className="primaryButton" href={whatsappBase} target="_blank" rel="noreferrer">
                Pedir avaliação pelo WhatsApp
              </a>
            </div>

            <p className="microcopy">Sem compromisso. Manda cidade, metragem e fotos.</p>
          </div>

          <div className="heroCard">
            <span>Por que a GP Asfalto</span>
            <strong>3 usinas próprias no Cerrado</strong>
            <div className="heroCardStats">
              <div>
                <b>40+</b>
                <small>anos de operação</small>
              </div>
              <div>
                <b>Massa + equipe</b>
                <small>no mesmo atendimento</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT STRIP ──────────────────────────────────────────────────── */}
      <section className="clientStrip">
        <p className="stripLabel">Atendemos as maiores operações do agronegócio do Cerrado</p>
        <div className="clientList">
          {clients.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </section>

      {/* ── INTRO / BENEFÍCIOS ────────────────────────────────────────────── */}
      <section className="intro">
        <div className="introText">
          <span className="kicker">O que muda</span>
          <h2>Não é só asfalto. É área pronta para operar.</h2>
        </div>
        <div className="introGrid">
          <article>
            <strong>Fim da poeira e da lama</strong>
            <p>Controle total em período seco e chuvoso. Área limpa o ano inteiro.</p>
          </article>
          <article>
            <strong>Zero manutenção provisória</strong>
            <p>Acaba a dependência de cascalho, patrola e correções que nunca terminam.</p>
          </article>
          <article>
            <strong>Operação sem interrupção</strong>
            <p>Caminhões, veículos e equipes circulam sem travar a produção.</p>
          </article>
        </div>
      </section>

      {/* ── PAIN ──────────────────────────────────────────────────────────── */}
      <section className="split pain">
        <div className="splitImage" />
        <div className="splitCopy">
          <span className="kicker">O custo escondido</span>
          <h2>Chão ruim custa mais do que parece</h2>
          <p>
            Buracos, poeira e lama atrapalham a operação, desgastam veículos,
            afastam fornecedores e passam uma imagem ruim para quem visita a empresa.
          </p>
          <div className="tagList">
            <span>Buracos recorrentes</span>
            <span>Poeira no período seco</span>
            <span>Lama no período de chuva</span>
            <span>Caminhões com dificuldade</span>
            <span>Aparência improvisada</span>
            <span>Manutenção frequente</span>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="solution">
        <div className="sectionTitle left">
          <span className="kicker">Solução GP Asfalto</span>
          <h2>Massa, equipe e equipamentos no mesmo atendimento</h2>
          <p>
            Nada de contratar etapas separadas. A GP Asfalto avalia a área, estima o
            volume, orienta a preparação da base e executa a aplicação.
          </p>
        </div>
        <div className="solutionGrid">
          {[
            "Fornecimento do CBUQ da usina própria",
            "Transporte até a obra",
            "Equipe de aplicação especializada",
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

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="process">
        <div className="sectionTitle">
          <span className="kicker">Como funciona</span>
          <h2>Do primeiro contato à aplicação</h2>
        </div>
        <div className="timeline">
          {[
            ["01", "Você envia cidade, fotos e metragem aproximada"],
            ["02", "A equipe avalia tipo de área, base e logística"],
            ["03", "Estimativa de viabilidade, volume e prazo"],
            ["04", "Aplicação executada com equipe e equipamentos"],
          ].map(([number, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── AREAS ─────────────────────────────────────────────────────────── */}
      <section className="areas">
        <div className="sectionTitle">
          <span className="kicker">Onde aplicar</span>
          <h2>CBUQ para quem precisa de pavimento de verdade</h2>
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

      {/* ── PROOF ─────────────────────────────────────────────────────────── */}
      <section className="proof">
        <div className="mosaic">
          <div className="photo photoA" />
          <div className="photo photoB" />
          <div className="photo photoC" />
        </div>
        <div className="proofText">
          <span className="kicker">40+ anos de campo</span>
          <h2>Execução que exige mais do que promessa</h2>
          <p>
            Aplicação de CBUQ coordena massa, transporte, temperatura, equipe e
            compactação ao mesmo tempo. Por isso a GP Asfalto entrega tudo junto —
            usina, logística e campo.
          </p>
          <div className="proofStats">
            <div>
              <strong>3 usinas próprias</strong>
              <span>Produção contínua de CBUQ no Cerrado</span>
            </div>
            <div>
              <strong>40+ anos de operação</strong>
              <span>Pavimentação e terraplenagem no Centro-Oeste</span>
            </div>
            <div>
              <strong>Rio Verde e região</strong>
              <span>Obras conforme agenda e logística operacional</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <section className="comparison">
        <div className="sectionTitle">
          <span className="kicker">Comparativo</span>
          <h2>Cascalho resolve hoje. CBUQ resolve a operação.</h2>
        </div>
        <div className="compareGrid">
          <article>
            <h3>Solução provisória</h3>
            <p><span className="no">✗</span> Buracos voltam com a chuva</p>
            <p><span className="no">✗</span> Poeira e lama constantes</p>
            <p><span className="no">✗</span> Manutenção recorrente</p>
            <p><span className="no">✗</span> Aparência improvisada</p>
            <p><span className="no">✗</span> Custo acumulado alto</p>
          </article>
          <article className="featured">
            <h3>CBUQ aplicado</h3>
            <p><span className="yes">✓</span> Superfície estável e durável</p>
            <p><span className="yes">✓</span> Área limpa o ano todo</p>
            <p><span className="yes">✓</span> Sem manutenção provisória</p>
            <p><span className="yes">✓</span> Imagem profissional</p>
            <p><span className="yes">✓</span> Investimento com retorno</p>
          </article>
        </div>
      </section>

      {/* ── QUOTE CTA (substituiu a seção de fatores de preço) ─────────────── */}
      <section className="quoteCta">
        <div className="quoteInner">
          <span className="kicker">Orçamento</span>
          <h2>5 minutos para uma estimativa real</h2>
          <p>
            Conta pra nós: cidade, tipo de área e metragem aproximada.
            A equipe analisa e retorna com uma avaliação de viabilidade — sem enrolação.
          </p>
          <a className="primaryButton" href={whatsappBase} target="_blank" rel="noreferrer">
            Pedir avaliação pelo WhatsApp
          </a>
        </div>
      </section>

      {/* ── FORM ──────────────────────────────────────────────────────────── */}
      <section id="formulario" className="formSection">
        <div className="formCopy">
          <span className="kicker">Avaliação inicial</span>
          <h2>Manda os dados da área</h2>
          <p>
            Preenche com cidade, tipo e metragem aproximada.
            A equipe avalia e retorna pelo WhatsApp com uma estimativa rápida.
          </p>
          <ul className="formBullets">
            <li>Sem compromisso</li>
            <li>Retorno direto pelo WhatsApp</li>
            <li>Avaliação gratuita</li>
          </ul>
        </div>

        {/* 4 campos apenas — menos fricção, mais conversão */}
        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              value={form.nome}
              onChange={(e) => updateField("nome", e.target.value)}
              placeholder="Seu nome"
              required
            />
          </label>

          <label>
            WhatsApp
            <input
              value={form.telefone}
              onChange={(e) => updateField("telefone", e.target.value)}
              placeholder="(64) 99999-9999"
              inputMode="tel"
              required
            />
          </label>

          <label>
            Cidade / UF
            <input
              value={form.cidade}
              onChange={(e) => updateField("cidade", e.target.value)}
              placeholder="Ex.: Rio Verde / GO"
              required
            />
          </label>

          <label>
            Tipo de área
            <select
              value={form.tipoArea}
              onChange={(e) => updateField("tipoArea", e.target.value)}
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

          <button type="submit" className="full">
            Quero avaliação da minha área →
          </button>

          <small className="full">
            Ao clicar, abriremos o WhatsApp com sua mensagem pronta para envio.
          </small>
        </form>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="faq">
        <div className="sectionTitle">
          <span className="kicker">Dúvidas comuns</span>
          <h2>Antes de pedir avaliação</h2>
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

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="finalCta">
        <img src="/images/logo-white.png" alt="GP Asfalto" />
        <h2>Transforme a área hoje. CBUQ da usina à compactação.</h2>
        <p>Manda cidade, metragem e fotos. A equipe avalia e retorna rápido.</p>
        <a href={whatsappBase} target="_blank" rel="noreferrer" className="primaryButton">
          Pedir avaliação pelo WhatsApp
        </a>
      </section>

      {/* ── MOBILE STICKY ─────────────────────────────────────────────────── */}
      <a className="mobileSticky" href={whatsappBase} target="_blank" rel="noreferrer">
        Avaliar minha área →
      </a>

      {/* ── STYLES ────────────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        /* ── Tokens ─────────────────────────────────────── */
        :root {
          --navy:   #0C1D38;
          --navy2:  #071228;
          --green:  #2C8836;
          --green2: #1e6326;
          --cream:  #F0EBE2;
          --bg:     #f4f6f5;
          --paper:  #ffffff;
          --text:   #151719;
          --muted:  #5a6472;
          --line:   rgba(12, 29, 56, 0.11);
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .lp3 {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          overflow-x: hidden;
        }

        /* ── HERO ───────────────────────────────────────── */
        .hero {
          position: relative;
          min-height: 100vh;
          color: white;
          background:
            linear-gradient(90deg,
              rgba(7,18,40,0.95) 0%,
              rgba(7,18,40,0.80) 38%,
              rgba(7,18,40,0.30) 72%),
            url("/images/lp3/hero-cbuq.jpg") center / cover no-repeat;
          padding: 26px clamp(20px, 5vw, 72px) 70px;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, transparent 55%, rgba(7,18,40,0.60));
        }

        .topbar,
        .heroInner { position: relative; z-index: 1; }

        .topbar {
          max-width: 1220px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand { display: inline-flex; align-items: center; cursor: default; }
        .brand img { width: 178px; height: auto; display: block; }

        .topCta {
          color: white;
          background: var(--green);
          text-decoration: none;
          padding: 12px 22px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          transition: background 0.2s;
          box-shadow: 0 10px 26px rgba(0,0,0,0.22);
        }
        .topCta:hover { background: var(--green2); }

        .heroInner {
          max-width: 1220px;
          margin: 110px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 44px;
          align-items: end;
        }

        .heroCopy { max-width: 820px; }

        .eyebrow,
        .kicker {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          color: white;
          background: var(--green);
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          white-space: nowrap;
        }

        .hero h1 {
          font-family: 'Barlow Condensed', sans-serif;
          margin: 22px 0 0;
          font-size: clamp(52px, 8vw, 100px);
          line-height: 0.91;
          letter-spacing: -0.02em;
          font-weight: 900;
          text-transform: uppercase;
          max-width: 920px;
        }

        .heroCopy > p {
          max-width: 600px;
          color: rgba(255,255,255,0.82);
          font-size: clamp(17px, 1.9vw, 21px);
          line-height: 1.52;
          margin: 26px 0 0;
        }

        .heroActions { margin-top: 34px; }

        /* ── CTAs ─────────────────────────────────────── */
        .primaryButton,
        .leadForm button,
        .finalCta a {
          min-height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 16px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          cursor: pointer;
          color: white;
          background: var(--green);
          border: 0;
          padding: 0 30px;
          box-shadow: 0 16px 36px rgba(0,0,0,0.22);
        }

        .primaryButton:hover,
        .leadForm button:hover,
        .finalCta a:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 46px rgba(0,0,0,0.28);
          background: var(--green2);
        }

        .microcopy {
          color: rgba(255,255,255,0.56) !important;
          font-size: 13px !important;
          margin-top: 14px !important;
        }

        /* ── HERO CARD ─────────────────────────────────── */
        .heroCard {
          padding: 26px;
          border-radius: 24px;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.20);
          backdrop-filter: blur(14px);
          box-shadow: 0 28px 64px rgba(0,0,0,0.22);
        }

        .heroCard > span {
          display: block;
          color: rgba(255,255,255,0.52);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .heroCard > strong {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 30px;
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .heroCardStats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          margin-top: 18px;
        }

        .heroCardStats > div {
          padding: 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .heroCardStats b {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 20px;
          font-weight: 900;
          color: white;
        }

        .heroCardStats small {
          display: block;
          font-size: 12px;
          color: rgba(255,255,255,0.58);
          margin-top: 3px;
          line-height: 1.3;
        }

        /* ── CLIENT STRIP ──────────────────────────────── */
        .clientStrip {
          background: var(--navy);
          padding: 28px clamp(20px, 5vw, 72px);
          text-align: center;
        }

        .stripLabel {
          color: rgba(255,255,255,0.46);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          margin: 0 0 16px;
        }

        .clientList {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px 14px;
        }

        .clientList span {
          color: rgba(255,255,255,0.72);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.12);
        }

        /* ── SECTION BASE ──────────────────────────────── */
        section { padding: 84px clamp(20px, 5vw, 72px); }
        .clientStrip { padding: 28px clamp(20px, 5vw, 72px); }

        .sectionTitle {
          max-width: 820px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .sectionTitle.left { margin-left: 0; text-align: left; }

        h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .sectionTitle h2,
        .introText h2,
        .splitCopy h2,
        .proofText h2,
        .formCopy h2,
        .finalCta h2,
        .quoteCta h2 {
          margin: 12px 0 0;
          color: var(--navy);
          font-size: clamp(34px, 5vw, 64px);
          line-height: 0.95;
        }

        .sectionTitle p,
        .splitCopy p,
        .proofText p,
        .formCopy p,
        .finalCta p,
        .quoteCta p {
          color: var(--muted);
          font-size: 18px;
          line-height: 1.62;
          margin-top: 18px;
        }

        /* ── INTRO ─────────────────────────────────────── */
        .intro {
          background: var(--paper);
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 40px;
          align-items: start;
        }

        .introGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .introGrid article {
          min-height: 200px;
          padding: 22px;
          border-radius: 20px;
          background: var(--bg);
          border: 1px solid var(--line);
        }

        .introGrid strong {
          display: block;
          color: var(--navy);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 24px;
          font-weight: 800;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .introGrid p {
          color: var(--muted);
          line-height: 1.55;
          margin: 14px 0 0;
          font-size: 15px;
        }

        /* ── SPLIT / PAIN ──────────────────────────────── */
        .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 46px;
          align-items: center;
          background: var(--bg);
        }

        .splitImage {
          min-height: 580px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(12,29,56,0.02), rgba(12,29,56,0.14)),
            url("/images/lp3/patio-logistico.jpg") center / cover no-repeat;
          box-shadow: 0 28px 72px rgba(12,29,56,0.11);
        }

        .tagList {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          margin-top: 26px;
        }

        .tagList span {
          padding: 12px 14px;
          border-radius: 12px;
          background: var(--paper);
          border: 1px solid var(--line);
          color: var(--navy);
          font-size: 13px;
          font-weight: 700;
        }

        /* ── SOLUTION ──────────────────────────────────── */
        .solution {
          background:
            linear-gradient(180deg, rgba(7,18,40,0.93), rgba(7,18,40,0.97)),
            url("/images/lp3/textura-asfalto.jpg") center / cover no-repeat;
          color: white;
        }

        .solution .sectionTitle h2 { color: white; }
        .solution .sectionTitle p  { color: rgba(255,255,255,0.66); }

        .solutionGrid {
          max-width: 1180px;
          margin: 32px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .solutionGrid div {
          min-height: 80px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px;
          border-radius: 16px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.11);
          color: rgba(255,255,255,0.86);
          font-weight: 700;
          font-size: 15px;
        }

        .solutionGrid span {
          width: 9px;
          height: 9px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: var(--green);
        }

        /* ── PROCESS ───────────────────────────────────── */
        .process { background: var(--paper); }

        .timeline {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .timeline article {
          min-height: 188px;
          padding: 22px;
          border-radius: 20px;
          background: var(--bg);
          border: 1px solid var(--line);
        }

        .timeline strong {
          color: var(--green);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 46px;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .timeline p {
          color: var(--navy);
          font-size: 16px;
          line-height: 1.35;
          font-weight: 700;
          margin: 34px 0 0;
        }

        /* ── AREAS ─────────────────────────────────────── */
        .areas { background: var(--bg); }

        .areasGrid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .areasGrid article {
          min-height: 210px;
          padding: 24px;
          border-radius: 20px;
          background: var(--paper);
          border: 1px solid var(--line);
          box-shadow: 0 10px 30px rgba(12,29,56,0.05);
        }

        .areasGrid article > span {
          display: block;
          width: 40px;
          height: 4px;
          border-radius: 99px;
          background: var(--green);
          margin-bottom: 36px;
        }

        .areasGrid h3 {
          font-family: 'Barlow Condensed', sans-serif;
          color: var(--navy);
          font-size: 26px;
          font-weight: 800;
          line-height: 1.05;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .areasGrid p {
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
          font-size: 15px;
        }

        /* ── PROOF ─────────────────────────────────────── */
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
          gap: 10px;
        }

        .photo {
          border-radius: 22px;
          background-size: cover;
          background-position: center;
          border: 1px solid var(--line);
          box-shadow: 0 16px 42px rgba(12,29,56,0.09);
        }

        .photoA {
          min-height: 500px;
          grid-row: span 2;
          background-image: url("/images/lp3/hero-cbuq.jpg");
        }

        .photoB {
          min-height: 244px;
          background-image: url("/images/lp3/patio-logistico.jpg");
        }

        .photoC {
          min-height: 244px;
          background-image: url("/images/lp3/textura-asfalto.jpg");
        }

        .proofStats {
          display: grid;
          gap: 9px;
          margin-top: 26px;
        }

        .proofStats div {
          padding: 16px 18px;
          border-radius: 14px;
          background: var(--bg);
          border: 1px solid var(--line);
        }

        .proofStats strong {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 900;
          color: var(--navy);
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .proofStats span {
          display: block;
          color: var(--muted);
          font-size: 14px;
          margin-top: 3px;
        }

        /* ── COMPARISON ────────────────────────────────── */
        .comparison { background: var(--bg); }

        .compareGrid {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .compareGrid article {
          padding: 28px;
          border-radius: 24px;
          background: var(--paper);
          border: 1px solid var(--line);
        }

        .compareGrid article.featured {
          color: white;
          background: var(--navy);
          border-color: transparent;
        }

        .compareGrid h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0 0 20px;
          color: inherit;
        }

        .compareGrid p {
          min-height: 44px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          border-top: 1px solid rgba(128,128,128,0.18);
          font-weight: 600;
          font-size: 15px;
          color: inherit;
        }

        .compareGrid .no  { color: #d95757; font-weight: 900; }
        .compareGrid .yes { color: var(--green); font-weight: 900; }
        .compareGrid article.featured .yes { color: #72d87e; }

        /* ── QUOTE CTA ─────────────────────────────────── */
        .quoteCta {
          background: var(--cream);
          text-align: center;
        }

        .quoteInner {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quoteCta h2   { color: var(--navy); }
        .quoteCta .primaryButton { margin-top: 28px; }

        /* ── FORM ──────────────────────────────────────── */
        .formSection {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 48px;
          align-items: start;
          background: var(--navy);
          color: white;
        }

        .formCopy h2 { color: white; }
        .formCopy p  { color: rgba(255,255,255,0.66); }

        .formBullets {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .formBullets li {
          color: rgba(255,255,255,0.76);
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .formBullets li::before {
          content: '✓';
          color: #72d87e;
          font-weight: 900;
        }

        .leadForm {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 26px;
          border-radius: 24px;
          background: white;
          box-shadow: 0 30px 80px rgba(0,0,0,0.22);
        }

        .leadForm label {
          display: grid;
          gap: 7px;
          color: var(--navy);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .leadForm .full,
        .leadForm button,
        .leadForm small {
          grid-column: 1 / -1;
        }

        .leadForm input,
        .leadForm select {
          width: 100%;
          border: 1.5px solid var(--line);
          border-radius: 12px;
          background: #f7f9f8;
          padding: 14px 16px;
          color: var(--text);
          font: inherit;
          font-size: 15px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }

        .leadForm input:focus,
        .leadForm select:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 4px rgba(44,136,54,0.12);
        }

        .leadForm button { width: 100%; font-size: 16px; }

        .leadForm small {
          color: var(--muted);
          text-align: center;
          font-size: 13px;
        }

        /* ── FAQ ───────────────────────────────────────── */
        .faq { background: var(--bg); }

        .faqList {
          max-width: 860px;
          margin: 0 auto;
          display: grid;
          gap: 8px;
        }

        .faqList button {
          width: 100%;
          border: 1.5px solid var(--line);
          border-radius: 16px;
          background: var(--paper);
          text-align: left;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.18s;
        }

        .faqList button.active { border-color: var(--green); }

        .faqList button > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
        }

        .faqList strong {
          color: var(--navy);
          font-size: 16px;
          font-weight: 700;
          line-height: 1.35;
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
          font-size: 18px;
        }

        .faqList p {
          color: var(--muted);
          line-height: 1.62;
          margin: 0;
          padding: 0 20px 18px;
          font-size: 15px;
        }

        /* ── FINAL CTA ─────────────────────────────────── */
        .finalCta {
          text-align: center;
          color: white;
          background:
            linear-gradient(180deg, rgba(7,18,40,0.80), rgba(7,18,40,0.94)),
            url("/images/lp3/hero-cbuq.jpg") center / cover no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .finalCta img    { width: 180px; height: auto; margin-bottom: 26px; }
        .finalCta h2     { color: white; max-width: 820px; }
        .finalCta a      { margin-top: 22px; }

        /* ── MOBILE STICKY ─────────────────────────────── */
        .mobileSticky { display: none; }

        /* ── RESPONSIVE ────────────────────────────────── */
        @media (max-width: 980px) {
          .hero { min-height: auto; padding-bottom: 80px; }

          .heroInner { grid-template-columns: 1fr; margin-top: 80px; }
          .heroCard  { max-width: 420px; }

          .intro,
          .split,
          .proof,
          .formSection { grid-template-columns: 1fr; }

          .introGrid,
          .areasGrid,
          .solutionGrid,
          .compareGrid { grid-template-columns: 1fr 1fr; }

          .timeline { grid-template-columns: 1fr 1fr; }

          .splitImage { min-height: 340px; }

          .mosaic { grid-template-columns: 1fr; }
          .photoA, .photoB, .photoC {
            min-height: 260px;
            grid-row: auto;
          }

          .leadForm { grid-template-columns: 1fr; }

          .mobileSticky {
            position: fixed;
            left: 12px; right: 12px; bottom: 12px;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 56px;
            border-radius: 999px;
            color: white;
            background: var(--green);
            text-decoration: none;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 14px 38px rgba(0,0,0,0.28);
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding-left: 18px;
            padding-right: 18px;
            background-position: 68% center;
          }

          .brand img { width: 140px; }
          .topCta    { display: none; }

          .hero h1 { font-size: 52px; }
          .heroCopy > p { font-size: 17px; }

          section { padding: 60px 18px; }
          .clientStrip { padding: 22px 18px; }

          .clientList { gap: 4px 8px; }
          .clientList span { font-size: 14px; }

          .introGrid,
          .areasGrid,
          .solutionGrid,
          .timeline,
          .compareGrid { grid-template-columns: 1fr; }

          .sectionTitle h2,
          .introText h2,
          .splitCopy h2,
          .proofText h2,
          .formCopy h2,
          .finalCta h2,
          .quoteCta h2 { font-size: 38px; }

          .tagList { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
