'use client'

import { useState } from 'react'

interface InvoiceItem {
  no: number
  description: string
  hsCode: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

interface ProformaInvoiceFormProps {
  formData: any
  setFormData: (data: any) => void
  onSubmit: (e: React.FormEvent) => void
  onPDFGeneration: () => void
}

export default function ProformaInvoiceForm({
  formData,
  setFormData,
  onSubmit,
  onPDFGeneration
}: ProformaInvoiceFormProps) {
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, {
        no: formData.items.length + 1,
        description: '',
        hsCode: '',
        quantity: 0,
        unit: '',
        unitPrice: 0,
        amount: 0
      }]
    })
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }

    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice
    }

    const totalAmount = newItems.reduce((sum, item) => sum + (item.amount || 0), 0)

    setFormData({
      ...formData,
      items: newItems,
      totalAmount: totalAmount.toFixed(2)
    })
  }

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  return (
    <form onSubmit={onSubmit} className="bg-white max-w-7xl mx-auto shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">PROFORMA INVOICE</h1>
      </div>

      {/* Exporter and Invoice Details */}
      <div className="grid grid-cols-2 border-b-2 border-gray-300">
        {/* Exporter/Seller */}
        <div className="border-r-2 border-gray-300 p-4">
          <div className="font-bold text-blue-600 mb-2">EXPORTER / SELLER *</div>
          <textarea
            value={formData.exporterName}
            onChange={(e) => setFormData({ ...formData, exporterName: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={4}
            placeholder="Company Name&#10;Address&#10;City, Postal Code, Country&#10;Tel: / Email:"
          />
        </div>

        {/* Invoice Details */}
        <div className="p-4">
          <div className="mb-3">
            <label className="block font-semibold text-sm mb-1">Invoice Number *</label>
            <input
              type="text"
              value={formData.invoiceNo}
              onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              placeholder="INV-2025-001"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold text-sm mb-1">Date *</label>
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="KRW">KRW - Korean Won</option>
            </select>
          </div>
        </div>
      </div>

      {/* Consignee and Buyer */}
      <div className="grid grid-cols-2 border-b-2 border-gray-300">
        {/* Consignee */}
        <div className="border-r-2 border-gray-300 p-4">
          <div className="font-bold text-blue-600 mb-2">CONSIGNEE *</div>
          <textarea
            value={formData.consigneeName}
            onChange={(e) => setFormData({ ...formData, consigneeName: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={4}
            placeholder="Company Name&#10;Address&#10;City, Postal Code, Country&#10;Tel: / Email:"
          />
        </div>

        {/* Buyer */}
        <div className="p-4">
          <div className="font-bold text-blue-600 mb-2">BUYER (if other than consignee)</div>
          <textarea
            value={formData.buyerName}
            onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={4}
            placeholder="Leave blank if same as consignee"
          />
        </div>
      </div>

      {/* Shipping Details */}
      <div className="grid grid-cols-3 border-b-2 border-gray-300">
        <div className="border-r border-gray-300 p-4">
          <label className="block font-semibold text-sm mb-1">Country of Origin *</label>
          <input
            type="text"
            value={formData.countryOfOrigin}
            onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="South Korea"
          />
        </div>
        <div className="border-r border-gray-300 p-4">
          <label className="block font-semibold text-sm mb-1">Port of Loading *</label>
          <input
            type="text"
            value={formData.portOfLoading}
            onChange={(e) => setFormData({ ...formData, portOfLoading: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="Busan Port"
          />
        </div>
        <div className="p-4">
          <label className="block font-semibold text-sm mb-1">Final Destination *</label>
          <input
            type="text"
            value={formData.finalDestination}
            onChange={(e) => setFormData({ ...formData, finalDestination: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="Los Angeles Port"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 border-b-2 border-gray-300">
        <div className="border-r border-gray-300 p-4">
          <label className="block font-semibold text-sm mb-1">Terms of Payment *</label>
          <input
            type="text"
            value={formData.termsOfPayment}
            onChange={(e) => setFormData({ ...formData, termsOfPayment: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            placeholder="T/T, L/C, etc."
          />
        </div>
        <div className="p-4">
          <label className="block font-semibold text-sm mb-1">Terms of Delivery (Incoterms) *</label>
          <select
            value={formData.termsOfDelivery}
            onChange={(e) => setFormData({ ...formData, termsOfDelivery: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
          >
            <option value="">Select Incoterm</option>
            <option value="EXW">EXW - Ex Works</option>
            <option value="FOB">FOB - Free on Board</option>
            <option value="CIF">CIF - Cost, Insurance and Freight</option>
            <option value="CFR">CFR - Cost and Freight</option>
            <option value="DDP">DDP - Delivered Duty Paid</option>
            <option value="DDU">DDU - Delivered Duty Unpaid</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-blue-600">DESCRIPTION OF GOODS</h2>
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
          >
            + Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 w-12">No.</th>
                <th className="border border-gray-300 p-2">Description of Goods</th>
                <th className="border border-gray-300 p-2 w-24">HS Code</th>
                <th className="border border-gray-300 p-2 w-20">Qty</th>
                <th className="border border-gray-300 p-2 w-20">Unit</th>
                <th className="border border-gray-300 p-2 w-24">Unit Price</th>
                <th className="border border-gray-300 p-2 w-24">Amount</th>
                <th className="border border-gray-300 p-2 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item: InvoiceItem, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full border-0 focus:outline-none resize-none"
                      rows={2}
                      placeholder="Product description..."
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={item.hsCode}
                      onChange={(e) => updateItem(index, 'hsCode', e.target.value)}
                      className="w-full border-0 focus:outline-none text-center"
                      placeholder="HS Code"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full border-0 focus:outline-none text-center"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => updateItem(index, 'unit', e.target.value)}
                      className="w-full border-0 focus:outline-none text-center"
                      placeholder="PCS"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full border-0 focus:outline-none text-right"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.amount.toFixed(2)}
                      readOnly
                      className="w-full border-0 focus:outline-none text-right bg-gray-50 font-semibold"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold">
                <td colSpan={6} className="border border-gray-300 p-2 text-right">TOTAL AMOUNT:</td>
                <td className="border border-gray-300 p-2 text-right text-lg text-blue-600">
                  {formData.currency} {formData.totalAmount || '0.00'}
                </td>
                <td className="border border-gray-300"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Declaration and Signature */}
      <div className="border-t-2 border-gray-300 p-4 bg-gray-50">
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Declaration</label>
          <textarea
            value={formData.declaration}
            onChange={(e) => setFormData({ ...formData, declaration: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={2}
            placeholder="I declare that all the information contained in this invoice is true and correct..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Signature</label>
            <input
              type="text"
              value={formData.signatureName}
              onChange={(e) => setFormData({ ...formData, signatureName: e.target.value })}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              placeholder="Enter name for signature"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Date</label>
            <input
              type="date"
              value={formData.signatureDate}
              onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white flex gap-4 border-t-2 border-gray-300">
        <button
          type="button"
          onClick={onPDFGeneration}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          Download PDF
        </button>
      </div>
    </form>
  )
}
