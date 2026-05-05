import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './globals.css'
import { site } from '@/data/content'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title:       site.seo.title,
  description: site.seo.description,
  keywords:    site.seo.keywords,
  metadataBase: new URL(site.seo.url),
  openGraph: {
    title:       site.seo.title,
    description: site.seo.description,
    url:         site.seo.url,
    siteName:    site.company.name,
    locale:      'pt_BR',
    type:        'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="font-body bg-navy text-cream">{children}</body>
    </html>
  )
}
