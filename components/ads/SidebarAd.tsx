'use client'

import AdSense from '../AdSense'

export default function SidebarAd() {
  return (
    <div className="sticky top-4">
      <AdSense
        adSlot="0987654321"
        adFormat="vertical"
        fullWidthResponsive={false}
        style={{ display: 'block', width: '300px', height: '600px' }}
      />
    </div>
  )
}
