import type { Metadata } from 'next'
import { Big_Shoulders_Display, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Header } from '@/components/Header'
import { SideTagline } from '@/components/SideTagline'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { Grain } from '@/components/Grain'
import { RevealObserver } from '@/components/RevealObserver'
import { site } from '@/data/content'
import './globals.css'

const display = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: {
    default: site.seo.title,
    template: `%s · ${site.company.name}`,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.company.name,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
}

/* Schema.org — JSON-LD. Diz ao Google quem é a GP Asfalto, onde atua e o que
   faz. Melhora busca local e pode render cartão rico. Coordenadas de Rio
   Verde são aproximadas (suficiente para SEO). */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'GeneralContractor'],
  '@id': site.seo.url + '/#business',
  name: site.company.name,
  legalName: site.company.razao,
  url: site.seo.url,
  email: site.company.email,
  telephone: '+55' + site.company.whatsapp.replace(/\D/g, '').replace(/^55/, ''),
  description: site.seo.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua dos Trabalhadores, 350 — Setor Industrial',
    addressLocality: 'Rio Verde',
    addressRegion: 'GO',
    postalCode: '75905-020',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -17.7975,
    longitude: -50.9197,
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Sudoeste Goiano' },
    { '@type': 'State', name: 'Goiás' },
  ],
  sameAs: [
    site.company.instagram,
  ],
  knowsAbout: [
    'Pavimentação asfáltica',
    'CBUQ',
    'Terraplenagem',
    'Infraestrutura urbana',
    'Saneamento básico',
    'Usina de asfalto',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços GP Asfalto',
    itemListElement: [
      'Pavimentação asfáltica (CBUQ)',
      'Fornecimento de CBUQ usinado',
      'Terraplenagem',
      'Infraestrutura de loteamentos e obras',
    ].map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s },
    })),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-gp-navy text-gp-bone antialiased">
        {/* Schema.org LocalBusiness (SEO técnico) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Marca .js no <html> antes da pintura: sem JS o conteúdo aparece normal,
            com JS o reveal entra em ação sem flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <SmoothScroll>
          <Grain />
          <Header />
          <SideTagline />
          <main>{children}</main>
          <WhatsAppFloat />
          <RevealObserver />
        </SmoothScroll>
      </body>
    </html>
  )
}
