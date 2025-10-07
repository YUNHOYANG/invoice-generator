'use client'

import AdSense from '../AdSense'

export default function DisplayAd() {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <AdSense
          adSlot="1234567890"
          adFormat="auto"
          fullWidthResponsive={true}
        />
      </div>
    </div>
  )
}
