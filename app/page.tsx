import Nav            from '@/components/Nav'
import PageIndicator  from '@/components/PageIndicator'
import WaButton       from '@/components/WaButton'
import HeroPanel      from '@/components/HeroPanel'
import NumbersPanel   from '@/components/NumbersPanel'
import ProjectPanel   from '@/components/ProjectPanel'
import SegmentosPanel from '@/components/SegmentosPanel'
import UsinasPanel    from '@/components/UsinasPanel'
import ContactPanel   from '@/components/ContactPanel'
import { site }       from '@/data/content'

export default function Home() {
  return (
    <div className="scroll-lock" style={{ height: '100svh' }}>
      <Nav />
      <PageIndicator />
      <WaButton />
      <main id="scrl" className="scroll-container">
        <HeroPanel />
        <NumbersPanel />
        {site.projects.map((proj, i) => (
          <ProjectPanel
            key={proj.slug}
            project={proj}
            panelId={i === 0 ? 'obras' : proj.slug}
          />
        ))}
        <SegmentosPanel />
        <UsinasPanel />
        <ContactPanel />
      </main>
    </div>
  )
}
