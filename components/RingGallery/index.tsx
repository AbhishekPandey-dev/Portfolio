'use client'

import dynamic from 'next/dynamic'

type RingGalleryProps = {
  className?: string
}

const RingGalleryInner = dynamic(
  () => import('./RingGalleryInner'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#0c0c0c] flex items-center justify-center">
        <div className="text-white text-sm tracking-widest animate-pulse">LOADING...</div>
      </div>
    ),
  }
)

export default function RingGallery({ className }: RingGalleryProps) {
  return <RingGalleryInner className={className} />
}
