"use client";

import { useEffect, useState } from "react";

/**
 * CamadaRail
 * Trilho lateral fixo no formato de amostra de pavimento (core sample).
 * Fica fixo na direita, ancorado por uma espinha vertical de altura total,
 * e um marcador verde desce pelas camadas conforme a pagina rola.
 *
 * - Desktop (lg+): trilho completo, rotulos sempre visiveis.
 * - Telas menores: escondido.
 */

type Tex = "capa" | "lisa" | "base" | "sub" | "solo";
type Layer = {
  key: string;
  label: string;
  desc: string;
  basis: number; // proporcao (soma = 100)
  tone: string;
  tex: Tex;
};

const LAYERS: Layer[] = [
  { key: "capa", label: "CAPA", desc: "asfalto · faixa", basis: 10, tone: "#0a0d28", tex: "capa" },
  { key: "ligacao", label: "LIGAÇÃO", desc: "binder", basis: 8, tone: "#14152e", tex: "lisa" },
  { key: "base", label: "BASE", desc: "brita graúda", basis: 34, tone: "#121748", tex: "base" },
  { key: "subbase", label: "SUB-BASE", desc: "brita fina", basis: 26, tone: "#182058", tex: "sub" },
  { key: "solo", label: "SUBLEITO", desc: "solo", basis: 22, tone: "#181c34", tex: "solo" },
];

const CUM = LAYERS.reduce<number[]>((acc, l, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + LAYERS[i - 1].basis);
  return acc;
}, []);

function Texture({ kind, id }: { kind: Tex; id: string }) {
  if (kind === "capa") {
    return (
      <>
        <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1.4, background: "#e7e3d6" }} />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "16%",
            right: "16%",
            height: 0,
            borderTop: "2px dashed #34C759",
            opacity: 0.9,
          }}
        />
      </>
    );
  }
  if (kind === "lisa") {
    return (
      <span
        style={{
          position: "absolute",
          top: 4,
          left: "8%",
          right: "8%",
          height: 0,
          borderTop: "1px dashed rgba(207,203,187,.28)",
        }}
      />
    );
  }
  // base / sub / solo -> linhas abertas (sem caixinhas), svg sem viewBox (tile em px)
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
      <defs>
        {kind === "base" && (
          <pattern id={id} width="30" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 11 L7 4 L15 11 L23 4 L30 11" fill="none" stroke="#cfcbbb" strokeOpacity="0.4" strokeWidth="0.7" />
          </pattern>
        )}
        {kind === "sub" && (
          <pattern id={id} width="30" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 7 L5 3 L10 7 L15 3 L20 7 L25 3 L30 7" fill="none" stroke="#cfcbbb" strokeOpacity="0.34" strokeWidth="0.6" />
          </pattern>
        )}
        {kind === "solo" && (
          <pattern id={id} width="16" height="14" patternUnits="userSpaceOnUse">
            <line x1="2" y1="11" x2="6" y2="3" stroke="#cfcbbb" strokeOpacity="0.4" strokeWidth="0.55" />
            <line x1="9" y1="11" x2="13" y2="3" stroke="#cfcbbb" strokeOpacity="0.4" strokeWidth="0.55" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function CamadaRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
        setProgress(p);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pc = progress * 100;
  let active = 0;
  for (let i = 0; i < LAYERS.length; i++) if (pc >= CUM[i]) active = i;

  const SPINE = 30; // x da espinha dentro da aside

  return (
    <aside
      aria-hidden
      className="hidden lg:block"
      style={{ position: "fixed", top: 0, right: 26, height: "100vh", width: 124, zIndex: 40, pointerEvents: "none" }}
    >
      {/* espinha vertical de altura total (ancora) */}
      <span style={{ position: "absolute", left: SPINE, top: "6%", bottom: "6%", width: 1, background: "rgba(207,203,187,.22)" }} />
      <span style={{ position: "absolute", left: SPINE - 4, top: "6%", width: 9, height: 1, background: "rgba(207,203,187,.4)" }} />
      <span style={{ position: "absolute", left: SPINE - 4, bottom: "6%", width: 9, height: 1, background: "rgba(207,203,187,.4)" }} />

      {/* barra (amostra), encaixada na espinha */}
      <div
        style={{
          position: "absolute",
          left: SPINE,
          top: "11%",
          height: "78%",
          width: 30,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {LAYERS.map((L, i) => (
          <div
            key={L.key}
            style={{
              flex: `${L.basis} 0 0`,
              position: "relative",
              background: L.tone,
              borderTop: i ? "1px solid rgba(52,199,89,.4)" : "none",
              overflow: "hidden",
            }}
          >
            <Texture kind={L.tex} id={`gp-tex-${L.key}`} />
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: "#34C759",
                opacity: active === i ? 0.12 : 0,
                transition: "opacity .25s ease",
              }}
            />
          </div>
        ))}

        {/* marcador (anda dentro da barra) */}
        <div style={{ position: "absolute", left: 0, top: `${pc}%`, width: 30, pointerEvents: "none" }}>
          <div style={{ position: "relative", height: 0, borderTop: "2px solid #34C759" }}>
            <div
              style={{
                position: "absolute",
                left: -6,
                top: -4,
                width: 0,
                height: 0,
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                borderLeft: "6px solid #34C759",
              }}
            />
          </div>
        </div>
      </div>

      {/* rotulos (sempre visiveis, a esquerda da barra) */}
      <div style={{ position: "absolute", left: 0, top: "11%", height: "78%", width: SPINE - 4 }}>
        {LAYERS.map((L, i) => {
          const top = CUM[i] + L.basis / 2;
          const on = active === i;
          return (
            <div
              key={L.key}
              style={{
                position: "absolute",
                right: 0,
                top: `${top}%`,
                transform: "translateY(-50%)",
                textAlign: "right",
                whiteSpace: "nowrap",
                fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
                transition: "color .25s ease",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: ".06em", color: on ? "#34C759" : "#6b7299" }}>{L.label}</div>
              <div style={{ fontSize: 7, letterSpacing: ".04em", color: on ? "#34C759" : "#454c70" }}>{L.desc}</div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
