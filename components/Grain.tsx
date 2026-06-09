/**
 * Grão/noise sutil sobre toda a tela — dá o ar "cinematográfico" tipo gmining.
 * Textura SVG (feTurbulence) embutida, sem asset externo. pointer-events-none,
 * fica sob o header/menu (z 45 < header 50). Custo de performance ~zero.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E"

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] opacity-[0.07]"
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: '160px 160px',
      }}
    />
  )
}
