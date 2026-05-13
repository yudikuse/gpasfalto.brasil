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
  "Olá, vim pela página de pavimentação CBUQ da GP Asfalto. Gostaria de uma avaliação técnica da minha área."
);

const areaTypes = [
  "Pátio industrial / logístico",
  "Via interna",
  "Acesso / entrada",
  "Estacionamento",
  "Recapeamento",
  "Área rural / cerealista",
  "Base e subbase",
  "Outro",
];

const clients = [
  { name: "COMIGO",        logo: "/images/logos/comigo.png" },
  { name: "LDC",           logo: "/images/logos/ldc.png" },
  { name: "Raízen",        logo: "/images/logos/raizen.png" },
  { name: "Nutrien",       logo: "/images/logos/nutrien.png" },
  { name: "Mosaic",        logo: "/images/logos/mosaic.png" },
  { name: "Mercado Livre", logo: "/images/logos/mercado-livre.png" },
  { name: "Fetz",          logo: "/images/logos/fetz.png" },
  { name: "Grupo Cereal",  logo: "/images/logos/grupo-cereal.png" },
];

const applications = [
  {
    title: "Pátios industriais e logísticos",
    text: "Pavimentação dimensionada para tráfego de caminhões pesados, forklifts e operações contínuas. Especificação conforme carga real.",
  },
  {
    title: "Vias internas",
    text: "Projeto de via para fluxo contínuo de veículos e equipamentos. Espessura e estrutura definidas conforme intensidade de uso.",
  },
  {
    title: "Acessos e entradas",
    text: "Infraestrutura de acesso projetada para tráfego crítico. Eliminação de pontos de risco para operação e segurança.",
  },
  {
    title: "Recapeamento",
    text: "Avaliação estrutural do pavimento existente e recuperação com nova camada de CBUQ. Solução definitiva para pavimentos degradados.",
  },
  {
    title: "Áreas rurais e cerealistas",
    text: "Pátios de balança, carga e descarga, acessos de fazenda. Pavimentação para operações do agronegócio em Goiás.",
  },
  {
    title: "Base e subbase",
    text: "Execução completa da estrutura de pavimento — base, subbase, regularização e revestimento — sem necessidade de outro fornecedor.",
  },
];

const faq = [
  {
    q: "A GP Asfalto executa base e subbase ou apenas o revestimento CBUQ?",
    a: "A GP Asfalto executa o pacote completo: base, subbase, regularização e revestimento em CBUQ. Avaliamos a condição estrutural existente e incluímos a preparação necessária no escopo — sem necessidade de contratar outro fornecedor para cada etapa.",
  },
  {
    q: "É possível adquirir apenas a massa CBUQ sem aplicação?",
    a: "Sim. A GP Asfalto fornece CBUQ de usina própria para equipes com capacidade de aplicação própria. Para projetos com aplicação completa, atendemos com equipe técnica e maquinário.",
  },
  {
    q: "Como é feito o dimensionamento da espessura do pavimento?",
    a: "O dimensionamento considera tipo de tráfego, peso das cargas, frequência de uso e condição da base existente. A equipe técnica avalia esses fatores antes de definir a especificação — não utilizamos espessura padrão sem avaliação.",
  },
  {
    q: "Qual a área mínima para atendimento?",
    a: "Não há mínimo fixo. Para obras em Rio Verde e municípios próximos, atendemos áreas a partir de 300 m². Para localidades mais distantes, o volume depende da logística. Informe a cidade e a metragem para análise.",
  },
  {
    q: "É possível uma avaliação preliminar por fotos e plantas?",
    a: "Sim. Fotos, vídeos e plantas permitem uma avaliação inicial consistente. Para proposta técnica com especificação de espessura e custo definitivo, pode ser necessária visita de campo.",
  },
  {
    q: "Qual a área de atendimento?",
    a: "A GP Asfalto atende Rio Verde e municípios de Goiás e região. Informe a cidade para confirmarmos viabilidade de logística e agenda.",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function onlyDigits(v: string) { return v.replace(/\D/g, ""); }

function maskPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

function buildMessage(data: FormState) {
  return [
    "Olá, vim pela página de pavimentação CBUQ da GP Asfalto.",
    "",
    `Nome: ${data.nome || "-"}`,
    `WhatsApp: ${data.telefone || "-"}`,
    `Cidade/UF: ${data.cidade || "-"}`,
    `Tipo de área: ${data.tipoArea || "-"}`,
    "",
    "Gostaria de solicitar uma avaliação técnica.",
  ].join("\n");
}

// ── Componente ─────────────────────────────────────────────────────────────
export default function LP3Page() {
  const [form, setForm] = useState<FormState>({ nome: "", telefone: "", cidade: "", tipoArea: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waHref = useMemo(() => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(form))}`, [form]);
  const waBase = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_BASE_MSG}`;

  function update(field: keyof FormState, value: string) {
    setForm(p => ({ ...p, [field]: field === "telefone" ? maskPhone(value) : value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (onlyDigits(form.telefone).length < 10) { alert("Informe um WhatsApp válido."); return; }
    window.open(waHref, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="lp3">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="heroOverlay" />
        <header className="topbar">
          <span className="brand"><img src="/images/logo-white.png" alt="GP Asfalto" /></span>
          <a className="topCta" href={waBase} target="_blank" rel="noreferrer">
            Falar com a equipe técnica
          </a>
        </header>

        <div className="heroInner">
          <div className="heroCopy">
            <div className="tag">Pavimentação CBUQ · Industrial · Agronegócio · Goiás</div>
            <h1>Pavimento que sustenta a operação.</h1>
            <p>
              A GP Asfalto dimensiona, fornece e executa pavimentação CBUQ para pátios
              industriais, vias internas e acessos críticos — com produção própria,
              equipe técnica e maquinário. Da base ao revestimento.
            </p>
            <a className="heroCta" href={waBase} target="_blank" rel="noreferrer">
              Solicitar avaliação técnica
            </a>
            <p className="heroSub">Informe a área, metragem e cidade para análise.</p>
          </div>

          <aside className="heroCard">
            <p className="cardLabel">Por que a GP Asfalto</p>
            <h2 className="cardTitle">3 usinas próprias em operação</h2>
            <div className="cardStats">
              <div>
                <strong>40+</strong>
                <span>anos de engenharia em Goiás</span>
              </div>
              <div>
                <strong>Da base ao revestimento</strong>
                <span>sem terceirização de etapas</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── LOGOS ─────────────────────────────────────────────────────────── */}
      <div className="logoStrip">
        <p className="logoLabel">Referência em pavimentação para as maiores operações do agronegócio</p>
        <div className="logoRow">
          {clients.map((c) => (
            <figure key={c.name} className="logoFig">
              <img src={c.logo} alt={c.name} className="logoImg" />
            </figure>
          ))}
        </div>
      </div>

      {/* ── BENEFÍCIOS ────────────────────────────────────────────────────── */}
      <section className="benefits">
        <header className="secHead center">
          <span className="pill">Diferencial técnico</span>
          <h2>Infraestrutura de pavimento não é improviso.</h2>
        </header>
        <div className="benefitsGrid">
          {[
            { n: "01", t: "Dimensionado para a carga real",       d: "Espessura e especificação definidas conforme tráfego, tipo de carga e intensidade de uso — não uma estimativa genérica aplicada a qualquer situação." },
            { n: "02", t: "Execução sem paralisia da operação",    d: "Cronograma coordenado com sua equipe. Mobilização de usina, transporte e maquinário planejados para minimizar impacto na rotina operacional." },
            { n: "03", t: "Sem fragmentação de fornecedores",      d: "Base, subbase e revestimento CBUQ no mesmo contrato. Uma equipe, uma responsabilidade técnica, um único interlocutor para toda a obra." },
          ].map(({ n, t, d }) => (
            <article key={n} className="benefitCard">
              <span className="bNum">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── DOR ───────────────────────────────────────────────────────────── */}
      <section className="pain">
        <div className="painImg" />
        <div className="painCopy">
          <span className="pill">Custo real</span>
          <h2>Infraestrutura precária tem custo operacional alto.</h2>
          <p>
            Pavimento inadequado não é só estética. Afeta diretamente a operação,
            a segurança do trabalho, a vida útil da frota e a imagem da empresa.
          </p>
          <ul className="painList">
            {["Desgaste prematuro de frota e equipamentos",
              "Risco à segurança do trabalho",
              "Manutenção corretiva recorrente e imprevisível",
              "Perda de eficiência logística",
              "Infraestrutura incompatível com a escala de carga",
              "Imagem inadequada para auditorias e clientes"].map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SOLUÇÃO ───────────────────────────────────────────────────────── */}
      <section className="solution">
        <header className="secHead left">
          <span className="pill light">Capacidade técnica</span>
          <h2>Produção própria. Equipe técnica. Execução completa.</h2>
          <p>
            Com três usinas próprias em operação, a GP Asfalto controla toda a
            cadeia — produção de CBUQ, logística, preparação de base e execução —
            sem depender de terceiros nas etapas críticas.
          </p>
        </header>
        <div className="solutionGrid">
          {["Produção de CBUQ em usinas próprias",
            "Transporte com temperatura controlada",
            "Equipe técnica de campo especializada",
            "Maquinário de espalhamento e compactação",
            "Execução de base, subbase e regularização",
            "Dimensionamento por tipo de tráfego e carga",
          ].map(item => (
            <div key={item} className="solItem">
              <span className="dot" />{item}
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESSO ──────────────────────────────────────────────────────── */}
      <section className="process">
        <header className="secHead center">
          <span className="pill">Fluxo de atendimento</span>
          <h2>Do primeiro contato à entrega da obra.</h2>
        </header>
        <div className="steps">
          {[
            ["01", "Avaliação técnica",   "Análise da área, base existente, tipo de tráfego e logística de acesso."],
            ["02", "Dimensionamento",     "Especificação de espessura, estrutura e volume de CBUQ conforme projeto."],
            ["03", "Mobilização",         "Coordenação de usina, transporte, equipe e maquinário para a obra."],
            ["04", "Execução e entrega",  "Aplicação, compactação e controle de qualidade até a entrega final."],
          ].map(([n, t, d]) => (
            <article key={n} className="step">
              <span className="stepN">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── APLICAÇÕES ────────────────────────────────────────────────────── */}
      <section className="areas">
        <header className="secHead center">
          <span className="pill">Escopo de aplicação</span>
          <h2>Para cada tipo de área, o projeto correto.</h2>
        </header>
        <div className="areasGrid">
          {applications.map(({ title, text }) => (
            <article key={title} className="areaCard">
              <div className="areaBar" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROVA ─────────────────────────────────────────────────────────── */}
      <section className="proof">
        <div className="proofPhotos">
          <div className="ph phA" />
          <div className="ph phB" />
          <div className="ph phC" />
        </div>
        <div className="proofCopy">
          <span className="pill">Capacidade comprovada</span>
          <h2>40 anos de engenharia e campo.</h2>
          <p>
            Aplicação de CBUQ exige coordenação precisa de produção, transporte,
            temperatura, compactação e base. A GP Asfalto opera essa cadeia há décadas
            para clientes que não aceitam imprecisão.
          </p>
          <div className="kpis">
            {[
              ["3 usinas próprias",   "Produção contínua de CBUQ em Goiás"],
              ["40+ anos",            "De engenharia e pavimentação em operação"],
              ["Rio Verde e Goiás",   "Obras conforme agenda e logística operacional"],
            ].map(([s, d]) => (
              <div key={s} className="kpi">
                <strong>{s}</strong><span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIVO ───────────────────────────────────────────────────── */}
      <section className="compare">
        <header className="secHead center">
          <span className="pill">Comparativo</span>
          <h2>Manutenção corretiva versus infraestrutura definitiva.</h2>
        </header>
        <div className="compareGrid">
          <div className="compareCol">
            <span className="colHead dimmed">Solução provisória</span>
            {["Custo recorrente sem solução definitiva",
              "Falha estrutural com chuva e carga pesada",
              "Risco operacional e de segurança do trabalho",
              "Manutenção frequente e imprevisível",
              "Infraestrutura incompatível com a operação",
            ].map(t => (
              <div key={t} className="cRow"><span className="ico no">✕</span>{t}</div>
            ))}
          </div>
          <div className="compareCol dark">
            <span className="colHead white">CBUQ aplicado — GP Asfalto</span>
            {["Investimento único com vida útil longa",
              "Pavimento estruturado para a carga real",
              "Superfície segura e previsível",
              "Manutenção apenas preventiva",
              "Infraestrutura adequada à escala da operação",
            ].map(t => (
              <div key={t} className="cRow"><span className="ico yes">✓</span>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA INTERMEDIÁRIO ─────────────────────────────────────────────── */}
      <section className="midCta">
        <div className="midInner">
          <span className="pill">Avaliação técnica</span>
          <h2>5 minutos para uma estimativa de viabilidade.</h2>
          <p>
            Informe cidade, tipo de área e metragem aproximada. A equipe técnica
            analisa e retorna com viabilidade, dimensionamento preliminar e logística.
          </p>
          <a className="ctaBtn" href={waBase} target="_blank" rel="noreferrer">
            Solicitar avaliação pelo WhatsApp
          </a>
        </div>
      </section>

      {/* ── FORMULÁRIO ────────────────────────────────────────────────────── */}
      <section id="formulario" className="formSection">
        <div className="formInfo">
          <span className="pill light">Primeiro passo</span>
          <h2>Solicite uma avaliação técnica.</h2>
          <p>
            Preencha com os dados da área. Nossa equipe analisa viabilidade,
            dimensionamento preliminar e logística para a sua operação.
          </p>
          <ul className="checks">
            {["Sem compromisso", "Retorno técnico via WhatsApp", "Avaliação preliminar gratuita"].map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input value={form.nome} onChange={e => update("nome", e.target.value)}
              placeholder="Seu nome" required />
          </label>
          <label>
            WhatsApp
            <input value={form.telefone} onChange={e => update("telefone", e.target.value)}
              placeholder="(64) 99999-9999" inputMode="tel" required />
          </label>
          <label>
            Cidade / UF
            <input value={form.cidade} onChange={e => update("cidade", e.target.value)}
              placeholder="Ex.: Rio Verde / GO" required />
          </label>
          <label>
            Tipo de área
            <select value={form.tipoArea} onChange={e => update("tipoArea", e.target.value)} required>
              <option value="">Selecione</option>
              {areaTypes.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
          <button type="submit" className="span2">Solicitar avaliação técnica →</button>
          <small className="span2">Ao clicar, abriremos o WhatsApp com sua solicitação pronta para envio.</small>
        </form>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="faq">
        <header className="secHead center">
          <span className="pill">Dúvidas técnicas</span>
          <h2>Perguntas frequentes.</h2>
        </header>
        <div className="faqList">
          {faq.map(({ q, a }, i) => (
            <div key={q} className={`faqItem${openFaq === i ? " open" : ""}`}>
              <button type="button" className="faqQ"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{q}</span>
                <span className="faqIcon">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="faqA">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="finalCta">
        <img src="/images/logo-white.png" alt="GP Asfalto" className="finalLogo" />
        <h2>Da usina à compactação. Para quem não aceita improviso.</h2>
        <p>Informe a área, metragem e cidade. A equipe técnica analisa e retorna com viabilidade.</p>
        <a href={waBase} target="_blank" rel="noreferrer" className="ctaBtn">
          Solicitar avaliação pelo WhatsApp
        </a>
      </section>

      {/* ── MOBILE STICKY ─────────────────────────────────────────────────── */}
      <a className="sticky" href={waBase} target="_blank" rel="noreferrer">
        Solicitar avaliação técnica
      </a>

      {/* ══════════════════════════════════════════════════════════════════
          ESTILOS
      ══════════════════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --navy:  #0C1D38;
          --navy2: #071228;
          --green: #2C8836;
          --green2:#1e6326;
          --cream: #F0EBE2;
          --bg:    #F5F7F6;
          --paper: #FFFFFF;
          --text:  #1A1D1F;
          --muted: #5E6778;
          --line:  rgba(12,29,56,0.09);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .lp3 {
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          color: var(--text);
          background: var(--bg);
          overflow-x: hidden;
        }

        h1, h2, h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 0.95;
        }

        /* ── HERO ────────────────────────────────────── */
        .hero {
          position: relative;
          min-height: 100vh;
          color: white;
          background:
            linear-gradient(100deg,
              rgba(7,18,40,0.97) 0%,
              rgba(7,18,40,0.84) 42%,
              rgba(7,18,40,0.26) 75%),
            url("/images/lp3/hero-cbuq.jpg") center / cover no-repeat;
          padding: 28px clamp(24px,5vw,72px) 80px;
          display: flex;
          flex-direction: column;
        }

        .heroOverlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, transparent 50%, rgba(7,18,40,0.60));
        }

        .topbar {
          position: relative; z-index: 2;
          max-width: 1240px; width: 100%; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }

        .brand { display: inline-flex; align-items: center; }
        .brand img { width: 172px; height: auto; display: block; }

        .topCta {
          color: white; background: var(--green);
          text-decoration: none; padding: 11px 22px; border-radius: 999px;
          font-weight: 600; font-size: 14px; letter-spacing: 0.01em;
          transition: background 0.2s; white-space: nowrap;
        }
        .topCta:hover { background: var(--green2); }

        .heroInner {
          position: relative; z-index: 2;
          max-width: 1240px; width: 100%; margin: auto; padding-top: 80px;
          display: grid; grid-template-columns: 1fr 340px; gap: 48px; align-items: end;
        }

        .tag {
          display: inline-block;
          color: rgba(255,255,255,0.68);
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 20px;
        }

        .heroCopy h1 {
          font-size: clamp(54px,7.5vw,104px);
          color: white; max-width: 900px; margin-bottom: 24px;
        }

        .heroCopy > p {
          font-size: clamp(16px,1.6vw,19px);
          color: rgba(255,255,255,0.76); line-height: 1.64;
          max-width: 570px; margin-bottom: 32px;
        }

        .heroCta {
          display: inline-flex; align-items: center; min-height: 56px;
          padding: 0 32px; background: var(--green); color: white;
          font-weight: 700; font-size: 16px; border-radius: 999px;
          text-decoration: none; box-shadow: 0 16px 40px rgba(44,136,54,0.32);
          transition: transform 0.18s, background 0.18s;
        }
        .heroCta:hover { background: var(--green2); transform: translateY(-2px); }

        .heroSub {
          margin-top: 14px !important; font-size: 13px !important;
          color: rgba(255,255,255,0.44) !important; line-height: 1.4 !important;
        }

        .heroCard {
          padding: 28px; border-radius: 20px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(16px); box-shadow: 0 32px 72px rgba(0,0,0,0.22);
        }

        .cardLabel {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; color: rgba(255,255,255,0.44); margin-bottom: 14px;
        }

        .cardTitle {
          font-size: 28px; color: white; margin-bottom: 20px; line-height: 1.02;
        }

        .cardStats { display: grid; gap: 9px; }

        .cardStats > div {
          padding: 14px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.10);
        }

        .cardStats strong {
          display: block; font-family: 'Barlow Condensed', sans-serif;
          font-size: 19px; font-weight: 900; color: white;
          text-transform: uppercase; margin-bottom: 3px;
        }

        .cardStats span { font-size: 12px; color: rgba(255,255,255,0.52); line-height: 1.3; }

        /* ── LOGOS ───────────────────────────────────── */
        .logoStrip {
          background: var(--navy);
          padding: 32px clamp(24px,5vw,72px);
          text-align: center;
        }

        .logoLabel {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.10em; color: rgba(255,255,255,0.36); margin-bottom: 22px;
        }

        .logoRow {
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center;
          gap: 8px 36px; max-width: 1100px; margin: 0 auto;
        }

        .logoFig { display: flex; align-items: center; justify-content: center; height: 36px; }

        .logoImg {
          height: 36px; width: auto; max-width: 110px; object-fit: contain;
          filter: brightness(0) invert(1); opacity: 0.58;
          transition: opacity 0.2s;
        }
        .logoImg:hover { opacity: 0.90; }

        /* ── SEÇÃO BASE ──────────────────────────────── */
        section { padding: 88px clamp(24px,5vw,72px); }

        .pill {
          display: inline-flex; align-items: center;
          background: var(--green); color: white;
          border-radius: 999px; padding: 6px 14px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.09em; margin-bottom: 16px; white-space: nowrap;
        }

        .pill.light {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.20);
          color: rgba(255,255,255,0.78);
        }

        .secHead {
          display: flex; flex-direction: column;
          margin-bottom: 48px;
        }

        .secHead.center { max-width: 820px; margin-left: auto; margin-right: auto; text-align: center; align-items: center; }
        .secHead.left   { text-align: left; align-items: flex-start; }

        .secHead h2 { color: var(--navy); font-size: clamp(36px,5vw,66px); }
        .secHead.left h2 { color: white; }

        .secHead p {
          color: var(--muted); font-size: 17px; line-height: 1.68;
          margin-top: 16px; max-width: 640px;
        }
        .secHead.left p { color: rgba(255,255,255,0.62); }

        /* ── BENEFÍCIOS ──────────────────────────────── */
        .benefits { background: var(--paper); }

        .benefitsGrid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr); gap: 16px;
        }

        .benefitCard {
          padding: 32px; border-radius: 18px;
          background: var(--bg); border: 1px solid var(--line);
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .benefitCard:hover { box-shadow: 0 10px 32px rgba(12,29,56,0.10); transform: translateY(-2px); }

        .bNum {
          display: block; font-family: 'Barlow Condensed', sans-serif;
          font-size: 46px; font-weight: 900; color: var(--green);
          letter-spacing: -0.04em; line-height: 1; margin-bottom: 18px;
        }

        .benefitCard h3 { color: var(--navy); font-size: 22px; line-height: 1.15; margin-bottom: 12px; }
        .benefitCard p  { color: var(--muted); font-size: 15px; line-height: 1.68; }

        /* ── DOR ─────────────────────────────────────── */
        .pain {
          background: var(--bg);
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;
        }

        .painImg {
          min-height: 560px; border-radius: 24px;
          background:
            linear-gradient(180deg,rgba(12,29,56,0.02),rgba(12,29,56,0.12)),
            url("/images/lp3/patio-logistico.jpg") center/cover no-repeat;
          box-shadow: 0 24px 72px rgba(12,29,56,0.12);
        }

        .painCopy h2 { color: var(--navy); font-size: clamp(36px,4.5vw,60px); margin: 16px 0 18px; }
        .painCopy > p { color: var(--muted); font-size: 17px; line-height: 1.65; margin-bottom: 26px; }

        .painList {
          list-style: none;
          display: grid; grid-template-columns: 1fr 1fr; gap: 9px;
        }

        .painList li {
          padding: 12px 16px; border-radius: 10px;
          background: var(--paper); border: 1px solid var(--line);
          color: var(--navy); font-size: 13px; font-weight: 600; line-height: 1.4;
        }

        /* ── SOLUÇÃO ─────────────────────────────────── */
        .solution {
          background:
            linear-gradient(155deg, rgba(7,18,40,0.96) 0%, rgba(12,29,56,0.98) 100%),
            url("/images/lp3/textura-asfalto.jpg") center/cover no-repeat;
          color: white;
        }

        .solutionGrid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr); gap: 10px;
        }

        .solItem {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 22px; border-radius: 14px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.86); font-size: 15px; font-weight: 600; line-height: 1.35;
          transition: background 0.2s;
        }
        .solItem:hover { background: rgba(255,255,255,0.09); }

        .dot { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--green); }

        /* ── PROCESSO ────────────────────────────────── */
        .process { background: var(--paper); }

        .steps {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 14px;
        }

        .step {
          padding: 28px; border-radius: 18px;
          background: var(--bg); border: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 12px;
        }

        .stepN {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 52px; font-weight: 900; color: var(--green);
          letter-spacing: -0.05em; line-height: 1;
        }

        .step h3 { color: var(--navy); font-size: 20px; line-height: 1.15; }
        .step p  { color: var(--muted); font-size: 14px; line-height: 1.62; margin-top: auto; }

        /* ── APLICAÇÕES ──────────────────────────────── */
        .areas { background: var(--bg); }

        .areasGrid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr); gap: 14px;
        }

        .areaCard {
          padding: 28px; border-radius: 18px;
          background: var(--paper); border: 1px solid var(--line);
          box-shadow: 0 2px 8px rgba(12,29,56,0.05);
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .areaCard:hover { box-shadow: 0 10px 32px rgba(12,29,56,0.10); transform: translateY(-2px); }

        .areaBar { width: 36px; height: 3px; border-radius: 99px; background: var(--green); margin-bottom: 26px; }
        .areaCard h3 { color: var(--navy); font-size: 21px; line-height: 1.1; margin-bottom: 10px; }
        .areaCard p  { color: var(--muted); font-size: 14px; line-height: 1.65; }

        /* ── PROVA ───────────────────────────────────── */
        .proof {
          background: var(--paper);
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 52px; align-items: center;
        }

        .proofPhotos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .ph {
          border-radius: 18px; background-size: cover; background-position: center;
          border: 1px solid var(--line); box-shadow: 0 12px 36px rgba(12,29,56,0.09);
        }

        .phA { min-height: 480px; grid-row: span 2; background-image: url("/images/lp3/hero-cbuq.jpg"); }
        .phB { min-height: 232px; background-image: url("/images/lp3/patio-logistico.jpg"); }
        .phC { min-height: 232px; background-image: url("/images/lp3/textura-asfalto.jpg"); }

        .proofCopy h2 { color: var(--navy); font-size: clamp(36px,4.5vw,60px); margin: 16px 0 18px; }
        .proofCopy > p { color: var(--muted); font-size: 16px; line-height: 1.70; margin-bottom: 28px; }

        .kpis { display: flex; flex-direction: column; gap: 9px; }

        .kpi {
          padding: 16px 20px; border-radius: 13px;
          background: var(--bg); border: 1px solid var(--line);
        }

        .kpi strong {
          display: block; font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px; font-weight: 900; color: var(--navy);
          text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 3px;
        }

        .kpi span { font-size: 13px; color: var(--muted); }

        /* ── COMPARATIVO ─────────────────────────────── */
        .compare { background: var(--bg); }

        .compareGrid {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }

        .compareCol {
          padding: 32px; border-radius: 20px;
          background: var(--paper); border: 1px solid var(--line);
        }

        .compareCol.dark {
          background: var(--navy); border-color: transparent;
          box-shadow: 0 24px 64px rgba(12,29,56,0.18);
        }

        .colHead {
          display: block; font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px; font-weight: 900; text-transform: uppercase;
          margin-bottom: 22px; line-height: 1.1;
        }

        .colHead.dimmed { color: var(--muted); }
        .colHead.white  { color: white; }

        .cRow {
          display: flex; align-items: flex-start; gap: 11px;
          padding: 11px 0; border-top: 1px solid rgba(128,128,128,0.12);
          font-size: 14px; font-weight: 500; line-height: 1.45;
        }

        .compareCol:not(.dark) .cRow { color: var(--muted); }
        .compareCol.dark .cRow       { color: rgba(255,255,255,0.80); }

        .ico { font-size: 14px; font-weight: 900; flex: 0 0 auto; line-height: 1.45; }
        .ico.no  { color: #c94f4f; }
        .ico.yes { color: #5ecf6a; }

        /* ── MID CTA ─────────────────────────────────── */
        .midCta { background: var(--cream); text-align: center; display: flex; align-items: center; justify-content: center; }

        .midInner { max-width: 680px; display: flex; flex-direction: column; align-items: center; }
        .midInner h2 { color: var(--navy); font-size: clamp(34px,4.5vw,58px); }
        .midInner p  { color: var(--muted); font-size: 17px; line-height: 1.65; margin-top: 16px; max-width: 560px; }

        /* ── CTA BUTTON GLOBAL ───────────────────────── */
        .ctaBtn, .leadForm button {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 56px; padding: 0 32px; border-radius: 999px;
          background: var(--green); color: white;
          font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 16px 40px rgba(44,136,54,0.26);
          transition: transform 0.18s, background 0.18s, box-shadow 0.18s;
          margin-top: 28px;
        }
        .ctaBtn:hover, .leadForm button:hover {
          background: var(--green2); transform: translateY(-2px);
          box-shadow: 0 22px 48px rgba(44,136,54,0.30);
        }

        /* ── FORMULÁRIO ──────────────────────────────── */
        .formSection {
          background: var(--navy); color: white;
          display: grid; grid-template-columns: 0.78fr 1.22fr; gap: 56px; align-items: start;
        }

        .formInfo h2 { color: white; font-size: clamp(34px,4.5vw,58px); margin: 16px 0 0; }
        .formInfo p  { color: rgba(255,255,255,0.60); font-size: 16px; line-height: 1.68; margin-top: 16px; }

        .checks { list-style: none; margin-top: 24px; display: flex; flex-direction: column; gap: 9px; }

        .checks li {
          display: flex; align-items: center; gap: 10px;
          font-size: 15px; color: rgba(255,255,255,0.70);
        }

        .checks li::before { content: '✓'; color: #72d87e; font-weight: 900; font-size: 14px; }

        .leadForm {
          padding: 28px; border-radius: 22px; background: white;
          box-shadow: 0 32px 88px rgba(0,0,0,0.22);
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }

        .leadForm label {
          display: flex; flex-direction: column; gap: 6px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.09em; color: var(--navy);
        }

        .leadForm input, .leadForm select {
          width: 100%; border: 1.5px solid var(--line); border-radius: 10px;
          background: #f7f9f8; padding: 13px 15px;
          color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px;
          outline: none; transition: border-color 0.18s, box-shadow 0.18s;
        }

        .leadForm input:focus, .leadForm select:focus {
          border-color: var(--green); box-shadow: 0 0 0 3px rgba(44,136,54,0.11);
        }

        .span2 { grid-column: 1 / -1; }
        .leadForm button { width: 100%; font-size: 16px; margin-top: 4px; }
        .leadForm small  { display: block; text-align: center; font-size: 12px; color: var(--muted); }

        /* ── FAQ ─────────────────────────────────────── */
        .faq { background: var(--bg); }

        .faqList { max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }

        .faqItem {
          border-radius: 14px; background: var(--paper);
          border: 1.5px solid var(--line); overflow: hidden; transition: border-color 0.18s;
        }

        .faqItem.open { border-color: var(--green); }

        .faqQ {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          padding: 18px 22px; background: none; border: none; cursor: pointer; text-align: left;
        }

        .faqQ span:first-child { font-size: 15px; font-weight: 700; color: var(--navy); line-height: 1.38; }

        .faqIcon {
          flex: 0 0 28px; width: 28px; height: 28px; border-radius: 50%;
          background: var(--green); color: white; font-weight: 900; font-size: 18px;
          display: grid; place-items: center;
        }

        .faqA { padding: 0 22px 18px; font-size: 14px; color: var(--muted); line-height: 1.70; }

        /* ── FINAL CTA ───────────────────────────────── */
        .finalCta {
          text-align: center; color: white;
          background:
            linear-gradient(180deg,rgba(7,18,40,0.84),rgba(7,18,40,0.96)),
            url("/images/lp3/hero-cbuq.jpg") center/cover no-repeat;
          display: flex; flex-direction: column; align-items: center;
        }

        .finalLogo { width: 172px; height: auto; margin-bottom: 28px; }
        .finalCta h2 { color: white; font-size: clamp(36px,5vw,70px); max-width: 800px; }
        .finalCta p  { color: rgba(255,255,255,0.60); font-size: 17px; max-width: 580px; line-height: 1.65; margin-top: 16px; }

        /* ── STICKY ──────────────────────────────────── */
        .sticky { display: none; }

        /* ══════════════════════════════════════════════
           RESPONSIVO
        ══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .heroInner       { grid-template-columns: 1fr; padding-top: 64px; }
          .heroCard        { max-width: 440px; }
          .benefitsGrid,
          .solutionGrid,
          .areasGrid       { grid-template-columns: 1fr 1fr; }
          .steps           { grid-template-columns: 1fr 1fr; }
          .pain, .proof,
          .formSection     { grid-template-columns: 1fr; }
          .painImg         { min-height: 300px; }
          .proofPhotos     { grid-template-columns: 1fr; }
          .phA,.phB,.phC   { min-height: 240px; grid-row: auto; }
        }

        @media (max-width: 768px) {
          .hero    { min-height: auto; padding-bottom: 72px; }
          section  { padding: 64px clamp(18px,5vw,40px); }
          .logoStrip { padding: 24px clamp(18px,5vw,40px); }
          .compareGrid, .benefitsGrid, .solutionGrid,
          .areasGrid, .steps { grid-template-columns: 1fr; }
          .painList { grid-template-columns: 1fr; }
          .leadForm { grid-template-columns: 1fr; }
          .logoImg  { height: 28px; }
          .sticky {
            position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 100;
            display: flex; align-items: center; justify-content: center;
            min-height: 56px; border-radius: 999px; background: var(--green); color: white;
            font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 15px;
            text-decoration: none; box-shadow: 0 14px 40px rgba(0,0,0,0.26);
          }
        }

        @media (max-width: 480px) {
          .brand img  { width: 136px; }
          .topCta     { display: none; }
          .heroCopy h1 { font-size: 52px; }
          .secHead h2  { font-size: 36px; }
          .logoImg     { height: 24px; max-width: 80px; }
        }
      `}</style>
    </main>
  );
}
