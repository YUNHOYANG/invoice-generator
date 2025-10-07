'use client'

import { useState } from 'react'
import { generatePackingListPDF } from '@/lib/packingListGenerator'

interface PackingItem {
  no: number
  productCode: string
  description: string
  quantity: number
  packageType: string
  numberOfPackages: number
  netWeight: number
  grossWeight: number
  measurements: string
}

interface PackingListData {
  exporterName: string
  exporterAddress: string
  exporterPhone: string
  exporterContact: string

  consigneeName: string
  consigneeAddress: string
  consigneePhone: string
  consigneeContact: string

  invoiceNo: string
  invoiceDate: string
  billOfLading: string
  purchaseOrderNo: string

  methodOfDispatch: string
  shipmentType: string
  countryOfOrigin: string
  finalDestination: string
  vesselName: string
  voyageNumber: string
  portOfLoading: string
  departureDate: string
  portOfDischarge: string

  signedBy: string
  companyStamp: string

  items: PackingItem[]
}

export default function PackingListForm() {
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const [formData, setFormData] = useState<PackingListData>({
    exporterName: '',
    exporterAddress: '',
    exporterPhone: '',
    exporterContact: '',
    consigneeName: '',
    consigneeAddress: '',
    consigneePhone: '',
    consigneeContact: '',
    invoiceNo: '',
    invoiceDate: getTodayDate(),
    billOfLading: '',
    purchaseOrderNo: '',
    methodOfDispatch: '',
    shipmentType: '',
    countryOfOrigin: '',
    finalDestination: '',
    vesselName: '',
    voyageNumber: '',
    portOfLoading: '',
    departureDate: getTodayDate(),
    portOfDischarge: '',
    signedBy: '',
    companyStamp: '',
    items: [
      {
        no: 1,
        productCode: '',
        description: '',
        quantity: 0,
        packageType: '',
        numberOfPackages: 0,
        netWeight: 0,
        grossWeight: 0,
        measurements: ''
      }
    ]
  })

  const handleChange = (field: keyof PackingListData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleItemChange = (index: number, field: keyof PackingItem, value: string | number) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData(prev => ({ ...prev, items: newItems }))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          no: prev.items.length + 1,
          productCode: '',
          description: '',
          quantity: 0,
          packageType: '',
          numberOfPackages: 0,
          netWeight: 0,
          grossWeight: 0,
          measurements: ''
        }
      ]
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index)
      const renumberedItems = newItems.map((item, i) => ({ ...item, no: i + 1 }))
      setFormData(prev => ({ ...prev, items: renumberedItems }))
    }
  }

  const handlePDFGeneration = () => {
    // Validate required fields
    const missingFields = []

    if (!formData.exporterName?.trim()) missingFields.push('Exporter Company Name')
    if (!formData.consigneeName?.trim()) missingFields.push('Consignee Company Name')
    if (!formData.invoiceNo?.trim()) missingFields.push('Invoice Number')
    if (!formData.invoiceDate) missingFields.push('Invoice Date')
    if (!formData.methodOfDispatch?.trim()) missingFields.push('Method of Dispatch')
    if (!formData.countryOfOrigin?.trim()) missingFields.push('Country of Origin')
    if (!formData.finalDestination?.trim()) missingFields.push('Final Destination')

    // Check if at least one item has description and quantity
    const hasValidItems = formData.items.some((item) =>
      item.description?.trim() && item.quantity > 0
    )
    if (!hasValidItems) missingFields.push('At least one item with description and quantity')

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n\n${missingFields.map(f => `• ${f}`).join('\n')}`)
      return
    }

    generatePackingListPDF(formData)
  }

  const getTotalPackages = () => {
    return formData.items.reduce((sum, item) => sum + (item.numberOfPackages || 0), 0)
  }

  const getTotalNetWeight = () => {
    return formData.items.reduce((sum, item) => sum + (item.netWeight || 0), 0)
  }

  const getTotalGrossWeight = () => {
    return formData.items.reduce((sum, item) => sum + (item.grossWeight || 0), 0)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">PACKING LIST</h1>
        </div>

        <div className="p-8">

        {/* Exporter Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-600">Exporter Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={formData.exporterName}
                onChange={(e) => handleChange('exporterName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={formData.exporterPhone}
                onChange={(e) => handleChange('exporterPhone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.exporterAddress}
                onChange={(e) => handleChange('exporterAddress', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.exporterContact}
                onChange={(e) => handleChange('exporterContact', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Consignee Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-600">Consignee Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={formData.consigneeName}
                onChange={(e) => handleChange('consigneeName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={formData.consigneePhone}
                onChange={(e) => handleChange('consigneePhone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.consigneeAddress}
                onChange={(e) => handleChange('consigneeAddress', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.consigneeContact}
                onChange={(e) => handleChange('consigneeContact', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Reference Numbers */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-600">Reference Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number *</label>
              <input
                type="text"
                value={formData.invoiceNo}
                onChange={(e) => handleChange('invoiceNo', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date *</label>
              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => handleChange('invoiceDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bill of Lading</label>
              <input
                type="text"
                value={formData.billOfLading}
                onChange={(e) => handleChange('billOfLading', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Order Number</label>
              <input
                type="text"
                value={formData.purchaseOrderNo}
                onChange={(e) => handleChange('purchaseOrderNo', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-600">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Method of Dispatch *</label>
              <select
                value={formData.methodOfDispatch}
                onChange={(e) => handleChange('methodOfDispatch', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select...</option>
                <option value="Sea Freight">Sea Freight</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Road">Road</option>
                <option value="Rail">Rail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipment Type</label>
              <select
                value={formData.shipmentType}
                onChange={(e) => handleChange('shipmentType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select...</option>
                <option value="FCL">FCL (Full Container Load)</option>
                <option value="LCL">LCL (Less than Container Load)</option>
                <option value="Breakbulk">Breakbulk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin *</label>
              <input
                type="text"
                value={formData.countryOfOrigin}
                onChange={(e) => handleChange('countryOfOrigin', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Final Destination *</label>
              <input
                type="text"
                value={formData.finalDestination}
                onChange={(e) => handleChange('finalDestination', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vessel/Flight Name</label>
              <input
                type="text"
                value={formData.vesselName}
                onChange={(e) => handleChange('vesselName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voyage Number</label>
              <input
                type="text"
                value={formData.voyageNumber}
                onChange={(e) => handleChange('voyageNumber', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Port of Loading</label>
              <input
                type="text"
                value={formData.portOfLoading}
                onChange={(e) => handleChange('portOfLoading', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleChange('departureDate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Port of Discharge</label>
              <input
                type="text"
                value={formData.portOfDischarge}
                onChange={(e) => handleChange('portOfDischarge', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-blue-600">Package Details</h2>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-sm">No.</th>
                  <th className="border border-gray-300 p-2 text-sm">Product Code</th>
                  <th className="border border-gray-300 p-2 text-sm">Description</th>
                  <th className="border border-gray-300 p-2 text-sm">Quantity</th>
                  <th className="border border-gray-300 p-2 text-sm">Package Type</th>
                  <th className="border border-gray-300 p-2 text-sm">No. of Packages</th>
                  <th className="border border-gray-300 p-2 text-sm">Net Weight (kg)</th>
                  <th className="border border-gray-300 p-2 text-sm">Gross Weight (kg)</th>
                  <th className="border border-gray-300 p-2 text-sm">Measurements (m³)</th>
                  <th className="border border-gray-300 p-2 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-1 text-center">{item.no}</td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={item.productCode}
                        onChange={(e) => handleItemChange(index, 'productCode', e.target.value)}
                        className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-20 p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={item.packageType}
                        onChange={(e) => handleItemChange(index, 'packageType', e.target.value)}
                        placeholder="Carton/Pallet/Box"
                        className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        value={item.numberOfPackages}
                        onChange={(e) => handleItemChange(index, 'numberOfPackages', parseFloat(e.target.value) || 0)}
                        className="w-20 p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        value={item.netWeight}
                        onChange={(e) => handleItemChange(index, 'netWeight', parseFloat(e.target.value) || 0)}
                        className="w-24 p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        value={item.grossWeight}
                        onChange={(e) => handleItemChange(index, 'grossWeight', parseFloat(e.target.value) || 0)}
                        className="w-24 p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        value={item.measurements}
                        onChange={(e) => handleItemChange(index, 'measurements', e.target.value)}
                        className="w-24 p-1 border-0 focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        disabled={formData.items.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td colSpan={5} className="border border-gray-300 p-2 text-right">TOTAL:</td>
                  <td className="border border-gray-300 p-2 text-center">{getTotalPackages()}</td>
                  <td className="border border-gray-300 p-2 text-center">{getTotalNetWeight().toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-center">{getTotalGrossWeight().toFixed(2)}</td>
                  <td colSpan={2} className="border border-gray-300 p-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Signature */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-600">Authorization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Signed By</label>
              <input
                type="text"
                value={formData.signedBy}
                onChange={(e) => handleChange('signedBy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Stamp</label>
              <input
                type="text"
                value={formData.companyStamp}
                onChange={(e) => handleChange('companyStamp', e.target.value)}
                placeholder="Company name for stamp"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white flex gap-4 border-t-2 border-gray-300">
          <button
            type="button"
            onClick={handlePDFGeneration}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
          >
            Download PDF
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
