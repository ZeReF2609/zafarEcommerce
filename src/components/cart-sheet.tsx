
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from "react";

export function CartSheet() {
    const [isMounted, setIsMounted] = useState(false);
    const { items, removeItem, updateQuantity, totalPrice, totalItems, toggleCart } = useCart();
    const cartTotal = totalPrice();
    const itemCount = totalItems();
    const shippingCost = 5.00; // Example shipping cost

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // or a loading spinner
    }

    return (
        <>
            <SheetHeader className="pr-6">
                <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
                 <SheetDescription>
                    Items in your cart are not reserved. Check out now to make them yours.
                </SheetDescription>
            </SheetHeader>
            <Separator className="my-4" />
            {items.length > 0 ? (
                <>
                <ScrollArea className="flex-1 pr-6">
                     <ul className="divide-y">
                        {items.map(item => (
                            <li key={item.id} className="flex items-start gap-4 py-4">
                                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md border" data-ai-hint="product photo"/>
                                <div className="flex-1">
                                    <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary" onClick={toggleCart}>{item.name}</Link>
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
                </ScrollArea>
                <div className="pr-6">
                    <Separator className="my-4" />
                    <SheetFooter>
                        <div className="w-full space-y-4">
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
                             <Button asChild className="w-full" size="lg" onClick={toggleCart}>
                                <Link href="/checkout">Proceed to Checkout</Link>
                             </Button>
                        </div>
                    </SheetFooter>
                </div>
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                    <ShoppingCart className="h-24 w-24 text-muted-foreground" />
                    <p className="text-muted-foreground">Your cart is empty.</p>
                    <Button variant="outline" onClick={toggleCart}>Keep Shopping</Button>
                </div>
            )}
            
        </>
    );
}
