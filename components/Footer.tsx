export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">threppa.net</h3>
            <p className="text-gray-300 mb-4">
              Create professional commercial invoices, proforma invoices, and packing lists for free.
              Fast, secure, and easy to use.
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} threppa.net. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition">
                  Commercial Invoice
                </a>
              </li>
              <li>
                <a href="/proforma-invoice" className="text-gray-300 hover:text-white transition">
                  Proforma Invoice
                </a>
              </li>
              <li>
                <a href="/packing-list" className="text-gray-300 hover:text-white transition">
                  Packing List
                </a>
              </li>
              <li>
                <a href="/guide" className="text-gray-300 hover:text-white transition">
                  Guide
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-300 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            Made with ❤️ for businesses worldwide | Your privacy is our priority - All data processed locally
          </p>
        </div>
      </div>
    </footer>
  )
}
