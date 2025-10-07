import InvoiceForm from '@/components/invoice/InvoiceForm'
import TemplateSelector from '@/components/TemplateSelector'
import { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://threppa.net',
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Invoice Generator',
    description: 'Free online tool to create professional commercial invoices, proforma invoices, and packing lists for international trade',
    url: 'https://threppa.net',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Commercial Invoice Generator',
      'Proforma Invoice Creator',
      'Packing List Maker',
      'Multiple Currency Support',
      'HS Code Support',
      'Incoterms Integration',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen p-8 bg-gray-50">
        <TemplateSelector />
        <InvoiceForm />
      </main>
    </>
  )
}
