import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { ClientLogos } from '@/components/ClientLogos'
import { ServicesGrid } from '@/components/ServicesGrid'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { ParaQuemSection } from '@/components/ParaQuemSection'
import { VideosGallery } from '@/components/VideosGallery'
import { UsinasSection } from '@/components/UsinasSection'
import { CtaBanner } from '@/components/CtaBanner'
import { TopoDivider } from '@/components/TopoDivider'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="reveal"><StatsBar /></div>
      <div className="reveal"><ClientLogos /></div>
      <div className="reveal"><ServicesGrid /></div>
      <div className="reveal"><ParaQuemSection /></div>
      <div className="reveal"><FeaturedProjects /></div>
      <div className="reveal"><VideosGallery /></div>
      <div className="reveal"><UsinasSection /></div>
      <TopoDivider />
      <div className="reveal"><CtaBanner /></div>
      <div className="reveal"><ContactSection /></div>
      <Footer />
    </>
  )
}
