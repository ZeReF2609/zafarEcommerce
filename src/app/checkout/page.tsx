
"use client";

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CreditCard, Landmark, Truck, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CheckoutStep = 'information' | 'shipping' | 'payment';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<CheckoutStep>('information');
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const cartTotal = totalPrice();
    const shippingCost = deliveryMethod === 'delivery' ? 5.00 : 0;
    const total = cartTotal + shippingCost;

    if (items.length === 0) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground">You can't proceed to checkout without any items.</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Go Shopping</Link>
                </Button>
            </div>
        );
    }
    
    const goToNextStep = () => {
        if (step === 'information') setStep('shipping');
        else if (step === 'shipping') setStep('payment');
    }

    const goToPrevStep = () => {
        if (step === 'payment') setStep('shipping');
        else if (step === 'shipping') setStep('information');
    }
    
    const handlePlaceOrder = () => {
        // Here you would typically process the payment and create the order
        alert('Order placed successfully!');
        clearCart();
        router.push('/');
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="lg:order-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="relative">
                                            <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md border" data-ai-hint="product photo" />
                                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">{item.quantity}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-6" />
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>${shippingCost.toFixed(2)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:order-1">
                     <p className="text-sm text-muted-foreground mb-4">
                        <Link href="/account" className="text-primary hover:underline">Log in</Link> or continue as a guest.
                    </p>
                    <Accordion type="single" value={step} collapsible>
                        <AccordionItem value="information">
                            <AccordionTrigger onClick={() => setStep('information')}>
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold">1. Customer Information</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="+1 234 567 890" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Delivery Method</Label>
                                        <RadioGroup defaultValue="delivery" value={deliveryMethod} onValueChange={setDeliveryMethod} className="grid grid-cols-2 gap-4">
                                            <Label htmlFor="delivery" className="border rounded-md p-4 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary">
                                                <RadioGroupItem value="delivery" id="delivery" />
                                                <Truck className="h-5 w-5" /> Delivery
                                            </Label>
                                            <Label htmlFor="pickup" className="border rounded-md p-4 flex items-center gap-2 cursor-pointer has-[:checked]:border-primary">
                                                <RadioGroupItem value="pickup" id="pickup" />
                                                <Landmark className="h-5 w-5" /> Store Pickup
                                            </Label>
                                        </RadioGroup>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className='flex-1'>
                                            <Label htmlFor="coupon">Coupon Code</Label>
                                            <Input id="coupon" placeholder="Enter coupon code"/>
                                        </div>
                                        <Button variant="outline">Apply</Button>
                                    </div>
                                    <Button type="submit" className="w-full">Continue to Shipping</Button>
                                </form>
                            </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="shipping">
                            <AccordionTrigger onClick={() => setStep('shipping')} disabled={step === 'information'}>
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold">2. Shipping Details</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
                                    {deliveryMethod === 'delivery' ? (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input id="firstName" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input id="lastName" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input id="address" required />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2 col-span-2">
                                                    <Label htmlFor="city">City</Label>
                                                    <Input id="city" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zip">ZIP Code</Label>
                                                    <Input id="zip" required />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <h3 className="font-medium">Store Pickup</h3>
                                            <p className="text-muted-foreground">123 Main St, Anytown, USA 12345</p>
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <Button type="button" variant="outline" onClick={goToPrevStep}>Back</Button>
                                        <Button type="submit" className="flex-1">Continue to Payment</Button>
                                    </div>
                                </form>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="payment">
                             <AccordionTrigger onClick={() => setStep('payment')} disabled={step !== 'payment'}>
                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-5 w-5" />
                                    <h2 className="text-xl font-semibold">3. Payment</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2">
                                <div className="space-y-6">
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="card" id="card" />
                                                <Label htmlFor="card">Credit or Debit Card</Label>
                                            </div>
                                            {paymentMethod === 'card' && (
                                                <div className="pl-6 pt-4 space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardNumber">Card Number</Label>
                                                        <Input id="cardNumber" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                         <div className="space-y-2">
                                                            <Label htmlFor="expiry">Expiry</Label>
                                                            <Input id="expiry" placeholder="MM/YY" />
                                                        </div>
                                                         <div className="space-y-2">
                                                            <Label htmlFor="cvc">CVC</Label>
                                                            <Input id="cvc" placeholder="123" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                             <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="cash" id="cash" />
                                                <Label htmlFor="cash">Cash on Delivery</Label>
                                            </div>
                                            {paymentMethod === 'cash' && (
                                                <p className="pl-6 pt-2 text-sm text-muted-foreground">You will pay when your order arrives.</p>
                                            )}
                                        </div>
                                    </RadioGroup>
                                    <div className="flex gap-2">
                                        <Button type="button" variant="outline" onClick={goToPrevStep}>Back</Button>
                                        <Button onClick={handlePlaceOrder} className="flex-1">Place Order</Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
