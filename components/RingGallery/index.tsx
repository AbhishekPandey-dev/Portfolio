'use client'

import dynamic from 'next/dynamic'

type RingGalleryProps = {
  className?: string
}

const RingGalleryInner = dynamic(
  () => import('./RingGalleryInner'),
  { ssr: false }
)

export default function RingGallery({ className }: RingGalleryProps) {
  return <RingGalleryInner className={className} />
}
