
import LoginForm from '@/components/account/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Gleaming Gallery',
  description: 'Log in to your Gleaming Gallery account.',
};

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center py-12">
      <LoginForm />
    </div>
  );
}
