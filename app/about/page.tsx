import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Free Invoice Generator for International Trade',
  description: 'Learn about our mission to simplify international trade documentation. Free tools for creating commercial invoices, proforma invoices, and packing lists.',
  keywords: ['about invoice generator', 'international trade tools', 'export documentation', 'free invoice maker'],
  openGraph: {
    title: 'About Us - Free Invoice Generator for International Trade',
    description: 'Learn about our mission to simplify international trade documentation. Free tools for creating commercial invoices, proforma invoices, and packing lists.',
    url: 'https://threppa.net/about',
  },
  alternates: {
    canonical: 'https://threppa.net/about',
  },
}

export default function About() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">About Invoice Generator</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-700">
              Invoice Generator is dedicated to simplifying the invoice creation process for businesses of all sizes.
              We provide a free, easy-to-use platform that enables users to create professional commercial invoices,
              proforma invoices, and packing lists without the need for complex software or accounting knowledge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Commercial Invoice</h3>
                <p className="text-gray-700">
                  Create professional commercial invoices for international trade with all necessary fields including
                  exporter/seller information, consignee details, shipping information, and itemized product lists.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Proforma Invoice</h3>
                <p className="text-gray-700">
                  Generate proforma invoices for quotations and advance payments with the same comprehensive features
                  as commercial invoices.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Packing List</h3>
                <p className="text-gray-700">
                  Create detailed packing lists for shipments including package details, weights, measurements,
                  and shipping information.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>100% free to use - no hidden charges or subscriptions</li>
              <li>Privacy-focused - all data processed locally in your browser</li>
              <li>Professional PDF output</li>
              <li>Support for multiple currencies (USD, EUR, GBP, JPY, KRW)</li>
              <li>Customizable invoice fields</li>
              <li>Support for international trade terms (Incoterms)</li>
              <li>HS Code support for customs documentation</li>
              <li>No registration required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600">Your data stays on your device</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Fast & Simple</h3>
                <p className="text-sm text-gray-600">Create invoices in minutes</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🌍</div>
                <h3 className="font-semibold mb-2">Global Support</h3>
                <p className="text-sm text-gray-600">Multi-currency and international trade ready</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Who We Serve</h2>
            <p className="text-gray-700">
              Our platform is designed for exporters, importers, small business owners, freelancers, and anyone who needs
              to create professional invoices and shipping documents quickly and easily.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-700">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <p className="text-gray-700 mt-2">
              Email: treadmall@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
