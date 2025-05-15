import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - Gleaming Gallery',
  description: 'Log in to the admin panel.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 