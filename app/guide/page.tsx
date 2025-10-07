'use client'

import { useRouter } from 'next/navigation'

export default function GuidePage() {
  const router = useRouter()

  const guideItems = [
    {
      number: 1,
      title: 'EXPORTER / SELLER',
      description: 'The complete details of the company or person exporting the goods. This is required by customs authorities for identification and tax purposes.',
      example: 'ABC Trading Co., Ltd.\n123 Export Street\nSeoul, 06000, South Korea\nTel: +82-2-1234-5678 / Email: export@abctrading.com'
    },
    {
      number: 2,
      title: 'INVOICE NUMBER',
      description: 'A unique reference number assigned by the exporter to identify this specific commercial invoice. This number is crucial for tracking shipments and managing accounts.',
      example: 'INV-2025-001 or CI-20250107-KR001'
    },
    {
      number: 3,
      title: 'INVOICE DATE',
      description: 'The date when the invoice is issued. This date is important for payment terms calculation and customs clearance.',
      example: 'January 7, 2025 or 2025-01-07'
    },
    {
      number: 4,
      title: 'CURRENCY',
      description: 'The currency in which the transaction is conducted. Common currencies include USD (US Dollar), EUR (Euro), GBP (British Pound), JPY (Japanese Yen), and KRW (Korean Won).',
      example: 'USD (if all prices are in US Dollars)'
    },
    {
      number: 5,
      title: 'CONSIGNEE',
      description: 'The person or company to whom the goods are being shipped. This is typically the buyer or importer who will receive the goods at the destination.',
      example: 'XYZ Import Corp.\n456 Import Avenue\nLos Angeles, CA 90001, USA\nTel: +1-213-555-0123 / Email: import@xyzimport.com'
    },
    {
      number: 6,
      title: 'BUYER (if other than consignee)',
      description: 'If the buyer is different from the consignee (the party receiving the goods), enter the buyer\'s details here. Leave blank if the buyer and consignee are the same party.',
      example: 'DEF Corporation\n789 Business Blvd\nNew York, NY 10001, USA\n(Leave blank if same as consignee)'
    },
    {
      number: 7,
      title: 'COUNTRY OF ORIGIN',
      description: 'The country where the goods were manufactured, produced, or grown. This information is essential for determining tariff rates and compliance with trade agreements.',
      example: 'South Korea or Made in Korea'
    },
    {
      number: 8,
      title: 'PORT OF LOADING',
      description: 'The port or airport where the goods are loaded onto the vessel or aircraft for international shipment.',
      example: 'Busan Port (for sea freight) or Incheon Airport (for air freight)'
    },
    {
      number: 9,
      title: 'FINAL DESTINATION',
      description: 'The final destination port or location where the goods will be delivered or where customs clearance will occur.',
      example: 'Los Angeles Port or Port of Long Beach'
    },
    {
      number: 10,
      title: 'TERMS OF PAYMENT',
      description: 'The agreed payment method and conditions between buyer and seller. Common terms include:\n• T/T (Telegraphic Transfer/Wire Transfer): Direct bank transfer, faster but requires trust\n• L/C (Letter of Credit): Bank-guaranteed payment, safest for exporters\n• D/P (Documents against Payment): Payment before document release\n• D/A (Documents against Acceptance): Payment at a future date',
      example: '100% T/T in advance\nor\n30% deposit, 70% before shipment\nor\nIrrevocable L/C at sight'
    },
    {
      number: 11,
      title: 'TERMS OF DELIVERY (Incoterms)',
      description: 'International Commercial Terms (Incoterms® 2020) that define responsibilities between buyer and seller:\n• EXW (Ex Works): Buyer takes all responsibility from seller\'s premises\n• FOB (Free on Board): Seller delivers goods on board the ship; used for sea freight only\n• CIF (Cost, Insurance, Freight): Seller pays cost, insurance, and freight to destination port\n• CFR (Cost and Freight): Similar to CIF but without insurance\n• DDP (Delivered Duty Paid): Seller delivers goods cleared for import; maximum seller obligation\n• DDU (Delivered Duty Unpaid): Seller delivers to destination but buyer pays import duties',
      example: 'FOB Busan Port\nor\nCIF Los Angeles\nor\nDDP New York warehouse'
    },
    {
      number: 12,
      title: 'DESCRIPTION OF GOODS',
      description: 'A detailed description of each product being shipped. Include product name, specifications, model numbers, materials, and any other relevant details that help customs identify the goods.',
      example: 'Cotton Men\'s T-Shirt, 100% Cotton, Round Neck, Short Sleeve, Blue Color, Size: M\nor\nLED Light Bulb, Model: LED-A60-9W, 9 Watts, E27 Base, Warm White 3000K'
    },
    {
      number: 13,
      title: 'HS CODE',
      description: 'Harmonized System Code is an internationally standardized 6-digit code used to classify traded products. Countries may extend it to 8-12 digits for more specific classification. HS codes determine customs duties and import regulations.\n\nHow to find: Use online HS code databases, check with customs authorities, or consult freight forwarders.',
      example: '6109.10 (for cotton T-shirts)\nor\n8539.50 (for LED lamps)\nor\n8517.62.00 (for smartphones - extended code)'
    },
    {
      number: 14,
      title: 'QUANTITY',
      description: 'The total number of units for each item being shipped.',
      example: '1,000 (pieces)\nor\n50 (cartons)\nor\n2,500 (units)'
    },
    {
      number: 15,
      title: 'UNIT',
      description: 'The unit of measurement for the quantity. Common units include PCS (pieces), CTN (cartons), KG (kilograms), SET, DOZ (dozen), M (meters), etc.',
      example: 'PCS, CTN, KG, SET, DOZ, BOX, M, L'
    },
    {
      number: 16,
      title: 'UNIT PRICE',
      description: 'The price per single unit of measurement in the specified currency.',
      example: '$12.50 per piece\nor\n$850.00 per carton'
    },
    {
      number: 17,
      title: 'AMOUNT',
      description: 'The total value for each line item, calculated by multiplying Quantity × Unit Price. This is automatically calculated in most systems.',
      example: '1,000 pcs × $12.50 = $12,500.00'
    },
    {
      number: 18,
      title: 'TOTAL AMOUNT',
      description: 'The total commercial value of the entire invoice, which is the sum of all line item amounts. This is the total value that will be used for customs valuation and duty calculation.',
      example: 'USD 45,750.00\nor\nTotal Invoice Value: EUR 38,250.00'
    },
    {
      number: 19,
      title: 'DECLARATION',
      description: 'A formal statement certifying that the information provided in the invoice is true and accurate. This is legally required for international trade.',
      example: 'I declare that all the information contained in this invoice is true and correct.\nor\nWe certify that this invoice shows the actual price of the goods described and that all particulars are true and correct.'
    },
    {
      number: 20,
      title: 'SIGNATURE',
      description: 'The authorized signature of the exporter or company representative, along with their name, title, and date. This validates the invoice and declaration.',
      example: 'John Smith\nExport Manager\nDate: January 7, 2025'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">COMMERCIAL INVOICE GUIDE</h1>
          <p className="text-gray-600">Complete guide to filling out your commercial invoice for international trade</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            {guideItems.map((item) => (
              <div key={item.number} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-3 whitespace-pre-line">{item.description}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-sm font-semibold text-blue-800 mb-1">Example:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{item.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">Important Notes:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Always ensure all required fields are filled accurately to avoid customs delays</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Keep copies of all commercial invoices for your records and accounting purposes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Use correct HS codes to ensure proper customs classification and duty calculation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Verify that the invoice matches other shipping documents (packing list, bill of lading)</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Commercial Invoice
          </button>
        </div>
      </div>
    </div>
  )
}
