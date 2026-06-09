import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { ClientLogos } from '@/components/ClientLogos'
import { ServicesGrid } from '@/components/ServicesGrid'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { VideosGallery } from '@/components/VideosGallery'
import { UsinasSection } from '@/components/UsinasSection'
import { CtaBanner } from '@/components/CtaBanner'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="reveal"><StatsBar /></div>
      <div className="reveal"><ClientLogos /></div>
      <div className="reveal"><ServicesGrid /></div>
      <div className="reveal"><FeaturedProjects /></div>
      <div className="reveal"><VideosGallery /></div>
      <div className="reveal"><UsinasSection /></div>
      <div className="reveal"><CtaBanner /></div>
      <Footer />
    </>
  )
}
