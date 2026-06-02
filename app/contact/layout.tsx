import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Abhishek Pandey',
  description:
    'Get in touch with Abhishek Pandey — full-stack, Shopify, and creative engineering projects.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
