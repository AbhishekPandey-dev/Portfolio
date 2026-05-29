import ContactForm from '@/components/ui/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-anton text-red text-5xl md:text-7xl tracking-tight mb-8">
          CONTACT
        </h1>
        <p className="text-white/50 text-lg mb-10">
          Have a project in mind? Let&apos;s build something great together.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
