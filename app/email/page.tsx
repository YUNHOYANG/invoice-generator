import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Email - Invoice Generator',
  description: 'Get in touch with us via email for any inquiries about our free invoice generator tool.',
  openGraph: {
    title: 'Contact Email - Invoice Generator',
    description: 'Get in touch with us via email for any inquiries about our free invoice generator tool.',
  },
  alternates: {
    canonical: 'https://threppa.net/email'
  }
}

export default function EmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Contact Us
          </h1>

          <div className="text-center space-y-6">
            <p className="text-lg text-gray-700">
              For any inquiries, questions, or feedback about our invoice generator, please feel free to reach out to us via email.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 my-8">
              <p className="text-sm text-gray-600 mb-2">Contact Email:</p>
              <a
                href="mailto:treadmall@gmail.com"
                className="text-2xl md:text-3xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                treadmall@gmail.com
              </a>
            </div>

            <div className="mt-8 text-gray-600 space-y-4">
              <p>
                We typically respond within 24-48 hours during business days.
              </p>
              <p className="text-sm">
                When contacting us, please include as much detail as possible about your inquiry so we can assist you better.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What We Can Help With
              </h2>
              <ul className="text-left space-y-2 text-gray-700 max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Technical support and troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Feature requests and suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Business inquiries and partnerships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>General questions about invoice generation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
