'use client'

interface InvoiceTemplateSelectorProps {
  selectedTemplate: 'korean' | 'standard'
  onTemplateChange: (template: 'korean' | 'standard') => void
}

export default function InvoiceTemplateSelector({ selectedTemplate, onTemplateChange }: InvoiceTemplateSelectorProps) {
  return (
    <div className="mb-4 p-4 bg-gray-50 border-2 border-gray-300 rounded">
      <label className="block font-bold mb-2">인보이스 템플릿 선택:</label>
      <div className="flex gap-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="template"
            value="korean"
            checked={selectedTemplate === 'korean'}
            onChange={(e) => onTemplateChange(e.target.value as 'korean' | 'standard')}
            className="mr-2"
          />
          <span className="font-medium">한국형 인보이스 (새 양식)</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="template"
            value="standard"
            checked={selectedTemplate === 'standard'}
            onChange={(e) => onTemplateChange(e.target.value as 'korean' | 'standard')}
            className="mr-2"
          />
          <span className="font-medium">Standard Commercial Invoice</span>
        </label>
      </div>
    </div>
  )
}
