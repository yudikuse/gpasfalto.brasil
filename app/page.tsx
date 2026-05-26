import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
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
      <StatsBar />
      <ServicesGrid />
      <FeaturedProjects />
      <VideosGallery />
      <UsinasSection />
      <CtaBanner />
      <Footer />
    </>
  )
}
