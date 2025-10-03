'use client'

import { useState } from 'react'
import { generateInvoicePDF } from '@/lib/pdfGenerator'

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

export default function InvoiceForm() {
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNo: '',
    invoiceDate: '',
    paymentTerms: '',
    shipperName: '',
    shipperAddress: '',
    shipperContact: '',
    consigneeName: '',
    consigneeAddress: '',
    consigneeContact: '',
    buyerName: '',
    buyerAddress: '',
    buyerContact: '',
    portOfLoading: '',
    finalDestination: '',
    vesselFlight: '',
    sailingDate: '',
    marksAndNumbers: '',
    bankName: '',
    bankAddress: '',
    swiftNo: '',
    accountNo: '',
    accountName: '',
    currency: 'USD',
    logoUrl: '',
    remarks: '',
    items: [
      { no: 1, description: '', quantity: 0, unit: '', unitPrice: 0, unitPriceCurrency: 'USD', amount: 0, amountCurrency: 'USD', note: '' }
    ]
  })

  const [logoPreview, setLogoPreview] = useState<string>('')

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setLogoPreview(base64String)
        setFormData({ ...formData, logoUrl: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, {
        no: formData.items.length + 1,
        description: '',
        quantity: 0,
        unit: '',
        unitPrice: 0,
        unitPriceCurrency: 'USD',
        amount: 0,
        amountCurrency: 'USD',
        note: ''
      }]
    })
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }

    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice
    }

    setFormData({ ...formData, items: newItems })
  }

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Invoice saved successfully!')
      } else {
        alert('Failed to save invoice')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving invoice')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">COMMERCIAL INVOICE</h1>

      {/* Logo Upload */}
      <div className="border rounded p-4">
        <h2 className="font-bold mb-3">Company Logo</h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="border rounded px-3 py-2"
          />
          {logoPreview && (
            <div className="border rounded p-2">
              <img src={logoPreview} alt="Logo Preview" className="h-20 object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice No</label>
          <input
            type="text"
            value={formData.invoiceNo}
            onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Invoice Date</label>
          <input
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Terms</label>
          <input
            type="text"
            value={formData.paymentTerms}
            onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="USD">USD</option>
            <option value="KRW">KRW</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </div>

      {/* Shipper/Seller */}
      <div className="border rounded p-4">
        <h2 className="font-bold mb-3">SHIPPER/SELLER</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.shipperName}
            onChange={(e) => setFormData({ ...formData, shipperName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Address"
            value={formData.shipperAddress}
            onChange={(e) => setFormData({ ...formData, shipperAddress: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
          <input
            type="text"
            placeholder="Contact"
            value={formData.shipperContact}
            onChange={(e) => setFormData({ ...formData, shipperContact: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Consignee */}
      <div className="border rounded p-4">
        <h2 className="font-bold mb-3">CONSIGNEE</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.consigneeName}
            onChange={(e) => setFormData({ ...formData, consigneeName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Address"
            value={formData.consigneeAddress}
            onChange={(e) => setFormData({ ...formData, consigneeAddress: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
          <input
            type="text"
            placeholder="Contact"
            value={formData.consigneeContact}
            onChange={(e) => setFormData({ ...formData, consigneeContact: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Buyer */}
      <div className="border rounded p-4">
        <h2 className="font-bold mb-3">BUYER (if other than consignee)</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.buyerName}
            onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Address"
            value={formData.buyerAddress}
            onChange={(e) => setFormData({ ...formData, buyerAddress: e.target.value })}
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
          <input
            type="text"
            placeholder="Contact"
            value={formData.buyerContact}
            onChange={(e) => setFormData({ ...formData, buyerContact: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Shipping Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Port of Loading</label>
          <input
            type="text"
            value={formData.portOfLoading}
            onChange={(e) => setFormData({ ...formData, portOfLoading: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Final Destination</label>
          <input
            type="text"
            value={formData.finalDestination}
            onChange={(e) => setFormData({ ...formData, finalDestination: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vessel / Flight</label>
          <input
            type="text"
            value={formData.vesselFlight}
            onChange={(e) => setFormData({ ...formData, vesselFlight: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sailing on or about</label>
          <input
            type="date"
            value={formData.sailingDate}
            onChange={(e) => setFormData({ ...formData, sailingDate: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="border rounded p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">ITEMS</h2>
          <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Item
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">NO.</th>
                <th className="border p-2">DESCRIPTION</th>
                <th className="border p-2">Q'TY (UNIT)</th>
                <th className="border p-2">U/PRICE</th>
                <th className="border p-2">AMOUNT</th>
                <th className="border p-2">NOTE</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.no}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                        className="w-20 border rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => updateItem(index, 'unit', e.target.value)}
                        placeholder="UNIT"
                        className="w-20 border rounded px-2 py-1"
                      />
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                        className="w-24 border rounded px-2 py-1"
                      />
                      <select
                        value={item.unitPriceCurrency}
                        onChange={(e) => updateItem(index, 'unitPriceCurrency', e.target.value)}
                        className="w-20 border rounded px-2 py-1"
                      >
                        <option value="USD">USD</option>
                        <option value="KRW">KRW</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={item.amount}
                        readOnly
                        className="w-24 border rounded px-2 py-1 bg-gray-50"
                      />
                      <select
                        value={item.amountCurrency}
                        onChange={(e) => updateItem(index, 'amountCurrency', e.target.value)}
                        className="w-20 border rounded px-2 py-1"
                      >
                        <option value="USD">USD</option>
                        <option value="KRW">KRW</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={item.note}
                      onChange={(e) => updateItem(index, 'note', e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border p-2">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Info */}
      <div className="border rounded p-4">
        <h2 className="font-bold mb-3">BANK INFORMATION</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Bank Name"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Bank Address"
            value={formData.bankAddress}
            onChange={(e) => setFormData({ ...formData, bankAddress: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="SWIFT NO"
            value={formData.swiftNo}
            onChange={(e) => setFormData({ ...formData, swiftNo: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Account No"
            value={formData.accountNo}
            onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Account Name"
            value={formData.accountName}
            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-sm font-medium mb-1">Remarks</label>
        <textarea
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="flex-1 bg-green-500 text-white py-3 rounded font-bold">
          Save Invoice
        </button>
        <button
          type="button"
          onClick={() => generateInvoicePDF(formData)}
          className="flex-1 bg-blue-500 text-white py-3 rounded font-bold"
        >
          Download PDF
        </button>
      </div>
    </form>
  )
}
