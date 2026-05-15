"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5564993273958";
const HERO_VIDEO =
  "https://res.cloudinary.com/dfw7h9c2j/video/upload/v1778589177/silo-bg_tjhnws.mp4";

type Situacao =
  | "Preciso terceirizar a pavimentação"
  | "Tenho loteamento ou condomínio para entregar"
  | "Já tenho massa e preciso aplicar"
  | "Sou usina e preciso apoiar um cliente"
  | "Preciso de base + aplicação completa"
  | "";

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
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}

export default function LP3Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [telefone, setTelefone] = useState("");
  const [situacao, setSituacao] = useState<Situacao>("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startAt = 5;
    const endAt = 18;

    function handleLoaded() {
      if (!video) return;
      video.currentTime = startAt;
      video.play().catch(() => {});
    }

    function handleTimeUpdate() {
      if (!video) return;
      if (video.currentTime >= endAt) {
        video.currentTime = startAt;
        video.play().catch(() => {});
      }
    }

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  function goToForm(nextSituacao?: Situacao) {
    if (nextSituacao) setSituacao(nextSituacao);

    setTimeout(() => {
      document.getElementById("avaliacao")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  function quickWhatsapp(texto: string) {
    openWhatsapp(`Olá, quero falar com a GP Asfalto sobre aplicação asfáltica.

Minha situação: ${texto}

Tenho uma obra e gostaria de uma avaliação.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const nome = String(form.get("nome") || "");
    const cidade = String(form.get("cidade") || "");
    const metragem = String(form.get("metragem") || "Não informado");
    const observacao = String(form.get("observacao") || "Sem observações");
    const situacaoObra = String(form.get("situacao") || situacao || "Não informado");

    openWhatsapp(`Olá, quero solicitar uma avaliação para aplicação asfáltica.

Nome: ${nome}
WhatsApp: ${telefone}
Cidade da obra: ${cidade}

Situação da obra:
${situacaoObra}

Metragem/volume aproximado:
${metragem}

Observação:
${observacao}

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

        <button
          className="topCta"
          type="button"
          onClick={() => goToForm()}
        >
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

        <div className="heroOverlay" />

        <div className="heroContent">
          <div className="heroTag">Aplicação asfáltica • base • CBUQ • compactação</div>

          <h1>
            Sua obra precisa de asfalto aplicado.
            <span>Não de mais um fornecedor.</span>
          </h1>

          <p>
            A GP entra com equipe, equipamentos e execução completa — da base à aplicação final em CBUQ.
          </p>

          <div className="heroActions">
            <button className="btn primary" type="button" onClick={() => goToForm()}>
              Solicitar avaliação da obra
            </button>

            <button
              className="btn secondary"
              type="button"
              onClick={() => quickWhatsapp("Já tenho massa e preciso aplicar")}
            >
              Já tenho massa e preciso aplicar
            </button>
          </div>

          <div className="heroProof">
            <span>Construtoras</span>
            <span>Loteadoras</span>
            <span>Usinas</span>
            <span>Obras privadas</span>
          </div>
        </div>

        <button className="scrollHint" type="button" onClick={() => goToForm()}>
          Começar avaliação
        </button>
      </section>

      <section className="situation">
        <div className="sectionIntro">
          <span>Escolha rápida</span>
          <h2>Qual é o seu caso?</h2>
        </div>

        <div className="situationList">
          {[
            "Preciso terceirizar a pavimentação",
            "Tenho loteamento ou condomínio para entregar",
            "Já tenho massa e preciso aplicar",
            "Sou usina e preciso apoiar um cliente",
            "Preciso de base + aplicação completa",
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => goToForm(item as Situacao)}
            >
              <span>{item}</span>
              <b>→</b>
            </button>
          ))}
        </div>
      </section>

      <section className="statement">
        <div className="statementMedia">
          <video
            src={HERO_VIDEO}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
          />
        </div>

        <div className="statementText">
          <span>Execução coordenada</span>
          <h2>Aplicação asfáltica é sequência.</h2>
          <p>
            Base no ponto, massa no tempo certo, acabadora, rolos e equipe alinhada.
            Quando uma etapa falha, a obra inteira sente.
          </p>
          <button className="textButton" type="button" onClick={() => goToForm()}>
            Quero avaliar minha obra
          </button>
        </div>
      </section>

      <section className="audiences">
        <div className="sectionIntro">
          <span>Para quem</span>
          <h2>A GP entra onde a sua operação precisa resolver.</h2>
        </div>

        <div className="audienceRows">
          <button
            type="button"
            onClick={() => goToForm("Preciso terceirizar a pavimentação")}
          >
            <small>Construtoras</small>
            <strong>Você mantém o contrato. A GP executa a pavimentação.</strong>
          </button>

          <button
            type="button"
            onClick={() => goToForm("Tenho loteamento ou condomínio para entregar")}
          >
            <small>Loteadoras e incorporadoras</small>
            <strong>Ruas prontas para entregar o empreendimento.</strong>
          </button>

          <button
            type="button"
            onClick={() => goToForm("Sou usina e preciso apoiar um cliente")}
          >
            <small>Usinas</small>
            <strong>Você fornece a massa. A GP apoia na aplicação.</strong>
          </button>

          <button
            type="button"
            onClick={() => goToForm("Preciso de base + aplicação completa")}
          >
            <small>Obras privadas e industriais</small>
            <strong>Pátios, acessos e áreas operacionais com execução completa.</strong>
          </button>
        </div>
      </section>

      <section className="risk">
        <span>O gargalo</span>
        <h2>O atraso raramente começa no asfalto. Começa na falta de coordenação.</h2>

        <div className="riskFlow">
          <div>
            <b>Base sem ponto</b>
            <small>A massa chega, mas a obra não está pronta.</small>
          </div>
          <div>
            <b>Massa parada</b>
            <small>Tempo e temperatura trabalham contra.</small>
          </div>
          <div>
            <b>Equipamento fora de ritmo</b>
            <small>A aplicação perde sequência.</small>
          </div>
          <div>
            <b>Compactação ruim</b>
            <small>O acabamento sofre.</small>
          </div>
          <div>
            <b>Retrabalho</b>
            <small>O custo aparece depois.</small>
          </div>
        </div>
      </section>

      <section className="visualProof">
        <div>
          <span>Prova visual</span>
          <h2>Obra real. Máquina real. Equipe real.</h2>
          <p>
            Para obras de alto valor, a decisão não vem de promessa. Vem de estrutura percebida,
            clareza de execução e confiança para colocar equipe em campo.
          </p>
        </div>

        <div className="proofVideo">
          <video
            src={HERO_VIDEO}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
          />
        </div>
      </section>

      <section className="formSection" id="avaliacao">
        <div className="formCopy">
          <span>Avaliação inicial</span>
          <h2>Envie os dados da obra.</h2>
          <p>
            A equipe da GP entende o cenário e avalia se entra com aplicação,
            base ou execução completa.
          </p>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="nome" type="text" placeholder="Seu nome" required />
          </label>

          <label>
            WhatsApp
            <input
              name="telefone"
              type="tel"
              placeholder="(64) 99327-3958"
              value={telefone}
              onChange={(event) => setTelefone(maskPhone(event.target.value))}
              required
            />
          </label>

          <label>
            Cidade da obra
            <input name="cidade" type="text" placeholder="Ex: Rio Verde-GO" required />
          </label>

          <label>
            Situação da obra
            <select
              name="situacao"
              value={situacao}
              onChange={(event) => setSituacao(event.target.value as Situacao)}
              required
            >
              <option value="">Selecione</option>
              <option>Preciso terceirizar a pavimentação</option>
              <option>Tenho loteamento ou condomínio para entregar</option>
              <option>Já tenho massa e preciso aplicar</option>
              <option>Sou usina e preciso apoiar um cliente</option>
              <option>Preciso de base + aplicação completa</option>
            </select>
          </label>

          <label>
            Metragem ou volume aproximado
            <input name="metragem" type="text" placeholder="Ex: 8.000 m² ou 450 t" />
          </label>

          <label className="full">
            Observação rápida
            <textarea
              name="observacao"
              placeholder="Prazo, local, condição da base, acesso ou qualquer detalhe importante."
            />
          </label>

          <button className="btn primary full" type="submit">
            Enviar para avaliação no WhatsApp
          </button>

          <small className="formNote">
            WhatsApp GP Asfalto: 64 99327-3958
          </small>
        </form>
      </section>

      <section className="finalCta">
        <video
          src={HERO_VIDEO}
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
        />

        <div>
          <h2>Vamos entender sua obra?</h2>
          <p>Envie cidade, situação e volume aproximado. A GP avalia a melhor forma de entrar.</p>
          <button className="btn primary" type="button" onClick={() => goToForm()}>
            Solicitar avaliação
          </button>
        </div>
      </section>

      <div className="mobileCta">
        <button className="btn secondary" type="button" onClick={() => quickWhatsapp("Quero falar sobre aplicação asfáltica")}>
          WhatsApp
        </button>
        <button className="btn primary" type="button" onClick={() => goToForm()}>
          Avaliar obra
        </button>
      </div>

      <style jsx global>{`
        :root {
          --green: #167a0a;
          --green-light: #21a313;
          --dark: #070807;
          --soft: rgba(255, 255, 255, 0.08);
          --line: rgba(255, 255, 255, 0.14);
          --text: #f4f2ea;
          --muted: rgba(244, 242, 234, 0.68);
          --muted2: rgba(244, 242, 234, 0.48);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--dark);
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        .lp3 {
          min-height: 100vh;
          overflow-x: hidden;
          background: #070807;
        }

        .topbar {
          position: fixed;
          top: 14px;
          left: 14px;
          right: 14px;
          z-index: 50;
          height: 54px;
          padding: 7px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          background: rgba(7, 8, 7, 0.58);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          height: 30px;
          max-width: 150px;
          object-fit: contain;
        }

        .brand span {
          font-weight: 900;
          letter-spacing: -0.05em;
          font-size: 15px;
          white-space: nowrap;
        }

        .topCta {
          height: 40px;
          border: 0;
          border-radius: 999px;
          padding: 0 16px;
          background: linear-gradient(135deg, var(--green), var(--green-light));
          color: white;
          font-size: 13px;
          font-weight: 850;
          cursor: pointer;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 90px 18px 92px;
          isolation: isolate;
        }

        .heroVideo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 58% center;
          z-index: -3;
          filter: contrast(1.12) saturate(0.78) brightness(0.82);
          transform: scale(1.02);
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(circle at 55% 22%, rgba(22, 122, 10, 0.18), transparent 26%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.28) 38%, rgba(0, 0, 0, 0.92) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.12));
        }

        .heroOverlay::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 78px 78px;
          opacity: 0.2;
          mask-image: linear-gradient(180deg, transparent 0%, #000 35%, #000 100%);
        }

        .heroContent {
          width: min(100%, 760px);
          position: relative;
          z-index: 2;
        }

        .heroTag,
        .sectionIntro span,
        .statementText span,
        .risk > span,
        .visualProof span,
        .formCopy span {
          display: block;
          color: #48d936;
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 0.16em;
        }

        .hero h1 {
          margin: 14px 0 0;
          font-size: clamp(48px, 13vw, 92px);
          line-height: 0.9;
          letter-spacing: -0.085em;
          max-width: 780px;
          text-wrap: balance;
        }

        .hero h1 span {
          display: block;
          color: rgba(244, 242, 234, 0.62);
        }

        .hero p {
          margin: 18px 0 0;
          max-width: 570px;
          color: rgba(244, 242, 234, 0.78);
          font-size: 17px;
          line-height: 1.45;
          letter-spacing: -0.025em;
        }

        .heroActions {
          display: grid;
          gap: 10px;
          margin-top: 24px;
        }

        .btn {
          min-height: 56px;
          border: 0;
          border-radius: 999px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-weight: 900;
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease;
        }

        .btn:active {
          transform: scale(0.98);
        }

        .primary {
          background: linear-gradient(135deg, var(--green), var(--green-light));
          color: #fff;
          box-shadow: 0 18px 48px rgba(22, 122, 10, 0.38);
        }

        .secondary {
          color: #fff;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(18px);
        }

        .heroProof {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .heroProof span {
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(244, 242, 234, 0.72);
          font-size: 12px;
          font-weight: 800;
          backdrop-filter: blur(12px);
        }

        .scrollHint {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          z-index: 3;
          height: 46px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(18px);
          font-weight: 850;
          cursor: pointer;
        }

        .situation,
        .audiences,
        .risk,
        .visualProof,
        .formSection {
          width: min(1120px, calc(100% - 36px));
          margin: 0 auto;
          padding: 74px 0;
        }

        .sectionIntro {
          margin-bottom: 24px;
        }

        .sectionIntro h2,
        .statementText h2,
        .risk h2,
        .visualProof h2,
        .formCopy h2,
        .finalCta h2 {
          margin: 10px 0 0;
          font-size: clamp(34px, 8vw, 70px);
          line-height: 0.94;
          letter-spacing: -0.075em;
          text-wrap: balance;
        }

        .situationList {
          display: grid;
          gap: 10px;
        }

        .situationList button {
          width: 100%;
          min-height: 66px;
          padding: 0 18px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.055);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          text-align: left;
          cursor: pointer;
        }

        .situationList span {
          font-size: 17px;
          font-weight: 850;
          letter-spacing: -0.035em;
        }

        .situationList b {
          color: #48d936;
          font-size: 22px;
        }

        .statement {
          width: min(1120px, calc(100% - 36px));
          margin: 0 auto;
          padding: 24px 0 74px;
          display: grid;
          gap: 24px;
        }

        .statementMedia {
          position: relative;
          min-height: 420px;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: #111;
        }

        .statementMedia video,
        .proofVideo video,
        .finalCta video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.1) saturate(0.78) brightness(0.76);
        }

        .statementMedia::after,
        .proofVideo::after,
        .finalCta::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 70% 18%, rgba(22, 122, 10, 0.16), transparent 24%),
            linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.66));
        }

        .statementText {
          align-self: center;
        }

        .statementText p,
        .visualProof p,
        .formCopy p,
        .finalCta p {
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.48;
          max-width: 560px;
          letter-spacing: -0.02em;
        }

        .textButton {
          margin-top: 22px;
          border: 0;
          background: transparent;
          color: #48d936;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          padding: 0;
        }

        .audienceRows {
          display: grid;
          gap: 10px;
        }

        .audienceRows button {
          min-height: 118px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          background:
            linear-gradient(120deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.035)),
            radial-gradient(circle at 92% 20%, rgba(22, 122, 10, 0.18), transparent 32%);
          color: #fff;
          text-align: left;
          cursor: pointer;
        }

        .audienceRows small {
          display: block;
          margin-bottom: 12px;
          color: #48d936;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 950;
          font-size: 10px;
        }

        .audienceRows strong {
          display: block;
          max-width: 760px;
          font-size: clamp(24px, 6vw, 42px);
          line-height: 0.98;
          letter-spacing: -0.065em;
        }

        .risk {
          text-align: center;
        }

        .risk h2 {
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .riskFlow {
          display: grid;
          gap: 8px;
          margin-top: 30px;
        }

        .riskFlow div {
          padding: 18px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: left;
        }

        .riskFlow b {
          display: block;
          font-size: 17px;
          letter-spacing: -0.03em;
        }

        .riskFlow small {
          display: block;
          margin-top: 6px;
          color: var(--muted2);
          line-height: 1.35;
        }

        .visualProof {
          display: grid;
          gap: 24px;
        }

        .proofVideo {
          position: relative;
          height: 420px;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .formSection {
          display: grid;
          gap: 26px;
          padding-bottom: 92px;
        }

        .leadForm {
          display: grid;
          gap: 12px;
          padding: 18px;
          border-radius: 30px;
          background:
            radial-gradient(circle at 100% 0%, rgba(22, 122, 10, 0.18), transparent 38%),
            rgba(255, 255, 255, 0.065);
          border: 1px solid rgba(255, 255, 255, 0.13);
          backdrop-filter: blur(18px);
        }

        .leadForm label {
          display: grid;
          gap: 7px;
          color: rgba(244, 242, 234, 0.68);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.02em;
        }

        .leadForm input,
        .leadForm select,
        .leadForm textarea {
          width: 100%;
          min-height: 54px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 17px;
          background: rgba(0, 0, 0, 0.28);
          color: #fff;
          outline: none;
          padding: 0 14px;
        }

        .leadForm textarea {
          min-height: 96px;
          padding: 14px;
          resize: vertical;
        }

        .leadForm select option {
          color: #111;
        }

        .leadForm input:focus,
        .leadForm select:focus,
        .leadForm textarea:focus {
          border-color: rgba(72, 217, 54, 0.75);
          box-shadow: 0 0 0 4px rgba(72, 217, 54, 0.12);
        }

        .full {
          grid-column: 1 / -1;
        }

        .formNote {
          text-align: center;
          color: var(--muted2);
          line-height: 1.4;
        }

        .finalCta {
          position: relative;
          min-height: 72svh;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 90px 18px 110px;
          isolation: isolate;
        }

        .finalCta video {
          position: absolute;
          inset: 0;
          z-index: -3;
        }

        .finalCta::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.9));
        }

        .finalCta div {
          width: min(760px, 100%);
          position: relative;
          z-index: 2;
        }

        .finalCta .btn {
          margin-top: 24px;
        }

        .mobileCta {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 70;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 8px;
          padding: 8px;
          border-radius: 24px;
          background: rgba(7, 8, 7, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(22px);
          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
        }

        .mobileCta .btn {
          min-height: 52px;
          padding: 0 14px;
          font-size: 14px;
        }

        @media (min-width: 760px) {
          .topbar {
            left: 50%;
            right: auto;
            width: min(1120px, calc(100% - 48px));
            transform: translateX(-50%);
          }

          .hero {
            padding-left: max(32px, calc((100vw - 1120px) / 2));
            padding-right: max(32px, calc((100vw - 1120px) / 2));
          }

          .heroActions {
            display: flex;
            align-items: center;
          }

          .situationList {
            grid-template-columns: 1fr 1fr;
          }

          .statement {
            grid-template-columns: 1.15fr 0.85fr;
            align-items: center;
            padding-top: 60px;
          }

          .audienceRows {
            grid-template-columns: 1fr 1fr;
          }

          .riskFlow {
            grid-template-columns: repeat(5, 1fr);
          }

          .visualProof {
            grid-template-columns: 0.8fr 1.2fr;
            align-items: center;
          }

          .formSection {
            grid-template-columns: 0.82fr 1.18fr;
            align-items: start;
          }

          .leadForm {
            grid-template-columns: 1fr 1fr;
          }

          .finalCta {
            padding-left: max(32px, calc((100vw - 1120px) / 2));
            padding-right: max(32px, calc((100vw - 1120px) / 2));
          }

          .mobileCta {
            display: none;
          }
        }

        @media (min-width: 1120px) {
          .hero h1 {
            max-width: 860px;
          }

          .hero p {
            font-size: 19px;
          }

          .heroVideo {
            object-position: center center;
          }
        }

        @media (max-width: 420px) {
          .brand span {
            font-size: 13px;
          }

          .topCta {
            padding: 0 13px;
            font-size: 12px;
          }

          .hero h1 {
            font-size: 46px;
          }

          .hero p {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
