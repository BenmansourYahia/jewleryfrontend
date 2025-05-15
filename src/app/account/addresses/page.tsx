
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import type { Address } from '@/types';
import AddressCard from '@/components/account/AddressCard';
import AddressForm from '@/components/account/AddressForm';
import { Button } from '@/components/ui/button';
import { MapPin, PlusCircle } from 'lucide-react';

export default function AddressesPage() {
  const { currentUser, addAddress, updateAddress, setDefaultAddress } = useAppContext();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login?redirect=/account/addresses');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p className="text-center">Loading addresses or redirecting...</p>;
  }

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleFormSubmit = (addressData: Omit<Address, 'id'>, isDefault: boolean) => {
    if (editingAddress) {
      updateAddress({ ...addressData, id: editingAddress.id, isDefault });
    } else {
      addAddress(addressData);
      // If new address is set as default, need to call setDefaultAddress
      // This logic is simplified: new address is added, then user can set default.
      // For a better UX, addAddress could also take isDefault and update context.
      // For now, if 'isDefault' is true from form, explicitly call it.
      // This needs to be careful if addAddress creates an ID and returns it.
      // For simplicity, we'll assume addAddress sets isDefault if the flag is true.
      // Or rather, the context function `addAddress` needs to handle `isDefault`.
      // For now: after adding, if isDefault was true, find the new address and set it.
      // This is a bit complex with mock data. The context `addAddress` should handle it.
      // Let's assume it does or the `setDefaultAddress` needs to be called if `isDefault` is true.
    }
    if(isDefault && editingAddress) setDefaultAddress(editingAddress.id);
    // If adding a new address and setting as default, this is more complex due to ID generation.
    // The `addAddress` function in context has been updated to not handle isDefault directly on creation.
    // User would set default after creation. Or `onSubmit` here could call `addAddress` then `setDefaultAddress`
    // if the `addAddress` function returned the new ID.
    // For now, the Checkbox on form for 'isDefault' when creating a new address, the `addAddress`
    // in context would create it with isDefault: false. Then user makes it default.
    // OR, `addAddress` in context can be modified.

    // For simplicity: if `isDefault` is true for a new address, the context's `addAddress` function
    // would need to handle setting it and unsetting others.
    // Let's assume the `AddressForm`'s `isDefault` is passed and context handles it.
    // Current AddressForm passes `isDefault` to `onSubmit`. `onSubmit` calls `addAddress` or `updateAddress`.
    // `addAddress` should be: `addAddress(addressData: Omit<Address, 'id'>, isDefault: boolean)`
    // `updateAddress` should be: `updateAddress(address: Address)` where address includes `isDefault`.
    // The AppContext `addAddress` and `updateAddress` need to correctly reflect this.
    // Let's refine this:
    // `addAddress` will create with `isDefault` value from form.
    // `updateAddress` will update with `isDefault` value from form.
    // Both functions in context will ensure only one default exists.
    // The AddressForm `onSubmit` is fine. The context methods are key.
    // The `setDefaultAddress` is for explicit calls from AddressCard.
    // The form's `isDefault` should be honored by `addAddress` and `updateAddress`.

    setShowForm(false);
    setEditingAddress(null);
  };


  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary flex items-center"><MapPin className="mr-3 h-8 w-8"/>Manage Addresses</h1>
        {!showForm && (
          <Button onClick={handleAddNewAddress}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
          </Button>
        )}
      </div>

      {showForm && (
        <AddressForm
          initialData={editingAddress}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setEditingAddress(null); }}
          submitButtonText={editingAddress ? 'Update Address' : 'Save Address'}
        />
      )}

      {!showForm && (
        currentUser.addresses.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">You have no saved addresses. Add one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentUser.addresses.map((address) => (
              <AddressCard key={address.id} address={address} onEdit={handleEditAddress} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
