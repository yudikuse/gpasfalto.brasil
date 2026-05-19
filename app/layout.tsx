import type { Metadata } from 'next'
import { Big_Shoulders_Display, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { site } from '@/data/content'

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title:        site.seo.title,
  description:  site.seo.description,
  keywords:     site.seo.keywords,
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
    <html
      lang="pt-BR"
      className={`${bigShoulders.variable} ${interTight.variable} ${jetBrains.variable}`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18158017809"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18158017809');
          `}
        </Script>
      </head>
      <body className="font-body bg-midnight text-bone antialiased">
        {children}
      </body>
    </html>
  )
}
