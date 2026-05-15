"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "5564999999999";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function maskPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

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
  const [telefone, setTelefone] = useState("");
  const [necessidade, setNecessidade] = useState("");

  function quickWhatsapp(texto: string) {
    openWhatsapp(`Olá, quero falar com a GP Asfalto sobre aplicação asfáltica.

Necessidade: ${texto}

Tenho uma obra e gostaria de uma avaliação.`);
  }

  function selectNeed(texto: string) {
    setNecessidade(texto);
    setTimeout(() => {
      document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const nome = String(form.get("nome") || "");
    const cidade = String(form.get("cidade") || "");
    const tipoObra = String(form.get("tipoObra") || "");
    const necessidadeCampo = String(form.get("necessidadeCampo") || "");
    const metragem = String(form.get("metragem") || "Não informado");
    const temMassa = String(form.get("temMassa") || "Não informado");
    const observacao = String(form.get("observacao") || "Sem observações");

    openWhatsapp(`Olá, quero solicitar avaliação para aplicação asfáltica.

*Dados do contato*
Nome: ${nome}
WhatsApp: ${telefone}

*Dados da obra*
Cidade: ${cidade}
Tipo de obra: ${tipoObra}
Necessidade: ${necessidadeCampo}
Metragem/volume aproximado: ${metragem}
Já tem massa/usina?: ${temMassa}

*Observação*
${observacao}

Vim pela LP3 da GP Asfalto.`);
  }

  return (
    <main className="lp3" id="top">
      <header className="topbar">
        <div className="topbarInner">
          <a className="brand" href="#top" aria-label="GP Asfalto">
            <img src="/logo-p2.png" alt="GP Asfalto" />
          </a>

          <nav className="nav">
            <a href="#necessidade">Necessidade</a>
            <a href="#etapas">Etapas</a>
            <a href="#orcamento">Avaliação</a>
            <a className="navCta" href="#orcamento">Solicitar avaliação</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div className="eyebrow">
              <span />
              Aplicação asfáltica com equipe e equipamento
            </div>

            <h1>
              Aplicação de asfalto para obras que <em>não podem parar.</em>
            </h1>

            <p>
              A GP Asfalto executa pavimentação para construtoras, loteadoras,
              incorporadoras, usinas e obras privadas — da terraplenagem à capa final em CBUQ.
            </p>

            <div className="heroActions">
              <a className="btn primary" href="#orcamento">Solicitar avaliação da obra</a>
              <button
                className="btn glass"
                type="button"
                onClick={() => quickWhatsapp("Já tenho massa e preciso somente da aplicação")}
              >
                Tenho massa e preciso aplicar
              </button>
            </div>

            <small>
              Ideal para quem precisa terceirizar a aplicação, apoiar uma usina,
              entregar loteamento, executar pátio, acesso, rua ou obra privada.
            </small>
          </div>

          <aside className="appPanel">
            <div className="phoneMock">
              <div className="phoneTop">
                <span>GP Aplicação</span>
                <span>Obra em análise</span>
              </div>

              <div className="floatCard card1">
                <strong>Base</strong>
                <small>regularização e compactação</small>
              </div>

              <div className="floatCard card2">
                <strong>CBUQ</strong>
                <small>aplicação e acabamento</small>
              </div>

              <div className="floatCard card3">
                <strong>Equipe</strong>
                <small>acabadora, rolos e campo</small>
              </div>

              <div className="phoneBottom">
                <h3>Qual é sua necessidade?</h3>
                <button onClick={() => selectNeed("Só aplicação")}>Só aplicação <b>→</b></button>
                <button onClick={() => selectNeed("Base + aplicação")}>Base + aplicação <b>→</b></button>
                <button onClick={() => selectNeed("Terraplenagem + base + aplicação")}>Execução completa <b>→</b></button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="necessidade">
        <div className="container">
          <div className="sectionHead">
            <span>Entrada rápida</span>
            <h2>A GP entra exatamente onde sua obra precisa.</h2>
            <p>
              O lead certo não quer institucional. Ele quer saber se a GP consegue entrar
              na obra, aplicar, organizar equipe, equipamento e entregar.
            </p>
          </div>

          <div className="needGrid">
            {[
              ["🏗️", "Tenho uma obra e preciso terceirizar", "Para construtoras que assumiram contrato e precisam de execução em campo."],
              ["🛣️", "Loteamento ou condomínio", "Ruas internas, acessos, urbanização, base e capa final."],
              ["🚧", "Já tenho massa e preciso aplicar", "Equipe, acabadora, rolos, compactação e acabamento técnico."],
              ["🏭", "Sou usina e preciso apoiar cliente", "Aplicação terceirizada para atender obra com estrutura de campo."],
              ["✅", "Preciso da solução completa", "Terraplenagem, base, imprimação, aplicação de CBUQ e entrega."]
            ].map(([icon, title, text]) => (
              <button
                className="needCard"
                key={title}
                type="button"
                onClick={() => selectNeed(title)}
              >
                <i>{icon}</i>
                <h3>{title}</h3>
                <p>{text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="etapas">
        <div className="container">
          <div className="sectionHead">
            <span>Execução completa</span>
            <h2>Da leitura da obra ao acabamento final.</h2>
            <p>
              Aplicação asfáltica não é só jogar massa. É base, logística, temperatura,
              equipamento, compactação e acabamento.
            </p>
          </div>

          <div className="steps">
            {[
              ["Avaliação da obra", "Área, prazo, acesso, tipo de tráfego, condição da base e logística de massa."],
              ["Terraplenagem", "Regularização, cortes, aterros e preparo para receber a estrutura do pavimento."],
              ["Base e sub-base", "Correção, execução, umidade, nivelamento e compactação da base."],
              ["Imprimação e ligação", "Preparo técnico da superfície antes da camada asfáltica."],
              ["Aplicação de CBUQ", "Acabadora, equipe, rolos, controle de campo e ritmo de aplicação."],
              ["Compactação e entrega", "Acabamento, bordas, arremates e liberação da área conforme necessidade da obra."]
            ].map(([title, text], index) => (
              <article className="step" key={title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section risk">
        <div className="container">
          <div className="sectionHead">
            <span>Risco real</span>
            <h2>O problema quase nunca é só a massa. É a execução.</h2>
            <p>
              Quando a aplicação é mal coordenada, o custo aparece em atraso,
              desperdício, retrabalho e acabamento ruim.
            </p>
          </div>

          <div className="riskGrid">
            <article>
              <h3>Massa chegando fora da janela ideal</h3>
              <p>Sem equipe e equipamento alinhados, a logística compromete ritmo e acabamento.</p>
            </article>
            <article>
              <h3>Base mal preparada</h3>
              <p>A camada asfáltica não corrige sozinha uma estrutura ruim por baixo.</p>
            </article>
            <article>
              <h3>Falta de equipamento no momento certo</h3>
              <p>Acabadora, rolo e equipe precisam entrar coordenados para evitar parada.</p>
            </article>
            <article>
              <h3>Retrabalho e imagem ruim com o cliente final</h3>
              <p>Construtoras e loteadoras precisam entregar obra com padrão, prazo e segurança.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section proof">
        <div className="container proofGrid">
          <div className="proofPhoto">
            <div>
              <strong>Estrutura de campo</strong>
              <span>Equipe, equipamentos e rotina de execução para assumir etapas críticas da pavimentação.</span>
            </div>
          </div>

          <div className="proofList">
            <div className="sectionHead compact">
              <span>GP Asfalto</span>
              <h2>Execução para quem precisa entregar obra.</h2>
            </div>

            {[
              ["Aplicação para construtoras", "Atuação como parceira executora da etapa de pavimentação."],
              ["Apoio para loteadoras e incorporadoras", "Ruas internas, acessos, pátios, urbanização e entrega de empreendimento."],
              ["Aplicação para quem já comprou massa", "A GP pode avaliar logística e executar somente a aplicação."],
              ["Pacote completo", "Terraplenagem, base, imprimação, aplicação e acabamento final."]
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote" id="orcamento">
        <div className="container quoteBox">
          <div>
            <span>Solicitação inteligente</span>
            <h2>Monte sua solicitação em 30 segundos.</h2>
            <p>
              Informe o básico da obra e envie direto para a equipe da GP.
              Quanto mais clara a necessidade, mais rápida a avaliação.
            </p>
          </div>

          <form className="formCard" onSubmit={handleSubmit}>
            <h3>Solicitar avaliação técnica</h3>

            <label>
              Nome
              <input name="nome" type="text" placeholder="Seu nome" required />
            </label>

            <label>
              WhatsApp
              <input
                name="telefone"
                type="tel"
                placeholder="(64) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(maskPhone(e.target.value))}
                required
              />
            </label>

            <label>
              Cidade da obra
              <input name="cidade" type="text" placeholder="Ex: Rio Verde-GO" required />
            </label>

            <label>
              Tipo de obra
              <select name="tipoObra" required>
                <option value="">Selecione</option>
                <option>Loteamento</option>
                <option>Condomínio</option>
                <option>Rua ou via urbana</option>
                <option>Pátio ou estacionamento</option>
                <option>Acesso industrial</option>
                <option>Obra pública terceirizada</option>
                <option>Outro</option>
              </select>
            </label>

            <label className="full">
              O que precisa?
              <select
                name="necessidadeCampo"
                value={necessidade}
                onChange={(e) => setNecessidade(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option>Só aplicação</option>
                <option>Base + aplicação</option>
                <option>Terraplenagem + base + aplicação</option>
                <option>Já tenho massa e preciso aplicar</option>
                <option>Sou usina e preciso de apoio</option>
                <option>Ainda não sei, preciso avaliar</option>
              </select>
            </label>

            <label>
              Metragem ou volume aproximado
              <input name="metragem" type="text" placeholder="Ex: 8.000 m² ou 450 t" />
            </label>

            <label>
              Já tem massa/usina?
              <select name="temMassa">
                <option>Não informado</option>
                <option>Sim, já tenho massa</option>
                <option>Não, preciso da solução completa</option>
                <option>Quero que a GP avalie</option>
              </select>
            </label>

            <label className="full">
              Observação
              <textarea name="observacao" placeholder="Prazo, local, condição da base, acesso, etapa da obra..." />
            </label>

            <button className="btn primary full" type="submit">
              Enviar para avaliação no WhatsApp
            </button>
          </form>
        </div>
      </section>

      <section className="section useCases">
        <div className="container">
          <div className="sectionHead">
            <span>Aplicações</span>
            <h2>Onde a GP pode aplicar.</h2>
          </div>

          <div className="chips">
            {[
              "Loteamentos",
              "Condomínios",
              "Ruas urbanas",
              "Pátios industriais",
              "Estacionamentos",
              "Acessos rurais",
              "Obras privadas",
              "Apoio para usinas"
            ].map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq">
        <div className="container">
          <div className="sectionHead">
            <span>Dúvidas rápidas</span>
            <h2>Antes de solicitar avaliação.</h2>
          </div>

          {[
            ["Vocês aplicam massa comprada de outra usina?", "Sim. A GP pode avaliar a logística da obra e executar somente a aplicação, desde que as condições técnicas estejam adequadas."],
            ["Vocês fazem base e terraplenagem também?", "Sim. A GP pode assumir desde a preparação da área até a aplicação final do CBUQ."],
            ["Atendem construtoras que já têm contrato com cliente final?", "Sim. A GP pode atuar como parceira executora da etapa de pavimentação."],
            ["Atendem loteamentos, condomínios e obras privadas?", "Sim. A GP atende obras que precisam de ruas, acessos, pátios, estacionamentos e áreas pavimentadas."],
            ["Como começa a avaliação?", "Envie cidade, tipo de obra, metragem aproximada e o que precisa. A equipe avalia a melhor forma de atendimento."]
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="finalCta">
        <div className="container finalBox">
          <h2>Sua obra precisa de aplicação, equipe ou execução completa?</h2>
          <p>Envie as informações básicas e solicite uma avaliação inicial da GP Asfalto.</p>
          <a className="btn primary" href="#orcamento">Solicitar avaliação da obra</a>
        </div>
      </section>

      <div className="mobileCta">
        <a className="btn glass" href="#orcamento">Avaliar</a>
        <button
          className="btn primary"
          type="button"
          onClick={() => quickWhatsapp("Quero solicitar avaliação para aplicação asfáltica")}
        >
          WhatsApp
        </button>
      </div>

      <style jsx global>{`
        :root {
          --green: #167a0a;
          --green2: #22a312;
          --dark: #090909;
          --card: rgba(255, 255, 255, 0.075);
          --border: rgba(255, 255, 255, 0.14);
          --text: #f8f8f2;
          --muted: rgba(255, 255, 255, 0.64);
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
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        .lp3 {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 15% 0%, rgba(22, 122, 10, 0.28), transparent 34%),
            radial-gradient(circle at 80% 12%, rgba(23, 29, 90, 0.36), transparent 34%),
            #090909;
        }

        .container {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .topbar {
          position: fixed;
          top: 16px;
          left: 0;
          right: 0;
          z-index: 50;
          pointer-events: none;
        }

        .topbarInner {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(8, 8, 8, 0.62);
          backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: auto;
        }

        .brand img {
          height: 34px;
          display: block;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav a {
          padding: 10px 13px;
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.76);
          font-size: 13px;
          font-weight: 700;
        }

        .navCta {
          background: linear-gradient(135deg, var(--green), var(--green2));
          color: #fff !important;
        }

        .btn {
          border: 0;
          border-radius: 999px;
          min-height: 56px;
          padding: 0 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-weight: 850;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .primary {
          background: linear-gradient(135deg, var(--green), var(--green2));
          color: #fff;
          box-shadow: 0 18px 45px rgba(22, 122, 10, 0.38);
        }

        .glass {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid var(--border);
          backdrop-filter: blur(16px);
        }

        .hero {
          position: relative;
          min-height: 100svh;
          padding: 116px 0 70px;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.28)),
            linear-gradient(180deg, transparent, #090909 96%),
            url("/aplicacao-asfalto-gp.jpg") center / cover no-repeat;
          z-index: -2;
        }

        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 72px 72px;
          opacity: 0.2;
          z-index: -1;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.72fr);
          gap: 38px;
          align-items: center;
        }

        .eyebrow {
          width: fit-content;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.84);
          font-size: 13px;
          font-weight: 800;
          backdrop-filter: blur(16px);
        }

        .eyebrow span {
          width: 9px;
          height: 9px;
          border-radius: 99px;
          background: var(--green2);
          box-shadow: 0 0 0 7px rgba(34, 163, 18, 0.18);
        }

        .hero h1 {
          margin: 22px 0 0;
          max-width: 830px;
          font-size: clamp(44px, 8vw, 88px);
          line-height: 0.92;
          letter-spacing: -0.075em;
        }

        .hero h1 em {
          color: rgba(255, 255, 255, 0.62);
          font-style: normal;
        }

        .hero p {
          margin: 24px 0 0;
          max-width: 650px;
          color: rgba(255, 255, 255, 0.76);
          font-size: clamp(17px, 2vw, 21px);
          line-height: 1.48;
        }

        .heroActions {
          display: flex;
          gap: 12px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .hero small {
          display: block;
          margin-top: 16px;
          max-width: 620px;
          color: rgba(255, 255, 255, 0.56);
          line-height: 1.45;
        }

        .appPanel {
          padding: 18px;
          border-radius: 36px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.06));
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(26px);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
        }

        .phoneMock {
          position: relative;
          min-height: 610px;
          border-radius: 32px;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.68)),
            url("/app-asfalto-gp.jpg") center / cover no-repeat;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .phoneTop {
          position: absolute;
          top: 18px;
          left: 18px;
          right: 18px;
          display: flex;
          justify-content: space-between;
          z-index: 2;
        }

        .phoneTop span,
        .floatCard {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px);
        }

        .phoneTop span {
          padding: 8px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
        }

        .floatCard {
          position: absolute;
          z-index: 3;
          padding: 12px 13px;
          min-width: 138px;
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
        }

        .floatCard strong {
          display: block;
          font-size: 18px;
        }

        .floatCard small {
          display: block;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 11px;
          font-weight: 700;
        }

        .card1 {
          top: 94px;
          left: 18px;
        }

        .card2 {
          top: 190px;
          right: 16px;
        }

        .card3 {
          bottom: 192px;
          left: 22px;
        }

        .phoneBottom {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          z-index: 4;
          padding: 16px;
          border-radius: 26px;
          background: rgba(10, 10, 10, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(22px);
        }

        .phoneBottom h3 {
          margin: 0 0 12px;
          font-size: 22px;
          letter-spacing: -0.05em;
        }

        .phoneBottom button {
          width: 100%;
          margin-top: 8px;
          padding: 12px 13px;
          border: 0;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.09);
          color: rgba(255, 255, 255, 0.86);
          display: flex;
          justify-content: space-between;
          font-weight: 800;
          cursor: pointer;
        }

        .phoneBottom b {
          color: var(--green2);
        }

        .section {
          padding: 86px 0;
        }

        .sectionHead {
          margin-bottom: 34px;
        }

        .sectionHead span,
        .quoteBox > div > span {
          display: block;
          color: var(--green2);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-weight: 900;
          font-size: 12px;
          margin-bottom: 14px;
        }

        .sectionHead h2,
        .quoteBox h2 {
          margin: 0;
          max-width: 850px;
          font-size: clamp(34px, 5vw, 62px);
          line-height: 0.98;
          letter-spacing: -0.07em;
        }

        .sectionHead p,
        .quoteBox p {
          max-width: 720px;
          margin: 16px 0 0;
          color: var(--muted);
          font-size: 18px;
          line-height: 1.55;
        }

        .needGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        .needCard {
          text-align: left;
          position: relative;
          min-height: 240px;
          padding: 22px;
          border-radius: 24px;
          border: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.045));
          color: #fff;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .needCard:hover {
          transform: translateY(-3px);
          border-color: rgba(34, 163, 18, 0.5);
        }

        .needCard i {
          width: 46px;
          height: 46px;
          border-radius: 16px;
          background: rgba(34, 163, 18, 0.16);
          display: grid;
          place-items: center;
          font-style: normal;
          margin-bottom: 18px;
        }

        .needCard h3 {
          margin: 0 0 10px;
          font-size: 22px;
          line-height: 1.05;
          letter-spacing: -0.045em;
        }

        .needCard p {
          margin: 0;
          color: var(--muted);
          line-height: 1.48;
          font-size: 14px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .step,
        .riskGrid article,
        .proofList article,
        details {
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 22px;
        }

        .step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          padding: 18px;
        }

        .step b {
          width: 42px;
          height: 42px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--green2);
          display: grid;
          place-items: center;
        }

        .step h3,
        .riskGrid h3,
        .proofList h3 {
          margin: 0 0 7px;
          font-size: 19px;
          letter-spacing: -0.035em;
        }

        .step p,
        .riskGrid p,
        .proofList p {
          margin: 0;
          color: var(--muted);
          line-height: 1.48;
          font-size: 14px;
        }

        .risk {
          background: rgba(255, 255, 255, 0.025);
        }

        .riskGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .riskGrid article,
        .proofList article {
          padding: 20px;
        }

        .proofGrid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 18px;
        }

        .proofPhoto {
          min-height: 440px;
          border-radius: 34px;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.66)),
            url("/equipe-gp-aplicacao.jpg") center / cover no-repeat;
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        .proofPhoto div {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          padding: 16px;
          border-radius: 24px;
          background: rgba(0, 0, 0, 0.58);
          backdrop-filter: blur(20px);
        }

        .proofPhoto strong {
          display: block;
          font-size: 24px;
          letter-spacing: -0.05em;
        }

        .proofPhoto span {
          display: block;
          margin-top: 6px;
          color: var(--muted);
          line-height: 1.44;
        }

        .proofList {
          display: grid;
          gap: 12px;
        }

        .compact {
          margin-bottom: 0;
        }

        .quoteBox {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 22px;
          padding: 26px;
          border-radius: 38px;
          background:
            radial-gradient(circle at 90% 10%, rgba(34, 163, 18, 0.24), transparent 36%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.05));
          border: 1px solid var(--border);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
        }

        .formCard {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 18px;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.42);
          border: 1px solid var(--border);
          backdrop-filter: blur(24px);
        }

        .formCard h3 {
          grid-column: 1 / -1;
          margin: 0;
          font-size: 22px;
          letter-spacing: -0.045em;
        }

        .formCard label {
          display: grid;
          gap: 7px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 12px;
          font-weight: 850;
        }

        .formCard input,
        .formCard select,
        .formCard textarea {
          width: 100%;
          min-height: 50px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background: rgba(255, 255, 255, 0.075);
          color: #fff;
          outline: none;
          padding: 0 14px;
        }

        .formCard select option {
          color: #111;
        }

        .formCard textarea {
          min-height: 94px;
          padding: 14px;
          resize: vertical;
        }

        .full {
          grid-column: 1 / -1;
        }

        .chips {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .chips div {
          min-height: 76px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.105);
          display: flex;
          align-items: end;
          font-weight: 850;
        }

        .faq details {
          margin-top: 10px;
          overflow: hidden;
        }

        .faq summary {
          cursor: pointer;
          padding: 18px;
          font-weight: 850;
          list-style: none;
          display: flex;
          justify-content: space-between;
        }

        .faq summary::-webkit-details-marker {
          display: none;
        }

        .faq summary::after {
          content: "+";
          color: var(--green2);
          font-size: 22px;
        }

        .faq details[open] summary::after {
          content: "−";
        }

        .faq details p {
          padding: 0 18px 18px;
          margin: 0;
          color: var(--muted);
          line-height: 1.55;
        }

        .finalCta {
          padding: 70px 0 120px;
        }

        .finalBox {
          min-height: 420px;
          padding: 28px;
          border-radius: 38px;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.34)),
            url("/rolo-asfalto-gp.jpg") center / cover no-repeat;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
        }

        .finalBox h2 {
          max-width: 780px;
          margin: 0 0 16px;
          font-size: clamp(38px, 6vw, 72px);
          line-height: 0.95;
          letter-spacing: -0.075em;
        }

        .finalBox p {
          max-width: 620px;
          margin: 0 0 22px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.55;
          font-size: 18px;
        }

        .mobileCta {
          display: none;
        }

        @media (max-width: 980px) {
          .heroGrid,
          .proofGrid,
          .quoteBox {
            grid-template-columns: 1fr;
          }

          .needGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .chips {
            grid-template-columns: repeat(2, 1fr);
          }

          .nav a:not(.navCta) {
            display: none;
          }

          .mobileCta {
            position: fixed;
            z-index: 80;
            left: 12px;
            right: 12px;
            bottom: 12px;
            padding: 10px;
            border-radius: 24px;
            background: rgba(10, 10, 10, 0.74);
            border: 1px solid var(--border);
            backdrop-filter: blur(24px);
            box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
            display: flex;
            gap: 8px;
          }

          .mobileCta .btn {
            flex: 1;
            min-height: 52px;
          }
        }

        @media (max-width: 620px) {
          .brand img {
            height: 28px;
            max-width: 170px;
            object-fit: contain;
          }

          .hero {
            padding-top: 96px;
          }

          .hero h1 {
            font-size: 48px;
          }

          .heroActions {
            flex-direction: column;
          }

          .appPanel {
            display: none;
          }

          .section {
            padding: 64px 0;
          }

          .needGrid,
          .steps,
          .riskGrid,
          .formCard,
          .chips {
            grid-template-columns: 1fr;
          }

          .needCard {
            min-height: 190px;
          }

          .quoteBox {
            padding: 18px;
          }

          .finalBox {
            min-height: 460px;
            padding: 22px;
          }
        }
      `}</style>
    </main>
  );
}
