
import RegisterForm from '@/components/account/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Gleaming Gallery',
  description: 'Create your Gleaming Gallery account.',
};

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center py-12">
      <RegisterForm />
    </div>
  );
}
