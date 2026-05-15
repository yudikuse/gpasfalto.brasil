"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5564993273958";

const HERO_VIDEO =
  "https://res.cloudinary.com/dfw7h9c2j/video/upload/v1778589177/silo-bg_tjhnws.mp4";

const SCENARIOS = [
  {
    id: "construtora",
    label: "Construtora",
    title: "Pavimentação terceirizada para sua obra avançar.",
    message: "Sou construtora e preciso terceirizar a pavimentação",
  },
  {
    id: "loteamento",
    label: "Loteamento",
    title: "Ruas, acessos e acabamento para entregar o empreendimento.",
    message: "Tenho loteamento ou condomínio para pavimentar",
  },
  {
    id: "usina",
    label: "Usina",
    title: "Você fornece a massa. A GP Asfalto aplica em campo.",
    message: "Sou usina e preciso de apoio na aplicação",
  },
  {
    id: "patio",
    label: "Pátio / acesso",
    title: "Base, aplicação e compactação para áreas de uso real.",
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
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [phone, setPhone] = useState("");
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
    const line = TYPING_LINES[typingIndex % TYPING_LINES.length];
    let char = 0;

    setTypedText("");

    const interval = window.setInterval(() => {
      char += 1;
      setTypedText(line.slice(0, char));

      if (char >= line.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setTypingIndex((prev) => prev + 1);
        }, 1400);
      }
    }, 38);

    return () => window.clearInterval(interval);
  }, [typingIndex]);

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > window.innerHeight * 0.75);
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
            src="/images/logo-white.png"
            alt="GP Asfalto"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              const fallback = event.currentTarget.nextElementSibling;
              if (fallback instanceof HTMLElement) fallback.style.display = "inline-flex";
            }}
          />
          <span>GP Asfalto</span>
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

      {/* CLIENT STRIP */}
      <div className="clientStrip">
        <p className="clientLabel">Obras executadas para</p>
        <div className="clientScroll">
          {["COMIGO","LDC","Raízen","Nutrien","Mosaic","Mercado Livre","Fetz","Grupo Cereal"].map(c => (
            <span key={c} className="clientChip">{c}</span>
          ))}
        </div>
      </div>

      <section className="entry">
        <div className="entryImage">
          <div className="entryCaption">
            <span>Obra em campo</span>
            <strong>Base, massa, aplicação e rolo trabalhando em sequência.</strong>
          </div>
        </div>

        <div className="entryPanel">
          <p className="kicker">Entrada rápida</p>
          <h2>Onde a GP Asfalto entra?</h2>

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

          <div className="scenarioText">
            <span>{selected.label}</span>
            <h3>{selected.title}</h3>

            <button type="button" onClick={() => goToForm(selected)}>
              Enviar cenário
            </button>
          </div>
        </div>
      </section>

      <section className="sequence">
        <div className="sequenceInner">
          <p className="kicker">Sequência de campo</p>
          <h2>Base no ponto. Massa no tempo. Rolo na sequência.</h2>

          <div className="lineProcess" aria-label="Processo de aplicação">
            <span>Base</span>
            <span>Massa</span>
            <span>Aplicação</span>
            <span>Compactação</span>
          </div>
        </div>
      </section>

      <section className="proof">
        <div className="proofImage" />

        <div className="proofText">
          <p className="kicker">Execução</p>
          <h2>Não é só massa. É obra entregue.</h2>
          <p>
            A GP Asfalto entra com operação em campo para aplicação, base,
            compactação e acabamento quando a obra precisa andar.
          </p>

          <button type="button" onClick={() => goToForm()}>
            Avaliar minha obra
          </button>
        </div>
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

          <button className="primary full" type="submit">
            Enviar no WhatsApp
          </button>
        </form>
      </section>

      <section className="closing">
        <div>
          <p className="kicker">GP Asfalto</p>
          <h2>Vamos avaliar sua obra?</h2>
          <p>Envie cidade, cenário e volume aproximado para entender onde entramos.</p>

          <button className="primary" type="button" onClick={() => goToForm()}>
            Iniciar avaliação
          </button>
        </div>
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
          --green: #17a40b;
          --green2: #22d313;
          --asphalt: #040504;
          --graphite: #0d0f0d;
          --cream: #f4efe3;
          --muted: rgba(244, 239, 227, 0.66);
          --line: rgba(255, 255, 255, 0.14);
          --line-soft: rgba(255, 255, 255, 0.08);
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
          color: var(--cream);
          font-family:
            "Inter Tight",
            "Manrope",
            "Inter",
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
          background: #050605;
        }

        .topbar {
          position: fixed;
          top: 14px;
          left: 14px;
          right: 14px;
          z-index: 50;
          height: 56px;
          padding: 7px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(5, 6, 5, 0.72);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
        }

        .brand {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          color: white;
          text-decoration: none;
          padding-left: 12px;
        }

        .brand img {
          height: 32px;
          width: auto;
          max-width: 188px;
          object-fit: contain;
          display: block;
        }

        .brand span {
          display: none;
          color: #fff;
          font-weight: 900;
          letter-spacing: -0.04em;
          font-size: 18px;
        }

        .topbar > button {
          height: 42px;
          border: 0;
          border-radius: 999px;
          padding: 0 16px;
          background: var(--cream);
          color: #070807;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          padding: 90px 20px 34px;
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
          filter: contrast(1.14) saturate(0.78) brightness(0.74);
          transform: scale(1.04);
          z-index: -3;
        }

        .heroShade {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 76% 22%, rgba(22, 164, 11, 0.10), transparent 28%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.28) 38%, rgba(5, 6, 5, 0.88) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.05));
        }

        .heroShade::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.25) 45%, rgba(0,0,0,.9) 100%);
        }

        .heroContent {
          width: min(100%, 730px);
          position: relative;
          z-index: 2;
        }

        .kicker {
          margin: 0;
          color: var(--green2);
          text-transform: uppercase;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 0.17em;
        }

        .hero h1,
        .entryPanel h2,
        .scenarioText h3,
        .sequence h2,
        .proofText h2,
        .formIntro h2,
        .closing h2 {
          font-family:
            "Inter Tight",
            "Manrope",
            "Arial Narrow",
            system-ui,
            sans-serif;
          font-weight: 900;
          letter-spacing: -0.07em;
          text-wrap: balance;
        }

        .hero h1 {
          margin: 12px 0 0;
          font-size: clamp(52px, 14.8vw, 102px);
          line-height: 0.82;
          max-width: 780px;
        }

        .hero h1 span {
          display: block;
          color: rgba(244, 239, 227, 0.5);
        }

        .typingLine {
          margin-top: 18px;
          min-height: 38px;
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(244, 239, 227, 0.95);
          font-size: clamp(18px, 4.6vw, 26px);
          font-weight: 850;
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

        .entry,
        .sequence,
        .proof,
        .formSection,
        .closing {
          width: min(1080px, calc(100% - 36px));
          margin: 0 auto;
        }

        .entry {
          padding: 54px 0 38px;
          display: grid;
          gap: 22px;
        }

        .entryImage {
          position: relative;
          height: 330px;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid var(--line);
          background:
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.60)),
            url("/images/lp3/hero-cbuq.jpg") center 65% / cover no-repeat,
            linear-gradient(135deg, #0f1f0f, #1a2e1a);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
        }

        .entryImage::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 82% 18%, rgba(22, 164, 11, 0.14), transparent 30%);
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
          margin-bottom: 8px;
          color: var(--green2);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 10px;
          font-weight: 950;
        }

        .entryCaption strong {
          display: block;
          max-width: 480px;
          color: white;
          font-size: 22px;
          line-height: 1.04;
          letter-spacing: -0.045em;
        }

        .entryPanel h2 {
          margin: 8px 0 0;
          font-size: clamp(38px, 10vw, 78px);
          line-height: 0.9;
        }

        .scenarioPicker {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line-soft);
        }

        .scenarioPicker button {
          min-height: 58px;
          border: 0;
          border-right: 1px solid var(--line-soft);
          border-bottom: 1px solid var(--line-soft);
          background: rgba(0, 0, 0, 0.22);
          color: rgba(244, 239, 227, 0.7);
          font-weight: 900;
          letter-spacing: -0.025em;
        }

        .scenarioPicker button.active {
          color: white;
          background:
            linear-gradient(120deg, rgba(22, 164, 11, 0.25), rgba(22, 164, 11, 0.06)),
            rgba(255, 255, 255, 0.035);
        }

        .scenarioText {
          padding-top: 24px;
        }

        .scenarioText span {
          display: block;
          margin-bottom: 10px;
          color: var(--green2);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 10px;
          font-weight: 950;
        }

        .scenarioText h3 {
          margin: 0;
          font-size: clamp(34px, 8.8vw, 68px);
          line-height: 0.92;
        }

        .scenarioText button,
        .proofText button {
          margin-top: 20px;
          min-height: 46px;
          border: 0;
          border-radius: 999px;
          padding: 0 18px;
          background: rgba(22, 164, 11, 0.18);
          color: var(--green2);
          font-weight: 900;
        }

        .sequence {
          margin-top: 22px;
          padding: 0;
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: #0b0d0b;
        }

        .sequenceInner {
          padding: 34px 18px;
        }

        .sequence h2 {
          margin: 10px 0 0;
          font-size: clamp(40px, 10.5vw, 82px);
          line-height: 0.86;
          max-width: 900px;
        }

        .lineProcess {
          margin-top: 26px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.12);
        }

        .lineProcess span {
          min-height: 52px;
          display: grid;
          place-items: center;
          background: rgba(0,0,0,.54);
          color: rgba(244,239,227,.78);
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .proof {
          padding: 46px 0 34px;
          display: grid;
          gap: 22px;
        }

        .proofImage {
          min-height: 330px;
          border-radius: 30px;
          border: 1px solid var(--line);
          background:
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.45)),
            url("/images/lp3/patio-logistico.jpg") center 35% / cover no-repeat,
            linear-gradient(135deg, #0f1a0f, #1a2a1a);
          box-shadow: 0 30px 90px rgba(0,0,0,.26);
        }

        .proofText h2 {
          margin: 8px 0 0;
          font-size: clamp(38px, 10vw, 78px);
          line-height: 0.9;
        }

        .proofText p {
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.45;
          letter-spacing: -0.025em;
        }

        .formSection {
          padding: 54px 0 72px;
          display: grid;
          gap: 24px;
        }

        .formIntro h2 {
          margin: 8px 0 0;
          font-size: clamp(40px, 10.5vw, 82px);
          line-height: 0.88;
        }

        .formIntro p {
          margin: 16px 0 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.42;
        }

        .leadForm {
          display: grid;
          gap: 11px;
          padding: 16px;
          border-radius: 28px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.04);
        }

        .leadForm label {
          display: grid;
          gap: 7px;
          color: rgba(244, 239, 227, 0.68);
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
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(0, 0, 0, 0.58);
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
          min-height: 54svh;
          padding: 76px 0 118px;
          display: flex;
          align-items: center;
          border-top: 1px solid var(--line-soft);
          background:
            linear-gradient(180deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.85) 100%),
            url("/images/lp3/hero-cbuq.jpg") center 60% / cover no-repeat;
        }

        .closing > div {
          width: min(680px, 100%);
        }

        .closing h2 {
          margin: 8px 0 0;
          font-size: clamp(44px, 11.5vw, 90px);
          line-height: 0.86;
        }

        .closing p:not(.kicker) {
          margin: 18px 0 0;
          max-width: 520px;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.45;
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
          background: rgba(5, 6, 5, 0.78);
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

          .entry {
            grid-template-columns: 0.92fr 1.08fr;
            align-items: center;
            gap: 34px;
            padding-top: 72px;
          }

          .entryImage {
            height: 620px;
          }

          .scenarioPicker {
            grid-template-columns: 1fr 1fr;
          }

          .sequenceInner {
            padding: 70px 42px;
          }

          .lineProcess {
            grid-template-columns: repeat(4, 1fr);
          }

          .proof {
            grid-template-columns: 1.05fr 0.95fr;
            align-items: center;
            gap: 34px;
            padding: 72px 0;
          }

          .proofImage {
            min-height: 520px;
          }

          .formSection {
            grid-template-columns: 0.82fr 1.18fr;
            align-items: start;
            padding-top: 72px;
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


        /* ── CLIENT STRIP ── */
        .clientStrip {
          width: min(1080px, calc(100% - 36px));
          margin: 0 auto;
          padding: 22px 0 22px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .clientLabel {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(244,239,227,0.28);
          margin-bottom: 10px;
        }
        .clientScroll {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          gap: 0;
        }
        .clientScroll::-webkit-scrollbar { display: none; }
        .clientChip {
          flex: 0 0 auto;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(244,239,227,0.42);
          padding-right: 18px;
          margin-right: 18px;
          border-right: 1px solid rgba(255,255,255,0.09);
          white-space: nowrap;
        }
        .clientChip:last-child { border-right: none; margin-right: 0; }

        /* ── lineProcess mobile: horizontal scroll ── */
        @media (max-width: 759px) {
          .lineProcess {
            display: flex !important;
            grid-template-columns: unset !important;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .lineProcess::-webkit-scrollbar { display: none; }
          .lineProcess span {
            flex: 0 0 auto;
            min-width: 110px;
            padding: 0 14px;
          }
        }

        @media (max-width: 430px) {
          .brand img {
            max-width: 165px;
            height: 28px;
          }

          .hero h1 {
            font-size: 50px;
          }

          .topbar > button {
            padding: 0 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  );
}
