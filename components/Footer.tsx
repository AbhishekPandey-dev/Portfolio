import RingGallery from '@/components/RingGallery'

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] text-white">
      <div className="relative h-[520px] md:h-[620px] w-full overflow-hidden">
        <RingGallery className="w-full h-full" />
      </div>
    </footer>
  )
}
