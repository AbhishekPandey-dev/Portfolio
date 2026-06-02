import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Abhishek Pandey',
  description:
    'Background, approach, and stack of Abhishek Pandey — full-stack developer and creative engineer.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
