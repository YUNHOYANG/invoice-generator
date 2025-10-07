import InvoiceForm from '@/components/invoice/InvoiceForm'
import TemplateSelector from '@/components/TemplateSelector'

export default function ProformaInvoice() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <TemplateSelector />
      <InvoiceForm isProforma={true} />
    </main>
  )
}
