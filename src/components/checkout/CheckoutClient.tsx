
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import type { Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const CheckoutClient = () => {
  const { cartItems, cartTotal, currentUser, placeOrder, addAddress } = useAppContext();
  const router = useRouter();
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA', // Default country
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string | 'new'>('new');
  const [saveAddress, setSaveAddress] = useState(true);

  useEffect(() => {
    if (currentUser?.addresses?.length) {
      const defaultAddress = currentUser.addresses.find(addr => addr.isDefault) || currentUser.addresses[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setShippingAddress({
          street: defaultAddress.street,
          city: defaultAddress.city,
          state: defaultAddress.state,
          zipCode: defaultAddress.zipCode,
          country: defaultAddress.country,
        });
      }
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (cartItems.length === 0) {
      toast({ title: "Your cart is empty.", description: "Redirecting to products page.", variant: "destructive"});
      router.push('/products');
    }
  }, [cartItems, router, toast]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddressSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);
    if (addressId === 'new') {
      setShippingAddress({ street: '', city: '', state: '', zipCode: '', country: 'USA' });
    } else {
      const selected = currentUser?.addresses.find(addr => addr.id === addressId);
      if (selected) {
        setShippingAddress({
          street: selected.street,
          city: selected.city,
          state: selected.state,
          zipCode: selected.zipCode,
          country: selected.country,
        });
      }
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        toast({ title: "Please log in to proceed.", variant: "destructive"});
        router.push('/login?redirect=/checkout'); // Redirect to login
        return;
    }
    if (Object.values(shippingAddress).some(val => val === '')) {
        toast({ title: "Please fill all address fields.", variant: "destructive"});
        return;
    }

    const finalAddress: Address = {
        ...shippingAddress,
        id: selectedAddressId === 'new' ? `addr-${Date.now()}` : selectedAddressId,
        isDefault: false, // Handled separately if needed
    };

    if (selectedAddressId === 'new' && saveAddress && currentUser) {
        addAddress(shippingAddress); // Save new address if checkbox is ticked
    }
    
    const order = placeOrder(finalAddress);
    if (order) {
      // Redirect to an order confirmation page or account orders page
      router.push(`/account/orders?orderId=${order.id}`);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center text-muted-foreground">Your cart is empty. Add some products to proceed.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUser && currentUser.addresses.length > 0 && (
                <div className="space-y-2">
                    <Label htmlFor="savedAddress">Select Address</Label>
                    <select
                        id="savedAddress"
                        name="savedAddress"
                        value={selectedAddressId}
                        onChange={handleAddressSelectChange}
                        className="w-full p-2 border rounded-md bg-background"
                    >
                        <option value="new">Enter new address</option>
                        {currentUser.addresses.map(addr => (
                            <option key={addr.id} value={addr.id}>
                                {addr.street}, {addr.city} {addr.isDefault ? '(Default)' : ''}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" name="street" value={shippingAddress.street} onChange={handleInputChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" name="state" value={shippingAddress.state} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                <Input id="zipCode" name="zipCode" value={shippingAddress.zipCode} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={shippingAddress.country} onChange={handleInputChange} required />
              </div>
            </div>
            {currentUser && selectedAddressId === 'new' && (
                <div className="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="saveAddress" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"/>
                    <Label htmlFor="saveAddress" className="text-sm font-normal">Save this address for future purchases</Label>
                </div>
            )}
          </CardContent>
        </Card>
        {/* Payment section placeholder */}
        <Card>
            <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Payment integration is not implemented in this version.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Secure payment processing (e.g., Stripe, PayPal) would be integrated here. For now, click "Place Order" to simulate.</p>
            </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-6">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between space-x-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded object-cover" />
                  <div>
                    <p className="font-medium truncate w-32 sm:w-auto">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-medium">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Shipping</p>
              <p>FREE</p>
            </div>
            {/* <div className="flex justify-between text-sm text-muted-foreground">
              <p>Taxes</p>
              <p>$0.00</p>
            </div> */}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Place Order
            </Button>
            <Link href="/cart">
                <Button variant="outline" className="w-full mt-2">Back to Cart</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default CheckoutClient;
