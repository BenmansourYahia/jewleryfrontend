
"use client";

import { useState, useEffect } from 'react';
import type { Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (addressData: Omit<Address, 'id'>, isDefault: boolean) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

const AddressForm = ({ initialData, onSubmit, onCancel, submitButtonText = "Save Address" }: AddressFormProps) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('USA');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (initialData) {
      setStreet(initialData.street);
      setCity(initialData.city);
      setState(initialData.state);
      setZipCode(initialData.zipCode);
      setCountry(initialData.country);
      setIsDefault(initialData.isDefault || false);
    } else {
      // Reset form for new address
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setCountry('USA');
      setIsDefault(false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ street, city, state, zipCode, country }, isDefault);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Address' : 'Add New Address'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input id="state" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP / Postal Code</Label>
              <Input id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
          </div>
           <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="isDefault" checked={isDefault} onCheckedChange={(checked) => setIsDefault(Boolean(checked))} />
            <Label htmlFor="isDefault" className="text-sm font-normal">Set as default shipping address</Label>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">{submitButtonText}</Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default AddressForm;
