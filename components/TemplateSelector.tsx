'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type TemplateType = 'invoice' | 'proforma-invoice' | 'packing-list' | 'unit-converter'

export default function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('invoice')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 현재 경로에 따라 선택된 템플릿 설정
    if (pathname === '/') {
      setSelectedTemplate('invoice')
    } else if (pathname === '/proforma-invoice') {
      setSelectedTemplate('proforma-invoice')
    } else if (pathname === '/packing-list') {
      setSelectedTemplate('packing-list')
    } else if (pathname === '/unit-converter') {
      setSelectedTemplate('unit-converter')
    }
  }, [pathname])

  const handleTemplateClick = (templateId: TemplateType) => {
    if (templateId === 'invoice') {
      router.push('/')
    } else if (templateId === 'unit-converter') {
      router.push('/unit-converter')
    } else if (templateId === 'proforma-invoice') {
      router.push('/proforma-invoice')
    } else if (templateId === 'packing-list') {
      router.push('/packing-list')
    }
  }

  const templates = [
    {
      id: 'invoice' as TemplateType,
      name: 'Commercial Invoice',
      description: 'Standard invoice for billing clients',
      icon: '📄'
    },
    {
      id: 'proforma-invoice' as TemplateType,
      name: 'Proforma Invoice',
      description: 'Preliminary bill before shipment',
      icon: '📋'
    },
    {
      id: 'packing-list' as TemplateType,
      name: 'Packing List',
      description: 'Detailed list of shipped items',
      icon: '📦'
    },
    {
      id: 'unit-converter' as TemplateType,
      name: 'Unit Converter',
      description: 'Convert weights and measures',
      icon: '⚖️'
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Choose Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template.id)}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
            }`}
          >
            <div className="text-4xl mb-3">{template.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
