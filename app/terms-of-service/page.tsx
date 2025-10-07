export default function TermsOfService() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using Invoice Generator, you accept and agree to be bound by the terms and provision of this agreement.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-gray-700">
              Invoice Generator provides users with tools to create, customize, and download professional invoices, proforma invoices,
              and packing lists in PDF format. The service is provided free of charge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-2">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide accurate and complete information when creating invoices</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to harm or interfere with the service</li>
              <li>Not use automated systems to access the service without permission</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
            <p className="text-gray-700">
              The service and its original content, features, and functionality are owned by Invoice Generator and are protected
              by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. User Generated Content</h2>
            <p className="text-gray-700">
              You retain all rights to the invoice data you create using our service. We do not claim ownership of your content.
              All invoice data is processed locally in your browser and is not stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p className="text-gray-700">
              The service is provided "as is" and "as available" without any warranties of any kind, either express or implied.
              We do not guarantee that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-700">
              Invoice Generator shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Accuracy of Invoices</h2>
            <p className="text-gray-700">
              While we strive to provide accurate templates, you are responsible for verifying the accuracy and completeness
              of all invoices generated. We are not responsible for any errors in your invoices or any consequences thereof.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Third-Party Links</h2>
            <p className="text-gray-700">
              Our service may contain links to third-party websites or services. We are not responsible for the content,
              privacy policies, or practices of any third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Modifications to Service</h2>
            <p className="text-gray-700">
              We reserve the right to modify or discontinue the service at any time without notice. We shall not be liable
              to you or any third party for any modification, suspension, or discontinuance of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to update or change our Terms of Service at any time. Your continued use of the service
              after we post any modifications constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by and construed in accordance with the laws, without regard to its
              conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">13. Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at:
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
