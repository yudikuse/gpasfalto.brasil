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
    try {
      // Cache uma única vez do elemento da LP — não busca de novo no loop
      const lpRoot = document.querySelector(".lp3");

      function tryHide(el: Element | null) {
        if (!el || !(el instanceof HTMLElement)) return;
        if (lpRoot && el.contains(lpRoot)) return; // não esconde wrappers que contêm a LP
        if (el.closest(".lp3")) return;            // não esconde algo dentro da LP
        hidden.push({ el, prev: el.style.display });
        el.style.setProperty("display", "none", "important");
      }

      const targetSelectors = [
        "body > header",
        "header[class*='Header']",
        "[class*='SideTagline']",
        "[class*='side-tagline']",
        "[class*='WhatsAppFloat']",
        "[class*='whatsapp-float']",
      ];

      targetSelectors.forEach((sel) => {
        try {
          document.querySelectorAll(sel).forEach(tryHide);
        } catch {}
      });
    } catch {
      // Se algo falhar aqui, NÃO derruba a página
    }

    return () => {
      try {
        hidden.forEach(({ el, prev }) => {
          if (prev) el.style.display = prev;
          else el.style.removeProperty("display");
        });
      } catch {}
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

      {/*
        Style inline SSR-first: aplica fundo grafite imediatamente, antes do JS hidratar.
        Resolve o "flash azul" do bg-gp-navy do layout pai entre o HTML chegar e o useEffect rodar.
        Esse CSS é parte do HTML inicial — não depende de hydration.
      */}
      <style>{`
        html, body { background: #0E1013 !important; }
        body > header, body > aside, body > [class*="Header"],
        body > [class*="SideTagline"], body > [class*="WhatsAppFloat"] {
          display: none !important;
        }
      `}</style>

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

      <style dangerouslySetInnerHTML={{ __html: '        @import url(\'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=DM+Sans:wght@400;500;600;700&display=swap\');\n\n        :root {\n          --green:    #2C8836;   /* GP brand */\n          --green2:   #3DA84A;   /* GP brand light */\n          --yellow:   #F5B800;   /* CTA construction */\n          --yellow-d: #E0A800;   /* CTA hover */\n          --graphite: #0E1013;   /* asphalt base */\n          --graphite-2:#15181D;  /* surface 1 */\n          --graphite-3:#1B1F25;  /* surface 2 */\n          --terra:    rgba(58, 36, 24, 0.35); /* Goiás earth accent */\n          --cream:    #F0EBE2;\n          --cream-2:  rgba(240,235,226,0.72);\n          --muted:    rgba(240,235,226,0.58);\n          --muted-2:  rgba(240,235,226,0.40);\n          --line:     rgba(255,255,255,0.10);\n          --line-soft:rgba(255,255,255,0.06);\n          --line-hot: rgba(245,184,0,0.30);\n        }\n\n        *, *::before, *::after { box-sizing: border-box; }\n        html { scroll-behavior: smooth; background: var(--graphite); }\n        body {\n          margin: 0;\n          background: var(--graphite);\n          color: var(--cream);\n          font-family: "DM Sans","Inter",system-ui,-apple-system,sans-serif;\n          -webkit-font-smoothing: antialiased;\n          text-rendering: optimizeLegibility;\n        }\n        button, input, select, textarea { font: inherit; }\n        button { cursor: pointer; -webkit-tap-highlight-color: transparent; }\n\n        .lp3 {\n          min-height: 100vh;\n          overflow-x: hidden;\n          background: var(--graphite);\n          position: relative;\n        }\n\n        /* Escudo: cobre tudo que o layout pai pinta atrás da topbar fixa (azul, header, etc) */\n        .topShield {\n          position: fixed;\n          top: 0; left: 0; right: 0;\n          height: 100px;\n          z-index: 49;          /* abaixo da topbar (50), acima do conteúdo */\n          background: var(--graphite);\n          pointer-events: none;\n        }\n        .topShield::after {\n          content: "";\n          position: absolute;\n          left: 0; right: 0; bottom: -24px;\n          height: 24px;\n          background: linear-gradient(180deg, var(--graphite), transparent);\n          pointer-events: none;\n        }\n        /* Reforço extra: enquanto /lp3 estiver ativa, body fica grafite */\n        body.lp3-active { background: #0E1013 !important; color: #F0EBE2; }\n        body.lp3-active::before {\n          content: ""; position: fixed; inset: 0; z-index: -10;\n          background: #0E1013; pointer-events: none;\n        }\n\n        /* ─────────────────────────────────────────────────────────────────\n           ISOLAMENTO DA LP — esconde componentes do layout pai (não-mexível)\n           Header global, SideTagline lateral, WhatsAppFloat flutuante.\n           Tudo isso só quando /lp3 está ativa. Outras rotas (silos, home)\n           continuam vendo esses componentes normalmente.\n           ───────────────────────────────────────────────────────────────── */\n\n        /* 1) Header global do site (componente <Header />) */\n        body.lp3-active header:not(.topbar),\n        body.lp3-active > header,\n        body.lp3-active nav[class*="header"],\n        body.lp3-active [class*="Header_"]:not(.lp3 *),\n        body.lp3-active [data-header],\n        body.lp3-active [data-site-header] {\n          display: none !important;\n        }\n\n        /* 2) SideTagline (faixa lateral "RIO VERDE · GO · BRASIL · EST. 1998") */\n        body.lp3-active [class*="SideTagline"],\n        body.lp3-active [class*="side-tagline"],\n        body.lp3-active [class*="sideTagline"],\n        body.lp3-active aside[class*="tagline"],\n        body.lp3-active [data-side-tagline] {\n          display: none !important;\n        }\n\n        /* 3) WhatsAppFloat global (botão verde flutuante do site principal) */\n        body.lp3-active [class*="WhatsAppFloat"],\n        body.lp3-active [class*="whatsapp-float"],\n        body.lp3-active [class*="whatsappFloat"],\n        body.lp3-active [class*="WhatsApp_"],\n        body.lp3-active [data-whatsapp-float] {\n          display: none !important;\n        }\n        /* ───────────────────────────────────────────────────────────────── */\n\n        /* ── TOPBAR ── */\n        .topbar {\n          position: fixed; top: 14px; left: 14px; right: 14px; z-index: 50;\n          height: 76px; padding: 8px 8px 8px 12px;\n          border: 1px solid var(--line); border-radius: 999px;\n          background: rgba(14,16,19,0.88);\n          backdrop-filter: blur(22px);\n          -webkit-backdrop-filter: blur(22px);\n          display: flex; align-items: center; justify-content: space-between;\n          box-shadow: 0 20px 60px rgba(0,0,0,0.45);\n          gap: 12px;\n        }\n        .brand {\n          display: inline-flex; align-items: center;\n          color: white; text-decoration: none;\n          min-width: 0; flex: 0 0 auto;\n        }\n        .brand img {\n          height: auto;\n          width: 180px;\n          max-height: 64px;\n          object-fit: contain;\n          display: block;\n        }\n        @media (min-width: 760px) {\n          .brand img { width: 220px; max-height: 70px; }\n        }\n        @media (max-width: 430px) {\n          .brand img { width: 150px; max-height: 56px; }\n        }\n        .brand > span { display: none; color: #fff; font-weight: 900; font-size: 18px; }\n        .topbarRight {\n          display: flex; align-items: center; gap: 10px;\n          min-width: 0; flex: 1 1 auto; justify-content: flex-end;\n        }\n        .topPhone {\n          display: none; align-items: center; gap: 8px;\n          color: var(--cream-2); text-decoration: none;\n          font-size: 13px; font-weight: 600;\n          padding: 0 6px;\n          letter-spacing: -0.01em;\n          white-space: nowrap;\n        }\n        .topPhone svg { color: var(--green2); }\n        .topPhone:hover { color: var(--cream); }\n        .topbar > .topbarRight > button {\n          height: 44px; border: 0; border-radius: 999px;\n          padding: 0 18px;\n          background: var(--yellow); color: #1a1300;\n          font-size: 13px; font-weight: 800; letter-spacing: -0.01em;\n          display: inline-flex; align-items: center; gap: 6px;\n          white-space: nowrap;\n          transition: background 0.15s ease, transform 0.15s ease;\n        }\n        .topbar > .topbarRight > button:hover { background: var(--yellow-d); }\n        .topbar > .topbarRight > button:active { transform: scale(0.97); }\n\n        /* ── HERO ── */\n        .hero {\n          position: relative;\n          min-height: 100svh;\n          padding: 130px 20px 56px;\n          display: flex; align-items: center;\n          overflow: hidden; isolation: isolate;\n          background: var(--graphite);\n        }\n        .heroBg {\n          position: absolute; inset: 0; z-index: -3;\n          background-color: var(--graphite);\n          background-image: url("/images/lp3/hero.jpg");\n          background-size: cover;\n          background-position: center 55%;\n          background-repeat: no-repeat;\n        }\n        .heroBg::after {\n          content: "";\n          position: absolute; inset: 0; pointer-events: none;\n          background:\n            linear-gradient(100deg,\n              rgba(14,16,19,0.94) 0%,\n              rgba(14,16,19,0.82) 35%,\n              rgba(14,16,19,0.70) 65%,\n              rgba(14,16,19,0.55) 100%);\n        }\n        .heroShade {\n          position: absolute; inset: 0; z-index: -2;\n          background: linear-gradient(180deg, transparent 70%, var(--graphite) 100%);\n          pointer-events: none;\n        }\n        .heroGrain { display: none; }\n        .heroGrid {\n          width: min(1180px, 100%); margin: 0 auto;\n          display: grid; gap: 32px; align-items: center;\n        }\n        .heroContent { width: 100%; }\n\n        /* kicker — usado em várias seções */\n        .kicker {\n          margin: 0;\n          display: inline-flex; align-items: center; gap: 10px;\n          color: var(--green2);\n          text-transform: uppercase; font-size: 11px;\n          font-weight: 800; letter-spacing: 0.18em;\n        }\n        .kickerDot {\n          width: 6px; height: 6px; border-radius: 50%;\n          background: var(--green2);\n          box-shadow: 0 0 0 4px rgba(61,168,74,0.18);\n        }\n\n        .hero h1 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 18px 0 0;\n          font-size: clamp(54px, 12vw, 108px);\n          line-height: 0.85; font-weight: 900;\n          letter-spacing: -0.025em;\n          text-transform: uppercase;\n          color: var(--cream);\n          text-shadow: 0 2px 24px rgba(0,0,0,0.40);\n        }\n        .hero h1 em {\n          font-style: italic;\n          font-weight: 900;\n          color: var(--yellow);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .heroSub {\n          margin: 18px 0 0; max-width: 540px;\n          color: var(--cream-2); font-size: 16px;\n          line-height: 1.55; letter-spacing: -0.005em;\n        }\n        .heroCreds {\n          margin-top: 24px; display: flex;\n          flex-direction: column; gap: 8px;\n        }\n        .heroCred {\n          display: inline-flex; align-items: center; gap: 10px;\n          font-size: 13.5px; color: var(--cream-2);\n          font-weight: 500;\n        }\n        .heroCred svg { color: var(--green2); flex: 0 0 auto; }\n\n        /* ── MINI FORM HERO ── */\n        .heroForm {\n          width: 100%;\n          background: rgba(21,24,29,0.78);\n          backdrop-filter: blur(20px);\n          border: 1px solid var(--line);\n          border-radius: 22px;\n          padding: 24px;\n          box-shadow:\n            0 30px 80px rgba(0,0,0,0.55),\n            inset 0 1px 0 rgba(255,255,255,0.06);\n        }\n        .heroFormHead { padding-bottom: 18px; border-bottom: 1px solid var(--line-soft); }\n        .heroFormPill {\n          display: inline-flex; align-items: center; gap: 6px;\n          font-size: 10.5px; font-weight: 800; letter-spacing: 0.10em;\n          text-transform: uppercase;\n          color: var(--yellow);\n          background: rgba(245,184,0,0.10);\n          border: 1px solid var(--line-hot);\n          padding: 5px 10px; border-radius: 999px;\n        }\n        .heroForm h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 12px 0 0; font-size: 30px;\n          line-height: 0.98; font-weight: 900;\n          letter-spacing: -0.015em; text-transform: uppercase;\n          color: var(--cream);\n        }\n        .heroForm h2 + p {\n          margin: 8px 0 0; color: var(--muted); font-size: 13.5px;\n        }\n        .heroFormBody {\n          padding-top: 16px;\n          display: grid; gap: 12px;\n        }\n        .heroFormBody label {\n          display: grid; gap: 6px;\n        }\n        .heroFormBody label > span {\n          color: var(--muted-2);\n          font-size: 10.5px; font-weight: 800;\n          text-transform: uppercase; letter-spacing: 0.12em;\n        }\n        .heroFormBody input {\n          width: 100%; min-height: 50px;\n          border-radius: 10px;\n          border: 1px solid rgba(255,255,255,0.12);\n          background: rgba(255,255,255,0.04);\n          color: var(--cream);\n          outline: none; padding: 0 14px; font-size: 15px;\n          transition: border-color 0.15s, background 0.15s;\n        }\n        .heroFormBody input:focus {\n          border-color: var(--yellow);\n          background: rgba(255,255,255,0.06);\n          box-shadow: 0 0 0 3px rgba(245,184,0,0.12);\n        }\n        .heroFormBody .primary { margin-top: 6px; width: 100%; }\n        .heroFormNote {\n          margin: 6px 0 0; text-align: center;\n          font-size: 11.5px; color: var(--muted-2);\n        }\n\n        /* ── BUTTONS ── */\n        .primary, .ghost {\n          min-height: 56px; border-radius: 999px;\n          padding: 0 24px; border: 0;\n          display: inline-flex; align-items: center; justify-content: center;\n          gap: 8px;\n          font-weight: 800; letter-spacing: -0.01em;\n          font-size: 15px;\n          transition: transform 0.16s ease, background 0.16s, box-shadow 0.16s;\n          text-decoration: none;\n        }\n        .primary:active, .ghost:active { transform: scale(0.985); }\n        .primary {\n          background: var(--yellow); color: #1a1300;\n          box-shadow:\n            0 16px 40px rgba(245,184,0,0.28),\n            inset 0 1px 0 rgba(255,255,255,0.30);\n        }\n        .primary:hover { background: var(--yellow-d); }\n        .primaryS { min-height: 50px; font-size: 14px; }\n        .ghost {\n          background: rgba(255,255,255,0.06); color: var(--cream);\n          border: 1px solid rgba(255,255,255,0.12);\n          backdrop-filter: blur(16px);\n        }\n        .ghost:hover { background: rgba(255,255,255,0.10); }\n\n        /* Variante WhatsApp: usa verde oficial #25D366 — chama atenção como CTA secundário */\n        .ghostWa {\n          background: #25D366; color: #052f1a;\n          border: 1px solid #1fb157;\n          box-shadow: 0 14px 32px rgba(37,211,102,0.28);\n        }\n        .ghostWa:hover { background: #20bf5b; color: #052f1a; }\n        .ghostWa svg { color: #052f1a; }\n\n        /* ── CLIENT STRIP (logos PNG @2x transparente) ── */\n        .clientStrip {\n          background: var(--graphite-2);\n          padding: 36px clamp(16px,4vw,40px);\n          border-top: 1px solid var(--line-soft);\n          border-bottom: 1px solid var(--line-soft);\n        }\n        .clientLabel {\n          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;\n          text-transform: uppercase; color: var(--muted-2);\n          text-align: center; margin: 0 0 22px;\n        }\n        .clientLogoWrap {\n          display: flex; justify-content: center;\n          padding: 4px 0;\n          margin: 0 auto;\n          max-width: 1100px;\n          /* máscara de fade nas pontas pra parecer "fila contínua" */\n          mask-image: linear-gradient(90deg, transparent 0, black 5%, black 95%, transparent 100%);\n          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 5%, black 95%, transparent 100%);\n        }\n        .clientLogoStrip {\n          height: 52px; width: auto;\n          max-width: 100%;\n          opacity: 0.95;\n          transition: opacity 0.2s;\n        }\n        .clientLogoStrip:hover { opacity: 1; }\n        @media (max-width: 759px) {\n          .clientLogoWrap {\n            justify-content: flex-start;\n            overflow-x: auto;\n            overflow-y: hidden;\n            -webkit-overflow-scrolling: touch;\n            scrollbar-width: none;\n            padding: 4px 0;\n          }\n          .clientLogoWrap::-webkit-scrollbar { display: none; }\n          .clientLogoStrip {\n            height: 44px;\n            max-width: none;\n            flex: 0 0 auto;\n          }\n          .clientStrip { padding: 28px 0; }\n          .clientLabel { padding: 0 16px; }\n        }\n\n        /* ── SECTIONS BASE ── */\n        .proof, .entry, .formSection, .faqSection, .closing {\n          width: min(1180px, calc(100% - 40px)); margin: 0 auto;\n        }\n        .sequence {\n          width: min(1180px, calc(100% - 40px)); margin: 28px auto 0;\n        }\n\n        /* ── PROOF ── */\n        .proof { padding: 72px 0 60px; display: grid; gap: 32px; }\n        .proof h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 16px 0 0; font-size: clamp(44px, 10vw, 84px);\n          line-height: 0.90; font-weight: 900; letter-spacing: -0.02em;\n          text-transform: uppercase;\n        }\n        .proof h2 em {\n          font-style: italic; font-weight: 900;\n          color: var(--green2);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .proofText > p {\n          margin: 18px 0 0; color: var(--cream-2);\n          font-size: 16px; line-height: 1.60; max-width: 540px;\n        }\n        .proofStats {\n          margin-top: 28px; display: grid;\n          grid-template-columns: repeat(3,1fr);\n          gap: 1px; background: var(--line);\n          border: 1px solid var(--line); border-radius: 14px; overflow: hidden;\n        }\n        .proofStat {\n          padding: 20px 14px; background: var(--graphite-2);\n          display: flex; flex-direction: column; gap: 4px; text-align: center;\n        }\n        .proofStat strong {\n          font-family: "Barlow Condensed", sans-serif;\n          font-size: clamp(34px, 8vw, 54px); font-weight: 900;\n          color: var(--yellow); letter-spacing: -0.02em; line-height: 1;\n        }\n        .proofStat span { font-size: 11.5px; color: var(--muted); line-height: 1.4; }\n        .proofText > button { margin-top: 26px; }\n\n        .proofImage {\n          position: relative;\n          min-height: 360px; border-radius: 24px;\n          border: 1px solid var(--line);\n          overflow: hidden;\n          background:\n            radial-gradient(120% 80% at 50% 100%, rgba(245,184,0,0.10), transparent 60%),\n            radial-gradient(80% 60% at 20% 30%, rgba(44,136,54,0.18), transparent 60%),\n            linear-gradient(135deg, #1c1f25 0%, #0e1013 60%, #15181d 100%);\n          box-shadow: 0 30px 80px rgba(0,0,0,0.45);\n        }\n        .proofImage::before {\n          content: "";\n          position: absolute; inset: 0;\n          background-image:\n            repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,0.018) 39px 40px),\n            repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,0.018) 39px 40px);\n          pointer-events: none;\n        }\n        .proofImage::after {\n          content: "";\n          position: absolute; inset: 0;\n          background-image: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' seed=\'3\'/><feColorMatrix values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>");\n          opacity: 0.15; mix-blend-mode: overlay;\n          pointer-events: none;\n        }\n        .proofImageTag {\n          position: absolute; left: 18px; bottom: 18px;\n          display: inline-flex; align-items: center; gap: 8px;\n          background: rgba(14,16,19,0.78);\n          backdrop-filter: blur(14px);\n          border: 1px solid var(--line);\n          padding: 8px 14px; border-radius: 999px;\n          font-size: 11.5px; font-weight: 700; color: var(--cream-2);\n          letter-spacing: 0.08em; text-transform: uppercase;\n        }\n        .proofImageDot {\n          width: 6px; height: 6px; border-radius: 50%;\n          background: var(--green2);\n          box-shadow: 0 0 0 4px rgba(61,168,74,0.18);\n        }\n\n        /* ── ENTRY (cenários) ── */\n        .entry {\n          padding: 60px 0;\n          display: grid; gap: 32px;\n        }\n        .entryPanel h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 16px 0 0; font-size: clamp(40px, 10vw, 76px);\n          line-height: 0.92; font-weight: 900; letter-spacing: -0.02em;\n          text-transform: uppercase;\n        }\n        .entryPanel h2 em {\n          font-style: italic; font-weight: 900;\n          color: var(--yellow);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .scenarioPicker {\n          margin-top: 26px; display: flex; flex-wrap: wrap; gap: 8px;\n        }\n        .scenarioPicker button {\n          height: 42px; border-radius: 999px;\n          border: 1px solid var(--line);\n          padding: 0 18px; background: rgba(255,255,255,0.03);\n          color: var(--cream-2); font-weight: 600;\n          font-size: 13.5px; letter-spacing: -0.01em;\n          transition: all 0.15s;\n        }\n        .scenarioPicker button.active {\n          background: var(--green); color: white; border-color: var(--green);\n          box-shadow: 0 8px 22px rgba(44,136,54,0.30);\n        }\n        .scenarioPicker button:hover:not(.active) {\n          border-color: rgba(255,255,255,0.25); color: var(--cream);\n          background: rgba(255,255,255,0.05);\n        }\n\n        .scenarioText {\n          padding-top: 26px;\n          animation: fadeUp 0.32s ease;\n        }\n        @keyframes fadeUp {\n          from { opacity: 0; transform: translateY(6px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        .scenarioTag {\n          display: inline-block; margin-bottom: 10px; color: var(--green2);\n          text-transform: uppercase; letter-spacing: 0.16em;\n          font-size: 10.5px; font-weight: 800;\n          padding: 4px 10px; border-radius: 999px;\n          background: rgba(61,168,74,0.10);\n          border: 1px solid rgba(61,168,74,0.25);\n        }\n        .scenarioText h3 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 0; font-size: clamp(28px, 7vw, 52px);\n          line-height: 0.95; font-weight: 900; letter-spacing: -0.02em;\n          text-transform: uppercase; color: var(--cream);\n          max-width: 720px;\n        }\n        .scenarioSub {\n          margin: 14px 0 0; color: var(--cream-2);\n          font-size: 15px; line-height: 1.58; max-width: 580px;\n        }\n        .scenarioChips {\n          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px;\n        }\n        .chip {\n          font-size: 11.5px; font-weight: 700; color: var(--green2);\n          background: rgba(61,168,74,0.10);\n          border: 1px solid rgba(61,168,74,0.28);\n          padding: 5px 12px; border-radius: 999px;\n          text-transform: uppercase; letter-spacing: 0.06em;\n        }\n        .scenarioText > button { margin-top: 22px; }\n\n        .entryImage {\n          position: relative;\n          height: 360px; border-radius: 24px;\n          overflow: hidden; border: 1px solid var(--line);\n          background:\n            radial-gradient(100% 70% at 50% 100%, rgba(44,136,54,0.18), transparent 65%),\n            radial-gradient(70% 50% at 80% 20%, rgba(245,184,0,0.10), transparent 60%),\n            linear-gradient(135deg, #1c1f25 0%, #0e1013 50%, #1a1d23 100%);\n          box-shadow: 0 30px 80px rgba(0,0,0,0.40);\n        }\n        .entryImage::before {\n          content: "";\n          position: absolute; inset: 0;\n          background-image:\n            repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,0.020) 39px 40px),\n            repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,0.020) 39px 40px);\n          pointer-events: none;\n        }\n        .entryImage::after {\n          content: "";\n          position: absolute; inset: 0;\n          background-image: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' seed=\'7\'/><feColorMatrix values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>");\n          opacity: 0.15; mix-blend-mode: overlay;\n          pointer-events: none;\n        }\n        .entryCaption {\n          position: absolute; left: 22px; right: 22px; bottom: 22px; z-index: 2;\n        }\n        .entryCaption span {\n          display: inline-flex; align-items: center; gap: 8px;\n          margin-bottom: 10px;\n          color: var(--green2); text-transform: uppercase;\n          letter-spacing: 0.14em; font-size: 11px; font-weight: 800;\n        }\n        .entryCaption strong {\n          display: block; max-width: 520px; color: white;\n          font-size: 22px; line-height: 1.12;\n          letter-spacing: -0.02em; font-weight: 800;\n        }\n\n        /* ── SEQUENCE ── */\n        .sequence {\n          padding: 0;\n          border-radius: 28px; overflow: hidden;\n          border: 1px solid var(--line);\n          background:\n            linear-gradient(180deg, var(--graphite-2), var(--graphite-3));\n          position: relative;\n        }\n        .sequence::before {\n          content: "";\n          position: absolute; top: 0; left: 0; right: 0; height: 2px;\n          background: linear-gradient(90deg, transparent, var(--yellow) 50%, transparent);\n          opacity: 0.40;\n        }\n        .sequenceInner { padding: 44px 24px 48px; }\n        .sequence h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 14px 0 0; font-size: clamp(40px, 10vw, 78px);\n          line-height: 0.90; font-weight: 900; letter-spacing: -0.02em;\n          text-transform: uppercase; max-width: 900px;\n        }\n        .sequence h2 em {\n          font-style: italic; font-weight: 900;\n          color: var(--green2);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .seqSub {\n          margin: 18px 0 0; color: var(--cream-2);\n          font-size: 15px; line-height: 1.62; max-width: 620px;\n        }\n        .lineProcess {\n          margin-top: 36px; display: grid;\n          grid-template-columns: 1fr 1fr;\n          gap: 1px; background: var(--line);\n          border: 1px solid var(--line); border-radius: 14px; overflow: hidden;\n        }\n        .processStep {\n          padding: 22px 18px;\n          background: rgba(14,16,19,0.55);\n          display: flex; flex-direction: column; gap: 6px;\n          transition: background 0.18s;\n        }\n        .processStep:hover { background: rgba(14,16,19,0.30); }\n        .processNum {\n          font-family: "Barlow Condensed", sans-serif;\n          font-size: 22px; font-weight: 900; color: var(--yellow);\n          letter-spacing: -0.02em; line-height: 1; margin-bottom: 4px;\n        }\n        .processStep strong {\n          font-size: 15px; font-weight: 800;\n          color: var(--cream); letter-spacing: -0.01em;\n        }\n        .processDesc {\n          font-size: 12.5px; color: var(--muted); line-height: 1.45;\n        }\n\n        /* ── FORM ── */\n        .formSection {\n          padding: 72px 0 60px;\n          display: grid; gap: 36px;\n        }\n        .formIntro h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 16px 0 0; font-size: clamp(40px, 10vw, 76px);\n          line-height: 0.92; font-weight: 900; letter-spacing: -0.02em;\n          text-transform: uppercase;\n        }\n        .formIntro h2 em {\n          font-style: italic; font-weight: 900;\n          color: var(--yellow);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .formIntro > p {\n          margin: 16px 0 0; color: var(--cream-2);\n          font-size: 16px; line-height: 1.58;\n        }\n        .formBullets {\n          list-style: none; padding: 0; margin: 22px 0 0;\n          display: flex; flex-direction: column; gap: 10px;\n        }\n        .formBullets li {\n          display: flex; align-items: center; gap: 12px;\n          font-size: 14px; color: var(--cream-2); font-weight: 500;\n        }\n        .formBullets li span {\n          width: 6px; height: 6px; border-radius: 50%;\n          background: var(--green2); flex: 0 0 auto;\n          box-shadow: 0 0 0 4px rgba(61,168,74,0.18);\n        }\n        .formCallNote {\n          display: flex; align-items: center; gap: 14px;\n          margin-top: 22px; padding: 14px 18px;\n          border-radius: 14px;\n          background: rgba(37,211,102,0.08);\n          border: 1px solid rgba(37,211,102,0.30);\n          color: var(--cream); font-size: 14px;\n          text-decoration: none;\n          transition: background 0.15s, border-color 0.15s, transform 0.15s;\n        }\n        .formCallNote:hover {\n          background: rgba(37,211,102,0.12);\n          border-color: rgba(37,211,102,0.50);\n        }\n        .formCallNote:active { transform: scale(0.99); }\n        .formCallIcon {\n          display: inline-flex; align-items: center; justify-content: center;\n          width: 38px; height: 38px; border-radius: 50%;\n          background: #25D366; color: #052f1a;\n          flex: 0 0 auto;\n        }\n        .formCallText {\n          display: flex; flex-direction: column;\n          line-height: 1.2; min-width: 0;\n        }\n        .formCallText strong {\n          color: var(--cream);\n          font-size: 16px; font-weight: 800;\n          letter-spacing: -0.01em;\n          white-space: nowrap;\n        }\n        .formCallText small {\n          color: var(--muted);\n          font-size: 12px; margin-top: 2px;\n          font-weight: 500;\n        }\n\n        .leadForm {\n          display: grid; gap: 14px; padding: 26px;\n          border-radius: 22px; border: 1px solid var(--line);\n          background: var(--graphite-2);\n          box-shadow:\n            0 30px 70px rgba(0,0,0,0.40),\n            inset 0 1px 0 rgba(255,255,255,0.04);\n        }\n        .leadForm label { display: grid; gap: 6px; }\n        .leadForm label > span {\n          color: var(--muted-2);\n          font-size: 10.5px; font-weight: 800;\n          text-transform: uppercase; letter-spacing: 0.12em;\n        }\n        .leadForm input, .leadForm select {\n          width: 100%; min-height: 52px;\n          border-radius: 10px;\n          border: 1px solid rgba(255,255,255,0.10);\n          background: rgba(255,255,255,0.03);\n          color: var(--cream);\n          outline: none; padding: 0 14px; font-size: 15px;\n          -webkit-appearance: none;\n          transition: border-color 0.15s, background 0.15s;\n        }\n        .leadForm select option { color: #111; }\n        .leadForm input:focus, .leadForm select:focus {\n          border-color: var(--yellow);\n          background: rgba(255,255,255,0.05);\n          box-shadow: 0 0 0 3px rgba(245,184,0,0.12);\n        }\n        .leadForm .full { grid-column: 1 / -1; }\n        .leadForm .primary { width: 100%; font-size: 15px; margin-top: 6px; }\n        .formNote {\n          text-align: center; font-size: 12px;\n          color: var(--muted-2); margin: 0;\n        }\n\n        /* ── FAQ ── */\n        .faqSection {\n          padding: 56px 0 60px;\n          border-top: 1px solid var(--line-soft);\n        }\n        .faqInner { max-width: 900px; margin: 0 auto; }\n        .faqSection h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 16px 0 0; font-size: clamp(36px, 9vw, 64px);\n          line-height: 0.92; font-weight: 900; letter-spacing: -0.02em;\n          text-transform: uppercase;\n        }\n        .faqSection h2 em {\n          font-style: italic; font-weight: 900;\n          color: var(--green2);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .faqList { margin-top: 32px; display: flex; flex-direction: column; }\n        .faqItem { border-bottom: 1px solid var(--line-soft); }\n        .faqItem button {\n          width: 100%; display: flex; align-items: center;\n          justify-content: space-between; gap: 16px;\n          padding: 18px 0; background: none; border: none;\n          text-align: left; color: var(--cream);\n          transition: color 0.15s;\n        }\n        .faqItem button:hover { color: var(--yellow); }\n        .faqItem button span { font-size: 15.5px; font-weight: 600; line-height: 1.35; }\n        .faqItem button i {\n          font-style: normal; font-size: 22px; font-weight: 300;\n          color: var(--yellow); flex: 0 0 auto;\n        }\n        .faqItem.open button { color: var(--cream); }\n        .faqItem p {\n          font-size: 14.5px; color: var(--cream-2); line-height: 1.65;\n          padding-bottom: 18px; margin: 0; max-width: 700px;\n          animation: fadeUp 0.22s ease;\n        }\n\n        /* ── CLOSING ── */\n        .closing {\n          margin-top: 0; padding: 80px 20px 120px;\n          width: 100%;\n          min-height: 56svh;\n          display: flex; align-items: center;\n          border-top: 1px solid var(--line-soft);\n          position: relative;\n          background:\n            radial-gradient(80% 60% at 50% 100%, rgba(245,184,0,0.10), transparent 60%),\n            radial-gradient(60% 50% at 15% 30%, rgba(44,136,54,0.12), transparent 60%),\n            linear-gradient(180deg, var(--graphite) 0%, #0a0c0f 100%);\n          overflow: hidden;\n        }\n        .closing::before {\n          content: "";\n          position: absolute; inset: 0; pointer-events: none;\n          background-image:\n            repeating-linear-gradient(0deg, transparent 0 47px, rgba(255,255,255,0.015) 47px 48px),\n            repeating-linear-gradient(90deg, transparent 0 47px, rgba(255,255,255,0.015) 47px 48px);\n        }\n        .closing > div {\n          width: min(1180px, 100%); margin: 0 auto;\n          position: relative; z-index: 2;\n        }\n        .closing h2 {\n          font-family: "Barlow Condensed", sans-serif;\n          margin: 16px 0 0; font-size: clamp(52px, 12vw, 104px);\n          line-height: 0.88; font-weight: 900; letter-spacing: -0.025em;\n          text-transform: uppercase;\n        }\n        .closing h2 em {\n          font-style: italic; font-weight: 900;\n          color: var(--yellow);\n          font-family: "Barlow Condensed", sans-serif;\n        }\n        .closing p:not(.kicker) {\n          margin: 18px 0 0; max-width: 540px;\n          color: var(--cream-2); font-size: 16px; line-height: 1.58;\n        }\n        .closingCtas {\n          margin-top: 30px;\n          display: flex; flex-wrap: wrap; gap: 12px;\n        }\n\n        /* ── FOOTER ── */\n        .footer {\n          padding: 28px 20px 90px;\n          border-top: 1px solid var(--line-soft);\n          background: var(--graphite);\n        }\n        .footerInner {\n          width: min(1180px, 100%); margin: 0 auto;\n          display: flex; flex-direction: column; gap: 8px;\n          font-size: 12px; color: var(--muted-2);\n          line-height: 1.5;\n        }\n\n        /* ── STICKY CTA ── */\n        .stickyCta {\n          position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 60;\n          padding: 8px; border-radius: 22px;\n          display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 8px;\n          background: rgba(14,16,19,0.92);\n          border: 1px solid var(--line);\n          backdrop-filter: blur(22px);\n          box-shadow: 0 18px 60px rgba(0,0,0,0.55);\n          opacity: 0; transform: translateY(18px); pointer-events: none;\n          transition: 0.24s ease;\n        }\n        .stickyCta.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }\n        .stickyCta .primary, .stickyCta .ghost {\n          min-height: 52px; padding: 0 14px; font-size: 14px;\n        }\n\n        /* ── RESPONSIVE ── */\n        @media (min-width: 760px) {\n          .topbar {\n            left: 50%; right: auto;\n            width: min(1180px, calc(100% - 48px));\n            transform: translateX(-50%);\n          }\n          .topPhone { display: inline-flex; }\n\n          .hero { padding: 150px 32px 80px; }\n          .heroGrid {\n            grid-template-columns: 1.15fr 0.85fr;\n            gap: 56px;\n          }\n          .heroForm { max-width: 440px; justify-self: end; }\n\n          .proof {\n            grid-template-columns: 1fr 1fr;\n            align-items: center; gap: 48px;\n          }\n          .proofImage { min-height: 460px; }\n\n          .entry {\n            grid-template-columns: 1.05fr 0.95fr;\n            align-items: center; gap: 48px;\n          }\n          .entryImage { height: 540px; }\n          .scenarioPicker { flex-wrap: nowrap; }\n\n          .sequenceInner { padding: 60px 44px 64px; }\n          .lineProcess { grid-template-columns: repeat(4,1fr); }\n\n          .formSection {\n            grid-template-columns: 0.80fr 1.20fr;\n            align-items: start;\n          }\n          .leadForm { grid-template-columns: 1fr 1fr; }\n\n          .footerInner { flex-direction: row; justify-content: space-between; }\n\n          .stickyCta { display: none; }\n        }\n\n        @media (min-width: 1100px) {\n          .heroSub { font-size: 17px; }\n        }\n\n        @media (max-width: 759px) {\n          .heroBg {\n            background-image: url("/images/lp3/hero-mobile.jpg");\n            background-position: center 40%;\n          }\n          .heroBg::after {\n            background: linear-gradient(180deg,\n              rgba(14,16,19,0.88) 0%,\n              rgba(14,16,19,0.72) 40%,\n              rgba(14,16,19,0.86) 100%);\n          }\n          .hero h1 { font-size: clamp(48px, 13vw, 72px); }\n          .lineProcess {\n            display: flex !important;\n            grid-template-columns: unset !important;\n            overflow-x: auto;\n            overflow-y: hidden;\n            scrollbar-width: none;\n            scroll-snap-type: x mandatory;\n            scroll-padding: 0 18px;\n            -webkit-overflow-scrolling: touch;\n            border-radius: 14px;\n            position: relative;\n          }\n          .lineProcess::-webkit-scrollbar { display: none; }\n          .processStep {\n            flex: 0 0 220px;\n            scroll-snap-align: start;\n          }\n          /* Affordance: gradient à direita indica "deslize pra ver mais" */\n          .sequence {\n            position: relative;\n          }\n          .sequence::after {\n            content: "";\n            position: absolute;\n            top: 0; right: 0; bottom: 0;\n            width: 36px;\n            background: linear-gradient(90deg, transparent, var(--graphite-2));\n            pointer-events: none;\n            border-top-right-radius: 28px;\n            border-bottom-right-radius: 28px;\n            z-index: 2;\n          }\n          .proofStats { grid-template-columns: repeat(3,1fr); }\n\n          /* Reserva espaço para o sticky CTA não sobrepor conteúdo final */\n          .footer { padding-bottom: 110px; }\n        }\n\n        @media (max-width: 430px) {\n          .hero { padding: 100px 18px 50px; }\n          .hero h1 { font-size: 46px; }\n          .topbar > .topbarRight > button { padding: 0 14px; font-size: 12px; }\n          .heroForm { padding: 20px; }\n        }' }} />
    </main>
  );
}
