"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5564993273958";
const HERO_VIDEO =
  "https://res.cloudinary.com/dfw7h9c2j/video/upload/v1778589177/silo-bg_tjhnws.mp4";

const SCENARIOS = [
  {
    id: "construtora",
    label: "Construtora",
    title: "Você mantém o contrato. A GP executa a pavimentação.",
    message: "Preciso terceirizar a pavimentação da obra",
  },
  {
    id: "loteamento",
    label: "Loteamento",
    title: "Ruas e acessos prontos para entregar o empreendimento.",
    message: "Tenho loteamento ou condomínio para entregar",
  },
  {
    id: "usina",
    label: "Usina",
    title: "Você fornece a massa. A GP aplica em campo.",
    message: "Sou usina e preciso apoiar um cliente na aplicação",
  },
  {
    id: "patio",
    label: "Pátio / acesso",
    title: "Base, aplicação e compactação para áreas operacionais.",
    message: "Preciso pavimentar pátio, acesso ou área operacional",
  },
] as const;

const TYPING_LINES = [
  "Tenho uma obra e preciso aplicar CBUQ...",
  "Já tenho massa e preciso de equipe...",
  "Preciso terceirizar a pavimentação...",
  "Tenho loteamento para entregar...",
];

type Scenario = (typeof SCENARIOS)[number];

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

  const currentTypingLine = useMemo(
    () => TYPING_LINES[typingIndex % TYPING_LINES.length],
    [typingIndex]
  );

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
    let char = 0;
    setTypedText("");

    const typing = window.setInterval(() => {
      char += 1;
      setTypedText(currentTypingLine.slice(0, char));

      if (char >= currentTypingLine.length) {
        window.clearInterval(typing);

        window.setTimeout(() => {
          setTypingIndex((prev) => prev + 1);
        }, 1300);
      }
    }, 42);

    return () => window.clearInterval(typing);
  }, [currentTypingLine]);

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
          <img
            src="/logo-p2.png"
            alt="GP Asfalto"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <span>GP ASFALTO</span>
        </a>

        <button type="button" onClick={() => goToForm()}>
          Iniciar avaliação
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
          <p className="serviceLine">Aplicação asfáltica • base • compactação</p>

          <h1>
            Asfalto aplicado.
            <span>Obra andando.</span>
          </h1>

          <div className="typingBox">
            <span>{typedText}</span>
            <i />
          </div>

          <p className="heroText">
            Equipe, equipamentos e execução para obras que precisam sair do papel.
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

      <section className="scenario" id="cenario">
        <div className="panel">
          <div className="panelIntro">
            <small>Entrada rápida</small>
            <h2>Onde a GP entra?</h2>
          </div>

          <div className="tabs">
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

          <div className="scenarioResult">
            <h3>{selected.title}</h3>

            <button type="button" onClick={() => goToForm(selected)}>
              Enviar este cenário
            </button>
          </div>
        </div>
      </section>

      <section className="operation">
        <div>
          <small>Execução coordenada</small>
          <h2>Base no ponto. Massa no tempo. Rolo na sequência.</h2>
        </div>

        <p>
          A aplicação depende de ritmo. A GP entra para organizar campo, equipe e equipamento.
        </p>
      </section>

      <section className="formSection" id="avaliacao">
        <div className="formIntro">
          <small>Avaliação inicial</small>
          <h2>Envie o básico da obra.</h2>
          <p>
            A conversa começa com cidade, cenário e volume aproximado.
          </p>
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
              placeholder="Prazo, acesso, condição da base ou detalhe importante."
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
        :root {
          --green: #16a10b;
          --green-soft: rgba(22, 161, 11, 0.24);
          --black: #050605;
          --text: #f5f3ea;
          --muted: rgba(245, 243, 234, 0.62);
          --line: rgba(255, 255, 255, 0.13);
          --glass: rgba(12, 13, 12, 0.58);
          --card: rgba(255, 255, 255, 0.055);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--black);
          color: var(--text);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
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
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 50% 0%, rgba(22, 161, 11, 0.1), transparent 34%),
            var(--black);
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
          background: rgba(5, 6, 5, 0.62);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.22);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fff;
          text-decoration: none;
          min-width: 0;
        }

        .brand img {
          height: 28px;
          max-width: 150px;
          object-fit: contain;
          display: block;
        }

        .brand span {
          padding-left: 8px;
          font-size: 14px;
          font-weight: 950;
          letter-spacing: -0.04em;
          white-space: nowrap;
        }

        .topbar > button {
          height: 40px;
          border: 0;
          border-radius: 999px;
          padding: 0 15px;
          background: #fff;
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
          filter: contrast(1.14) saturate(0.72) brightness(0.74);
          transform: scale(1.04);
          z-index: -3;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 70% 20%, rgba(22, 161, 11, 0.17), transparent 26%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26) 32%, rgba(0, 0, 0, 0.92) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.1));
        }

        .heroShade::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 82px 82px;
          opacity: 0.18;
          mask-image: linear-gradient(180deg, transparent 0%, #000 42%, #000 100%);
        }

        .heroContent {
          width: min(100%, 760px);
        }

        .serviceLine,
        .panelIntro small,
        .operation small,
        .formIntro small {
          display: block;
          color: #42df35;
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 0.17em;
        }

        .hero h1 {
          margin: 12px 0 0;
          font-size: clamp(52px, 17vw, 118px);
          line-height: 0.82;
          letter-spacing: -0.095em;
          max-width: 860px;
          text-wrap: balance;
        }

        .hero h1 span {
          display: block;
          color: rgba(245, 243, 234, 0.56);
        }

        .typingBox {
          margin-top: 18px;
          min-height: 42px;
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(245, 243, 234, 0.88);
          font-size: clamp(18px, 5vw, 28px);
          font-weight: 760;
          letter-spacing: -0.04em;
        }

        .typingBox i {
          width: 2px;
          height: 1.05em;
          background: #42df35;
          display: inline-block;
          animation: blink 0.8s infinite;
        }

        @keyframes blink {
          0%,
          45% {
            opacity: 1;
          }

          46%,
          100% {
            opacity: 0;
          }
        }

        .heroText {
          margin: 8px 0 0;
          max-width: 520px;
          color: var(--muted);
          font-size: 16px;
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
          font-weight: 930;
          letter-spacing: -0.025em;
          transition: transform 0.16s ease, background 0.16s ease;
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
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(16px);
        }

        .scenario,
        .operation,
        .formSection,
        .closing {
          width: min(1080px, calc(100% - 36px));
          margin: 0 auto;
        }

        .scenario {
          padding: 64px 0 36px;
        }

        .panel {
          padding: 16px;
          border: 1px solid var(--line);
          border-radius: 34px;
          background:
            radial-gradient(circle at 88% 16%, rgba(22, 161, 11, 0.18), transparent 34%),
            rgba(255, 255, 255, 0.045);
        }

        .panelIntro h2,
        .operation h2,
        .formIntro h2,
        .closing h2 {
          margin: 8px 0 0;
          font-size: clamp(38px, 10vw, 74px);
          line-height: 0.9;
          letter-spacing: -0.085em;
          text-wrap: balance;
        }

        .tabs {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .tabs button {
          min-height: 46px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(245, 243, 234, 0.76);
          font-size: 13px;
          font-weight: 900;
        }

        .tabs button.active {
          background: #f5f3ea;
          color: #060706;
          border-color: #f5f3ea;
        }

        .scenarioResult {
          margin-top: 16px;
          padding: 20px;
          min-height: 220px;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.38)),
            rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.11);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .scenarioResult h3 {
          margin: 0;
          max-width: 720px;
          font-size: clamp(32px, 8vw, 66px);
          line-height: 0.94;
          letter-spacing: -0.075em;
          text-wrap: balance;
        }

        .scenarioResult button {
          margin-top: 28px;
          width: fit-content;
          min-height: 48px;
          border: 0;
          border-radius: 999px;
          padding: 0 18px;
          background: rgba(66, 223, 53, 0.16);
          color: #42df35;
          font-weight: 930;
        }

        .operation {
          padding: 34px 0 58px;
          display: grid;
          gap: 18px;
        }

        .operation p,
        .formIntro p,
        .closing p {
          margin: 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.42;
          letter-spacing: -0.025em;
          max-width: 540px;
        }

        .formSection {
          padding: 36px 0 72px;
          display: grid;
          gap: 24px;
        }

        .leadForm {
          display: grid;
          gap: 11px;
          padding: 16px;
          border-radius: 32px;
          border: 1px solid var(--line);
          background:
            radial-gradient(circle at 100% 0%, rgba(22, 161, 11, 0.18), transparent 36%),
            rgba(255, 255, 255, 0.055);
        }

        .leadForm label {
          display: grid;
          gap: 7px;
          color: rgba(245, 243, 234, 0.62);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.02em;
        }

        .leadForm input,
        .leadForm select,
        .leadForm textarea {
          width: 100%;
          min-height: 52px;
          border-radius: 17px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(0, 0, 0, 0.28);
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
          border-color: rgba(66, 223, 53, 0.78);
          box-shadow: 0 0 0 4px rgba(66, 223, 53, 0.1);
        }

        .full {
          grid-column: 1 / -1;
        }

        .closing {
          min-height: 54svh;
          padding: 80px 0 118px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
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
          background: rgba(5, 6, 5, 0.76);
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

          .tabs {
            display: flex;
            flex-wrap: wrap;
          }

          .tabs button {
            padding: 0 18px;
          }

          .scenarioResult {
            min-height: 260px;
            padding: 28px;
          }

          .operation {
            grid-template-columns: 1fr 0.54fr;
            align-items: end;
            padding-top: 60px;
          }

          .formSection {
            grid-template-columns: 0.82fr 1.18fr;
            align-items: start;
            padding-top: 60px;
          }

          .leadForm {
            grid-template-columns: 1fr 1fr;
          }

          .stickyCta {
            display: none;
          }
        }

        @media (min-width: 1100px) {
          .hero h1 {
            max-width: 880px;
          }

          .heroText {
            font-size: 18px;
          }

          .heroVideo {
            object-position: center center;
          }
        }

        @media (max-width: 410px) {
          .hero h1 {
            font-size: 48px;
          }

          .topbar > button {
            padding: 0 12px;
          }

          .brand span {
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}
