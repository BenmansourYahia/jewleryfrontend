'use client';

import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

// export const metadata: Metadata = { // Metadata needs to be handled differently for client components if dynamic, or in layout
//   title: 'Contact Us - Gleaming Gallery',
//   description: 'Get in touch with Gleaming Gallery. We are here to help with any questions or inquiries.',
// };
// For static metadata in a client component page, it's often better in the layout, or a parent server component.
// Or, you can use the `useEffect` hook to update document.title, but that's less ideal for SEO.
// For now, we'll remove it here and rely on RootLayout's default title or enhance it later.


export default function ContactUsPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to an API endpoint)
    alert('Thank you for your message! We will get back to you soon. (This is a placeholder - no email is sent.)');
    // Consider using react-hook-form for more robust form handling
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-12">
      <section className="section-elegant text-center bg-muted/30 rounded-lg shadow-sm">
        <h1 className="heading-elegant text-4xl tracking-tight text-primary">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-elegant">
          We&apos;d love to hear from you! Whether you have a question about our products, an order, or just want to say hello, feel free to reach out.
        </p>
      </section>

      <section className="section-elegant grid md:grid-cols-2 gap-10">
        <Card className="shadow-lg product-card-hover">
          <CardHeader>
            <CardTitle className="heading-elegant text-2xl">Send Us a Message</CardTitle>
            <CardDescription className="text-elegant">Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-elegant">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Your Name" required className="input-elegant" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-elegant">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required className="input-elegant" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-elegant">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Inquiry about..." required className="input-elegant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-elegant">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message here..." 
                  rows={5} 
                  required 
                  className="input-elegant resize-none" 
                />
              </div>
              <div>
                <Button type="submit" className="btn-elegant w-full sm:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <h2 className="heading-elegant text-2xl text-primary mb-4">Our Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-card rounded-lg shadow product-card-hover">
                <Mail className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h3 className="heading-elegant text-foreground">Email Us</h3>
                  <a href="mailto:support@gleaminggallery.com" className="text-muted-foreground hover:text-primary text-elegant">support@gleaminggallery.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-card rounded-lg shadow product-card-hover">
                <Phone className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h3 className="heading-elegant text-foreground">Call Us</h3>
                  <p className="text-muted-foreground text-elegant">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-card rounded-lg shadow product-card-hover">
                <MapPin className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h3 className="heading-elegant text-foreground">Our Address</h3>
                  <p className="text-muted-foreground text-elegant">123 Jewelry Lane, Sparkle City, SC 98765</p>
                  <p className="text-xs text-muted-foreground text-elegant">(Visits by appointment only)</p>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
