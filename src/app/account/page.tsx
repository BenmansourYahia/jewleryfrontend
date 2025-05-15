
import AccountDashboardClient from '@/components/account/AccountDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account - Gleaming Gallery',
  description: 'Manage your Gleaming Gallery account details.',
};

export default function AccountPage() {
  return (
    <div>
      <AccountDashboardClient />
    </div>
  );
}
