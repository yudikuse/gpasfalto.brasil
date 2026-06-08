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
      <StatsBar />

      {/*
        TESTE A/B (TEMPORÁRIO): duas versões da seção de logos pra você comparar.
        Quando decidir qual prefere, apague o que não quiser e deixe só uma <ClientLogos />.
      */}
      <ClientLogos
        variant="mono"
        eyebrow="VERSÃO B · MONOCROMÁTICO"
        title="Confiam na nossa engenharia."
      />
      <ClientLogos
        variant="color"
        eyebrow="VERSÃO A · COLORIDO"
        title="Confiam na nossa engenharia."
      />

      <ServicesGrid />
      <FeaturedProjects />
      <VideosGallery />
      <UsinasSection />
      <CtaBanner />
      <Footer />
    </>
  )
}
