"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5564993273958";
const HERO_VIDEO =
  "https://res.cloudinary.com/dfw7h9c2j/video/upload/v1778589177/silo-bg_tjhnws.mp4";

const SCENARIOS = [
  {
    id: "construtora",
    label: "Construtora",
    title: "Executar a pavimentação sem travar seu contrato.",
    message: "Sou construtora e preciso terceirizar a pavimentação",
  },
  {
    id: "loteamento",
    label: "Loteamento",
    title: "Entregar ruas, acessos e acabamento do empreendimento.",
    message: "Tenho loteamento ou condomínio para pavimentar",
  },
  {
    id: "usina",
    label: "Usina",
    title: "Aplicar em campo a massa que você já fornece.",
    message: "Sou usina e preciso de apoio na aplicação",
  },
  {
    id: "area-operacional",
    label: "Pátio / acesso",
    title: "Preparar base, aplicar e compactar áreas de uso real.",
    message: "Preciso pavimentar pátio, acesso ou área operacional",
  },
] as const;

type Scenario = (typeof SCENARIOS)[number];

const TYPING_LINES = [
  "Tenho uma obra e preciso aplicar CBUQ...",
  "Já tenho massa e preciso de equipe...",
  "Preciso terceirizar a pavimentação...",
  "Tenho loteamento para entregar...",
];

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

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
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

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
    const current = TYPING_LINES[typingIndex % TYPING_LINES.length];
    let char = 0;
    setTypedText("");

    const interval = window.setInterval(() => {
      char += 1;
      setTypedText(current.slice(0, char));

      if (char >= current.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setTypingIndex((prev) => prev + 1), 1300);
      }
    }, 38);

    return () => window.clearInterval(interval);
  }, [typingIndex]);

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > window.innerHeight * 0.72);
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
    openWhatsapp(`Olá, quero falar com a GP Asfalto.

Situação:
${message}

Gostaria de uma avaliação para aplicação asfáltica.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") || "");
    const city = String(form.get("city") || "");
    const volume = String(form.get("volume") || "Não informado");
    const note = String(form.get("note") || "Sem observações");

    openWhatsapp(`Olá, quero solicitar uma avaliação para aplicação asfáltica.

Nome: ${name}
WhatsApp: ${phone}
Cidade da obra: ${city}

Cenário:
${selected.message}

Metragem ou volume aproximado:
${volume}

Observação:
${note}

Vim pela LP3 da GP Asfalto.`);
  }

  return (
    <main className="lp3">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="GP Asfalto">
          <strong>GP</strong>
          <span>ASFALTO</span>
        </a>

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
          <p className="kicker">Aplicação asfáltica · Base · Compactação</p>

          <h1>
            Asfalto aplicado.
            <span>Obra andando.</span>
          </h1>

          <div className="typingLine">
            <span>{typedText}</span>
            <i />
          </div>

          <p className="heroSub">
            Equipe, equipamento e execução para transformar frente de obra em pavimento pronto.
          </p>

          <div className="heroActions">
            <button className="primary" type="button" onClick={() => goToForm()}>
              Iniciar avaliação
            </button>

            <button
              className="ghost"
              type="button"
              onClick={() => quickWhatsapp("Já tenho massa e preciso aplicar")}
            >
              Já tenho massa
            </button>
          </div>
        </div>
      </section>

      <section className="scenario">
        <div className="scenarioHead">
          <p className="kicker">Entrada rápida</p>
          <h2>Onde a GP entra?</h2>
        </div>

        <div className="scenarioLayout">
          <div className="scenarioRail">
            {SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={selected.id === item.id ? "active" : ""}
                onClick={() => setSelected(item)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="scenarioText">
            <small>{selected.label}</small>
            <h3>{selected.title}</h3>
            <button type="button" onClick={() => goToForm(selected)}>
              Enviar cenário
            </button>
          </div>
        </div>
      </section>

      <section className="process">
        <p className="kicker">Sequência de campo</p>
        <h2>Base no ponto. Massa no tempo. Rolo na sequência.</h2>
        <p>
          Aplicação asfáltica não é só espalhar massa. É preparar, aplicar,
          compactar e liberar com ritmo de obra.
        </p>
      </section>

      <section className="formSection" id="avaliacao">
        <div className="formIntro">
          <p className="kicker">Avaliação inicial</p>
          <h2>Envie o básico da obra.</h2>
          <p>Cidade, cenário e volume aproximado. A conversa começa por aqui.</p>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>

          <label>
            WhatsApp
            <input
              name="phone"
              type="tel"
              placeholder="(64) 99327-3958"
              value={phone}
              onChange={(event) => setPhone(maskPhone(event.target.value))}
              required
            />
          </label>

          <label>
            Cidade da obra
            <input name="city" type="text" placeholder="Ex: Rio Verde-GO" required />
          </label>

          <label>
            Cenário
            <select
              value={selected.id}
              onChange={(event) => {
                const next = SCENARIOS.find((item) => item.id === event.target.value);
                if (next) setSelected(next);
              }}
            >
              {SCENARIOS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="full">
            Metragem ou volume, se souber
            <input name="volume" type="text" placeholder="Ex: 8.000 m² ou 450 t" />
          </label>

          <label className="full">
            Observação rápida
            <textarea
              name="note"
              placeholder="Prazo, acesso, base, etapa da obra ou detalhe importante."
            />
          </label>

          <button className="primary full" type="submit">
            Enviar no WhatsApp
          </button>
        </form>
      </section>

      <section className="closing">
        <h2>Vamos avaliar sua obra?</h2>
        <p>WhatsApp GP Asfalto: 64 99327-3958</p>
        <button className="primary" type="button" onClick={() => goToForm()}>
          Iniciar avaliação
        </button>
      </section>

      <div className={showSticky ? "stickyCta visible" : "stickyCta"}>
        <button
          className="ghost"
          type="button"
          onClick={() => quickWhatsapp("Quero falar sobre aplicação asfáltica")}
        >
          WhatsApp
        </button>

        <button className="primary" type="button" onClick={() => goToForm()}>
          Avaliar obra
        </button>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@85,500;85,600;85,700;95,500;95,700;100,600;100,800&family=Inter:wght@500;600;700;800;900&display=swap");

        :root {
          --green: #16a10b;
          --green2: #22d313;
          --asphalt: #050606;
          --asphalt2: #0b0c0b;
          --text: #f4f0e6;
          --muted: rgba(244, 240, 230, 0.62);
          --line: rgba(255, 255, 255, 0.13);
          --line2: rgba(255, 255, 255, 0.08);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--asphalt);
          color: var(--text);
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .lp3 {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 80% 0%, rgba(22, 161, 11, 0.08), transparent 28%),
            linear-gradient(180deg, #070807 0%, #030403 100%);
        }

        .lp3::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background:
            radial-gradient(circle at 12% 18%, rgba(255, 255, 255, 0.035) 0 1px, transparent 2px),
            radial-gradient(circle at 75% 32%, rgba(255, 255, 255, 0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 48% 72%, rgba(255, 255, 255, 0.03) 0 1px, transparent 2px),
            repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 19px),
            linear-gradient(135deg, #050606, #090a09 42%, #030403);
          background-size: 80px 80px, 120px 120px, 95px 95px, 100% 100%, 100% 100%;
          opacity: 1;
        }

        .lp3::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 0%, rgba(22, 161, 11, 0.09), transparent 32%),
            linear-gradient(90deg, rgba(0,0,0,0.45), transparent 32%, rgba(0,0,0,0.38));
          mix-blend-mode: screen;
          opacity: 0.55;
        }

        .topbar {
          position: fixed;
          top: 14px;
          left: 14px;
          right: 14px;
          z-index: 50;
          height: 52px;
          padding: 6px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(5, 6, 6, 0.66);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding-left: 12px;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.04em;
        }

        .brand strong {
          font-family: Archivo, Inter, sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: var(--green2);
        }

        .brand span {
          font-family: Archivo, Inter, sans-serif;
          font-size: 17px;
          font-weight: 700;
        }

        .topbar > button {
          height: 40px;
          border: 0;
          border-radius: 999px;
          padding: 0 15px;
          background: #f4f0e6;
          color: #080908;
          font-size: 12px;
          font-weight: 900;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          padding: 86px 20px 34px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          isolation: isolate;
        }

        .heroVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 58% center;
          filter: contrast(1.16) saturate(0.68) brightness(0.72);
          transform: scale(1.04);
          z-index: -3;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.35) 32%, rgba(3, 4, 3, 0.96) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.1)),
            radial-gradient(circle at 78% 28%, rgba(22, 161, 11, 0.18), transparent 28%);
        }

        .heroContent {
          width: min(100%, 720px);
        }

        .kicker {
          margin: 0;
          color: var(--green2);
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.17em;
        }

        .hero h1,
        .scenarioHead h2,
        .scenarioText h3,
        .process h2,
        .formIntro h2,
        .closing h2 {
          font-family: Archivo, Inter, sans-serif;
          font-weight: 500;
          letter-spacing: -0.078em;
          text-wrap: balance;
        }

        .hero h1 {
          margin: 12px 0 0;
          font-size: clamp(54px, 16vw, 110px);
          line-height: 0.82;
          max-width: 800px;
        }

        .hero h1 span {
          display: block;
          color: rgba(244, 240, 230, 0.52);
        }

        .typingLine {
          margin-top: 18px;
          min-height: 38px;
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(244, 240, 230, 0.92);
          font-size: clamp(18px, 4.8vw, 26px);
          font-weight: 800;
          letter-spacing: -0.045em;
        }

        .typingLine i {
          width: 2px;
          height: 1.05em;
          background: var(--green2);
          display: inline-block;
          animation: blink 0.8s infinite;
        }

        @keyframes blink {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }

        .heroSub {
          margin: 8px 0 0;
          max-width: 520px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.42;
          letter-spacing: -0.02em;
        }

        .heroActions {
          margin-top: 22px;
          display: grid;
          gap: 10px;
        }

        .primary,
        .ghost {
          min-height: 56px;
          border-radius: 999px;
          padding: 0 22px;
          border: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-weight: 900;
          letter-spacing: -0.025em;
          transition: transform 0.16s ease;
        }

        .primary:active,
        .ghost:active {
          transform: scale(0.985);
        }

        .primary {
          background: linear-gradient(135deg, #119208, #20c914);
          color: white;
          box-shadow: 0 20px 54px rgba(22, 161, 11, 0.34);
        }

        .ghost {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(16px);
        }

        .scenario,
        .process,
        .formSection,
        .closing {
          width: min(1080px, calc(100% - 36px));
          margin: 0 auto;
        }

        .scenario {
          padding: 58px 0 42px;
        }

        .scenarioHead h2 {
          margin: 8px 0 0;
          font-size: clamp(44px, 11vw, 86px);
          line-height: 0.88;
        }

        .scenarioLayout {
          margin-top: 28px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line2);
        }

        .scenarioRail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--line2);
        }

        .scenarioRail button {
          min-height: 62px;
          border: 0;
          border-right: 1px solid var(--line2);
          border-bottom: 1px solid var(--line2);
          background: transparent;
          color: rgba(244, 240, 230, 0.62);
          font-weight: 900;
          letter-spacing: -0.025em;
        }

        .scenarioRail button:nth-child(2n) {
          border-right: 0;
        }

        .scenarioRail button.active {
          color: #fff;
          background:
            linear-gradient(180deg, rgba(22, 161, 11, 0.16), rgba(22, 161, 11, 0.04));
        }

        .scenarioText {
          padding: 28px 0;
        }

        .scenarioText small {
          display: block;
          color: var(--green2);
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.16em;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .scenarioText h3 {
          margin: 0;
          max-width: 850px;
          font-size: clamp(40px, 10.5vw, 84px);
          line-height: 0.9;
        }

        .scenarioText button {
          margin-top: 22px;
          min-height: 46px;
          border: 0;
          border-radius: 999px;
          padding: 0 18px;
          background: rgba(22, 161, 11, 0.16);
          color: var(--green2);
          font-weight: 900;
        }

        .process {
          padding: 42px 0 58px;
          border-bottom: 1px solid var(--line2);
        }

        .process h2 {
          margin: 10px 0 0;
          font-size: clamp(42px, 11vw, 88px);
          line-height: 0.86;
          max-width: 900px;
        }

        .process p {
          margin: 22px 0 0;
          max-width: 560px;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.45;
          letter-spacing: -0.025em;
        }

        .formSection {
          padding: 58px 0 72px;
          display: grid;
          gap: 24px;
        }

        .formIntro h2 {
          margin: 8px 0 0;
          font-size: clamp(42px, 11vw, 82px);
          line-height: 0.88;
        }

        .formIntro p {
          margin: 16px 0 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.42;
        }

        .leadForm {
          display: grid;
          gap: 11px;
          padding: 16px;
          border-radius: 28px;
          border: 1px solid var(--line);
          background:
            radial-gradient(circle at 100% 0%, rgba(22, 161, 11, 0.14), transparent 38%),
            rgba(255, 255, 255, 0.045);
        }

        .leadForm label {
          display: grid;
          gap: 7px;
          color: rgba(244, 240, 230, 0.62);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.02em;
        }

        .leadForm input,
        .leadForm select,
        .leadForm textarea {
          width: 100%;
          min-height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(0, 0, 0, 0.34);
          color: white;
          outline: none;
          padding: 0 14px;
        }

        .leadForm textarea {
          min-height: 92px;
          padding: 14px;
          resize: vertical;
        }

        .leadForm select option {
          color: #111;
        }

        .leadForm input:focus,
        .leadForm select:focus,
        .leadForm textarea:focus {
          border-color: rgba(34, 211, 19, 0.74);
          box-shadow: 0 0 0 4px rgba(34, 211, 19, 0.1);
        }

        .full {
          grid-column: 1 / -1;
        }

        .closing {
          min-height: 52svh;
          padding: 76px 0 118px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          border-top: 1px solid var(--line2);
        }

        .closing h2 {
          margin: 0;
          font-size: clamp(44px, 12vw, 92px);
          line-height: 0.86;
        }

        .closing p {
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 17px;
        }

        .closing .primary {
          margin-top: 24px;
        }

        .stickyCta {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 60;
          padding: 8px;
          border-radius: 24px;
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 8px;
          background: rgba(5, 6, 6, 0.78);
          border: 1px solid var(--line);
          backdrop-filter: blur(22px);
          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.42);
          opacity: 0;
          transform: translateY(18px);
          pointer-events: none;
          transition: 0.2s ease;
        }

        .stickyCta.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .stickyCta .primary,
        .stickyCta .ghost {
          min-height: 52px;
          padding: 0 12px;
          font-size: 14px;
        }

        @media (min-width: 760px) {
          .topbar {
            left: 50%;
            right: auto;
            width: min(1080px, calc(100% - 48px));
            transform: translateX(-50%);
          }

          .hero {
            padding-left: max(30px, calc((100vw - 1080px) / 2));
            padding-right: max(30px, calc((100vw - 1080px) / 2));
          }

          .heroActions {
            display: flex;
            align-items: center;
          }

          .heroActions .primary,
          .heroActions .ghost {
            min-width: 220px;
          }

          .scenarioLayout {
            display: grid;
            grid-template-columns: 280px 1fr;
          }

          .scenarioRail {
            grid-template-columns: 1fr;
            border-bottom: 0;
            border-right: 1px solid var(--line2);
          }

          .scenarioRail button {
            border-right: 0;
          }

          .scenarioText {
            padding: 34px;
          }

          .formSection {
            grid-template-columns: 0.82fr 1.18fr;
            align-items: start;
            padding-top: 70px;
          }

          .leadForm {
            grid-template-columns: 1fr 1fr;
          }

          .stickyCta {
            display: none;
          }
        }

        @media (min-width: 1100px) {
          .heroVideo {
            object-position: center center;
          }

          .heroSub {
            font-size: 17px;
          }
        }

        @media (max-width: 410px) {
          .hero h1 {
            font-size: 50px;
          }

          .brand strong,
          .brand span {
            font-size: 14px;
          }

          .topbar > button {
            padding: 0 12px;
          }
        }
      `}</style>
    </main>
  );
}
