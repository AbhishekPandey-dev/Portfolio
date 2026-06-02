import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work | Abhishek Pandey',
  description:
    'Selected projects, case studies, and shipped work from Abhishek Pandey.',
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
