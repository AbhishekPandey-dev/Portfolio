import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Abhishek Pandey',
  description:
    'Services offered: full-stack development, Shopify engineering, UI/UX design, and creative front-end.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
