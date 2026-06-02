import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Process | Abhishek Pandey',
  description:
    'The process Abhishek follows from discovery and scoping to design, build, and ship.',
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
