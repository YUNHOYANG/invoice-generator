'use client'

import { useState } from 'react'
import { generateInvoicePDF } from '@/lib/pdfGenerator'
import CommercialInvoiceForm from '@/components/invoice/CommercialInvoiceForm'
import ProformaInvoiceForm from '@/components/invoice/ProformaInvoiceForm'

interface InvoiceItem {
  no: number
  description: string
  quantity: number
  unit: string
  unitPrice: number
  unitPriceCurrency: string
  amount: number
  amountCurrency: string
  note: string
}

interface InvoiceFormData {
  invoiceNo: string
  invoiceDate: string
  paymentTerms: string

  shipperName: string
  shipperAddress: string
  shipperContact: string

  consigneeName: string
  consigneeAddress: string
  consigneeContact: string

  buyerName: string
  buyerAddress: string
  buyerContact: string

  portOfLoading: string
  finalDestination: string
  vesselFlight: string
  sailingDate: string
  marksAndNumbers: string

  bankName: string
  bankAddress: string
  swiftNo: string
  accountNo: string
  accountName: string

  currency: string
  logoUrl: string
  remarks: string

  items: InvoiceItem[]
}

interface InvoiceFormProps {
  isProforma?: boolean
}

export default function InvoiceForm({ isProforma = false }: InvoiceFormProps) {
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const [formData, setFormData] = useState<any>({
    invoiceNo: '',
    invoiceDate: getTodayDate(),
    currency: 'USD',
    exporterName: '',
    consigneeName: '',
    buyerName: '',
    countryOfOrigin: '',
    portOfLoading: '',
    finalDestination: '',
    termsOfPayment: '',
    termsOfDelivery: 'FOB',
    declaration: 'I declare that all the information contained in this invoice is true and correct.',
    signatureName: '',
    signatureDate: getTodayDate(),
    totalAmount: '0.00',
    items: [
      { no: 1, description: '', hsCode: '', quantity: 0, unit: 'PCS', unitPrice: 0, amount: 0 }
    ]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission not needed - PDF only
  }

  const handlePDFGeneration = () => {
    // Validate required fields
    const missingFields = []

    if (!formData.exporterName?.trim()) missingFields.push('Exporter / Seller')
    if (!formData.invoiceNo?.trim()) missingFields.push('Invoice Number')
    if (!formData.invoiceDate) missingFields.push('Date')
    if (!formData.consigneeName?.trim()) missingFields.push('Consignee')
    if (!formData.countryOfOrigin?.trim()) missingFields.push('Country of Origin')
    if (!formData.portOfLoading?.trim()) missingFields.push('Port of Loading')
    if (!formData.finalDestination?.trim()) missingFields.push('Final Destination')
    if (!formData.termsOfPayment?.trim()) missingFields.push('Terms of Payment')
    if (!formData.termsOfDelivery?.trim()) missingFields.push('Terms of Delivery')

    // Check if at least one item has description and quantity
    const hasValidItems = formData.items.some((item: any) =>
      item.description?.trim() && item.quantity > 0
    )
    if (!hasValidItems) missingFields.push('At least one item with description and quantity')

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n\n${missingFields.map(f => `• ${f}`).join('\n')}`)
      return
    }

    // Convert formData to match InvoiceData interface expected by generateInvoicePDF
    const invoiceData = {
      invoiceNo: formData.invoiceNo,
      invoiceDate: formData.invoiceDate,
      customerReferenceNo: '',
      customerReferenceDate: '',
      sellerName: formData.exporterName,
      sellerAddress: '',
      sellerContact: formData.countryOfOrigin,
      soldToName: formData.consigneeName,
      soldToAddress: '',
      soldToContact: '',
      shipToName: formData.buyerName,
      shipToAddress: '',
      shipToContact: '',
      termsOfSale: formData.termsOfDelivery,
      termsOfPayment: formData.termsOfPayment,
      currencyOfSettlement: formData.currency,
      modeOfShipment: formData.portOfLoading,
      billOfLading: formData.finalDestination,
      packageMarks: '',
      totalCommercialValue: formData.totalAmount,
      miscCharges: '0',
      totalInvoiceValue: formData.totalAmount,
      certificationText: formData.declaration,
      signedBy: formData.signatureName,
      title: '',
      logoUrl: '',
      remarks: '',
      items: formData.items
    }
    generateInvoicePDF(invoiceData, isProforma, 'standard')
  }

  return (
    <div className="max-w-7xl mx-auto">
      {isProforma ? (
        <ProformaInvoiceForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onPDFGeneration={handlePDFGeneration}
        />
      ) : (
        <CommercialInvoiceForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onPDFGeneration={handlePDFGeneration}
        />
      )}
    </div>
  )
}
