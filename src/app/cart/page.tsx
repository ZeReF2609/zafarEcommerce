"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from "react";

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
    const cartTotal = totalPrice();
    const itemCount = totalItems();
    const shippingCost = 5.00; // Example shipping cost

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // or a loading spinner
    }

    if (items.length === 0) {
        return (
            <div className="container py-12 text-center">
                <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
                <h1 className="mt-4 text-3xl font-bold font-headline">Your Cart is Empty</h1>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container py-8 md:py-12">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline mb-8">Your Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent className="p-0">
                            <ul className="divide-y">
                                {items.map(item => (
                                    <li key={item.id} className="flex items-start gap-4 p-4">
                                        <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md border" data-ai-hint="product photo"/>
                                        <div className="flex-1">
                                            <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">{item.name}</Link>
                                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    <Minus className="h-4 w-4"/>
                                                </Button>
                                                <Input readOnly value={item.quantity} className="h-8 w-12 text-center" />
                                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                            <Button variant="ghost" size="icon" className="mt-2 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shippingCost.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${(cartTotal + shippingCost).toFixed(2)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg">Proceed to Checkout</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
