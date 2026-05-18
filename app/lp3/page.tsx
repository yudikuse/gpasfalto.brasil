"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5564999452124";

const HERO_VIDEO =
  "https://res.cloudinary.com/dfw7h9c2j/video/upload/v1778589177/silo-bg_tjhnws.mp4";

const SCENARIOS = [
  {
    id: "construtora",
    label: "Construtora",
    title: "Terceirize a pavimentação. Entregue a obra no prazo.",
    sub: "Subcontratada com ART, equipe técnica e cronograma. Atendemos obras públicas e privadas em todo o estado de Goiás.",
    chips: ["ART de execução", "Obras públicas e privadas", "Todo Goiás"],
    message: "Sou construtora e preciso terceirizar a pavimentação de uma obra",
  },
  {
    id: "loteamento",
    label: "Loteadora",
    title: "Infraestrutura viária completa para o seu loteamento.",
    sub: "Terraplenagem, base, subbase e revestimento CBUQ em contrato único. Da aprovação municipal à entrega das vias.",
    chips: ["Terraplenagem + base + CBUQ", "Contrato único", "Documentação municipal"],
    message: "Tenho loteamento ou condomínio e preciso de infraestrutura viária completa",
  },
  {
    id: "usina",
    label: "Tem CBUQ",
    title: "Você tem a massa. A GP Asfalto aplica em campo.",
    sub: "Fornecemos acabadora, rolo compactador e equipe técnica. Você controla a produção, a GP executa a aplicação.",
    chips: ["Acabadora + rolo", "Equipe técnica", "ART de aplicação"],
    message: "Tenho CBUQ disponível e preciso de equipe e equipamentos para aplicação",
  },
  {
    id: "patio",
    label: "Pátio / acesso",
    title: "Pátio, acesso ou via interna com pavimento definitivo.",
    sub: "Base, subbase e revestimento CBUQ para pátios industriais, acessos de fazenda e áreas operacionais em Goiás.",
    chips: ["Base + CBUQ", "Pátios industriais", "Acessos rurais"],
    message: "Preciso pavimentar pátio, acesso ou área operacional",
  },
] as const;

const TYPING_LINES = [
  "Tenho obra e preciso de executor de pavimentação...",
  "Já tenho massa e preciso de equipe e equipamentos...",
  "Preciso terceirizar a aplicação de CBUQ...",
  "Tenho loteamento para entregar as vias...",
  "Preciso pavimentar pátio ou acesso em Goiás...",
];

const FAQ = [
  {
    q: "A GP Asfalto emite ART de execução?",
    a: "Sim. Toda obra conta com responsável técnico habilitado e emissão de ART conforme exigências do CREA. Entregamos a documentação técnica completa.",
  },
  {
    q: "Atendem como subcontratada em obra pública?",
    a: "Sim. Atuamos como subcontratadas de construtoras em licitações públicas e privadas, com toda a documentação exigida.",
  },
  {
    q: "Posso contratar só a aplicação se já tenho o CBUQ?",
    a: "Sim. Fornecemos equipe técnica, acabadora e rolo compactador. Você tem o material, a GP executa a aplicação.",
  },
  {
    q: "A GP executa terraplenagem e base ou só o revestimento?",
    a: "Executamos o pacote completo: terraplenagem, base, subbase e revestimento CBUQ em contrato único. Sem necessidade de outro fornecedor para cada etapa.",
  },
  {
    q: "Qual a área de atendimento?",
    a: "Todo o estado de Goiás. Temos logística e equipe próprias para mobilização em qualquer município.",
  },
  {
    q: "Qual o prazo de mobilização?",
    a: "Depende da localidade e do escopo da obra. Informamos o prazo junto com a proposta técnica, após a avaliação inicial.",
  },
];

type Scenario = (typeof SCENARIOS)[number];

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
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
    const line = TYPING_LINES[typingIndex % TYPING_LINES.length];
    let char = 0;
    setTypedText("");
    const interval = window.setInterval(() => {
      char += 1;
      setTypedText(line.slice(0, char));
      if (char >= line.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setTypingIndex((prev) => prev + 1), 1400);
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
    openWhatsapp(
      `Olá, vim pela página da GP Asfalto.\n\nSituação:\n${message}\n\nGostaria de uma avaliação técnica.`
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const empresa = String(form.get("empresa") || "Não informado");
    const city = String(form.get("city") || "");
    const volume = String(form.get("volume") || "Não informado");

    openWhatsapp(
      `Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica.\n\n` +
      `Nome: ${name}\n` +
      `Empresa: ${empresa}\n` +
      `WhatsApp: ${phone}\n` +
      `Cidade da obra: ${city}\n\n` +
      `Situação:\n${selected.message}\n\n` +
      `Metragem ou volume aproximado:\n${volume}`
    );
  }

  return (
    <main className="lp3">

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <span className="brand" aria-label="GP Asfalto">
          <img src="/images/logo-white.png" alt="GP Asfalto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling;
              if (fb instanceof HTMLElement) fb.style.display = "inline-flex";
            }}
          />
          <span>GP Asfalto</span>
        </span>
        <button type="button" onClick={() => goToForm()}>Avaliar obra</button>
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="inicio">
        <video ref={videoRef} className="heroVideo" src={HERO_VIDEO}
          muted playsInline preload="metadata" aria-hidden="true" />
        <div className="heroShade" />
        <div className="heroContent">
          <p className="kicker">Aplicação CBUQ · Terraplenagem · Goiás</p>
          <h1>
            Asfalto aplicado.<br />
            <span>Obra andando.</span>
          </h1>
          <div className="typingLine">
            <span>{typedText}</span>
            <i />
          </div>
          <p className="heroSub">
            3 usinas próprias. Equipe técnica, acabadora e rolo em campo.
            Da terraplenagem ao revestimento CBUQ — a GP Asfalto executa
            com mais de 40 anos de pavimentação em Goiás.
          </p>
          <div className="heroCreds">
            {["3 usinas próprias em Goiás", "40+ anos de pavimentação", "ART de execução inclusa", "Todo o estado de Goiás"].map(t => (
              <div key={t} className="heroCred">
                <span className="credDot" />
                {t}
              </div>
            ))}
          </div>
          <div className="heroActions">
            <button className="primary" type="button" onClick={() => goToForm()}>
              Solicitar avaliação técnica
            </button>
            <button className="ghost" type="button"
              onClick={() => quickWhatsapp("Já tenho CBUQ e preciso de equipe e equipamentos para aplicação")}>
              Já tenho massa
            </button>
          </div>
        </div>
      </section>

      {/* ── CLIENT STRIP ── */}
      <div className="clientStrip">
        <p className="clientLabel">Fazemos parte da infraestrutura dessas operações</p>
        <div className="clientLogoWrap">
          <img
            src="/images/lp/logos_strip.png"
            alt="LDC, COMIGO, Raízen, Nutrien, Mosaic, Fetz, Grupo Cereal, Cereal Ouro, Mercado Livre"
            className="clientLogoStrip"
          />
        </div>
      </div>

      {/* ── ENTRADA RÁPIDA — qual é a sua situação ── */}
      <section className="entry">
        <div className="entryImage">
          <div className="entryCaption">
            <span>Obra em campo · Goiás</span>
            <strong>Base, massa, aplicação e rolo trabalhando em sequência.</strong>
          </div>
        </div>

        <div className="entryPanel">
          <p className="kicker">Qual é a sua situação?</p>
          <h2>A GP Asfalto entra onde a obra precisa avançar.</h2>

          <div className="scenarioPicker">
            {SCENARIOS.map((item) => (
              <button key={item.id} type="button"
                className={selected.id === item.id ? "active" : ""}
                onClick={() => setSelected(item)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="scenarioText" key={selected.id}>
            <span>{selected.label}</span>
            <h3>{selected.title}</h3>
            <p className="scenarioSub">{selected.sub}</p>
            <div className="scenarioChips">
              {selected.chips.map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <button type="button" onClick={() => goToForm(selected)}>
              Solicitar avaliação técnica →
            </button>
          </div>
        </div>
      </section>

      {/* ── SEQUÊNCIA DE EXECUÇÃO ── */}
      <section className="sequence">
        <div className="sequenceInner">
          <p className="kicker">Cadeia de execução própria</p>
          <h2>Base no ponto. Massa no tempo. Rolo na sequência.</h2>
          <p className="seqSub">
            A maioria das empresas compra CBUQ de usina alheia. A GP Asfalto produz
            nas próprias 3 usinas em Goiás — e controla temperatura, volume e logística
            do início ao fim da aplicação. Sem terceirizar nenhuma etapa crítica.
          </p>
          <div className="lineProcess" aria-label="Processo de execução">
            {[
              ["Terraplenagem", "Corte, aterro e regularização do subleito"],
              ["Base e subbase", "BGS, brita graduada, estabilização"],
              ["Revestimento CBUQ", "Massa de usina própria, temperatura controlada"],
              ["Compactação", "Rolo compactador e controle tecnológico"],
            ].map(([t, d]) => (
              <div key={t} className="processStep">
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVA ── */}
      <section className="proof">
        <div className="proofImage" />
        <div className="proofText">
          <p className="kicker">Por que a GP Asfalto</p>
          <h2>Não é só massa.<br />É obra entregue.</h2>
          <p>
            A GP Asfalto opera há mais de 40 anos no Cerrado goiano com equipe própria,
            maquinário e 3 usinas de CBUQ em operação. Executamos pavimentação para
            as maiores operações do agronegócio e infraestrutura de loteamentos
            em todo o estado de Goiás.
          </p>
          <div className="proofStats">
            {[
              ["3", "usinas CBUQ próprias em operação"],
              ["40+", "anos de engenharia em Goiás"],
              ["100%", "do estado de Goiás atendido"],
            ].map(([n, l]) => (
              <div key={l} className="proofStat">
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => goToForm()}>
            Solicitar avaliação técnica →
          </button>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section className="formSection" id="avaliacao">
        <div className="formIntro">
          <p className="kicker">Avaliação técnica</p>
          <h2>Informe os dados da obra.</h2>
          <p>
            Nossa equipe analisa cidade, situação e escopo e retorna
            com uma avaliação técnica via WhatsApp.
          </p>
          <ul className="formBullets">
            <li><span />Sem compromisso</li>
            <li><span />Retorno em até 4 horas úteis</li>
            <li><span />Atendemos todo o estado de Goiás</li>
            <li><span />ART de execução inclusa</li>
          </ul>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>
          <label>
            Empresa / Obra
            <input name="empresa" type="text" placeholder="Nome da empresa ou obra" />
          </label>
          <label>
            WhatsApp
            <input name="phone" type="tel" placeholder="(XX) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              required />
          </label>
          <label>
            Cidade da obra
            <input name="city" type="text" placeholder="Ex.: Goiânia / GO" required />
          </label>
          <label>
            Situação
            <select value={selected.id}
              onChange={(e) => {
                const next = SCENARIOS.find((s) => s.id === e.target.value);
                if (next) setSelected(next);
              }}>
              {SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          <label className="full">
            Metragem aproximada
            <input name="volume" type="text" placeholder="Ex.: 5.000 m²" />
          </label>
          <button className="primary full" type="submit">
            Solicitar avaliação técnica →
          </button>
          <p className="formNote full">
            Abre o WhatsApp com sua solicitação pronta para envio
          </p>
        </form>
      </section>

      {/* ── FAQ ── */}
      <section className="faqSection">
        <div className="faqInner">
          <p className="kicker">Dúvidas frequentes</p>
          <h2>Antes de solicitar a avaliação.</h2>
          <div className="faqList">
            {FAQ.map(({ q, a }, i) => (
              <div key={q} className={`faqItem${faqOpen === i ? " open" : ""}`}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{q}</span>
                  <i>{faqOpen === i ? "−" : "+"}</i>
                </button>
                {faqOpen === i && <p>{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="closing">
        <div>
          <p className="kicker">GP Asfalto · Goiás</p>
          <h2>40 anos de pavimentação.<br />Da terra ao asfalto.</h2>
          <p>
            3 usinas próprias, equipe técnica e maquinário em campo.
            Informe a cidade e o escopo da obra — retornamos com
            avaliação técnica em até 4 horas úteis.
          </p>
          <button className="primary" type="button" onClick={() => goToForm()}>
            Solicitar avaliação técnica
          </button>
        </div>
      </section>

      {/* ── STICKY CTA ── */}
      <div className={showSticky ? "stickyCta visible" : "stickyCta"}>
        <button className="ghost" type="button"
          onClick={() => quickWhatsapp("Quero falar com a equipe técnica da GP Asfalto sobre aplicação de CBUQ")}>
          WhatsApp
        </button>
        <button className="primary" type="button" onClick={() => goToForm()}>
          Avaliar obra
        </button>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --green:   #2C8836;
          --green2:  #34a84a;
          --asphalt: #071228;
          --graphite:#0b1828;
          --cream:   #F0EBE2;
          --muted:   rgba(240,235,226,0.60);
          --line:    rgba(255,255,255,0.12);
          --line-soft: rgba(255,255,255,0.07);
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--asphalt);
          color: var(--cream);
          font-family: "DM Sans","Inter",system-ui,-apple-system,sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        button, input, select, textarea { font: inherit; }
        button { cursor: pointer; -webkit-tap-highlight-color: transparent; }

        .lp3 { min-height: 100vh; overflow-x: hidden; background: var(--asphalt); }

        /* ── TOPBAR ── */
        .topbar {
          position: fixed; top: 14px; left: 14px; right: 14px; z-index: 50;
          height: 56px; padding: 7px;
          border: 1px solid var(--line); border-radius: 999px;
          background: rgba(10,12,10,0.80); backdrop-filter: blur(22px);
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 20px 70px rgba(0,0,0,0.32);
        }
        .brand {
          display: inline-flex; align-items: center;
          color: white; text-decoration: none; padding-left: 12px;
        }
        .brand img { height: 30px; width: auto; max-width: 180px; object-fit: contain; }
        .brand > span { display: none; color: #fff; font-weight: 900; font-size: 18px; }
        .topbar > button {
          height: 42px; border: 0; border-radius: 999px; padding: 0 18px;
          background: var(--cream); color: #070807;
          font-size: 13px; font-weight: 700; letter-spacing: -0.01em;
        }

        /* ── HERO ── */
        .hero {
          position: relative; min-height: 100svh;
          padding: 90px 20px 40px;
          display: flex; align-items: flex-end;
          overflow: hidden; isolation: isolate;
        }
        .heroVideo {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: 58% center;
          filter: contrast(1.10) saturate(0.72) brightness(0.68);
          transform: scale(1.04); z-index: -3;
        }
        .heroShade {
          position: absolute; inset: 0; z-index: -2;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.30) 40%, rgba(10,12,10,0.92) 100%),
            linear-gradient(90deg, rgba(0,0,0,0.50), rgba(0,0,0,0.05));
        }
        .heroContent { width: min(100%, 760px); position: relative; z-index: 2; }

        .kicker {
          margin: 0; color: var(--green2);
          text-transform: uppercase; font-size: 10px;
          font-weight: 700; letter-spacing: 0.16em;
        }

        .hero h1 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 14px 0 0;
          font-size: clamp(58px, 15vw, 110px);
          line-height: 0.86; font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .hero h1 span { display: block; color: rgba(240,235,226,0.40); font-family: "Barlow Condensed", sans-serif; }

        .typingLine {
          margin-top: 20px; min-height: 34px;
          display: flex; align-items: center; gap: 4px;
          color: rgba(240,235,226,0.90);
          font-size: clamp(16px, 4vw, 22px);
          font-weight: 700; letter-spacing: -0.04em;
        }
        .typingLine i {
          width: 2px; height: 1em; background: var(--green2);
          display: inline-block; animation: blink 0.8s infinite;
        }
        @keyframes blink { 0%,45%{opacity:1} 46%,100%{opacity:0} }

        .heroSub {
          margin: 12px 0 0; max-width: 540px;
          color: var(--muted); font-size: 15px;
          line-height: 1.55; letter-spacing: -0.02em;
        }

        .heroCreds {
          margin-top: 18px; display: flex;
          flex-direction: column; gap: 7px;
        }
        .heroCred {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(240,235,226,0.55);
          font-weight: 500;
        }
        .credDot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--green); flex: 0 0 auto;
        }

        .heroActions { margin-top: 24px; display: grid; gap: 10px; }

        /* ── BUTTONS ── */
        .primary, .ghost {
          min-height: 54px; border-radius: 999px;
          padding: 0 22px; border: 0;
          display: inline-flex; align-items: center; justify-content: center;
          font-weight: 700; letter-spacing: -0.02em;
          transition: transform 0.16s ease, opacity 0.16s;
        }
        .primary:active, .ghost:active { transform: scale(0.985); }
        .primary {
          background: var(--green); color: white;
          box-shadow: 0 16px 40px rgba(44,136,54,0.30);
        }
        .primary:hover { background: #249330; }
        .ghost {
          background: rgba(255,255,255,0.08); color: white;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(16px);
        }
        .ghost:hover { background: rgba(255,255,255,0.12); }

        /* ── CLIENT STRIP ── */
        .clientStrip {
          background: #e8e3da;
          padding: 18px clamp(16px,4vw,40px);
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .clientLabel {
          font-size: 9px; font-weight: 600; letter-spacing: 0.20em;
          text-transform: uppercase; color: rgba(12,29,56,0.45);
          text-align: center; margin-bottom: 14px;
        }
        .clientLogoWrap { display: flex; justify-content: center; }
        .clientLogoStrip {
          height: 36px; width: auto;
          mix-blend-mode: multiply;
        }

        /* ── SECTIONS BASE ── */
        .entry, .sequence, .proof, .formSection, .faqSection, .closing {
          width: min(1080px, calc(100% - 32px)); margin: 0 auto;
        }

        /* ── ENTRY ── */
        .entry { padding: 54px 0 38px; display: grid; gap: 24px; }
        .entryImage {
          position: relative; height: 300px; border-radius: 24px;
          overflow: hidden; border: 1px solid var(--line);
          background:
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.65)),
            url("/images/lp3/hero-cbuq.jpg") center 65% / cover no-repeat,
            linear-gradient(135deg, #0f1f0f, #1a2e1a);
          box-shadow: 0 24px 72px rgba(0,0,0,0.28);
        }
        .entryCaption {
          position: absolute; left: 18px; right: 18px; bottom: 18px; z-index: 2;
        }
        .entryCaption span {
          display: block; margin-bottom: 7px;
          color: var(--green2); text-transform: uppercase;
          letter-spacing: 0.14em; font-size: 10px; font-weight: 700;
        }
        .entryCaption strong {
          display: block; max-width: 480px; color: white;
          font-size: 20px; line-height: 1.08; letter-spacing: -0.04em; font-weight: 800;
        }

        .entryPanel h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 8px 0 0; font-size: clamp(38px, 10vw, 76px);
          line-height: 0.90; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .scenarioPicker {
          margin-top: 20px; display: flex; flex-wrap: wrap; gap: 8px;
        }
        .scenarioPicker button {
          height: 40px; border-radius: 999px; border: 1px solid var(--line);
          padding: 0 16px; background: rgba(255,255,255,0.05);
          color: rgba(240,235,226,0.60); font-weight: 600;
          font-size: 13px; letter-spacing: -0.01em;
          transition: all 0.15s;
        }
        .scenarioPicker button.active {
          background: var(--green); color: white; border-color: var(--green);
        }
        .scenarioPicker button:hover:not(.active) {
          border-color: rgba(255,255,255,0.25); color: var(--cream);
        }

        .scenarioText { padding-top: 20px; }
        .scenarioText > span {
          display: block; margin-bottom: 8px; color: var(--green2);
          text-transform: uppercase; letter-spacing: 0.14em;
          font-size: 10px; font-weight: 700;
        }
        .scenarioText h3 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 0; font-size: clamp(30px, 8vw, 60px);
          line-height: 0.92; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .scenarioSub {
          margin: 12px 0 0; color: var(--muted);
          font-size: 14px; line-height: 1.55; max-width: 520px;
        }
        .scenarioChips {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px;
        }
        .chip {
          font-size: 11px; font-weight: 600; color: var(--green2);
          background: rgba(44,136,54,0.12); border: 1px solid rgba(44,136,54,0.25);
          padding: 4px 12px; border-radius: 999px;
        }
        .scenarioText > button {
          margin-top: 18px; min-height: 46px; border: 0; border-radius: 999px;
          padding: 0 20px; background: var(--green); color: white;
          font-weight: 700; font-size: 14px;
          box-shadow: 0 12px 28px rgba(44,136,54,0.28);
        }

        /* ── SEQUENCE ── */
        .sequence {
          margin-top: 20px; padding: 0;
          border-radius: 28px; overflow: hidden;
          border: 1px solid var(--line);
          background: #0b1828;
        }
        .sequenceInner { padding: 32px 18px 36px; }
        .sequence h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 10px 0 0; font-size: clamp(42px, 11vw, 86px);
          line-height: 0.88; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase; max-width: 900px;
        }
        .seqSub {
          margin: 16px 0 0; color: var(--muted);
          font-size: 14px; line-height: 1.60; max-width: 600px;
        }
        .lineProcess {
          margin-top: 28px; display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--line);
          border: 1px solid var(--line); border-radius: 12px; overflow: hidden;
        }
        .processStep {
          padding: 18px 16px;
          background: rgba(0,0,0,0.45);
          display: flex; flex-direction: column; gap: 4px;
        }
        .processStep strong {
          font-size: 13px; font-weight: 700;
          color: var(--cream); letter-spacing: -0.01em;
        }
        .processStep span {
          font-size: 11px; color: var(--muted); line-height: 1.4;
        }

        /* ── PROOF ── */
        .proof { padding: 48px 0 36px; display: grid; gap: 24px; }
        .proofImage {
          min-height: 300px; border-radius: 24px;
          border: 1px solid var(--line);
          background:
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.50)),
            url("/images/lp3/patio-logistico.jpg") center 40% / cover no-repeat,
            linear-gradient(135deg, #0f1a0f, #1a2a1a);
          box-shadow: 0 24px 64px rgba(0,0,0,0.26);
        }
        .proofText h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 8px 0 0; font-size: clamp(40px, 10.5vw, 82px);
          line-height: 0.90; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .proofText > p {
          margin: 16px 0 0; color: var(--muted);
          font-size: 15px; line-height: 1.58; max-width: 520px;
        }
        .proofStats {
          margin-top: 24px; display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px; background: var(--line);
          border: 1px solid var(--line); border-radius: 14px; overflow: hidden;
        }
        .proofStat {
          padding: 16px 12px; background: rgba(0,0,0,0.40);
          display: flex; flex-direction: column; gap: 4px; text-align: center;
        }
        .proofStat strong {
          font-family: "Barlow Condensed", sans-serif;
          font-size: clamp(28px, 8vw, 48px); font-weight: 900;
          color: var(--green2); letter-spacing: -0.01em; line-height: 1;
        }
        .proofStat span { font-size: 11px; color: var(--muted); line-height: 1.35; }
        .proofText > button {
          margin-top: 20px; min-height: 46px; border: 0; border-radius: 999px;
          padding: 0 18px; background: var(--green);
          color: white; font-weight: 700; font-size: 14px;
        }

        /* ── FORM ── */
        .formSection { padding: 54px 0 64px; display: grid; gap: 28px; }
        .formIntro h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 8px 0 0; font-size: clamp(40px, 10vw, 76px);
          line-height: 0.90; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .formIntro > p {
          margin: 14px 0 0; color: var(--muted);
          font-size: 15px; line-height: 1.55;
        }
        .formBullets {
          list-style: none; padding: 0; margin: 18px 0 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .formBullets li {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(240,235,226,0.65); font-weight: 500;
        }
        .formBullets li span {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--green); flex: 0 0 auto;
        }

        .leadForm {
          display: grid; gap: 12px; padding: 20px;
          border-radius: 20px; border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.06);
        }
        .leadForm label {
          display: grid; gap: 6px;
          color: rgba(240,235,226,0.60);
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .leadForm input, .leadForm select {
          width: 100%; min-height: 50px;
          border-radius: 10px; border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08); color: white;
          outline: none; padding: 0 14px; font-size: 15px;
          -webkit-appearance: none;
        }
        .leadForm select option { color: #111; }
        .leadForm input:focus, .leadForm select:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(44,136,54,0.15);
        }
        .leadForm .full { grid-column: 1 / -1; }
        .leadForm .primary { width: 100%; font-size: 15px; margin-top: 4px; }
        .formNote {
          text-align: center; font-size: 12px;
          color: rgba(240,235,226,0.30); margin: 0;
        }

        /* ── FAQ ── */
        .faqSection {
          padding: 48px 0 54px;
          border-top: 1px solid var(--line-soft);
        }
        .faqInner { max-width: 720px; }
        .faqSection h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 8px 0 0; font-size: clamp(36px, 9vw, 64px);
          line-height: 0.92; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .faqList { margin-top: 28px; display: flex; flex-direction: column; }
        .faqItem { border-bottom: 1px solid var(--line-soft); }
        .faqItem button {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 14px;
          padding: 16px 0; background: none; border: none;
          text-align: left; color: var(--cream);
        }
        .faqItem button span { font-size: 15px; font-weight: 600; line-height: 1.35; }
        .faqItem button i {
          font-style: normal; font-size: 20px; font-weight: 300;
          color: var(--green2); flex: 0 0 auto;
        }
        .faqItem p {
          font-size: 14px; color: var(--muted); line-height: 1.65;
          padding-bottom: 16px; margin: 0; max-width: 600px;
        }

        /* ── CLOSING ── */
        .closing {
          min-height: 52svh; padding: 72px 0 110px;
          display: flex; align-items: center;
          border-top: 1px solid var(--line-soft);
          background:
            linear-gradient(180deg, rgba(0,0,0,0.76), rgba(0,0,0,0.88)),
            url("/images/lp3/hero-cbuq.jpg") center 60% / cover no-repeat;
        }
        .closing > div { width: min(680px, 100%); }
        .closing h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 8px 0 0; font-size: clamp(48px, 12vw, 96px);
          line-height: 0.88; font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .closing p:not(.kicker) {
          margin: 16px 0 0; max-width: 500px;
          color: var(--muted); font-size: 15px; line-height: 1.55;
        }
        .closing .primary { margin-top: 24px; }

        /* ── STICKY CTA ── */
        .stickyCta {
          position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 60;
          padding: 8px; border-radius: 22px;
          display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 8px;
          background: rgba(10,12,10,0.82); border: 1px solid var(--line);
          backdrop-filter: blur(22px); box-shadow: 0 18px 60px rgba(0,0,0,0.40);
          opacity: 0; transform: translateY(18px); pointer-events: none;
          transition: 0.22s ease;
        }
        .stickyCta.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .stickyCta .primary, .stickyCta .ghost {
          min-height: 50px; padding: 0 12px; font-size: 14px;
        }

        /* ── RESPONSIVE ── */
        @media (min-width: 760px) {
          .topbar {
            left: 50%; right: auto;
            width: min(1080px, calc(100% - 48px));
            transform: translateX(-50%);
          }
          .hero {
            padding-left: max(30px, calc((100vw - 1080px) / 2));
            padding-right: max(30px, calc((100vw - 1080px) / 2));
          }
          .heroActions { display: flex; align-items: center; }
          .heroActions .primary, .heroActions .ghost { min-width: 220px; }
          .heroCreds { flex-direction: row; flex-wrap: wrap; gap: 16px; }

          .entry {
            grid-template-columns: 0.95fr 1.05fr;
            align-items: center; gap: 36px; padding-top: 72px;
          }
          .entryImage { height: 580px; }
          .scenarioPicker { flex-wrap: nowrap; }

          .sequenceInner { padding: 56px 40px; }
          .lineProcess { grid-template-columns: repeat(4,1fr); }

          .proof {
            grid-template-columns: 1.05fr 0.95fr;
            align-items: center; gap: 36px; padding: 72px 0;
          }
          .proofImage { min-height: 480px; }

          .formSection {
            grid-template-columns: 0.80fr 1.20fr;
            align-items: start; padding-top: 72px;
          }
          .leadForm { grid-template-columns: 1fr 1fr; }

          .stickyCta { display: none; }
        }

        @media (min-width: 1100px) {
          .heroSub { font-size: 16px; }
        }

        @media (max-width: 759px) {
          .lineProcess {
            display: flex !important;
            grid-template-columns: unset !important;
            overflow-x: auto; scrollbar-width: none;
            border-radius: 12px;
          }
          .lineProcess::-webkit-scrollbar { display: none; }
          .processStep { flex: 0 0 160px; }
          .proofStats { grid-template-columns: repeat(3,1fr); }
        }

        @media (max-width: 430px) {
          .brand img { max-width: 155px; height: 26px; }
          .hero h1 { font-size: 48px; }
          .topbar > button { padding: 0 12px; font-size: 12px; }
        }
      `}</style>
    </main>
  );
}
