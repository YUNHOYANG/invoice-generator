import TemplateSelector from '@/components/TemplateSelector'
import UnitConverterContent from '@/components/unit-converter/UnitConverterContent'

export default function UnitConverter() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <TemplateSelector />
      <UnitConverterContent />
    </main>
  )
}
