"use client";

import { FormEvent, useEffect, useState } from "react";

const WHATSAPP_NUMBER = "5564999452124";
const PHONE_DISPLAY = "(64) 99945-2124";

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
  const [selected, setSelected] = useState<Scenario>(SCENARIOS[0]);
  const [phone, setPhone] = useState("");
  const [heroPhone, setHeroPhone] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > window.innerHeight * 0.75);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueia vazamento de background do layout pai (azul) enquanto /lp3 está montada.
  // Salva o estado anterior e restaura no unmount — não afeta outras rotas (silos etc).
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlBg: html.style.background,
      bodyBg: body.style.background,
      bodyColor: body.style.color,
    };
    html.style.background = "#0E1013";
    body.style.background = "#0E1013";
    body.style.color = "#F0EBE2";
    body.classList.add("lp3-active");
    return () => {
      html.style.background = prev.htmlBg;
      body.style.background = prev.bodyBg;
      body.style.color = prev.bodyColor;
      body.classList.remove("lp3-active");
    };
  }, []);

  // Reforço JS: esconde Header, SideTagline e WhatsAppFloat do layout pai
  // enquanto /lp3 estiver montada. Restaura tudo no unmount (silos não é afetado).
  // IMPORTANTE: roda 1 única vez, sem MutationObserver, sem loops, sem polling.
  useEffect(() => {
    const hidden: Array<{ el: HTMLElement; prev: string }> = [];

    function tryHide(el: Element | null) {
      if (!el || !(el instanceof HTMLElement)) return;
      if (el.closest(".lp3")) return; // nunca esconder algo da própria LP
      if (el.contains(document.querySelector(".lp3"))) return; // nunca esconder wrappers que contêm a LP
      hidden.push({ el, prev: el.style.display });
      el.style.setProperty("display", "none", "important");
    }

    // Lista finita e segura de seletores específicos (sem regex/scan amplo)
    const targetSelectors = [
      // Header global (componente <Header />)
      "body > header",
      "header[class*='Header']",
      "header[class*='header']",
      "nav[class*='Header']",
      // SideTagline (faixa lateral)
      "[class*='SideTagline']",
      "[class*='side-tagline']",
      "aside[class*='tagline']",
      // WhatsAppFloat (botão verde do site principal)
      "[class*='WhatsAppFloat']",
      "[class*='whatsapp-float']",
    ];

    targetSelectors.forEach((sel) => {
      try {
        document.querySelectorAll(sel).forEach(tryHide);
      } catch {
        // seletor inválido — ignora silenciosamente
      }
    });

    return () => {
      hidden.forEach(({ el, prev }) => {
        if (prev) el.style.display = prev;
        else el.style.removeProperty("display");
      });
    };
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

  function handleHeroSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("hname") || "");
    const city = String(form.get("hcity") || "");
    openWhatsapp(
      `Olá, vim pela página da GP Asfalto.\n\n` +
      `Nome: ${name}\n` +
      `WhatsApp: ${heroPhone}\n` +
      `Cidade da obra: ${city}\n\n` +
      `Quero uma avaliação técnica de pavimentação.\n\n` +
      `Origem: LP CBUQ · Hero · Google Ads`
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const empresa = String(form.get("empresa") || "Não informado");
    const city = String(form.get("city") || "");
    const volume = String(form.get("volume") || "Não informado");
    const prazo = String(form.get("prazo") || "Não informado");

    openWhatsapp(
      `Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica.\n\n` +
      `Nome: ${name}\n` +
      `Empresa: ${empresa}\n` +
      `WhatsApp: ${phone}\n` +
      `Cidade da obra: ${city}\n\n` +
      `Situação:\n${selected.message}\n\n` +
      `Prazo desejado:\n${prazo}\n\n` +
      `Área ou volume aproximado:\n${volume}\n\n` +
      `Origem: LP CBUQ · Form · Google Ads`
    );
  }

  return (
    <main className="lp3">

      {/* ── ESCUDO ── cobre vazamento do layout pai (header global, fundo azul) atrás da topbar fixa */}
      <div className="topShield" aria-hidden="true" />

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
        <div className="topbarRight">
          <a className="topPhone" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica.")}`} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.9 9 9.3 7.5 9 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
            </svg>
            <span>{PHONE_DISPLAY}</span>
          </a>
          <button type="button" onClick={() => goToForm()}>Avaliar obra</button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero" id="inicio">
        <div className="heroBg" />
        <div className="heroShade" />
        <div className="heroGrain" aria-hidden="true" />

        <div className="heroGrid">
          <div className="heroContent">
            <p className="kicker"><span className="kickerDot"/>Pavimentação asfáltica em Goiás · 1998</p>
            <h1>
              CBUQ, base e<br/>
              <em>aplicação</em> de<br/>
              asfalto em Goiás.
            </h1>
            <p className="heroSub">
              3 usinas próprias, equipe técnica e maquinário em campo.
              Da terraplenagem ao revestimento CBUQ com ART de execução —
              em qualquer município do estado.
            </p>
            <div className="heroCreds">
              {[
                "3 usinas próprias em Goiás",
                "40+ anos de pavimentação",
                "ART de execução inclusa",
                "Equipe e maquinário próprios",
              ].map(t => (
                <div key={t} className="heroCred">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* ── MINI FORM LATERAL ── */}
          <aside className="heroForm" aria-label="Solicitar avaliação técnica">
            <div className="heroFormHead">
              <span className="heroFormPill">Resposta em até 4h úteis</span>
              <h2>Avaliação técnica gratuita</h2>
              <p>Informe os dados — retornamos pelo WhatsApp.</p>
            </div>

            <form onSubmit={handleHeroSubmit} className="heroFormBody">
              <label>
                <span>Nome</span>
                <input name="hname" type="text" placeholder="Seu nome" required />
              </label>
              <label>
                <span>WhatsApp</span>
                <input
                  name="hphone"
                  type="tel"
                  inputMode="tel"
                  placeholder="(XX) 99999-9999"
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(maskPhone(e.target.value))}
                  required
                />
              </label>
              <label>
                <span>Cidade da obra</span>
                <input name="hcity" type="text" placeholder="Ex.: Rio Verde / GO" required />
              </label>
              <button className="primary" type="submit">
                Solicitar avaliação técnica
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <p className="heroFormNote">
                Sem compromisso · Abre o WhatsApp com sua solicitação pronta
              </p>
            </form>
          </aside>
        </div>
      </section>

      {/* ── CLIENT STRIP (logos oficiais dos parceiros) ── */}
      <div className="clientStrip">
        <p className="clientLabel">Fazemos parte da infraestrutura dessas operações</p>
        <div className="clientLogoWrap">
          <img
            src="/images/lp/logos_strip.png"
            alt="LDC, Comigo, Raízen, Realiza Construtora, Grupo Fetz, Grupo Cereal, Cereal Ouro, Mercado Livre, Nutrien"
            className="clientLogoStrip"
          />
        </div>
      </div>

      {/* ── PROVA / AUTORIDADE ── */}
      <section className="proof">
        <div className="proofText">
          <p className="kicker"><span className="kickerDot"/>Por que a GP Asfalto</p>
          <h2>Não é só massa.<br/>É <em>obra entregue</em>.</h2>
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
          <button className="primary" type="button" onClick={() => goToForm()}>
            Solicitar avaliação técnica
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
        <div className="proofImage" aria-hidden="true">
          <div className="proofImageTag">
            <span className="proofImageDot" />
            Pátio operacional · Goiás
          </div>
        </div>
      </section>

      {/* ── CENÁRIOS ── */}
      <section className="entry" id="situacao">
        <div className="entryPanel">
          <p className="kicker"><span className="kickerDot"/>Qual é a sua situação?</p>
          <h2>A GP entra onde a obra <em>precisa avançar</em>.</h2>

          <div className="scenarioPicker" role="tablist">
            {SCENARIOS.map((item) => (
              <button key={item.id} type="button" role="tab"
                aria-selected={selected.id === item.id}
                className={selected.id === item.id ? "active" : ""}
                onClick={() => setSelected(item)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="scenarioText" key={selected.id}>
            <span className="scenarioTag">{selected.label}</span>
            <h3>{selected.title}</h3>
            <p className="scenarioSub">{selected.sub}</p>
            <div className="scenarioChips">
              {selected.chips.map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <button className="primary primaryS" type="button" onClick={() => goToForm(selected)}>
              Solicitar avaliação técnica
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="entryImage" aria-hidden="true">
          <div className="entryCaption">
            <span><span className="kickerDot"/>Obra em campo · Goiás</span>
            <strong>Base, massa, aplicação e rolo trabalhando em sequência.</strong>
          </div>
        </div>
      </section>

      {/* ── SEQUÊNCIA DE EXECUÇÃO ── */}
      <section className="sequence">
        <div className="sequenceInner">
          <p className="kicker"><span className="kickerDot"/>Cadeia de execução própria</p>
          <h2>Base no ponto.<br/>Massa no tempo.<br/><em>Rolo na sequência.</em></h2>
          <p className="seqSub">
            Com usinas próprias, equipe e maquinário em campo, a GP Asfalto
            controla as etapas críticas da pavimentação: produção do CBUQ,
            logística com temperatura controlada, aplicação e compactação.
            Um contrato. Um responsável técnico.
          </p>
          <div className="lineProcess" aria-label="Processo de execução">
            {[
              ["01", "Terraplenagem", "Corte, aterro e regularização do subleito"],
              ["02", "Base e subbase", "BGS, brita graduada, estabilização"],
              ["03", "Revestimento CBUQ", "Massa de usina própria, temperatura controlada"],
              ["04", "Compactação", "Rolo compactador e controle tecnológico"],
            ].map(([n, t, d]) => (
              <div key={t} className="processStep">
                <span className="processNum">{n}</span>
                <strong>{t}</strong>
                <span className="processDesc">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO COMPLETO ── */}
      <section className="formSection" id="avaliacao">
        <div className="formIntro">
          <p className="kicker"><span className="kickerDot"/>Avaliação técnica</p>
          <h2>Informe os dados <em>da obra</em>.</h2>
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
          <a className="formCallNote" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica.")}`} target="_blank" rel="noreferrer">
            <span className="formCallIcon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.9 9 9.3 7.5 9 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
              </svg>
            </span>
            <span className="formCallText">
              <strong>{PHONE_DISPLAY}</strong>
              <small>Chamar direto no WhatsApp</small>
            </span>
          </a>
        </div>

        <form className="leadForm" onSubmit={handleSubmit}>
          <label>
            <span>Nome</span>
            <input name="name" type="text" placeholder="Seu nome" required />
          </label>
          <label>
            <span>Empresa / Obra</span>
            <input name="empresa" type="text" placeholder="Nome da empresa ou obra" />
          </label>
          <label>
            <span>WhatsApp</span>
            <input name="phone" type="tel" inputMode="tel" placeholder="(XX) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              required />
          </label>
          <label>
            <span>Cidade da obra</span>
            <input name="city" type="text" placeholder="Ex.: Goiânia / GO" required />
          </label>
          <label>
            <span>Situação</span>
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
          <label>
            <span>Prazo desejado</span>
            <select name="prazo" defaultValue="">
              <option value="">Selecione</option>
              <option value="Urgente">Urgente</option>
              <option value="7 a 15 dias">7 a 15 dias</option>
              <option value="30 dias">Cerca de 30 dias</option>
              <option value="Ainda planejando">Ainda planejando</option>
            </select>
          </label>
          <label className="full">
            <span>Área ou volume aproximado</span>
            <input name="volume" type="text" placeholder="Ex.: 5.000 m², 300 t de CBUQ, 1 km de via" />
          </label>
          <button className="primary full" type="submit">
            Solicitar avaliação técnica
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <p className="formNote full">
            Abre o WhatsApp com sua solicitação pronta para envio
          </p>
        </form>
      </section>

      {/* ── FAQ ── */}
      <section className="faqSection">
        <div className="faqInner">
          <p className="kicker"><span className="kickerDot"/>Dúvidas frequentes</p>
          <h2>Antes de solicitar <em>a avaliação</em>.</h2>
          <div className="faqList">
            {FAQ.map(({ q, a }, i) => (
              <div key={q} className={`faqItem${faqOpen === i ? " open" : ""}`}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{q}</span>
                  <i aria-hidden="true">{faqOpen === i ? "−" : "+"}</i>
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
          <p className="kicker"><span className="kickerDot"/>GP Asfalto · Goiás · Desde 1998</p>
          <h2>40 anos de pavimentação.<br/><em>Da terra ao asfalto.</em></h2>
          <p>
            3 usinas próprias, equipe técnica e maquinário em campo.
            Informe a cidade e o escopo da obra — retornamos com
            avaliação técnica em até 4 horas úteis.
          </p>
          <div className="closingCtas">
            <button className="primary" type="button" onClick={() => goToForm()}>
              Solicitar avaliação técnica
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <a className="ghost ghostWa" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica.")}`} target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.9 9 9.3 7.5 9 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerInner">
          <span>© GP Asfalto · CNPJ disponível mediante solicitação · Goiás · Brasil</span>
          <span>Pavimentação asfáltica · CBUQ · Terraplenagem · ART de execução</span>
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <div className={showSticky ? "stickyCta visible" : "stickyCta"}>
        <a className="ghost ghostWa" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, vim pela página da GP Asfalto. Gostaria de uma avaliação técnica.")}`} target="_blank" rel="noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.9 9 9.3 7.5 9 6.8c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
          </svg>
          WhatsApp
        </a>
        <button className="primary" type="button" onClick={() => goToForm()}>
          Avaliar obra
        </button>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --green:    #2C8836;   /* GP brand */
          --green2:   #3DA84A;   /* GP brand light */
          --yellow:   #F5B800;   /* CTA construction */
          --yellow-d: #E0A800;   /* CTA hover */
          --graphite: #0E1013;   /* asphalt base */
          --graphite-2:#15181D;  /* surface 1 */
          --graphite-3:#1B1F25;  /* surface 2 */
          --terra:    rgba(58, 36, 24, 0.35); /* Goiás earth accent */
          --cream:    #F0EBE2;
          --cream-2:  rgba(240,235,226,0.72);
          --muted:    rgba(240,235,226,0.58);
          --muted-2:  rgba(240,235,226,0.40);
          --line:     rgba(255,255,255,0.10);
          --line-soft:rgba(255,255,255,0.06);
          --line-hot: rgba(245,184,0,0.30);
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; background: var(--graphite); }
        body {
          margin: 0;
          background: var(--graphite);
          color: var(--cream);
          font-family: "DM Sans","Inter",system-ui,-apple-system,sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        button, input, select, textarea { font: inherit; }
        button { cursor: pointer; -webkit-tap-highlight-color: transparent; }

        .lp3 {
          min-height: 100vh;
          overflow-x: hidden;
          background: var(--graphite);
          position: relative;
        }

        /* Escudo: cobre tudo que o layout pai pinta atrás da topbar fixa (azul, header, etc) */
        .topShield {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 100px;
          z-index: 49;          /* abaixo da topbar (50), acima do conteúdo */
          background: var(--graphite);
          pointer-events: none;
        }
        .topShield::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -24px;
          height: 24px;
          background: linear-gradient(180deg, var(--graphite), transparent);
          pointer-events: none;
        }
        /* Reforço extra: enquanto /lp3 estiver ativa, body fica grafite */
        body.lp3-active { background: #0E1013 !important; color: #F0EBE2; }
        body.lp3-active::before {
          content: ""; position: fixed; inset: 0; z-index: -10;
          background: #0E1013; pointer-events: none;
        }

        /* ─────────────────────────────────────────────────────────────────
           ISOLAMENTO DA LP — esconde componentes do layout pai (não-mexível)
           Header global, SideTagline lateral, WhatsAppFloat flutuante.
           Tudo isso só quando /lp3 está ativa. Outras rotas (silos, home)
           continuam vendo esses componentes normalmente.
           ───────────────────────────────────────────────────────────────── */

        /* 1) Header global do site (componente <Header />) */
        body.lp3-active header:not(.topbar),
        body.lp3-active > header,
        body.lp3-active nav[class*="header"],
        body.lp3-active [class*="Header_"]:not(.lp3 *),
        body.lp3-active [data-header],
        body.lp3-active [data-site-header] {
          display: none !important;
        }

        /* 2) SideTagline (faixa lateral "RIO VERDE · GO · BRASIL · EST. 1998") */
        body.lp3-active [class*="SideTagline"],
        body.lp3-active [class*="side-tagline"],
        body.lp3-active [class*="sideTagline"],
        body.lp3-active aside[class*="tagline"],
        body.lp3-active [data-side-tagline] {
          display: none !important;
        }

        /* 3) WhatsAppFloat global (botão verde flutuante do site principal) */
        body.lp3-active [class*="WhatsAppFloat"],
        body.lp3-active [class*="whatsapp-float"],
        body.lp3-active [class*="whatsappFloat"],
        body.lp3-active [class*="WhatsApp_"],
        body.lp3-active [data-whatsapp-float] {
          display: none !important;
        }
        /* ───────────────────────────────────────────────────────────────── */

        /* ── TOPBAR ── */
        .topbar {
          position: fixed; top: 14px; left: 14px; right: 14px; z-index: 50;
          height: 76px; padding: 8px 8px 8px 20px;
          border: 1px solid var(--line); border-radius: 999px;
          background: rgba(14,16,19,0.88);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
          gap: 12px;
        }
        .brand {
          display: inline-flex; align-items: center;
          color: white; text-decoration: none;
          min-width: 0; flex: 0 0 auto;
        }
        .brand img {
          height: auto;
          width: 180px;
          max-height: 64px;
          object-fit: contain;
          display: block;
        }
        @media (min-width: 760px) {
          .brand img { width: 220px; max-height: 70px; }
        }
        @media (max-width: 430px) {
          .brand img { width: 150px; max-height: 56px; }
        }
        .brand > span { display: none; color: #fff; font-weight: 900; font-size: 18px; }
        .topbarRight {
          display: flex; align-items: center; gap: 10px;
          min-width: 0; flex: 1 1 auto; justify-content: flex-end;
        }
        .topPhone {
          display: none; align-items: center; gap: 8px;
          color: var(--cream-2); text-decoration: none;
          font-size: 13px; font-weight: 600;
          padding: 0 6px;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .topPhone svg { color: var(--green2); }
        .topPhone:hover { color: var(--cream); }
        .topbar > .topbarRight > button {
          height: 44px; border: 0; border-radius: 999px;
          padding: 0 18px;
          background: var(--yellow); color: #1a1300;
          font-size: 13px; font-weight: 800; letter-spacing: -0.01em;
          display: inline-flex; align-items: center; gap: 6px;
          white-space: nowrap;
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .topbar > .topbarRight > button:hover { background: var(--yellow-d); }
        .topbar > .topbarRight > button:active { transform: scale(0.97); }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 100svh;
          padding: 130px 20px 56px;
          display: flex; align-items: center;
          overflow: hidden; isolation: isolate;
          background: var(--graphite);
        }
        .heroBg {
          position: absolute; inset: 0; z-index: -3;
          background:
            radial-gradient(70% 50% at 70% 30%, rgba(245,184,0,0.10), transparent 60%),
            radial-gradient(60% 60% at 15% 80%, rgba(44,136,54,0.16), transparent 65%),
            linear-gradient(135deg, #1a1d23 0%, #0c0e11 45%, #15181d 100%);
        }
        .heroBg::after {
          content: "";
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            repeating-linear-gradient(0deg, transparent 0 47px, rgba(255,255,255,0.018) 47px 48px),
            repeating-linear-gradient(90deg, transparent 0 47px, rgba(255,255,255,0.018) 47px 48px);
        }
        .heroShade {
          position: absolute; inset: 0; z-index: -2;
          background:
            linear-gradient(180deg,
              rgba(14,16,19,0.30) 0%,
              rgba(14,16,19,0.55) 45%,
              rgba(14,16,19,0.95) 100%),
            linear-gradient(90deg,
              rgba(14,16,19,0.78) 0%,
              rgba(14,16,19,0.30) 55%,
              rgba(14,16,19,0.10) 100%);
        }
        .heroGrain {
          position: absolute; inset: 0; z-index: -1; pointer-events: none;
          opacity: 0.06; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='5'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        .heroGrid {
          width: min(1180px, 100%); margin: 0 auto;
          display: grid; gap: 32px; align-items: center;
        }
        .heroContent { width: 100%; }

        /* kicker — usado em várias seções */
        .kicker {
          margin: 0;
          display: inline-flex; align-items: center; gap: 10px;
          color: var(--green2);
          text-transform: uppercase; font-size: 11px;
          font-weight: 800; letter-spacing: 0.18em;
        }
        .kickerDot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green2);
          box-shadow: 0 0 0 4px rgba(61,168,74,0.18);
        }

        .hero h1 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 18px 0 0;
          font-size: clamp(54px, 12vw, 108px);
          line-height: 0.85; font-weight: 900;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          color: var(--cream);
          text-shadow: 0 2px 24px rgba(0,0,0,0.40);
        }
        .hero h1 em {
          font-style: italic;
          font-weight: 900;
          color: var(--yellow);
          font-family: "Barlow Condensed", sans-serif;
        }
        .heroSub {
          margin: 18px 0 0; max-width: 540px;
          color: var(--cream-2); font-size: 16px;
          line-height: 1.55; letter-spacing: -0.005em;
        }
        .heroCreds {
          margin-top: 24px; display: flex;
          flex-direction: column; gap: 8px;
        }
        .heroCred {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: var(--cream-2);
          font-weight: 500;
        }
        .heroCred svg { color: var(--green2); flex: 0 0 auto; }

        /* ── MINI FORM HERO ── */
        .heroForm {
          width: 100%;
          background: rgba(21,24,29,0.78);
          backdrop-filter: blur(20px);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 24px;
          box-shadow:
            0 30px 80px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .heroFormHead { padding-bottom: 18px; border-bottom: 1px solid var(--line-soft); }
        .heroFormPill {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 800; letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--yellow);
          background: rgba(245,184,0,0.10);
          border: 1px solid var(--line-hot);
          padding: 5px 10px; border-radius: 999px;
        }
        .heroForm h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 12px 0 0; font-size: 30px;
          line-height: 0.98; font-weight: 900;
          letter-spacing: -0.015em; text-transform: uppercase;
          color: var(--cream);
        }
        .heroForm h2 + p {
          margin: 8px 0 0; color: var(--muted); font-size: 13.5px;
        }
        .heroFormBody {
          padding-top: 16px;
          display: grid; gap: 12px;
        }
        .heroFormBody label {
          display: grid; gap: 6px;
        }
        .heroFormBody label > span {
          color: var(--muted-2);
          font-size: 10.5px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .heroFormBody input {
          width: 100%; min-height: 50px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: var(--cream);
          outline: none; padding: 0 14px; font-size: 15px;
          transition: border-color 0.15s, background 0.15s;
        }
        .heroFormBody input:focus {
          border-color: var(--yellow);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(245,184,0,0.12);
        }
        .heroFormBody .primary { margin-top: 6px; width: 100%; }
        .heroFormNote {
          margin: 6px 0 0; text-align: center;
          font-size: 11.5px; color: var(--muted-2);
        }

        /* ── BUTTONS ── */
        .primary, .ghost {
          min-height: 56px; border-radius: 999px;
          padding: 0 24px; border: 0;
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          font-weight: 800; letter-spacing: -0.01em;
          font-size: 15px;
          transition: transform 0.16s ease, background 0.16s, box-shadow 0.16s;
          text-decoration: none;
        }
        .primary:active, .ghost:active { transform: scale(0.985); }
        .primary {
          background: var(--yellow); color: #1a1300;
          box-shadow:
            0 16px 40px rgba(245,184,0,0.28),
            inset 0 1px 0 rgba(255,255,255,0.30);
        }
        .primary:hover { background: var(--yellow-d); }
        .primaryS { min-height: 50px; font-size: 14px; }
        .ghost {
          background: rgba(255,255,255,0.06); color: var(--cream);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
        }
        .ghost:hover { background: rgba(255,255,255,0.10); }

        /* Variante WhatsApp: usa verde oficial #25D366 — chama atenção como CTA secundário */
        .ghostWa {
          background: #25D366; color: #052f1a;
          border: 1px solid #1fb157;
          box-shadow: 0 14px 32px rgba(37,211,102,0.28);
        }
        .ghostWa:hover { background: #20bf5b; color: #052f1a; }
        .ghostWa svg { color: #052f1a; }

        /* ── CLIENT STRIP (logos PNG @2x transparente) ── */
        .clientStrip {
          background: var(--graphite-2);
          padding: 36px clamp(16px,4vw,40px);
          border-top: 1px solid var(--line-soft);
          border-bottom: 1px solid var(--line-soft);
        }
        .clientLabel {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--muted-2);
          text-align: center; margin: 0 0 22px;
        }
        .clientLogoWrap {
          display: flex; justify-content: center;
          padding: 4px 0;
          margin: 0 auto;
          max-width: 1100px;
          /* máscara de fade nas pontas pra parecer "fila contínua" */
          mask-image: linear-gradient(90deg, transparent 0, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 5%, black 95%, transparent 100%);
        }
        .clientLogoStrip {
          height: 52px; width: auto;
          max-width: 100%;
          opacity: 0.95;
          transition: opacity 0.2s;
        }
        .clientLogoStrip:hover { opacity: 1; }
        @media (max-width: 759px) {
          .clientLogoStrip { height: 36px; }
          .clientStrip { padding: 28px 8px; }
        }

        /* ── SECTIONS BASE ── */
        .proof, .entry, .formSection, .faqSection, .closing {
          width: min(1180px, calc(100% - 40px)); margin: 0 auto;
        }
        .sequence {
          width: min(1180px, calc(100% - 40px)); margin: 28px auto 0;
        }

        /* ── PROOF ── */
        .proof { padding: 72px 0 60px; display: grid; gap: 32px; }
        .proof h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 16px 0 0; font-size: clamp(44px, 10vw, 84px);
          line-height: 0.90; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .proof h2 em {
          font-style: italic; font-weight: 900;
          color: var(--green2);
          font-family: "Barlow Condensed", sans-serif;
        }
        .proofText > p {
          margin: 18px 0 0; color: var(--cream-2);
          font-size: 16px; line-height: 1.60; max-width: 540px;
        }
        .proofStats {
          margin-top: 28px; display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px; background: var(--line);
          border: 1px solid var(--line); border-radius: 14px; overflow: hidden;
        }
        .proofStat {
          padding: 20px 14px; background: var(--graphite-2);
          display: flex; flex-direction: column; gap: 4px; text-align: center;
        }
        .proofStat strong {
          font-family: "Barlow Condensed", sans-serif;
          font-size: clamp(34px, 8vw, 54px); font-weight: 900;
          color: var(--yellow); letter-spacing: -0.02em; line-height: 1;
        }
        .proofStat span { font-size: 11.5px; color: var(--muted); line-height: 1.4; }
        .proofText > button { margin-top: 26px; }

        .proofImage {
          position: relative;
          min-height: 360px; border-radius: 24px;
          border: 1px solid var(--line);
          overflow: hidden;
          background:
            radial-gradient(120% 80% at 50% 100%, rgba(245,184,0,0.10), transparent 60%),
            radial-gradient(80% 60% at 20% 30%, rgba(44,136,54,0.18), transparent 60%),
            linear-gradient(135deg, #1c1f25 0%, #0e1013 60%, #15181d 100%);
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
        }
        .proofImage::before {
          content: "";
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,0.018) 39px 40px),
            repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,0.018) 39px 40px);
          pointer-events: none;
        }
        .proofImage::after {
          content: "";
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          opacity: 0.15; mix-blend-mode: overlay;
          pointer-events: none;
        }
        .proofImageTag {
          position: absolute; left: 18px; bottom: 18px;
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(14,16,19,0.78);
          backdrop-filter: blur(14px);
          border: 1px solid var(--line);
          padding: 8px 14px; border-radius: 999px;
          font-size: 11.5px; font-weight: 700; color: var(--cream-2);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .proofImageDot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green2);
          box-shadow: 0 0 0 4px rgba(61,168,74,0.18);
        }

        /* ── ENTRY (cenários) ── */
        .entry {
          padding: 60px 0;
          display: grid; gap: 32px;
        }
        .entryPanel h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 16px 0 0; font-size: clamp(40px, 10vw, 76px);
          line-height: 0.92; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .entryPanel h2 em {
          font-style: italic; font-weight: 900;
          color: var(--yellow);
          font-family: "Barlow Condensed", sans-serif;
        }
        .scenarioPicker {
          margin-top: 26px; display: flex; flex-wrap: wrap; gap: 8px;
        }
        .scenarioPicker button {
          height: 42px; border-radius: 999px;
          border: 1px solid var(--line);
          padding: 0 18px; background: rgba(255,255,255,0.03);
          color: var(--cream-2); font-weight: 600;
          font-size: 13.5px; letter-spacing: -0.01em;
          transition: all 0.15s;
        }
        .scenarioPicker button.active {
          background: var(--green); color: white; border-color: var(--green);
          box-shadow: 0 8px 22px rgba(44,136,54,0.30);
        }
        .scenarioPicker button:hover:not(.active) {
          border-color: rgba(255,255,255,0.25); color: var(--cream);
          background: rgba(255,255,255,0.05);
        }

        .scenarioText {
          padding-top: 26px;
          animation: fadeUp 0.32s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scenarioTag {
          display: inline-block; margin-bottom: 10px; color: var(--green2);
          text-transform: uppercase; letter-spacing: 0.16em;
          font-size: 10.5px; font-weight: 800;
          padding: 4px 10px; border-radius: 999px;
          background: rgba(61,168,74,0.10);
          border: 1px solid rgba(61,168,74,0.25);
        }
        .scenarioText h3 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 0; font-size: clamp(28px, 7vw, 52px);
          line-height: 0.95; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase; color: var(--cream);
          max-width: 720px;
        }
        .scenarioSub {
          margin: 14px 0 0; color: var(--cream-2);
          font-size: 15px; line-height: 1.58; max-width: 580px;
        }
        .scenarioChips {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px;
        }
        .chip {
          font-size: 11.5px; font-weight: 700; color: var(--green2);
          background: rgba(61,168,74,0.10);
          border: 1px solid rgba(61,168,74,0.28);
          padding: 5px 12px; border-radius: 999px;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .scenarioText > button { margin-top: 22px; }

        .entryImage {
          position: relative;
          height: 360px; border-radius: 24px;
          overflow: hidden; border: 1px solid var(--line);
          background:
            radial-gradient(100% 70% at 50% 100%, rgba(44,136,54,0.18), transparent 65%),
            radial-gradient(70% 50% at 80% 20%, rgba(245,184,0,0.10), transparent 60%),
            linear-gradient(135deg, #1c1f25 0%, #0e1013 50%, #1a1d23 100%);
          box-shadow: 0 30px 80px rgba(0,0,0,0.40);
        }
        .entryImage::before {
          content: "";
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,0.020) 39px 40px),
            repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,0.020) 39px 40px);
          pointer-events: none;
        }
        .entryImage::after {
          content: "";
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          opacity: 0.15; mix-blend-mode: overlay;
          pointer-events: none;
        }
        .entryCaption {
          position: absolute; left: 22px; right: 22px; bottom: 22px; z-index: 2;
        }
        .entryCaption span {
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 10px;
          color: var(--green2); text-transform: uppercase;
          letter-spacing: 0.14em; font-size: 11px; font-weight: 800;
        }
        .entryCaption strong {
          display: block; max-width: 520px; color: white;
          font-size: 22px; line-height: 1.12;
          letter-spacing: -0.02em; font-weight: 800;
        }

        /* ── SEQUENCE ── */
        .sequence {
          padding: 0;
          border-radius: 28px; overflow: hidden;
          border: 1px solid var(--line);
          background:
            linear-gradient(180deg, var(--graphite-2), var(--graphite-3));
          position: relative;
        }
        .sequence::before {
          content: "";
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--yellow) 50%, transparent);
          opacity: 0.40;
        }
        .sequenceInner { padding: 44px 24px 48px; }
        .sequence h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 14px 0 0; font-size: clamp(40px, 10vw, 78px);
          line-height: 0.90; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase; max-width: 900px;
        }
        .sequence h2 em {
          font-style: italic; font-weight: 900;
          color: var(--green2);
          font-family: "Barlow Condensed", sans-serif;
        }
        .seqSub {
          margin: 18px 0 0; color: var(--cream-2);
          font-size: 15px; line-height: 1.62; max-width: 620px;
        }
        .lineProcess {
          margin-top: 36px; display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--line);
          border: 1px solid var(--line); border-radius: 14px; overflow: hidden;
        }
        .processStep {
          padding: 22px 18px;
          background: rgba(14,16,19,0.55);
          display: flex; flex-direction: column; gap: 6px;
          transition: background 0.18s;
        }
        .processStep:hover { background: rgba(14,16,19,0.30); }
        .processNum {
          font-family: "Barlow Condensed", sans-serif;
          font-size: 22px; font-weight: 900; color: var(--yellow);
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 4px;
        }
        .processStep strong {
          font-size: 15px; font-weight: 800;
          color: var(--cream); letter-spacing: -0.01em;
        }
        .processDesc {
          font-size: 12.5px; color: var(--muted); line-height: 1.45;
        }

        /* ── FORM ── */
        .formSection {
          padding: 72px 0 60px;
          display: grid; gap: 36px;
        }
        .formIntro h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 16px 0 0; font-size: clamp(40px, 10vw, 76px);
          line-height: 0.92; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .formIntro h2 em {
          font-style: italic; font-weight: 900;
          color: var(--yellow);
          font-family: "Barlow Condensed", sans-serif;
        }
        .formIntro > p {
          margin: 16px 0 0; color: var(--cream-2);
          font-size: 16px; line-height: 1.58;
        }
        .formBullets {
          list-style: none; padding: 0; margin: 22px 0 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .formBullets li {
          display: flex; align-items: center; gap: 12px;
          font-size: 14px; color: var(--cream-2); font-weight: 500;
        }
        .formBullets li span {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green2); flex: 0 0 auto;
          box-shadow: 0 0 0 4px rgba(61,168,74,0.18);
        }
        .formCallNote {
          display: flex; align-items: center; gap: 14px;
          margin-top: 22px; padding: 14px 18px;
          border-radius: 14px;
          background: rgba(37,211,102,0.08);
          border: 1px solid rgba(37,211,102,0.30);
          color: var(--cream); font-size: 14px;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
        }
        .formCallNote:hover {
          background: rgba(37,211,102,0.12);
          border-color: rgba(37,211,102,0.50);
        }
        .formCallNote:active { transform: scale(0.99); }
        .formCallIcon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 50%;
          background: #25D366; color: #052f1a;
          flex: 0 0 auto;
        }
        .formCallText {
          display: flex; flex-direction: column;
          line-height: 1.2; min-width: 0;
        }
        .formCallText strong {
          color: var(--cream);
          font-size: 16px; font-weight: 800;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .formCallText small {
          color: var(--muted);
          font-size: 12px; margin-top: 2px;
          font-weight: 500;
        }

        .leadForm {
          display: grid; gap: 14px; padding: 26px;
          border-radius: 22px; border: 1px solid var(--line);
          background: var(--graphite-2);
          box-shadow:
            0 30px 70px rgba(0,0,0,0.40),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .leadForm label { display: grid; gap: 6px; }
        .leadForm label > span {
          color: var(--muted-2);
          font-size: 10.5px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .leadForm input, .leadForm select {
          width: 100%; min-height: 52px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.03);
          color: var(--cream);
          outline: none; padding: 0 14px; font-size: 15px;
          -webkit-appearance: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .leadForm select option { color: #111; }
        .leadForm input:focus, .leadForm select:focus {
          border-color: var(--yellow);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 0 3px rgba(245,184,0,0.12);
        }
        .leadForm .full { grid-column: 1 / -1; }
        .leadForm .primary { width: 100%; font-size: 15px; margin-top: 6px; }
        .formNote {
          text-align: center; font-size: 12px;
          color: var(--muted-2); margin: 0;
        }

        /* ── FAQ ── */
        .faqSection {
          padding: 56px 0 60px;
          border-top: 1px solid var(--line-soft);
        }
        .faqInner { max-width: 900px; margin: 0 auto; }
        .faqSection h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 16px 0 0; font-size: clamp(36px, 9vw, 64px);
          line-height: 0.92; font-weight: 900; letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .faqSection h2 em {
          font-style: italic; font-weight: 900;
          color: var(--green2);
          font-family: "Barlow Condensed", sans-serif;
        }
        .faqList { margin-top: 32px; display: flex; flex-direction: column; }
        .faqItem { border-bottom: 1px solid var(--line-soft); }
        .faqItem button {
          width: 100%; display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          padding: 18px 0; background: none; border: none;
          text-align: left; color: var(--cream);
          transition: color 0.15s;
        }
        .faqItem button:hover { color: var(--yellow); }
        .faqItem button span { font-size: 15.5px; font-weight: 600; line-height: 1.35; }
        .faqItem button i {
          font-style: normal; font-size: 22px; font-weight: 300;
          color: var(--yellow); flex: 0 0 auto;
        }
        .faqItem.open button { color: var(--cream); }
        .faqItem p {
          font-size: 14.5px; color: var(--cream-2); line-height: 1.65;
          padding-bottom: 18px; margin: 0; max-width: 700px;
          animation: fadeUp 0.22s ease;
        }

        /* ── CLOSING ── */
        .closing {
          margin-top: 0; padding: 80px 20px 120px;
          width: 100%;
          min-height: 56svh;
          display: flex; align-items: center;
          border-top: 1px solid var(--line-soft);
          position: relative;
          background:
            radial-gradient(80% 60% at 50% 100%, rgba(245,184,0,0.10), transparent 60%),
            radial-gradient(60% 50% at 15% 30%, rgba(44,136,54,0.12), transparent 60%),
            linear-gradient(180deg, var(--graphite) 0%, #0a0c0f 100%);
          overflow: hidden;
        }
        .closing::before {
          content: "";
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            repeating-linear-gradient(0deg, transparent 0 47px, rgba(255,255,255,0.015) 47px 48px),
            repeating-linear-gradient(90deg, transparent 0 47px, rgba(255,255,255,0.015) 47px 48px);
        }
        .closing > div {
          width: min(1180px, 100%); margin: 0 auto;
          position: relative; z-index: 2;
        }
        .closing h2 {
          font-family: "Barlow Condensed", sans-serif;
          margin: 16px 0 0; font-size: clamp(52px, 12vw, 104px);
          line-height: 0.88; font-weight: 900; letter-spacing: -0.025em;
          text-transform: uppercase;
        }
        .closing h2 em {
          font-style: italic; font-weight: 900;
          color: var(--yellow);
          font-family: "Barlow Condensed", sans-serif;
        }
        .closing p:not(.kicker) {
          margin: 18px 0 0; max-width: 540px;
          color: var(--cream-2); font-size: 16px; line-height: 1.58;
        }
        .closingCtas {
          margin-top: 30px;
          display: flex; flex-wrap: wrap; gap: 12px;
        }

        /* ── FOOTER ── */
        .footer {
          padding: 28px 20px 90px;
          border-top: 1px solid var(--line-soft);
          background: var(--graphite);
        }
        .footerInner {
          width: min(1180px, 100%); margin: 0 auto;
          display: flex; flex-direction: column; gap: 8px;
          font-size: 12px; color: var(--muted-2);
          line-height: 1.5;
        }

        /* ── STICKY CTA ── */
        .stickyCta {
          position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 60;
          padding: 8px; border-radius: 22px;
          display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 8px;
          background: rgba(14,16,19,0.92);
          border: 1px solid var(--line);
          backdrop-filter: blur(22px);
          box-shadow: 0 18px 60px rgba(0,0,0,0.55);
          opacity: 0; transform: translateY(18px); pointer-events: none;
          transition: 0.24s ease;
        }
        .stickyCta.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .stickyCta .primary, .stickyCta .ghost {
          min-height: 52px; padding: 0 14px; font-size: 14px;
        }

        /* ── RESPONSIVE ── */
        @media (min-width: 760px) {
          .topbar {
            left: 50%; right: auto;
            width: min(1180px, calc(100% - 48px));
            transform: translateX(-50%);
          }
          .topPhone { display: inline-flex; }

          .hero { padding: 150px 32px 80px; }
          .heroGrid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 56px;
          }
          .heroForm { max-width: 440px; justify-self: end; }

          .proof {
            grid-template-columns: 1fr 1fr;
            align-items: center; gap: 48px;
          }
          .proofImage { min-height: 460px; }

          .entry {
            grid-template-columns: 1.05fr 0.95fr;
            align-items: center; gap: 48px;
          }
          .entryImage { height: 540px; }
          .scenarioPicker { flex-wrap: nowrap; }

          .sequenceInner { padding: 60px 44px 64px; }
          .lineProcess { grid-template-columns: repeat(4,1fr); }

          .formSection {
            grid-template-columns: 0.80fr 1.20fr;
            align-items: start;
          }
          .leadForm { grid-template-columns: 1fr 1fr; }

          .footerInner { flex-direction: row; justify-content: space-between; }

          .stickyCta { display: none; }
        }

        @media (min-width: 1100px) {
          .heroSub { font-size: 17px; }
        }

        @media (max-width: 759px) {
          .heroBg { background-position: center 35%; }
          .hero h1 { font-size: clamp(48px, 13vw, 72px); }
          .lineProcess {
            display: flex !important;
            grid-template-columns: unset !important;
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none;
            scroll-snap-type: x mandatory;
            scroll-padding: 0 18px;
            -webkit-overflow-scrolling: touch;
            border-radius: 14px;
            position: relative;
          }
          .lineProcess::-webkit-scrollbar { display: none; }
          .processStep {
            flex: 0 0 220px;
            scroll-snap-align: start;
          }
          /* Affordance: gradient à direita indica "deslize pra ver mais" */
          .sequence {
            position: relative;
          }
          .sequence::after {
            content: "";
            position: absolute;
            top: 0; right: 0; bottom: 0;
            width: 36px;
            background: linear-gradient(90deg, transparent, var(--graphite-2));
            pointer-events: none;
            border-top-right-radius: 28px;
            border-bottom-right-radius: 28px;
            z-index: 2;
          }
          .proofStats { grid-template-columns: repeat(3,1fr); }

          /* Reserva espaço para o sticky CTA não sobrepor conteúdo final */
          .footer { padding-bottom: 110px; }
        }

        @media (max-width: 430px) {
          .hero { padding: 100px 18px 50px; }
          .hero h1 { font-size: 46px; }
          .topbar > .topbarRight > button { padding: 0 14px; font-size: 12px; }
          .heroForm { padding: 20px; }
        }
      `}</style>
    </main>
  );
}
