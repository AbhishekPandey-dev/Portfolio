import RingGallery from '@/components/RingGallery'

export default function Footer() {
  return (
    <footer className="relative h-full w-full min-h-screen bg-[#050505] text-white">
      <div className="relative h-full w-full overflow-hidden">
        <RingGallery className="w-full h-full" />
      </div>
    </footer>
  )
}
