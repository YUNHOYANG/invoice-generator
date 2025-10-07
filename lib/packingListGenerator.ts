import jsPDF from 'jspdf'

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

export function generatePackingListPDF(data: PackingListData) {
  const doc = new jsPDF()
  let y = 20

  // Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('PACKING LIST', 105, y, { align: 'center' })
  doc.line(10, y + 3, 200, y + 3)
  y += 15

  // Exporter Information
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bolditalic')
  doc.text('EXPORTER', 10, y)
  doc.setFont('helvetica', 'normal')
  const exporterLines = doc.splitTextToSize(data.exporterName || '', 85)
  doc.text(exporterLines, 10, y + 5)
  const exporterAddressLines = doc.splitTextToSize(data.exporterAddress || '', 85)
  doc.text(exporterAddressLines, 10, y + 10)
  if (data.exporterPhone) {
    doc.text(`Tel: ${data.exporterPhone}`, 10, y + 15 + exporterAddressLines.length * 4)
  }

  // Reference Numbers (Right side)
  doc.setFont('helvetica', 'bolditalic')
  doc.text('INVOICE NO.', 110, y)
  doc.text('DATE', 160, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.invoiceNo || '', 110, y + 5)
  doc.text(data.invoiceDate || '', 160, y + 5)

  y += 15
  doc.setFont('helvetica', 'bolditalic')
  doc.text('BILL OF LADING', 110, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.billOfLading || '', 110, y + 5)

  y += 15
  doc.setFont('helvetica', 'bolditalic')
  doc.text('PURCHASE ORDER NO.', 110, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.purchaseOrderNo || '', 110, y + 5)

  y += 15
  doc.line(10, y, 200, y)
  y += 7

  // Consignee Information
  doc.setFont('helvetica', 'bolditalic')
  doc.text('CONSIGNEE', 10, y)
  doc.setFont('helvetica', 'normal')
  const consigneeLines = doc.splitTextToSize(data.consigneeName || '', 85)
  doc.text(consigneeLines, 10, y + 5)
  const consigneeAddressLines = doc.splitTextToSize(data.consigneeAddress || '', 85)
  doc.text(consigneeAddressLines, 10, y + 10)
  if (data.consigneePhone) {
    doc.text(`Tel: ${data.consigneePhone}`, 10, y + 15 + consigneeAddressLines.length * 4)
  }

  y += 25
  doc.line(10, y, 200, y)
  y += 7

  // Shipping Information
  doc.setFont('helvetica', 'bolditalic')
  doc.text('METHOD OF DISPATCH', 10, y)
  doc.text('SHIPMENT TYPE', 70, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.methodOfDispatch || '', 10, y + 5)
  doc.text(data.shipmentType || '', 70, y + 5)

  y += 12
  doc.setFont('helvetica', 'bolditalic')
  doc.text('COUNTRY OF ORIGIN', 10, y)
  doc.text('FINAL DESTINATION', 70, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.countryOfOrigin || '', 10, y + 5)
  doc.text(data.finalDestination || '', 70, y + 5)

  y += 12
  doc.setFont('helvetica', 'bolditalic')
  doc.text('VESSEL/FLIGHT', 10, y)
  doc.text('VOYAGE NO.', 70, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.vesselName || '', 10, y + 5)
  doc.text(data.voyageNumber || '', 70, y + 5)

  y += 12
  doc.setFont('helvetica', 'bolditalic')
  doc.text('PORT OF LOADING', 10, y)
  doc.text('DEPARTURE DATE', 70, y)
  doc.text('PORT OF DISCHARGE', 130, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.portOfLoading || '', 10, y + 5)
  doc.text(data.departureDate || '', 70, y + 5)
  doc.text(data.portOfDischarge || '', 130, y + 5)

  y += 15
  doc.line(10, y, 200, y)
  y += 7

  // Items Table Header
  doc.setFont('helvetica', 'bolditalic')
  doc.setFontSize(7)
  doc.text('No.', 12, y)
  doc.text('Code', 20, y)
  doc.text('Description', 40, y)
  doc.text('Qty', 80, y)
  doc.text('Pkg Type', 95, y)
  doc.text('No. Pkg', 115, y)
  doc.text('Net Wt', 135, y)
  doc.text('Gross Wt', 155, y)
  doc.text('M³', 178, y)
  y += 4
  doc.line(10, y, 200, y)
  y += 5

  // Items
  doc.setFont('helvetica', 'normal')
  let totalPackages = 0
  let totalNetWeight = 0
  let totalGrossWeight = 0

  data.items.forEach((item) => {
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    doc.text(item.no.toString(), 12, y)
    doc.text(item.productCode || '', 20, y)
    const descLines = doc.splitTextToSize(item.description || '', 35)
    doc.text(descLines, 40, y)
    doc.text(item.quantity.toString(), 80, y)
    doc.text(item.packageType || '', 95, y)
    doc.text(item.numberOfPackages.toString(), 115, y)
    doc.text(item.netWeight.toFixed(2), 135, y)
    doc.text(item.grossWeight.toFixed(2), 155, y)
    doc.text(item.measurements || '', 178, y)

    totalPackages += item.numberOfPackages
    totalNetWeight += item.netWeight
    totalGrossWeight += item.grossWeight

    y += Math.max(descLines.length * 4, 6)
  })

  y += 3
  doc.line(10, y, 200, y)
  y += 5

  // Totals
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL', 80, y)
  doc.text(totalPackages.toString(), 115, y)
  doc.text(totalNetWeight.toFixed(2), 135, y)
  doc.text(totalGrossWeight.toFixed(2), 155, y)

  y += 15
  doc.line(10, y, 200, y)
  y += 10

  // Signature
  if (y > 240) {
    doc.addPage()
    y = 20
  }

  doc.setFont('helvetica', 'bolditalic')
  doc.setFontSize(9)
  doc.text('AUTHORIZED SIGNATURE', 10, y)
  y += 5
  doc.line(10, y, 100, y)
  doc.setFont('helvetica', 'normal')
  if (data.signedBy) {
    doc.text(data.signedBy, 10, y - 2)
  }

  y += 10
  if (data.companyStamp) {
    doc.setFont('helvetica', 'italic')
    doc.text(`Company Stamp: ${data.companyStamp}`, 10, y)
  }

  // Download
  doc.save(`packing-list-${data.invoiceNo || 'draft'}.pdf`)
}
