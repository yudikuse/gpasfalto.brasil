"use client";

import { FormEvent, useMemo, useState } from "react";

const WA = "5564993273958";
const WA_MSG = encodeURIComponent("Olá, vim pela LP de aplicação CBUQ da GP Asfalto. Gostaria de uma proposta técnica.");

type F = { nome: string; tel: string; cidade: string; obra: string };

const PERSONAS = [
  { n: "01", label: "Construtoras", title: "Ganhou a obra.", sub: "Precisa terceirizar a pavimentação.", body: "Subcontratada com ART, equipe técnica e cronograma. Obras públicas e privadas em todo Goiás." },
  { n: "02", label: "Loteadoras", title: "Precisa entregar a infraestrutura.", sub: "Pavimentação é obrigação municipal.", body: "Da terraplenagem ao revestimento CBUQ. Um contrato, um responsável técnico." },
  { n: "03", label: "Tem CBUQ", title: "Tem a massa. Falta o executor.", sub: "Usina própria sem equipe de aplicação.", body: "Fornecemos acabadora, rolo e equipe técnica. Você controla a produção, a GP executa." },
  { n: "04", label: "Pacote completo", title: "Do zero à entrega.", sub: "Sem gerenciar múltiplos fornecedores.", body: "Terraplenagem, base, subbase e revestimento em contrato único com responsável dedicado." },
];

const SCOPE = [
  { n: "01", t: "Terraplenagem", d: "Corte, aterro e regularização" },
  { n: "02", t: "Base e subbase", d: "BGS, brita graduada, estabilização" },
  { n: "03", t: "Imprimação", d: "Pintura de ligação" },
  { n: "04", t: "Revestimento CBUQ", d: "Usina própria, temperatura controlada" },
  { n: "05", t: "Só a aplicação", d: "Equipe + acabadora + rolo" },
  { n: "06", t: "Recapeamento", d: "Avaliação + nova camada" },
];

const FAQ = [
  ["Emitem ART de execução?", "Sim. Toda obra com responsável técnico e documentação técnica completa."],
  ["Atendem obra pública como subcontratada?", "Sim. Atuamos em licitações públicas e privadas com documentação técnica completa."],
  ["Posso contratar só a aplicação?", "Sim. Fornecemos equipe, acabadora e rolo. Você tem o CBUQ, a GP executa."],
  ["Qual a área de atendimento?", "Todo o estado de Goiás."],
  ["Qual o prazo de mobilização?", "Depende da localidade e escopo. Informamos no retorno da proposta."],
];

function mask(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

export default function LP() {
  const [faq, setFaq] = useState<number | null>(null);
  const [f, setF] = useState<F>({ nome: "", tel: "", cidade: "", obra: "" });
  const waF = useMemo(() => `https://wa.me/${WA}?text=${encodeURIComponent(
    ["Olá, vim pela LP de aplicação CBUQ da GP Asfalto.", "", `Nome: ${f.nome||"-"}`, `WhatsApp: ${f.tel||"-"}`, `Cidade: ${f.cidade||"-"}`, `Obra: ${f.obra||"-"}`, "", "Gostaria de uma proposta técnica."].join("\n")
  )}`, [f]);
  const wa = `https://wa.me/${WA}?text=${WA_MSG}`;
  const u = (k: keyof F, v: string) => setF(p => ({ ...p, [k]: k === "tel" ? mask(v) : v }));
  const sub = (e: FormEvent) => {
    e.preventDefault();
    if (f.tel.replace(/\D/g, "").length < 10) { alert("WhatsApp inválido"); return; }
    window.open(waF, "_blank", "noopener");
  };

  return (
    <div className="root">

      {/* ─── 01 HERO — tela cheia, fundo preto, título embaixo ─── */}
      <section className="s-hero">
        <div className="hero-photo" />
        <div className="hero-fade" />
        <nav className="hero-nav">
          <img src="/images/logo-white.png" alt="GP Asfalto" className="hero-logo" />
          <a href={wa} target="_blank" rel="noreferrer" className="hero-link">Falar com a equipe →</a>
        </nav>
        <div className="hero-foot">
          <p className="tag">Aplicação CBUQ · Goiás</p>
          <h1 className="hero-h1">Executor<br/>técnico<br/>para sua<br/>obra.</h1>
          <a href={wa} target="_blank" rel="noreferrer" className="hero-cta">Solicitar proposta técnica</a>
        </div>
      </section>

      {/* ─── 02 LOGOS — fundo branco ─── */}
      <section className="s-logos">
        <p className="eyebrow">Obras executadas para</p>
        <div className="logos-track">
          {["COMIGO","LDC","Raízen","Nutrien","Mosaic","Mercado Livre","Fetz","Grupo Cereal"].map(n => (
            <span key={n} className="logo-n">{n}</span>
          ))}
        </div>
      </section>

      {/* ─── 03 PARA QUEM — fundo branco, lista numerada como Cascade ─── */}
      <section className="s-list">
        <header className="list-head">
          <h2 className="list-title">Para<br/>quem é.</h2>
          <p className="list-sub">Identificou sua situação abaixo?<br/>A GP Asfalto atende.</p>
        </header>
        {PERSONAS.map((p, i) => (
          <article key={p.n} className="list-item" style={{ animationDelay: `${i * 60}ms` }}>
            <span className="list-n">{p.n}</span>
            <div className="list-body">
              <p className="list-label">{p.label}</p>
              <h3 className="list-h3">{p.title}</h3>
              <p className="list-sub2">{p.sub}</p>
              <p className="list-p">{p.body}</p>
            </div>
          </article>
        ))}
        <a href={wa} target="_blank" rel="noreferrer" className="list-cta">Solicitar proposta técnica →</a>
      </section>

      {/* ─── 04 BRAND SECTION — fundo verde como o vermelho do Cascade ─── */}
      <section className="s-brand">
        <p className="eyebrow light">Por que a GP Asfalto</p>
        <div className="brand-stats">
          <div className="bstat">
            <strong>3</strong>
            <span>usinas próprias<br/>em operação</span>
          </div>
          <div className="bstat">
            <strong>40+</strong>
            <span>anos de<br/>engenharia em Goiás</span>
          </div>
          <div className="bstat">
            <strong>100%</strong>
            <span>do estado<br/>de Goiás atendido</span>
          </div>
        </div>
        <p className="brand-body">
          Controlamos toda a cadeia — produção de CBUQ, transporte com temperatura
          controlada, preparo de base e execução. Sem depender de terceiros nas etapas críticas.
        </p>
      </section>

      {/* ─── 05 ESCOPO — fundo branco, lista limpa ─── */}
      <section className="s-scope">
        <h2 className="scope-title">O que<br/>executamos.</h2>
        <div className="scope-list">
          {SCOPE.map(s => (
            <div key={s.n} className="scope-row">
              <span className="scope-n">{s.n}</span>
              <div>
                <strong>{s.t}</strong>
                <span>{s.d}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 06 DEPOIMENTO — fundo preto como Cascade ─── */}
      <section className="s-depo">
        <p className="eyebrow light">Quem contratou</p>
        <blockquote className="depo-q">
          A GP Asfalto entregou a pavimentação do loteamento dentro do prazo,
          com toda a documentação técnica para aprovação municipal.
        </blockquote>
        <div className="depo-who">
          <div className="depo-av">RS</div>
          <div>
            <p className="depo-name">Rafael S.</p>
            <p className="depo-role">Diretor de Engenharia · Construtora · Goiás</p>
          </div>
        </div>
      </section>

      {/* ─── 07 FORM — fundo branco ─── */}
      <section className="s-form" id="proposta">
        <div className="form-head">
          <p className="eyebrow">Solicitar proposta</p>
          <h2 className="form-title">Envie o<br/>projeto.</h2>
          <p className="form-sub">Memorial, planta ou fotos já permitem análise. Retorno via WhatsApp.</p>
        </div>
        <form onSubmit={sub} className="form">
          <div className="form-row">
            <label><span>Nome</span><input value={f.nome} onChange={e => u("nome", e.target.value)} placeholder="Seu nome" required /></label>
            <label><span>WhatsApp</span><input value={f.tel} onChange={e => u("tel", e.target.value)} placeholder="(64) 99999-9999" inputMode="tel" required /></label>
          </div>
          <label className="full"><span>Cidade / UF</span><input value={f.cidade} onChange={e => u("cidade", e.target.value)} placeholder="Ex.: Goiânia / GO" required /></label>
          <label className="full">
            <span>Tipo de obra</span>
            <select value={f.obra} onChange={e => u("obra", e.target.value)} required>
              <option value="">Selecione</option>
              <option>Loteamento / infraestrutura</option>
              <option>Subcontratação em obra</option>
              <option>Pátio industrial / logístico</option>
              <option>Via interna / acesso</option>
              <option>Tenho CBUQ, preciso aplicar</option>
              <option>Recapeamento</option>
              <option>Pacote completo</option>
              <option>Outro</option>
            </select>
          </label>
          <button type="submit" className="full form-btn">Solicitar proposta técnica →</button>
          <p className="full form-note">Abre o WhatsApp com sua solicitação pronta</p>
        </form>
      </section>

      {/* ─── 08 FAQ — fundo cinza quase branco ─── */}
      <section className="s-faq">
        <p className="eyebrow">Dúvidas frequentes</p>
        {FAQ.map(([q, a], i) => (
          <div key={q} className={`faq-row${faq === i ? " open" : ""}`}>
            <button onClick={() => setFaq(faq === i ? null : i)}>
              <span>{q}</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d={faq === i ? "M5 12h14" : "M12 5v14M5 12h14"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {faq === i && <p>{a}</p>}
          </div>
        ))}
      </section>

      {/* ─── 09 FINAL CTA — fundo navy escuro ─── */}
      <section className="s-final">
        <div className="final-bg" />
        <img src="/images/logo-white.png" alt="GP Asfalto" className="final-logo" />
        <h2 className="final-h2">Da usina<br/>à<br/>compactação.</h2>
        <a href={wa} target="_blank" rel="noreferrer" className="final-cta">Solicitar proposta técnica →</a>
        <p className="final-sub">Todo o estado de Goiás · Sem compromisso</p>
      </section>

      {/* ─── STICKY MOBILE ─── */}
      <a href={wa} target="_blank" rel="noreferrer" className="sticky">
        Solicitar proposta técnica →
      </a>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .root {
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          background: #fff;
          color: #0a0a0a;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        /* ── SHARED ─────────────────────────── */
        .eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #999;
          display: block;
          margin-bottom: 28px;
        }
        .eyebrow.light { color: rgba(255,255,255,.45); }

        /* ── HERO ───────────────────────────── */
        .s-hero {
          position: relative;
          min-height: 100svh;
          background: #050505;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          overflow: hidden;
        }
        .hero-photo {
          position: absolute; inset: 0;
          background: url('/images/lp3/hero-cbuq.jpg') center / cover no-repeat;
          opacity: .3;
        }
        .hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #050505 30%, transparent 70%);
        }
        .hero-nav {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: space-between;
        }
        .hero-logo { height: 26px; width: auto; }
        .hero-link {
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,.5);
          text-decoration: none; letter-spacing: .02em;
          transition: color .2s;
        }
        .hero-link:hover { color: white; }
        .hero-foot {
          position: relative; z-index: 2;
          padding-bottom: 8px;
        }
        .tag {
          font-size: 10px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.35);
          margin-bottom: 20px; display: block;
        }
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(64px, 18vw, 120px);
          line-height: .92;
          color: #fff;
          letter-spacing: -.02em;
          margin-bottom: 28px;
          text-transform: uppercase;
        }
        .hero-cta {
          display: inline-block;
          font-size: 13px; font-weight: 600;
          color: #fff; background: #2C8836;
          padding: 13px 22px; border-radius: 2px;
          text-decoration: none; letter-spacing: .01em;
          transition: background .2s;
        }
        .hero-cta:hover { background: #1e6326; }

        /* ── LOGOS ──────────────────────────── */
        .s-logos {
          background: #fff;
          padding: 24px 24px 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        .logos-track {
          display: flex; gap: 0;
          overflow-x: auto; scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .logos-track::-webkit-scrollbar { display: none; }
        .logo-n {
          flex: 0 0 auto;
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 14px;
          letter-spacing: .06em; text-transform: uppercase;
          color: #bbb;
          padding-right: 24px; margin-right: 24px;
          border-right: 1px solid #eee;
          white-space: nowrap;
        }
        .logo-n:last-child { border-right: none; }

        /* ── PARA QUEM ──────────────────────── */
        .s-list {
          background: #fff;
          padding: clamp(48px, 10vw, 96px) 24px;
          border-bottom: 1px solid #f0f0f0;
        }
        .list-head {
          margin-bottom: 48px;
        }
        .list-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: clamp(48px, 13vw, 88px);
          line-height: .92; text-transform: uppercase;
          letter-spacing: -.02em; color: #0a0a0a;
          margin-bottom: 16px;
        }
        .list-sub {
          font-size: 14px; font-weight: 300; color: #888; line-height: 1.6;
        }
        .list-item {
          display: flex; gap: 20px;
          padding: 28px 0;
          border-top: 1px solid #f0f0f0;
        }
        .list-item:last-of-type { border-bottom: 1px solid #f0f0f0; }
        .list-n {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 11px;
          letter-spacing: .1em; color: #2C8836;
          flex: 0 0 28px; padding-top: 3px;
        }
        .list-label {
          font-size: 10px; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; color: #bbb;
          margin-bottom: 8px;
        }
        .list-h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: clamp(22px, 5vw, 32px);
          line-height: .95; text-transform: uppercase;
          color: #0a0a0a; margin-bottom: 6px;
        }
        .list-sub2 {
          font-size: 12px; font-weight: 500; color: #2C8836;
          margin-bottom: 8px;
        }
        .list-p {
          font-size: 13px; font-weight: 300; color: #666; line-height: 1.65;
        }
        .list-cta {
          display: inline-block; margin-top: 40px;
          font-size: 14px; font-weight: 600; color: #0a0a0a;
          text-decoration: none;
          border-bottom: 1.5px solid #0a0a0a;
          padding-bottom: 2px;
          transition: color .2s, border-color .2s;
        }
        .list-cta:hover { color: #2C8836; border-color: #2C8836; }

        /* ── BRAND — verde como o vermelho do Cascade ─ */
        .s-brand {
          background: #2C8836;
          padding: clamp(56px, 12vw, 112px) 24px;
        }
        .brand-stats {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 40px;
          border-top: 1px solid rgba(255,255,255,.2);
        }
        .bstat {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,.2);
        }
        .bstat strong {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: clamp(48px, 14vw, 88px);
          color: #fff; line-height: 1; letter-spacing: -.03em;
          flex: 0 0 auto;
        }
        .bstat span {
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,.7); line-height: 1.5;
        }
        .brand-body {
          font-size: clamp(15px, 2.5vw, 18px);
          font-weight: 300; color: rgba(255,255,255,.7);
          line-height: 1.75; max-width: 560px;
        }

        /* ── ESCOPO ─────────────────────────── */
        .s-scope {
          background: #fff;
          padding: clamp(48px, 10vw, 96px) 24px;
          border-bottom: 1px solid #f0f0f0;
        }
        .scope-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: clamp(48px, 13vw, 88px);
          line-height: .92; text-transform: uppercase;
          letter-spacing: -.02em; color: #0a0a0a;
          margin-bottom: 40px;
        }
        .scope-list { border-top: 1px solid #f0f0f0; }
        .scope-row {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 0 16px;
          padding: 18px 0;
          border-bottom: 1px solid #f0f0f0;
          align-items: start;
        }
        .scope-n {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 11px;
          letter-spacing: .08em; color: #2C8836;
          padding-top: 2px;
        }
        .scope-row strong {
          display: block; font-size: 15px; font-weight: 600;
          color: #0a0a0a; margin-bottom: 3px;
        }
        .scope-row span {
          font-size: 13px; font-weight: 300; color: #888;
        }

        /* ── DEPOIMENTO ─────────────────────── */
        .s-depo {
          background: #0a0a0a;
          padding: clamp(64px, 14vw, 120px) 24px;
        }
        .depo-q {
          font-size: clamp(18px, 4vw, 24px);
          font-weight: 300; font-style: italic;
          color: rgba(255,255,255,.85); line-height: 1.65;
          margin-bottom: 36px; max-width: 600px;
          border-left: 2px solid #2C8836;
          padding-left: 20px;
        }
        .depo-who { display: flex; align-items: center; gap: 14px; }
        .depo-av {
          width: 42px; height: 42px; border-radius: 50%;
          background: #2C8836; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600; flex: 0 0 auto;
        }
        .depo-name { font-size: 14px; font-weight: 600; color: #fff; }
        .depo-role { font-size: 12px; font-weight: 300; color: rgba(255,255,255,.35); margin-top: 2px; }

        /* ── FORM ───────────────────────────── */
        .s-form {
          background: #f8f7f4;
          padding: clamp(48px, 10vw, 96px) 24px;
          border-bottom: 1px solid #eee;
        }
        .form-head { margin-bottom: 40px; }
        .form-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: clamp(48px, 13vw, 88px);
          line-height: .92; text-transform: uppercase;
          letter-spacing: -.02em; color: #0a0a0a;
          margin-bottom: 14px;
        }
        .form-sub {
          font-size: 14px; font-weight: 300; color: #888; line-height: 1.65;
        }
        .form {
          display: flex; flex-direction: column; gap: 12px;
          max-width: 560px;
        }
        .form-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .form label {
          display: flex; flex-direction: column; gap: 5px;
        }
        .form label.full { grid-column: 1 / -1; }
        .form label span {
          font-size: 10px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; color: #999;
        }
        .form input, .form select {
          border: 1px solid #e0e0e0; border-radius: 2px;
          background: #fff; padding: 13px 14px;
          font-family: 'Manrope', sans-serif; font-size: 15px;
          color: #0a0a0a; outline: none; width: 100%;
          -webkit-appearance: none;
          transition: border-color .15s;
        }
        .form input:focus, .form select:focus { border-color: #2C8836; }
        .form-btn {
          background: #2C8836; color: #fff; border: none;
          font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 600;
          padding: 15px; border-radius: 2px; cursor: pointer;
          transition: background .2s; margin-top: 6px;
        }
        .form-btn:hover { background: #1e6326; }
        .form-note { font-size: 12px; font-weight: 300; color: #aaa; text-align: center; }

        /* ── FAQ ────────────────────────────── */
        .s-faq {
          background: #fff;
          padding: clamp(40px, 8vw, 80px) 24px;
        }
        .faq-row { border-bottom: 1px solid #f0f0f0; }
        .faq-row button {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          padding: 18px 0; background: none; border: none; cursor: pointer; text-align: left;
        }
        .faq-row button span {
          font-size: 15px; font-weight: 500; color: #0a0a0a; line-height: 1.4;
        }
        .faq-row button svg {
          width: 18px; height: 18px; flex: 0 0 18px; color: #2C8836;
        }
        .faq-row p {
          font-size: 14px; font-weight: 300; color: #666;
          line-height: 1.7; padding-bottom: 18px; max-width: 600px;
        }

        /* ── FINAL CTA ──────────────────────── */
        .s-final {
          position: relative; background: #071228;
          padding: clamp(64px, 14vw, 120px) 24px;
          overflow: hidden;
          display: flex; flex-direction: column; gap: 24px;
        }
        .final-bg {
          position: absolute; inset: 0;
          background: url('/images/lp3/hero-cbuq.jpg') center / cover no-repeat;
          opacity: .06;
        }
        .final-logo { width: 120px; height: auto; position: relative; }
        .final-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: clamp(64px, 18vw, 120px);
          text-transform: uppercase; letter-spacing: -.03em;
          line-height: .9; color: #fff; position: relative;
        }
        .final-cta {
          display: inline-block; text-decoration: none;
          font-size: 14px; font-weight: 600;
          color: #fff; background: #2C8836;
          padding: 14px 24px; border-radius: 2px;
          position: relative; transition: background .2s;
        }
        .final-cta:hover { background: #1e6326; }
        .final-sub {
          font-size: 11px; font-weight: 300;
          color: rgba(255,255,255,.25); position: relative;
        }

        /* ── STICKY MOBILE ──────────────────── */
        .sticky { display: none; }

        @media (max-width: 640px) {
          .sticky {
            display: block; position: fixed;
            left: 0; right: 0; bottom: 0; z-index: 300;
            background: #2C8836; color: #fff;
            text-decoration: none; text-align: center;
            font-family: 'Manrope', sans-serif;
            font-size: 15px; font-weight: 600;
            padding: 17px;
            box-shadow: 0 -8px 32px rgba(0,0,0,.2);
          }
          .s-hero { padding-bottom: 88px; }
          .form-row { grid-template-columns: 1fr; }
          .bstat { flex-direction: column; gap: 6px; }
        }

        @media (min-width: 768px) {
          .s-hero { padding: 32px 48px clamp(56px, 8vw, 80px); }
          .s-logos { padding: 28px 48px; }
          .s-list, .s-scope, .s-depo, .s-brand, .s-form, .s-faq, .s-final { padding-left: 48px; padding-right: 48px; }
          .brand-stats { flex-direction: row; }
          .bstat { flex: 1; flex-direction: column; gap: 8px; border-right: 1px solid rgba(255,255,255,.2); border-bottom: none; padding: 32px 28px 32px 0; }
          .bstat:last-child { border-right: none; padding-right: 0; padding-left: 28px; }
          .bstat:not(:first-child):not(:last-child) { padding-left: 28px; }
        }

        @media (min-width: 1024px) {
          .s-hero { padding: 40px 72px clamp(64px, 8vw, 96px); }
          .s-list, .s-scope, .s-depo, .s-brand, .s-form, .s-faq, .s-final { padding-left: 72px; padding-right: 72px; }
          .s-logos { padding: 28px 72px; }
          .scope-row { grid-template-columns: 44px 220px 1fr; }
          .scope-row span { grid-column: 3; grid-row: 1; align-self: center; }
          .scope-row strong { margin-bottom: 0; align-self: center; }
        }
      `}</style>
    </div>
  );
}
