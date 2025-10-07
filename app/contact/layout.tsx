import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Invoice Generator Support',
  description: 'Get in touch with us for support, questions, or feedback about our free invoice generator tools. We\'re here to help with your international trade documentation needs.',
  keywords: ['contact invoice generator', 'customer support', 'help', 'international trade support'],
  openGraph: {
    title: 'Contact Us - Invoice Generator Support',
    description: 'Get in touch with us for support, questions, or feedback about our free invoice generator tools.',
    url: 'https://threppa.net/contact',
  },
  alternates: {
    canonical: 'https://threppa.net/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
