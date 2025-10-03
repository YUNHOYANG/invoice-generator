import jsPDF from 'jspdf'

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

interface InvoiceData {
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

export function generateInvoicePDF(data: InvoiceData) {
  const doc = new jsPDF()
  let y = 20

  // Logo
  if (data.logoUrl) {
    try {
      doc.addImage(data.logoUrl, 'PNG', 10, y, 50, 20)
    } catch (e) {
      console.error('Logo error:', e)
    }
  }

  // Title
  doc.setFontSize(20)
  doc.text('COMMERCIAL INVOICE', 105, y + 10, { align: 'center' })
  y += 30

  // Invoice Info
  doc.setFontSize(10)
  doc.text(`Invoice No: ${data.invoiceNo}`, 10, y)
  doc.text(`Date: ${data.invoiceDate}`, 150, y)
  y += 7
  doc.text(`Payment: ${data.paymentTerms}`, 10, y)
  doc.text(`Currency: ${data.currency}`, 150, y)
  y += 15

  // Shipper
  doc.setFontSize(12)
  doc.text('SHIPPER/SELLER', 10, y)
  doc.setFontSize(10)
  y += 7
  doc.text(data.shipperName || '', 10, y)
  y += 5
  const shipperLines = doc.splitTextToSize(data.shipperAddress || '', 80)
  doc.text(shipperLines, 10, y)
  y += shipperLines.length * 5
  doc.text(data.shipperContact || '', 10, y)
  y += 15

  // Consignee
  doc.setFontSize(12)
  doc.text('CONSIGNEE', 10, y)
  doc.setFontSize(10)
  y += 7
  doc.text(data.consigneeName || '', 10, y)
  y += 5
  const consigneeLines = doc.splitTextToSize(data.consigneeAddress || '', 80)
  doc.text(consigneeLines, 10, y)
  y += consigneeLines.length * 5
  doc.text(data.consigneeContact || '', 10, y)
  y += 15

  // Shipping info
  doc.text(`Port of Loading: ${data.portOfLoading}`, 10, y)
  doc.text(`Final Destination: ${data.finalDestination}`, 110, y)
  y += 7
  doc.text(`Vessel/Flight: ${data.vesselFlight}`, 10, y)
  doc.text(`Sailing Date: ${data.sailingDate}`, 110, y)
  y += 15

  // Items Table
  doc.setFontSize(12)
  doc.text('ITEMS', 10, y)
  y += 7

  // Table headers
  doc.setFontSize(9)
  doc.text('NO', 10, y)
  doc.text('DESCRIPTION', 25, y)
  doc.text('QTY', 80, y)
  doc.text('UNIT', 95, y)
  doc.text('U/PRICE', 115, y)
  doc.text('AMOUNT', 145, y)
  doc.text('NOTE', 175, y)
  y += 5
  doc.line(10, y, 200, y)
  y += 5

  // Table rows
  data.items.forEach((item) => {
    if (y > 270) {
      doc.addPage()
      y = 20
    }
    doc.text(item.no.toString(), 10, y)
    const descLines = doc.splitTextToSize(item.description || '', 50)
    doc.text(descLines, 25, y)
    doc.text(`${item.quantity}`, 80, y)
    doc.text(item.unit || '', 95, y)
    doc.text(`${item.unitPrice} ${item.unitPriceCurrency}`, 115, y)
    doc.text(`${item.amount} ${item.amountCurrency}`, 145, y)
    doc.text(item.note || '', 175, y)
    y += Math.max(descLines.length * 5, 7)
  })

  y += 5
  doc.line(10, y, 200, y)
  y += 10

  // Total
  const total = data.items.reduce((sum, item) => sum + item.amount, 0)
  doc.setFontSize(12)
  doc.text(`TOTAL: ${total} ${data.currency}`, 145, y)
  y += 15

  // Bank Info
  if (y > 250) {
    doc.addPage()
    y = 20
  }
  doc.setFontSize(12)
  doc.text('BANK INFORMATION', 10, y)
  doc.setFontSize(10)
  y += 7
  doc.text(`Bank Name: ${data.bankName}`, 10, y)
  y += 5
  doc.text(`Bank Address: ${data.bankAddress}`, 10, y)
  y += 5
  doc.text(`SWIFT: ${data.swiftNo}`, 10, y)
  y += 5
  doc.text(`Account No: ${data.accountNo}`, 10, y)
  y += 5
  doc.text(`Account Name: ${data.accountName}`, 10, y)
  y += 15

  // Remarks
  if (data.remarks) {
    doc.text(`Remarks: ${data.remarks}`, 10, y)
  }

  // Download
  doc.save(`invoice-${data.invoiceNo || 'draft'}.pdf`)
}
