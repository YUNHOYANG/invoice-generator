'use client'

import { useState } from 'react'

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

interface KoreanInvoiceFormProps {
  formData: any
  setFormData: (data: any) => void
  onSubmit: (e: React.FormEvent) => void
  onPDFGeneration: () => void
  isProforma?: boolean
}

export default function KoreanInvoiceForm({
  formData,
  setFormData,
  onSubmit,
  onPDFGeneration,
  isProforma = false
}: KoreanInvoiceFormProps) {
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

    const totalCommercialValue = newItems.reduce((sum, item) => sum + (item.amount || 0), 0)
    const miscCharges = parseFloat(formData.miscCharges) || 0
    const totalInvoiceValue = totalCommercialValue + miscCharges

    setFormData({
      ...formData,
      items: newItems,
      totalCommercialValue: totalCommercialValue.toFixed(2),
      totalInvoiceValue: totalInvoiceValue.toFixed(2)
    })
  }

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, items: newItems })
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border-2 border-black">
      {/* Title */}
      <div className="border-b-2 border-black p-4 text-center">
        <h1 className="text-2xl font-bold underline">COMMERCIAL INVOICE</h1>
      </div>

      {/* SHIPPER/SELLER and Invoice Info Section */}
      <div className="grid grid-cols-2 border-b-2 border-black">
        {/* Left: SHIPPER/SELLER */}
        <div className="border-r-2 border-black p-3">
          <div className="font-bold mb-2">SHIPPER/SELLER</div>
          <textarea
            value={formData.sellerName}
            onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
            className="w-full border-0 focus:outline-none resize-none"
            rows={5}
            placeholder="Shipper/Seller information"
          />
        </div>

        {/* Right: NO & DATE OF INVOICE and PAYMENT */}
        <div className="p-3">
          <div className="border-b border-black pb-3 mb-3">
            <div className="font-bold mb-2">NO & DATE OF INVOICE</div>
            <input
              type="text"
              value={formData.invoiceNo}
              onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
              className="w-full border-b border-gray-300 focus:outline-none mb-2"
              placeholder="Invoice Number"
            />
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
              className="w-full border-b border-gray-300 focus:outline-none"
            />
          </div>
          <div>
            <div className="font-bold mb-2">PAYMENT</div>
            <input
              type="text"
              value={formData.termsOfPayment}
              onChange={(e) => setFormData({ ...formData, termsOfPayment: e.target.value })}
              className="w-full border-b border-gray-300 focus:outline-none"
              placeholder="Payment terms"
            />
          </div>
        </div>
      </div>

      {/* CONSIGNEE and BUYER Section */}
      <div className="grid grid-cols-2 border-b-2 border-black">
        {/* Left: CONSIGNEE */}
        <div className="border-r-2 border-black p-3">
          <div className="font-bold mb-2">CONSIGNEE</div>
          <textarea
            value={formData.soldToName}
            onChange={(e) => setFormData({ ...formData, soldToName: e.target.value })}
            className="w-full border-0 focus:outline-none resize-none"
            rows={5}
            placeholder="Consignee information"
          />
        </div>

        {/* Right: BUYER and REMARKS */}
        <div className="p-3">
          <div className="border-b border-black pb-3 mb-3">
            <div className="font-bold mb-2">BUYER(if other than consignee)</div>
            <div className="text-sm">SAME AS CONSIGNEE</div>
          </div>
          <div>
            <div className="font-bold mb-2">REMARKS :</div>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              className="w-full border-0 focus:outline-none resize-none"
              rows={3}
              placeholder="Additional remarks"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="grid grid-cols-4 border-b-2 border-black text-sm">
        <div className="border-r border-black p-2">
          <div className="font-bold mb-1 text-xs">Port of loading :</div>
          <input
            type="text"
            value={formData.modeOfShipment}
            onChange={(e) => setFormData({ ...formData, modeOfShipment: e.target.value })}
            className="w-full border-0 focus:outline-none text-xs"
            placeholder="Port"
          />
        </div>
        <div className="border-r border-black p-2">
          <div className="font-bold mb-1 text-xs">Final destination :</div>
          <input
            type="text"
            value={formData.shipToName?.split('\n')[0] || ''}
            onChange={(e) => setFormData({ ...formData, shipToName: e.target.value })}
            className="w-full border-0 focus:outline-none text-xs"
            placeholder="Destination"
          />
        </div>
        <div className="border-r border-black p-2">
          <div className="font-bold mb-1 text-xs">Vessel / Flight :</div>
          <input
            type="text"
            value={formData.billOfLading}
            onChange={(e) => setFormData({ ...formData, billOfLading: e.target.value })}
            className="w-full border-0 focus:outline-none text-xs"
            placeholder="Vessel/Flight"
          />
        </div>
        <div className="p-2">
          <div className="font-bold mb-1 text-xs">Sailing on or about</div>
          <input
            type="date"
            value={formData.invoiceDate}
            onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
            className="w-full border-0 focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="border-b-2 border-black">
        <div className="flex justify-end p-2">
          <button type="button" onClick={addItem} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
            + Add Row
          </button>
        </div>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-t border-black bg-gray-50">
              <th className="border-r border-black p-2 w-16">Marks and<br/>Number of PKGS</th>
              <th className="border-r border-black p-2 w-12">NO.</th>
              <th className="border-r border-black p-2">DESCRIPTION OF GOODS</th>
              <th className="border-r border-black p-2 w-24">Q'TY<br/>(UNIT)</th>
              <th className="border-r border-black p-2 w-24">U/PRICE<br/>(통화)</th>
              <th className="border-r border-black p-2 w-24">AMOUNT<br/>(통화)</th>
              <th className="border-r border-black p-2 w-20">NOTE</th>
              <th className="p-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item: InvoiceItem, index: number) => (
              <tr key={index} className="border-t border-black">
                <td className="border-r border-black p-1"></td>
                <td className="border-r border-black p-1 text-center">{index + 1}</td>
                <td className="border-r border-black p-1">
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full border-0 focus:outline-none resize-none text-xs"
                    rows={2}
                  />
                </td>
                <td className="border-r border-black p-1">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full border-0 focus:outline-none text-center text-xs"
                  />
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                    className="w-full border-0 focus:outline-none text-center text-xs mt-1"
                    placeholder="Unit"
                  />
                </td>
                <td className="border-r border-black p-1">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full border-0 focus:outline-none text-right text-xs"
                  />
                </td>
                <td className="border-r border-black p-1">
                  <input
                    type="number"
                    value={item.amount.toFixed(2)}
                    readOnly
                    className="w-full border-0 focus:outline-none text-right bg-gray-50 text-xs"
                  />
                </td>
                <td className="border-r border-black p-1">
                  <input
                    type="text"
                    value={item.note}
                    onChange={(e) => updateItem(index, 'note', e.target.value)}
                    className="w-full border-0 focus:outline-none text-xs"
                  />
                </td>
                <td className="p-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {/* TOTAL Row */}
            <tr className="border-t-2 border-black font-bold bg-gray-50">
              <td className="border-r border-black p-2" colSpan={4}>TOTAL</td>
              <td className="border-r border-black p-2 text-center">-</td>
              <td className="border-r border-black p-2 text-right">{formData.totalCommercialValue || '0.00'}</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bank Information */}
      <div className="border-b-2 border-black p-4">
        <div className="text-center mb-2">
          <div className="inline-block border-t-2 border-b-2 border-black px-4 py-1 font-bold">
            ::BANK INFORMATION::
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-bold">BANK NAME:</span>
            <input
              type="text"
              value={formData.packageMarks}
              onChange={(e) => setFormData({ ...formData, packageMarks: e.target.value })}
              className="ml-2 border-b border-gray-300 focus:outline-none flex-1"
            />
          </div>
          <div>
            <span className="font-bold">BANK ADDRESS:</span>
            <input
              type="text"
              className="ml-2 border-b border-gray-300 focus:outline-none flex-1"
            />
          </div>
          <div>
            <span className="font-bold">SWIFT NO:</span>
            <input
              type="text"
              className="ml-2 border-b border-gray-300 focus:outline-none flex-1"
            />
          </div>
          <div>
            <span className="font-bold">ACC NO:</span>
            <input
              type="text"
              className="ml-2 border-b border-gray-300 focus:outline-none flex-1"
            />
          </div>
          <div>
            <span className="font-bold">ACC NAME:</span>
            <input
              type="text"
              className="ml-2 border-b border-gray-300 focus:outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="p-4">
        <div className="flex justify-end">
          <div className="w-64">
            <div className="font-bold mb-2">SIGNED BY:</div>
            <input
              type="text"
              value={formData.signedBy}
              onChange={(e) => setFormData({ ...formData, signedBy: e.target.value })}
              className="w-full border-b-2 border-black focus:outline-none pb-1"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 flex gap-4">
        <button type="submit" className="flex-1 bg-green-500 text-white py-3 rounded font-bold hover:bg-green-600 transition">
          Save Invoice
        </button>
        <button
          type="button"
          onClick={onPDFGeneration}
          className="flex-1 bg-blue-500 text-white py-3 rounded font-bold hover:bg-blue-600 transition"
        >
          Download PDF
        </button>
      </div>
    </form>
  )
}
