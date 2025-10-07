import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://threppa.net'),
  title: {
    default: 'Invoice Generator - Free Commercial Invoice, Proforma Invoice & Packing List',
    template: '%s | threppa.net'
  },
  description: 'Create professional commercial invoices, proforma invoices, and packing lists for free. Easy-to-use online tool for international trade documentation.',
  keywords: ['invoice generator', 'commercial invoice', 'proforma invoice', 'packing list', 'export documentation', 'international trade', 'customs invoice', 'free invoice maker', 'HS code', 'Incoterms'],
  authors: [{ name: 'threppa.net' }],
  creator: 'threppa.net',
  publisher: 'threppa.net',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://threppa.net',
    title: 'Invoice Generator - Free Commercial Invoice, Proforma Invoice & Packing List',
    description: 'Create professional commercial invoices, proforma invoices, and packing lists for free. Easy-to-use online tool for international trade documentation.',
    siteName: 'threppa.net',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invoice Generator - Free Commercial Invoice, Proforma Invoice & Packing List',
    description: 'Create professional commercial invoices, proforma invoices, and packing lists for free. Easy-to-use online tool for international trade documentation.',
  },
  alternates: {
    canonical: 'https://threppa.net',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'threppa.net',
    url: 'https://threppa.net',
    logo: 'https://threppa.net/logo.png',
    description: 'Free online invoice generator for international trade documentation',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'treadmall@gmail.com',
      contactType: 'Customer Support',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5928913282855960"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
