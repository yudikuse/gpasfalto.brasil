import Nav           from '@/components/Nav'
import PageIndicator  from '@/components/PageIndicator'
import WaButton       from '@/components/WaButton'
import HeroPanel      from '@/components/HeroPanel'
import NumbersPanel   from '@/components/NumbersPanel'
import ProjectPanel   from '@/components/ProjectPanel'
import UsinasPanel    from '@/components/UsinasPanel'
import ContactPanel   from '@/components/ContactPanel'
import { site }       from '@/data/content'

export default function Home() {
  return (
    <>
      {/* Fixed UI */}
      <Nav />
      <PageIndicator />
      <WaButton />

      {/* Scroll container */}
      <main id="scrl" className="scroll-container">

        {/* P1 — Hero */}
        <HeroPanel />

        {/* P2 — Números */}
        <NumbersPanel />

        {/* P3, P4, P5 — Obras (gerados dinamicamente a partir de data/content.ts) */}
        {site.projects.map((proj, i) => (
          <ProjectPanel
            key={proj.slug}
            project={proj}
            panelId={`p${i + 3}`}
          />
        ))}

        {/* P6 — Usinas CBUQ */}
        <UsinasPanel />

        {/* P7 — Contato */}
        <ContactPanel />

      </main>
    </>
  )
}
