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

export interface InvoiceData {
  invoiceNo: string
  invoiceDate: string
  customerReferenceNo: string
  customerReferenceDate: string

  sellerName: string
  sellerAddress: string
  sellerContact: string

  soldToName: string
  soldToAddress: string
  soldToContact: string

  shipToName: string
  shipToAddress: string
  shipToContact: string

  termsOfSale: string
  termsOfPayment: string
  currencyOfSettlement: string
  modeOfShipment: string
  billOfLading: string

  packageMarks: string
  totalCommercialValue: string
  miscCharges: string
  totalInvoiceValue: string

  certificationText: string
  signedBy: string
  title: string

  logoUrl: string
  remarks: string

  items: InvoiceItem[]
}

function generateKoreanStylePDF(data: InvoiceData, isProforma = false) {
  const doc = new jsPDF()
  let y = 15

  // Title - centered at top
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const title = 'COMMERCIAL INVOICE'
  doc.text(title, 105, y, { align: 'center' })
  doc.setLineWidth(1)
  doc.line(50, y + 2, 160, y + 2)
  y += 15

  // Top Section: SHIPPER/SELLER and Invoice Info in table format
  doc.setFontSize(9)
  doc.setLineWidth(0.5)

  // Draw outer box
  doc.rect(10, y, 190, 35)

  // Vertical divider
  doc.line(105, y, 105, y + 35)

  // Left side: SHIPPER/SELLER
  doc.setFont('helvetica', 'bold')
  doc.text('SHIPPER/SELLER', 12, y + 5)
  doc.setFont('helvetica', 'normal')
  const sellerLines = doc.splitTextToSize(data.sellerName || '', 85)
  doc.text(sellerLines, 12, y + 12)

  // Right side: NO & DATE OF INVOICE and PAYMENT
  // Horizontal divider for right section
  doc.line(105, y + 17, 200, y + 17)

  doc.setFont('helvetica', 'bold')
  doc.text('NO & DATE OF INVOICE', 107, y + 5)
  doc.setFont('helvetica', 'normal')
  doc.text(data.invoiceNo || '', 107, y + 10)
  doc.text(data.invoiceDate || '', 107, y + 14)

  doc.setFont('helvetica', 'bold')
  doc.text('PAYMENT', 107, y + 22)
  doc.setFont('helvetica', 'normal')
  doc.text(data.termsOfPayment || '', 107, y + 27)

  y += 40

  // CONSIGNEE and BUYER section
  doc.rect(10, y, 190, 40)
  doc.line(105, y, 105, y + 40)

  // Horizontal divider for right section
  doc.line(105, y + 20, 200, y + 20)

  doc.setFont('helvetica', 'bold')
  doc.text('CONSIGNEE', 12, y + 5)
  doc.setFont('helvetica', 'normal')
  const consigneeLines = doc.splitTextToSize(data.soldToName || '', 85)
  doc.text(consigneeLines, 12, y + 12)

  doc.setFont('helvetica', 'bold')
  doc.text('BUYER(if other than consignee)', 107, y + 5)
  doc.text('SAME AS CONSIGNEE', 107, y + 10)

  doc.setFont('helvetica', 'bold')
  doc.text('REMARKS :', 107, y + 25)
  doc.setFont('helvetica', 'normal')
  const remarksLines = doc.splitTextToSize(data.remarks || '', 85)
  doc.text(remarksLines, 107, y + 32)

  y += 45

  // Port of loading / Final destination / Vessel / Sailing
  doc.rect(10, y, 190, 15)
  doc.line(60, y, 60, y + 15)
  doc.line(105, y, 105, y + 15)
  doc.line(145, y, 145, y + 15)
  doc.line(10, y + 7.5, 200, y + 7.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text('Port of loading :', 12, y + 5)
  doc.text('Final destination :', 62, y + 5)
  doc.text('Vessel / Flight :', 107, y + 5)
  doc.text('Sailing on or about', 147, y + 5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(data.modeOfShipment || '', 12, y + 12)
  doc.text(data.shipToName?.split('\n')[0] || '', 62, y + 12)
  doc.text(data.billOfLading || '', 107, y + 12)
  doc.text(data.invoiceDate || '', 147, y + 12)

  y += 20

  // Items Table Header
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')

  const tableY = y
  doc.rect(10, tableY, 20, 8) // Marks and Number of PKGS
  doc.rect(30, tableY, 10, 8) // NO.
  doc.rect(40, tableY, 70, 8) // DESCRIPTION OF GOODS
  doc.rect(110, tableY, 20, 8) // Q'TY(UNIT)
  doc.rect(130, tableY, 25, 8) // U/PRICE
  doc.rect(155, tableY, 25, 8) // AMOUNT
  doc.rect(180, tableY, 20, 8) // NOTE

  doc.text('Marks and', 11, tableY + 3)
  doc.text('Number of PKGS', 11, tableY + 6)
  doc.text('NO.', 33, tableY + 5, { align: 'center' })
  doc.text('DESCRIPTION OF GOODS', 75, tableY + 5, { align: 'center' })
  doc.text('Q\'TY', 120, tableY + 3, { align: 'center' })
  doc.text('(UNIT)', 120, tableY + 6, { align: 'center' })
  doc.text('U/PRICE', 142.5, tableY + 3, { align: 'center' })
  doc.text('(통화)', 142.5, tableY + 6, { align: 'center' })
  doc.text('AMOUNT', 167.5, tableY + 3, { align: 'center' })
  doc.text('(통화)', 167.5, tableY + 6, { align: 'center' })
  doc.text('NOTE', 190, tableY + 5, { align: 'center' })

  y = tableY + 8

  // Items rows
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)

  for (let i = 0; i < Math.max(data.items.length, 11); i++) {
    const rowHeight = 8
    const item = data.items[i]

    doc.rect(10, y, 20, rowHeight)
    doc.rect(30, y, 10, rowHeight)
    doc.rect(40, y, 70, rowHeight)
    doc.rect(110, y, 20, rowHeight)
    doc.rect(130, y, 25, rowHeight)
    doc.rect(155, y, 25, rowHeight)
    doc.rect(180, y, 20, rowHeight)

    if (item) {
      doc.text((i + 1).toString(), 35, y + 5, { align: 'center' })
      const descLines = doc.splitTextToSize(item.description || '', 65)
      doc.text(descLines.slice(0, 2), 42, y + 3)
      doc.text(`${item.quantity} ${item.unit}`, 120, y + 5, { align: 'center' })
      doc.text(item.unitPrice.toFixed(2), 142.5, y + 5, { align: 'center' })
      doc.text(item.amount.toFixed(2), 167.5, y + 5, { align: 'center' })
      doc.text(item.note || '', 181, y + 5)
    } else {
      doc.text((i + 1).toString(), 35, y + 5, { align: 'center' })
      doc.text('-', 120, y + 5, { align: 'center' })
      doc.text('-', 142.5, y + 5, { align: 'center' })
      doc.text('-', 167.5, y + 5, { align: 'center' })
    }

    y += rowHeight
  }

  // TOTAL row
  doc.setFont('helvetica', 'bold')
  doc.rect(10, y, 100, 8)
  doc.rect(110, y, 20, 8)
  doc.rect(130, y, 25, 8)
  doc.rect(155, y, 25, 8)
  doc.rect(180, y, 20, 8)

  doc.text('TOTAL', 55, y + 5, { align: 'center' })
  doc.text('-', 120, y + 5, { align: 'center' })
  doc.text('-', 167.5, y + 5, { align: 'center' })

  y += 13

  // Divider line
  doc.setLineWidth(1)
  for (let i = 0; i < 120; i++) {
    doc.text('/', 10 + (i * 1.5), y)
  }

  y += 8

  // Bank Information
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('::BANK INFORMATION::', 12, y)

  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text('BANK NAME:', 12, y)
  doc.text(data.packageMarks || '', 35, y)
  y += 5
  doc.text('BANK ADDRESS:', 12, y)
  y += 5
  doc.text('SWIFT NO:', 12, y)
  y += 5
  doc.text('ACC NO:', 12, y)
  y += 5
  doc.text('ACC NAME:', 12, y)

  y += 10

  // Signature
  doc.setFont('helvetica', 'bold')
  doc.text('SIGNED BY:', 140, y)
  doc.setFont('helvetica', 'normal')
  doc.line(140, y + 2, 195, y + 2)
  if (data.signedBy) {
    doc.text(data.signedBy, 140, y - 1)
  }

  // Download
  const prefix = isProforma ? 'proforma-invoice' : 'commercial-invoice'
  doc.save(`${prefix}-korean-${data.invoiceNo || 'draft'}.pdf`)
}

export function generateInvoicePDF(data: InvoiceData, isProforma = false, template: 'korean' | 'standard' = 'standard') {
  if (template === 'korean') {
    return generateKoreanStylePDF(data, isProforma)
  }

  const doc = new jsPDF()
  let y = 20

  // Title
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  const title = isProforma ? 'PROFORMA INVOICE' : 'COMMERCIAL INVOICE'
  doc.text(title, 105, y, { align: 'center' })
  doc.line(10, y + 3, 200, y + 3)
  y += 15

  // Exporter/Seller and Invoice Details Section
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bolditalic')
  doc.text('EXPORTER / SELLER', 10, y)

  doc.setFont('helvetica', 'normal')
  const sellerLines = doc.splitTextToSize(data.sellerName || '', 85)
  doc.text(sellerLines, 10, y + 5)

  doc.setFont('helvetica', 'bolditalic')
  doc.text('Invoice Number:', 110, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.invoiceNo || '', 145, y)

  y += 7
  doc.setFont('helvetica', 'bolditalic')
  doc.text('Date:', 110, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.invoiceDate || '', 145, y)

  y += 7
  doc.setFont('helvetica', 'bolditalic')
  doc.text('Currency:', 110, y)
  doc.setFont('helvetica', 'normal')
  doc.text(data.currencyOfSettlement || 'USD', 145, y)

  y += 10
  doc.line(10, y, 200, y)
  y += 7

  // Consignee and Buyer Section
  doc.setFont('helvetica', 'bolditalic')
  doc.text('CONSIGNEE', 10, y)
  doc.text('BUYER (if other than consignee)', 110, y)

  doc.setFont('helvetica', 'normal')
  const consigneeLines = doc.splitTextToSize(data.soldToName || '', 85)
  doc.text(consigneeLines, 10, y + 5)

  const buyerLines = doc.splitTextToSize(data.shipToName || '', 85)
  doc.text(buyerLines, 110, y + 5)

  y += Math.max(consigneeLines.length * 4, buyerLines.length * 4) + 10
  doc.line(10, y, 200, y)
  y += 7

  // Shipping Details
  doc.setFont('helvetica', 'bolditalic')
  doc.text('Country of Origin:', 10, y)
  doc.text('Port of Loading:', 75, y)
  doc.text('Final Destination:', 140, y)

  doc.setFont('helvetica', 'normal')
  doc.text(data.sellerContact || '', 10, y + 5)
  doc.text(data.modeOfShipment || '', 75, y + 5)
  doc.text(data.billOfLading || '', 140, y + 5)

  y += 12
  doc.setFont('helvetica', 'bolditalic')
  doc.text('Terms of Payment:', 10, y)
  doc.text('Terms of Delivery:', 75, y)

  doc.setFont('helvetica', 'normal')
  doc.text(data.termsOfPayment || '', 10, y + 5)
  doc.text(data.termsOfSale || '', 75, y + 5)

  y += 12
  doc.line(10, y, 200, y)
  y += 7

  // Items Table Header
  doc.setFont('helvetica', 'bolditalic')
  doc.text('DESCRIPTION OF GOODS', 10, y)
  y += 7

  doc.setFontSize(8)
  doc.text('No.', 10, y)
  doc.text('Description of Goods', 20, y)
  doc.text('HS Code', 90, y)
  doc.text('Qty', 115, y)
  doc.text('Unit', 130, y)
  doc.text('Unit Price', 150, y)
  doc.text('Amount', 175, y)

  y += 4
  doc.line(10, y, 200, y)
  y += 5

  // Items Table Rows
  doc.setFont('helvetica', 'normal')
  data.items.forEach((item, index) => {
    if (y > 250) {
      doc.addPage()
      y = 20
    }

    doc.text((index + 1).toString(), 10, y)
    const descLines = doc.splitTextToSize(item.description || '', 65)
    doc.text(descLines[0] || '', 20, y)
    doc.text((item as any).hsCode || '', 90, y)
    doc.text(item.quantity.toString(), 115, y)
    doc.text(item.unit || '', 130, y)
    doc.text(item.unitPrice.toFixed(2), 150, y)
    doc.text(item.amount.toFixed(2), 175, y)

    y += 6
  })

  y += 3
  doc.line(10, y, 200, y)
  y += 7

  // Total
  doc.setFont('helvetica', 'bolditalic')
  doc.setFontSize(10)
  doc.text('TOTAL AMOUNT:', 130, y)
  doc.text(`${data.currencyOfSettlement || 'USD'} ${data.totalInvoiceValue || '0.00'}`, 175, y)

  y += 12
  doc.line(10, y, 200, y)
  y += 7

  // Declaration
  if (y > 230) {
    doc.addPage()
    y = 20
  }

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bolditalic')
  doc.text('Declaration', 10, y)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const declarationLines = doc.splitTextToSize(data.certificationText || '', 185)
  doc.text(declarationLines, 10, y + 5)

  y += declarationLines.length * 4 + 12

  // Signature Section
  doc.setFont('helvetica', 'bolditalic')
  doc.setFontSize(9)
  doc.text('Signature', 10, y)
  doc.text('Date', 110, y)

  doc.setFont('helvetica', 'normal')
  y += 5

  if (data.signedBy) {
    doc.text(data.signedBy, 10, y)
  }
  doc.line(10, y + 2, 80, y + 2)

  if (data.invoiceDate) {
    doc.text(data.invoiceDate, 110, y)
  }
  doc.line(110, y + 2, 180, y + 2)

  // Download
  const prefix = isProforma ? 'proforma-invoice' : 'commercial-invoice'
  doc.save(`${prefix}-${data.invoiceNo || 'draft'}.pdf`)
}
