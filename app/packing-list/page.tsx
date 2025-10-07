import PackingListForm from '@/components/packing-list/PackingListForm'
import TemplateSelector from '@/components/TemplateSelector'

export default function PackingList() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <TemplateSelector />
      <PackingListForm />
    </main>
  )
}
