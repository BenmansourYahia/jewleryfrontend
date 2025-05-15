
"use client";

import type { Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
}

const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  const { deleteAddress, setDefaultAddress } = useAppContext();

  return (
    <Card className="relative">
      {address.isDefault && (
        <div className="absolute top-3 right-3 flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          <CheckCircle className="h-3 w-3 mr-1" /> Default
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg">Shipping Address</CardTitle>
        {/* <CardDescription>{address.isDefault ? "Default Address" : "Saved Address"}</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p>{address.street}</p>
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p>{address.country}</p>
        <div className="pt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
            <Edit className="mr-1 h-3.5 w-3.5" /> Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deleteAddress(address.id)} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
            <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
          </Button>
          {!address.isDefault && (
            <Button variant="outline" size="sm" onClick={() => setDefaultAddress(address.id)}>
              Set as Default
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
