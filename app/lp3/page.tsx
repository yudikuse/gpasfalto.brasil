"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5564999452124";

const HERO_VIDEO =
  "https://res.cloudinary.com/dfw7h9c2j/video/upload/v1778589177/silo-bg_tjhnws.mp4";

const SCENARIOS = [
  {
    id: "construtora",
    label: "Construtora",
    title: "Subcontratação de pavimentação com ART e equipe em campo.",
    sub: "Para construtoras que precisam executar CBUQ, base ou terraplenagem sem travar cronograma de obra pública ou privada.",
    chips: ["ART de execução", "Obra pública e privada", "Equipe própria"],
    message: "Sou construtora e preciso terceirizar pavimentação com ART e equipe técnica",
  },
  {
    id: "loteamento",
    label: "Loteamento",
    title: "Infraestrutura viária para loteamentos e condomínios.",
    sub: "Terraplenagem, base, subbase e revestimento CBUQ em contrato único para entrega das vias com padrão técnico.",
    chips: ["Terraplenagem + base + CBUQ", "Contrato único", "Entrega das vias"],
    message: "Tenho loteamento ou condomínio e preciso executar infraestrutura viária completa",
  },
  {
    id: "usina",
    label: "Já tenho CBUQ",
    title: "Você tem a massa. A GP aplica com acabadora, rolo e equipe.",
    sub: "Aplicação de CBUQ para quem já tem massa disponível e precisa de execução correta, compactação e controle em campo.",
    chips: ["Acabadora + rolo", "Equipe técnica", "Aplicação de CBUQ"],
    message: "Tenho CBUQ disponível e preciso de equipe e equipamentos para aplicação",
  },
  {
    id: "patio",
    label: "Pátio / acesso",
    title: "Pavimento definitivo para pátios, acessos e vias internas.",
    sub: "Solução para pátios industriais, acessos rurais, entradas de empresas e áreas operacionais com tráfego pesado.",
    chips: ["Pátios industriais", "Acessos rurais", "Tráfego pesado"],
    message: "Preciso pavimentar pátio, acesso rural ou via interna operacional",
  },
] as const;

const FAQ = [
  {
    q: "A GP Asfalto emite ART de execução?",
    a: "Sim. A obra conta com responsável técnico habilitado e ART conforme o escopo contratado.",
  },
  {
    q: "Atendem como subcontratada em obra pública?",
    a: "Sim. A GP atua como subcontratada de construtoras em obras públicas e privadas, com documentação técnica e equipe em campo.",
  },
  {
    q: "Posso contratar só a aplicação se já tenho o CBUQ?",
    a: "Sim. A GP pode fornecer acabadora, rolo compactador e equipe técnica para aplicação da massa fornecida pelo cliente.",
  },
  {
    q: "A GP executa terraplenagem e base ou só revestimento?",
    a: "Executamos o pacote completo: terraplenagem, base, subbase e revestimento CBUQ. Também podemos atuar apenas em etapas específicas.",
  },
  {
    q: "Qual a área de atendimento?",
    a: "Atendemos todo o estado de Goiás, com avaliação de mobilização conforme cidade, prazo e escopo da obra.",
  },
  {
    q: "O orçamento sai na hora?",
    a: "A primeira resposta é uma avaliação técnica inicial. Para orçamento fechado, é necessário validar cidade, metragem, acesso, escopo e condições da base.",
  },
];

type Scenario = (typeof SCENARIOS)[number];

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d)/, "($1) $2");
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function openWhatsapp(message: string) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

export default function LP3Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [phone, setPhone] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startAt = 5;
    const endAt = 18;

    function startVideo() {
      if (!video) return;
      video.currentTime = startAt;
      video.play().catch(() => {});
    }

    function loopVideo() {
      if (!video) return;
      if (video.currentTime >= endAt) {
        video.currentTime = startAt;
        video.play().catch(() => {});
      }
    }

    video.addEventListener("loadedmetadata", startVideo);
    video.addEventListener("timeupdate", loopVideo);

    return () => {
      video.removeEventListener("loadedmetadata", startVideo);
      video.removeEventListener("timeupdate", loopVideo);
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > window.innerHeight * 0.65);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToForm(nextScenario?: Scenario) {
    if (nextScenario) setSelected(nextScenario);
    setTimeout(() => {
      document.getElementById("avaliacao")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  function quickWhatsapp(message: string) {
    openWhatsapp(
      `Olá, vim pela página da GP Asfalto.\n\n` +
        `Situação:\n${message}\n\n` +
        `Gostaria de uma avaliação técnica inicial.`
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const empresa = String(form.get("empresa") || "Não informado").trim();
    const city = String(form.get("city") || "").trim();
    const volume = String(form.get("volume") || "Não informado").trim();
    const prazo = String(form.get("prazo") || "Não informado").trim();
    const contratacao = String(form.get("contratacao") || "Não informado").trim();

    openWhatsapp(
      `Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica inicial.\n\n` +
        `Nome: ${name}\n` +
        `Empresa / obra: ${empresa}\n` +
        `WhatsApp: ${phone}\n` +
        `Cidade da obra: ${city}\n\n` +
        `Situação:\n${selected.message}\n\n` +
        `Tipo de contratação: ${contratacao}\n` +
        `Prazo desejado: ${prazo}\n` +
        `Área, extensão ou volume aproximado:\n${volume}`
    );
  }

  return (
    <main className="lp3">
      <header className="topbar">
        <span className="brand" aria-label="GP Asfalto">
          <img
            src="/images/logo-white.png"
            alt="GP Asfalto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling;
              if (fallback instanceof HTMLElement) fallback.style.display = "inline-flex";
            }}
          />
          <span>GP Asfalto</span>
        </span>

        <button type="button" onClick={() => goToForm()}>
          Avaliar obra
        </button>
      </header>

      <section className="hero" id="inicio">
        <video
          ref={videoRef}
          className="heroVideo"
          src={HERO_VIDEO}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="heroShade" />

        <div className="heroContent">
          <p className="kicker">Pavimentação asfáltica em Goiás</p>

          <h1>
            CBUQ, base e aplicação
            <span>com equipe própria.</span>
          </h1>

          <p className="heroSub">
            A GP Asfalto executa pavimentação para construtoras, loteamentos,
            pátios industriais e acessos rurais em Goiás, com ART, maquinário em
            campo e 3 usinas próprias.
          </p>

          <div className="heroCreds" aria-label="Diferenciais GP Asfalto">
            {[
              "3 usinas próprias em Goiás",
              "40+ anos de pavimentação",
              "ART de execução",
              "Equipe e maquinário próprios",
            ].map((text) => (
              <div key={text} className="heroCred">
                <span className="credDot" />
                {text}
              </div>
            ))}
          </div>

          <div className="intentBox" aria-label="Escolha sua necessidade">
            <strong>Qual é a sua necessidade?</strong>
            <div className="intentButtons">
              {SCENARIOS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={selected.id === item.id ? "active" : ""}
                  onClick={() => goToForm(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="heroActions">
            <button className="primary" type="button" onClick={() => goToForm()}>
              Solicitar avaliação técnica
            </button>
            <button
              className="ghost"
              type="button"
              onClick={() =>
                quickWhatsapp("Já tenho CBUQ e preciso de equipe e equipamentos para aplicação")
              }
            >
              Tenho CBUQ para aplicar
            </button>
          </div>
        </div>
      </section>

      <div className="clientStrip">
        <p className="clientLabel">Infraestrutura para operações que exigem execução técnica</p>
        <div className="clientLogoWrap">
          <img
            src="/images/lp/logos_strip.png"
            alt="LDC, COMIGO, Raízen, Nutrien, Mosaic, Fetz, Grupo Cereal, Cereal Ouro, Mercado Livre"
            className="clientLogoStrip"
          />
        </div>
      </div>

      <section className="entry">
        <div className="entryPanel">
          <p className="kicker">Escolha o tipo de obra</p>
          <h2>Uma página para o lead se reconhecer rápido.</h2>
          <p className="entryLead">
            A GP entra na etapa exata que sua obra precisa: execução completa,
            subcontratação, aplicação de CBUQ ou pavimentação de pátios e acessos.
          </p>

          <div className="scenarioPicker">
            {SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={selected.id === item.id ? "active" : ""}
                onClick={() => setSelected(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="scenarioText" key={selected.id}>
            <span>{selected.label}</span>
            <h3>{selected.title}</h3>
            <p className="scenarioSub">{selected.sub}</p>

            <div className="scenarioChips">
              {selected.chips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>

            <button type="button" onClick={() => goToForm(selected)}>
              Avaliar esta situação →
            </button>
          </div>
        </div>

        <div className="entryImage">
          <div className="entryCaption">
            <span>Execução em campo</span>
            <strong>Base, massa, aplicação e compactação em sequência.</strong>
          </div>
        </div>
      </section>

      <section className="sequence">
        <div className="sequenceInner">
          <p className="kicker">Como a avaliação funciona</p>
          <h2>Você informa a obra. A GP avalia o melhor caminho técnico.</h2>
          <p className="seqSub">
            O primeiro contato não precisa ser um orçamento fechado. A equipe valida
            cidade, metragem, prazo, tipo de contratação e condição da obra para indicar
            o escopo adequado.
          </p>

          <div className="lineProcess" aria-label="Processo de atendimento">
            {[
              ["1. Dados da obra", "Cidade, metragem, tipo de pavimento e prazo desejado"],
              ["2. Análise técnica", "Execução completa, só aplicação ou etapa específica"],
              ["3. Mobilização", "Equipe, maquinário, usina e logística em Goiás"],
              ["4. Execução", "Base, CBUQ, compactação, ART e controle em campo"],
            ].map(([title, description]) => (
              <div key={title} className="processStep">
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="proofImage" />

        <div className="proofText">
          <p className="kicker">Por que contratar a GP Asfalto</p>
          <h2>Menos risco para quem precisa entregar obra.</h2>
          <p>
            A GP Asfalto atua há mais de 40 anos no Cerrado goiano, com equipe própria,
            maquinário em campo e 3 usinas de CBUQ. A proposta é simples: reduzir risco
            de atraso, retrabalho e fornecedor sem estrutura.
          </p>

          <div className="proofStats">
            {[
              ["3", "usinas CBUQ próprias"],
              ["40+", "anos de pavimentação"],
              ["GO", "atendimento em Goiás"],
            ].map(([number, label]) => (
              <div key={label} className="proofStat">
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => goToForm()}>
            Solicitar avaliação técnica →
          </button>
        </div>
      </section>

      <section className="formSection" id="avaliacao">
        <div className="formIntro">
          <p className="kicker">Avaliação técnica inicial</p>
          <h2>Informe os dados para a equipe avaliar.</h2>
          <p>
            Preencha o essencial. O WhatsApp já abre com a solicitação pronta para a
            equipe entender sua necessidade e retornar com direcionamento técnico.
          </p>

          <ul className="formBullets">
            <li>
              <span /> Não é orçamento fechado automático
            </li>
            <li>
              <span /> Ajuda a definir execução, aplicação ou etapa específica
            </li>
            <li>
              <span /> Atendimento em Goiás
            </li>
            <li>
              <span /> ART conforme escopo contratado
            </li>
          </ul>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>

          <label>
            Empresa / obra
            <input name="empresa" type="text" placeholder="Nome da empresa ou obra" />
          </label>

          <label>
            WhatsApp
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(XX) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              required
            />
          </label>

          <label>
            Cidade da obra
            <input name="city" type="text" placeholder="Ex.: Rio Verde / GO" required />
          </label>

          <label>
            Situação principal
            <select
              value={selected.id}
              onChange={(e) => {
                const next = SCENARIOS.find((scenario) => scenario.id === e.target.value);
                if (next) setSelected(next);
              }}
            >
              {SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Tipo de contratação
            <select name="contratacao" defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option value="Execução completa">Execução completa</option>
              <option value="Somente aplicação de CBUQ">Somente aplicação de CBUQ</option>
              <option value="Terraplenagem, base ou etapa específica">
                Terraplenagem, base ou etapa específica
              </option>
              <option value="Ainda não sei">Ainda não sei</option>
            </select>
          </label>

          <label>
            Prazo desejado
            <select name="prazo" defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              <option value="Urgente">Urgente</option>
              <option value="7 a 15 dias">7 a 15 dias</option>
              <option value="30 dias">30 dias</option>
              <option value="Ainda em planejamento">Ainda em planejamento</option>
            </select>
          </label>

          <label className="full">
            Área, extensão ou volume aproximado
            <input
              name="volume"
              type="text"
              placeholder="Ex.: 5.000 m², 300 t de CBUQ, 1 km de via"
            />
          </label>

          <button className="primary full" type="submit">
            Abrir WhatsApp com avaliação técnica →
          </button>

          <p className="formNote full">
            A mensagem será montada automaticamente com os dados da obra.
          </p>
        </form>
      </section>

      <section className="faqSection">
        <div className="faqInner">
          <p className="kicker">Dúvidas frequentes</p>
          <h2>Antes de solicitar a avaliação.</h2>

          <div className="faqList">
            {FAQ.map(({ q, a }, index) => (
              <div key={q} className={`faqItem${faqOpen === index ? " open" : ""}`}>
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <span>{q}</span>
                  <i>{faqOpen === index ? "−" : "+"}</i>
                </button>
                {faqOpen === index && <p>{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div>
          <p className="kicker">GP Asfalto · Goiás</p>
          <h2>Da terra ao asfalto, com estrutura própria.</h2>
          <p>
            Informe cidade, tipo de obra, prazo e metragem aproximada. A equipe da GP
            avalia o escopo e retorna pelo WhatsApp com o melhor direcionamento técnico.
          </p>
          <button className="primary" type="button" onClick={() => goToForm()}>
            Solicitar avaliação técnica
          </button>
        </div>
      </section>

      <div className={showSticky ? "stickyCta visible" : "stickyCta"}>
        <button
          className="ghost"
          type="button"
          onClick={() =>
            quickWhatsapp("Quero falar com a equipe técnica da GP Asfalto sobre uma obra")
          }
        >
          WhatsApp
        </button>
        <button className="primary" type="button" onClick={() => goToForm()}>
          Avaliar obra
        </button>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --green: #2c8836;
          --green-strong: #1f7a2d;
          --green-soft: #e9f4eb;
          --asphalt: #071228;
          --graphite: #0d1827;
          --cream: #f4efe6;
          --paper: #f7f3ec;
          --paper-2: #ebe5dc;
          --text-dark: #111827;
          --muted-dark: #5b6472;
          --muted-light: rgba(244, 239, 230, 0.68);
          --line-dark: rgba(17, 24, 39, 0.12);
          --line-light: rgba(255, 255, 255, 0.14);
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--paper);
          color: var(--text-dark);
          font-family: "DM Sans", "Inter", system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        button, input, select, textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .lp3 {
          min-height: 100vh;
          overflow-x: hidden;
          background: var(--paper);
        }

        .topbar {
          position: fixed;
          top: 14px;
          left: 14px;
          right: 14px;
          z-index: 50;
          height: 58px;
          padding: 7px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          background: rgba(7, 18, 40, 0.82);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.28);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
          padding-left: 12px;
        }

        .brand img {
          height: 32px;
          width: auto;
          max-width: 210px;
          object-fit: contain;
        }

        .brand > span {
          display: none;
          color: #fff;
          font-weight: 900;
          font-size: 18px;
        }

        .topbar > button {
          height: 42px;
          border: 0;
          border-radius: 999px;
          padding: 0 18px;
          background: var(--cream);
          color: var(--asphalt);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          padding: 96px 20px 42px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          isolation: isolate;
          color: var(--cream);
          background: var(--asphalt);
        }

        .heroVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 58% center;
          filter: contrast(1.05) saturate(0.72) brightness(0.68);
          transform: scale(1.035);
          z-index: -3;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 22% 42%, rgba(44, 136, 54, 0.26), transparent 34%),
            linear-gradient(90deg, rgba(7, 18, 40, 0.95), rgba(7, 18, 40, 0.56) 48%, rgba(7, 18, 40, 0.32)),
            linear-gradient(180deg, rgba(7, 18, 40, 0.12), rgba(7, 18, 40, 0.96));
        }

        .heroContent {
          width: min(100%, 820px);
          position: relative;
          z-index: 2;
        }

        .kicker {
          margin: 0;
          color: var(--green);
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .hero .kicker,
        .sequence .kicker,
        .closing .kicker {
          color: #54cf65;
        }

        .hero h1 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 14px 0 0;
          max-width: 780px;
          font-size: clamp(48px, 13vw, 104px);
          line-height: 0.9;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .hero h1 span {
          display: block;
          color: rgba(244, 239, 230, 0.52);
          font-family: "Barlow Condensed", sans-serif;
        }

        .heroSub {
          margin: 18px 0 0;
          max-width: 610px;
          color: var(--muted-light);
          font-size: 16px;
          line-height: 1.58;
          letter-spacing: -0.02em;
        }

        .heroCreds {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .heroCred {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(244, 239, 230, 0.72);
          font-weight: 600;
        }

        .credDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #54cf65;
          flex: 0 0 auto;
          box-shadow: 0 0 0 5px rgba(84, 207, 101, 0.14);
        }

        .intentBox {
          margin-top: 22px;
          width: min(100%, 680px);
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
        }

        .intentBox strong {
          display: block;
          margin-bottom: 10px;
          color: rgba(244, 239, 230, 0.86);
          font-size: 13px;
          font-weight: 800;
        }

        .intentButtons {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .intentButtons::-webkit-scrollbar {
          display: none;
        }

        .intentButtons button {
          flex: 0 0 auto;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 0 14px;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(244, 239, 230, 0.78);
          font-size: 12px;
          font-weight: 800;
          transition: 0.16s ease;
        }

        .intentButtons button.active,
        .intentButtons button:hover {
          background: var(--green);
          border-color: var(--green);
          color: #fff;
        }

        .heroActions {
          margin-top: 22px;
          display: grid;
          gap: 10px;
        }

        .primary, .ghost {
          min-height: 54px;
          border-radius: 999px;
          padding: 0 22px;
          border: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          letter-spacing: -0.02em;
          transition: transform 0.16s ease, opacity 0.16s ease, background 0.16s ease;
        }

        .primary:active, .ghost:active {
          transform: scale(0.985);
        }

        .primary {
          background: var(--green);
          color: #fff;
          box-shadow: 0 16px 40px rgba(44, 136, 54, 0.30);
        }

        .primary:hover {
          background: var(--green-strong);
        }

        .ghost {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(16px);
        }

        .ghost:hover {
          background: rgba(255, 255, 255, 0.13);
        }

        .clientStrip {
          background: var(--paper-2);
          padding: 18px clamp(16px, 4vw, 40px);
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .clientLabel {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: rgba(17, 24, 39, 0.48);
          text-align: center;
          margin: 0 0 14px;
        }

        .clientLogoWrap {
          display: flex;
          justify-content: center;
        }

        .clientLogoStrip {
          height: 36px;
          width: auto;
          max-width: 100%;
          mix-blend-mode: multiply;
        }

        .entry, .sequence, .proof, .formSection, .faqSection, .closing {
          width: min(1100px, calc(100% - 32px));
          margin: 0 auto;
        }

        .entry {
          padding: 58px 0 42px;
          display: grid;
          gap: 26px;
        }

        .entryPanel {
          color: var(--text-dark);
        }

        .entryPanel h2,
        .scenarioText h3,
        .sequence h2,
        .proofText h2,
        .formIntro h2,
        .faqSection h2,
        .closing h2 {
          font-family: "Barlow Condensed", sans-serif;
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .entryPanel h2 {
          margin: 8px 0 0;
          max-width: 620px;
          font-size: clamp(38px, 10vw, 76px);
          line-height: 0.92;
        }

        .entryLead {
          margin: 14px 0 0;
          max-width: 560px;
          color: var(--muted-dark);
          font-size: 15px;
          line-height: 1.58;
        }

        .scenarioPicker {
          margin-top: 22px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .scenarioPicker button {
          height: 40px;
          border-radius: 999px;
          border: 1px solid var(--line-dark);
          padding: 0 16px;
          background: #fff;
          color: rgba(17, 24, 39, 0.68);
          font-weight: 800;
          font-size: 13px;
          letter-spacing: -0.01em;
          transition: all 0.15s ease;
        }

        .scenarioPicker button.active,
        .scenarioPicker button:hover {
          background: var(--green);
          color: #fff;
          border-color: var(--green);
        }

        .scenarioText {
          margin-top: 20px;
          padding: 22px;
          border-radius: 22px;
          background: #fff;
          border: 1px solid rgba(17, 24, 39, 0.08);
          box-shadow: 0 20px 60px rgba(17, 24, 39, 0.08);
        }

        .scenarioText > span {
          display: block;
          margin-bottom: 8px;
          color: var(--green);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 10px;
          font-weight: 800;
        }

        .scenarioText h3 {
          margin: 0;
          font-size: clamp(30px, 7vw, 58px);
          line-height: 0.96;
        }

        .scenarioSub {
          margin: 12px 0 0;
          color: var(--muted-dark);
          font-size: 14px;
          line-height: 1.58;
          max-width: 560px;
        }

        .scenarioChips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 16px;
        }

        .chip {
          font-size: 11px;
          font-weight: 800;
          color: var(--green);
          background: var(--green-soft);
          border: 1px solid rgba(44, 136, 54, 0.18);
          padding: 5px 12px;
          border-radius: 999px;
        }

        .scenarioText > button {
          margin-top: 20px;
          min-height: 48px;
          border: 0;
          border-radius: 999px;
          padding: 0 20px;
          background: var(--green);
          color: #fff;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 12px 28px rgba(44, 136, 54, 0.22);
        }

        .entryImage {
          position: relative;
          min-height: 310px;
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(17, 24, 39, 0.10);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.68)),
            url("/images/lp3/hero-cbuq.jpg") center 65% / cover no-repeat,
            linear-gradient(135deg, #172417, #243424);
          box-shadow: 0 24px 72px rgba(17, 24, 39, 0.14);
        }

        .entryCaption {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          z-index: 2;
        }

        .entryCaption span {
          display: block;
          margin-bottom: 7px;
          color: #6ee37a;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 10px;
          font-weight: 800;
        }

        .entryCaption strong {
          display: block;
          max-width: 480px;
          color: #fff;
          font-size: 20px;
          line-height: 1.1;
          letter-spacing: -0.04em;
          font-weight: 900;
        }

        .sequence {
          margin-top: 20px;
          padding: 0;
          border-radius: 30px;
          overflow: hidden;
          color: var(--cream);
          background:
            radial-gradient(circle at 18% 20%, rgba(44, 136, 54, 0.24), transparent 34%),
            #0b1828;
          border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .sequenceInner {
          padding: 34px 18px 38px;
        }

        .sequence h2 {
          margin: 10px 0 0;
          max-width: 920px;
          font-size: clamp(40px, 10vw, 82px);
          line-height: 0.92;
        }

        .seqSub {
          margin: 16px 0 0;
          color: var(--muted-light);
          font-size: 14px;
          line-height: 1.65;
          max-width: 650px;
        }

        .lineProcess {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          overflow: hidden;
        }

        .processStep {
          padding: 18px 16px;
          background: rgba(0, 0, 0, 0.28);
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .processStep strong {
          font-size: 13px;
          font-weight: 900;
          color: var(--cream);
          letter-spacing: -0.01em;
        }

        .processStep span {
          font-size: 11px;
          color: var(--muted-light);
          line-height: 1.45;
        }

        .proof {
          padding: 54px 0 42px;
          display: grid;
          gap: 26px;
        }

        .proofImage {
          min-height: 310px;
          border-radius: 26px;
          border: 1px solid rgba(17, 24, 39, 0.10);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.48)),
            url("/images/lp3/patio-logistico.jpg") center 40% / cover no-repeat,
            linear-gradient(135deg, #172417, #263526);
          box-shadow: 0 24px 64px rgba(17, 24, 39, 0.14);
        }

        .proofText h2 {
          margin: 8px 0 0;
          max-width: 600px;
          font-size: clamp(40px, 10vw, 78px);
          line-height: 0.92;
        }

        .proofText > p {
          margin: 16px 0 0;
          color: var(--muted-dark);
          font-size: 15px;
          line-height: 1.62;
          max-width: 560px;
        }

        .proofStats {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line-dark);
          border: 1px solid var(--line-dark);
          border-radius: 16px;
          overflow: hidden;
        }

        .proofStat {
          padding: 18px 12px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: center;
        }

        .proofStat strong {
          font-family: "Barlow Condensed", sans-serif;
          font-size: clamp(30px, 8vw, 50px);
          font-weight: 900;
          color: var(--green);
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .proofStat span {
          font-size: 11px;
          color: var(--muted-dark);
          line-height: 1.35;
          font-weight: 700;
        }

        .proofText > button {
          margin-top: 22px;
          min-height: 48px;
          border: 0;
          border-radius: 999px;
          padding: 0 20px;
          background: var(--green);
          color: #fff;
          font-weight: 800;
          font-size: 14px;
        }

        .formSection {
          padding: 58px 0 68px;
          display: grid;
          gap: 30px;
        }

        .formIntro h2 {
          margin: 8px 0 0;
          max-width: 620px;
          font-size: clamp(40px, 10vw, 76px);
          line-height: 0.92;
        }

        .formIntro > p {
          margin: 14px 0 0;
          color: var(--muted-dark);
          font-size: 15px;
          line-height: 1.58;
          max-width: 560px;
        }

        .formBullets {
          list-style: none;
          padding: 0;
          margin: 20px 0 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .formBullets li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(17, 24, 39, 0.68);
          font-weight: 700;
        }

        .formBullets li span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          flex: 0 0 auto;
        }

        .leadForm {
          display: grid;
          gap: 12px;
          padding: 20px;
          border-radius: 24px;
          border: 1px solid rgba(17, 24, 39, 0.10);
          background: #fff;
          box-shadow: 0 24px 70px rgba(17, 24, 39, 0.10);
        }

        .leadForm label {
          display: grid;
          gap: 7px;
          color: rgba(17, 24, 39, 0.64);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .leadForm input, .leadForm select {
          width: 100%;
          min-height: 52px;
          border-radius: 12px;
          border: 1px solid rgba(17, 24, 39, 0.14);
          background: #f8fafc;
          color: var(--text-dark);
          outline: none;
          padding: 0 14px;
          font-size: 15px;
          font-weight: 600;
          -webkit-appearance: none;
        }

        .leadForm input::placeholder {
          color: rgba(17, 24, 39, 0.36);
        }

        .leadForm input:focus, .leadForm select:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(44, 136, 54, 0.14);
          background: #fff;
        }

        .leadForm .full {
          grid-column: 1 / -1;
        }

        .leadForm .primary {
          width: 100%;
          font-size: 15px;
          margin-top: 4px;
        }

        .formNote {
          text-align: center;
          font-size: 12px;
          color: rgba(17, 24, 39, 0.42);
          margin: 0;
          text-transform: none;
          letter-spacing: 0;
          font-weight: 600;
        }

        .faqSection {
          padding: 52px 0 58px;
          border-top: 1px solid rgba(17, 24, 39, 0.10);
        }

        .faqInner {
          max-width: 760px;
        }

        .faqSection h2 {
          margin: 8px 0 0;
          font-size: clamp(36px, 9vw, 64px);
          line-height: 0.94;
        }

        .faqList {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(17, 24, 39, 0.10);
        }

        .faqItem {
          border-bottom: 1px solid rgba(17, 24, 39, 0.10);
        }

        .faqItem button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 17px 0;
          background: none;
          border: none;
          text-align: left;
          color: var(--text-dark);
        }

        .faqItem button span {
          font-size: 15px;
          font-weight: 800;
          line-height: 1.35;
        }

        .faqItem button i {
          font-style: normal;
          font-size: 22px;
          font-weight: 400;
          color: var(--green);
          flex: 0 0 auto;
        }

        .faqItem p {
          font-size: 14px;
          color: var(--muted-dark);
          line-height: 1.65;
          padding-bottom: 17px;
          margin: 0;
          max-width: 620px;
        }

        .closing {
          width: 100%;
          min-height: 54svh;
          padding: 76px max(16px, calc((100vw - 1100px) / 2)) 112px;
          display: flex;
          align-items: center;
          color: var(--cream);
          background:
            linear-gradient(90deg, rgba(7, 18, 40, 0.92), rgba(7, 18, 40, 0.66)),
            linear-gradient(180deg, rgba(7, 18, 40, 0.10), rgba(7, 18, 40, 0.88)),
            url("/images/lp3/hero-cbuq.jpg") center 60% / cover no-repeat;
        }

        .closing > div {
          width: min(700px, 100%);
        }

        .closing h2 {
          margin: 8px 0 0;
          font-size: clamp(46px, 12vw, 96px);
          line-height: 0.9;
        }

        .closing p:not(.kicker) {
          margin: 18px 0 0;
          max-width: 560px;
          color: var(--muted-light);
          font-size: 15px;
          line-height: 1.58;
        }

        .closing .primary {
          margin-top: 26px;
        }

        .stickyCta {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 60;
          padding: 8px;
          border-radius: 22px;
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 8px;
          background: rgba(7, 18, 40, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(22px);
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.34);
          opacity: 0;
          transform: translateY(18px);
          pointer-events: none;
          transition: 0.22s ease;
        }

        .stickyCta.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .stickyCta .primary, .stickyCta .ghost {
          min-height: 50px;
          padding: 0 12px;
          font-size: 14px;
        }

        @media (min-width: 760px) {
          .topbar {
            left: 50%;
            right: auto;
            width: min(1100px, calc(100% - 48px));
            transform: translateX(-50%);
          }

          .hero {
            padding-left: max(30px, calc((100vw - 1100px) / 2));
            padding-right: max(30px, calc((100vw - 1100px) / 2));
          }

          .heroActions {
            display: flex;
            align-items: center;
          }

          .heroActions .primary, .heroActions .ghost {
            min-width: 230px;
          }

          .heroCreds {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 16px;
          }

          .entry {
            grid-template-columns: 1.02fr 0.98fr;
            align-items: center;
            gap: 40px;
            padding-top: 76px;
          }

          .entryImage {
            min-height: 590px;
          }

          .scenarioPicker {
            flex-wrap: nowrap;
          }

          .sequenceInner {
            padding: 58px 42px;
          }

          .lineProcess {
            grid-template-columns: repeat(4, 1fr);
          }

          .proof {
            grid-template-columns: 1.02fr 0.98fr;
            align-items: center;
            gap: 42px;
            padding: 76px 0;
          }

          .proofImage {
            min-height: 500px;
          }

          .formSection {
            grid-template-columns: 0.82fr 1.18fr;
            align-items: start;
            padding-top: 76px;
          }

          .leadForm {
            grid-template-columns: 1fr 1fr;
          }

          .stickyCta {
            display: none;
          }
        }

        @media (max-width: 759px) {
          .lineProcess {
            display: flex !important;
            grid-template-columns: unset !important;
            overflow-x: auto;
            scrollbar-width: none;
            border-radius: 14px;
          }

          .lineProcess::-webkit-scrollbar {
            display: none;
          }

          .processStep {
            flex: 0 0 176px;
          }

          .proofStats {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 430px) {
          .brand img {
            max-width: 155px;
            height: 27px;
          }

          .hero h1 {
            font-size: 45px;
          }

          .heroSub {
            font-size: 14px;
          }

          .topbar > button {
            padding: 0 12px;
            font-size: 12px;
          }

          .proofStat {
            padding: 15px 8px;
          }
        }
      `}</style>
    </main>
  );
}
