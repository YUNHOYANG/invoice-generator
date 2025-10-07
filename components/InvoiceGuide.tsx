'use client'

import { useState } from 'react'

export default function InvoiceGuide() {
  const [isOpen, setIsOpen] = useState(false)

  const guideItems = [
    {
      number: 1,
      title: 'SELLER',
      description: 'Name and address of principal party responsible for effecting export from the United States. The Exporter as named on the exporter license (if applicable).'
    },
    {
      number: 2,
      title: 'SOLD TO',
      description: 'The name and address of the person/company to whom the goods are shipped to for the designated end use, or to the party so designated on the export license.'
    },
    {
      number: 3,
      title: 'SHIP TO',
      description: 'If different than Sold To) The intermediate consignee – that is the name and address of the party who effects delivery of the merchandise to the ultimate consignee, or the party so named on the export license of the forwarding agent. The name and address of the duly authorized forwarder acting as agent for the exporter.'
    },
    {
      number: 4,
      title: 'INVOICE NUMBER',
      description: 'Invoice number assigned by the exporter.'
    },
    {
      number: 5,
      title: 'CUSTOMER REFERENCE NUMBER',
      description: 'Overseas customer\'s reference number.'
    },
    {
      number: 6,
      title: 'TERMS OF SALE',
      description: 'Delivery and terms of sale agreement.'
    },
    {
      number: 7,
      title: 'TERMS OF PAYMENT',
      description: 'Terms, conditions, and currency of settlement as agreed upon by the vendor and purchaser per the pro forma invoice, customer purchase order and/or the letter of credit.'
    },
    {
      number: 8,
      title: 'CURRENCY OF SETTLEMENT',
      description: 'Currency agreed upon between seller and buyer as payment.'
    },
    {
      number: 9,
      title: 'MODE OF SHIPMENT',
      description: 'Indicate air, ocean, and surface.'
    },
    {
      number: 10,
      title: 'QUANTITY',
      description: 'Record total number of units per description line.'
    },
    {
      number: 11,
      title: 'DESCRIPTION',
      description: 'Provide full description of items shipped, the type of container, (carton, box, etc.) the gross weight per container, and the quantity and unit of measure of the merchandise.'
    },
    {
      number: 12,
      title: 'UNIT OF MEASURE',
      description: 'Record total net weight and total gross weight in kilograms (1 kilogram = 2.2 pounds) per description line.'
    },
    {
      number: 13,
      title: 'UNIT PRICE',
      description: 'Record the unit price of the merchandise per unit of measure.'
    },
    {
      number: 14,
      title: 'TOTAL PRICE',
      description: 'Calculate the extended value of the line.'
    },
    {
      number: 15,
      title: 'TOTAL COMMERCIAL VALUE',
      description: 'Total value of the invoice.'
    },
    {
      number: 16,
      title: 'PACKAGE MARKS',
      description: 'Record in this field and on each package number (for example, "1 of 7,""3 of 7") shippers company name, country of origin (e.g., Made in USA), destination port of entry, package weight in kilograms, package size (length x width x height) and shipper\'s control number (optional).'
    },
    {
      number: 17,
      title: 'MISCELLANEOUS CHARGES',
      description: 'Charges (packing, insurance, etc. Record any miscellaneous charges that are to be paid by customer, such as export transportation, insurance, export packaging inland freight to pier, etc.).'
    },
    {
      number: 18,
      title: 'CERTIFICATIONS',
      description: 'Any certifications or declarations required of the shipper regarding any information recorded on the commercial invoice.'
    }
  ]

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-between hover:bg-blue-700 transition"
      >
        <span>📋 Commercial Invoice Instructions</span>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 bg-white border-2 border-blue-600 rounded-lg p-6 max-h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">COMMERCIAL INVOICE - INSTRUCTIONS</h2>

          <div className="space-y-4">
            {guideItems.map((item) => (
              <div key={item.number} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
