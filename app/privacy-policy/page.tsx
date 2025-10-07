export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to Invoice Generator. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we handle your personal data when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-gray-700 mb-2">We may collect the following information:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Invoice data that you input into our forms (company names, addresses, product details)</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>IP address (anonymized)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Generate PDF invoices based on your input</li>
              <li>Improve our website and services</li>
              <li>Understand how users interact with our website</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Storage and Security</h2>
            <p className="text-gray-700">
              All invoice data is processed locally in your browser. We do not store your invoice data on our servers.
              Generated PDFs are created on your device and are not transmitted to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
            <p className="text-gray-700">
              We use cookies to improve your browsing experience. You can choose to disable cookies through your browser settings,
              but this may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Third-Party Services</h2>
            <p className="text-gray-700 mb-2">We may use third-party services such as:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Google Analytics for website analytics</li>
              <li>Google AdSense for advertising</li>
            </ul>
            <p className="text-gray-700 mt-2">
              These services may collect data according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-gray-700 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Our service is not directed to children under 13 years of age. We do not knowingly collect personal
              information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at:
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
