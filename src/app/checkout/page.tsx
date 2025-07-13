
"use client";

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
                <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
                <p className="text-muted-foreground">No puedes proceder al pago sin ningún artículo.</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Ir de Compras</Link>
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
        // Aquí normalmente procesarías el pago y crearías el pedido
        alert('¡Pedido realizado con éxito!');
        clearCart();
        router.push('/');
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="lg:order-2">
                    <Card className='sticky top-20'>
                        <CardHeader>
                            <CardTitle>Resumen del Pedido</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px] pr-4">
                                <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="relative">
                                                <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md border" data-ai-hint="product photo" />
                                                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">{item.quantity}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <Separator className="my-6" />
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Envío</span>
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
                        ¿Ya tienes una cuenta? <Link href="/account" className="text-primary hover:underline">Inicia sesión</Link> o continúa como invitado.
                    </p>
                    <Accordion type="single" value={step} collapsible>
                        <AccordionItem value="information">
                            <AccordionTrigger onClick={() => setStep('information')} className="text-xl font-semibold">
                                <div className="flex items-center gap-3">
                                    <span className='flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground'>1</span>
                                    <h2>Información del Cliente</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2 pt-4">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Dirección de Correo Electrónico</Label>
                                        <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Número de Teléfono</Label>
                                        <Input id="phone" type="tel" placeholder="+1 234 567 890" />
                                    </div>
                                    <div className="pt-4">
                                        <Label>Método de Entrega</Label>
                                        <RadioGroup defaultValue="delivery" value={deliveryMethod} onValueChange={setDeliveryMethod} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                            <Label htmlFor="delivery" className="border rounded-md p-4 flex items-center gap-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                                                <RadioGroupItem value="delivery" id="delivery" />
                                                <Truck className="h-5 w-5" /> Envío a Domicilio
                                            </Label>
                                            <Label htmlFor="pickup" className="border rounded-md p-4 flex items-center gap-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                                                <RadioGroupItem value="pickup" id="pickup" />
                                                <Landmark className="h-5 w-5" /> Recojo en Tienda
                                            </Label>
                                        </RadioGroup>
                                    </div>
                                    <div className="flex items-end gap-2 pt-4">
                                        <div className='flex-1'>
                                            <Label htmlFor="coupon">Código de Cupón</Label>
                                            <Input id="coupon" placeholder="Ingresa tu cupón"/>
                                        </div>
                                        <Button variant="outline">Aplicar</Button>
                                    </div>
                                    <Button type="submit" className="w-full mt-6" size="lg">Continuar con el Envío</Button>
                                </form>
                            </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="shipping">
                            <AccordionTrigger onClick={() => setStep('shipping')} disabled={step === 'information'} className="text-xl font-semibold">
                                 <div className="flex items-center gap-3">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 'information' ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>2</span>
                                    <h2>Detalles de Envío</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2 pt-4">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
                                    {deliveryMethod === 'delivery' ? (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">Nombre</Label>
                                                    <Input id="firstName" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Apellido</Label>
                                                    <Input id="lastName" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Dirección</Label>
                                                <Input id="address" required />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2 col-span-2">
                                                    <Label htmlFor="city">Ciudad</Label>
                                                    <Input id="city" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zip">Código Postal</Label>
                                                    <Input id="zip" required />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Card>
                                            <CardContent className="p-4">
                                                <h3 className="font-medium">Recojo en Tienda</h3>
                                                <p className="text-muted-foreground">123 Main St, Anytown, USA 12345</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                    <div className="flex gap-2 pt-6">
                                        <Button type="button" variant="outline" onClick={goToPrevStep}>Atrás</Button>
                                        <Button type="submit" className="flex-1" size="lg">Continuar con el Pago</Button>
                                    </div>
                                </form>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="payment">
                             <AccordionTrigger onClick={() => setStep('payment')} disabled={step !== 'payment'} className="text-xl font-semibold">
                                <div className="flex items-center gap-3">
                                     <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step !== 'payment' ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}`}>3</span>
                                    <h2>Pago</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-2 pt-4">
                                <div className="space-y-6">
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                                        <Label htmlFor="card-radio" className="border rounded-md p-4 flex items-center gap-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                                            <RadioGroupItem value="card" id="card-radio" />
                                            <CreditCard className="h-5 w-5" /> Tarjeta de Crédito o Débito
                                        </Label>
                                        {paymentMethod === 'card' && (
                                            <div className="pl-6 pt-2 pb-2 space-y-4 border-l-2 border-primary ml-5">
                                                <div className="space-y-2">
                                                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                                                    <Input id="cardNumber" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                        <Label htmlFor="expiry">Expiración</Label>
                                                        <Input id="expiry" placeholder="MM/AA" />
                                                    </div>
                                                        <div className="space-y-2">
                                                        <Label htmlFor="cvc">CVC</Label>
                                                        <Input id="cvc" placeholder="123" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <Label htmlFor="cash-radio" className="border rounded-md p-4 flex items-center gap-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                                            <RadioGroupItem value="cash" id="cash-radio" />
                                            <span className="font-bold text-lg">$</span> Pago Contra Entrega
                                        </Label>
                                        {paymentMethod === 'cash' && (
                                            <div className="pl-6 pt-2 pb-2 border-l-2 border-primary ml-5">
                                                <p className="text-sm text-muted-foreground">Pagarás cuando tu pedido llegue.</p>
                                            </div>
                                        )}
                                    </RadioGroup>
                                    <div className="flex gap-2 pt-6">
                                        <Button type="button" variant="outline" onClick={goToPrevStep}>Atrás</Button>
                                        <Button onClick={handlePlaceOrder} className="flex-1" size="lg">Realizar Pedido (${total.toFixed(2)})</Button>
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
