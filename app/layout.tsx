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
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.company.name,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-gp-navy text-gp-bone antialiased">
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
