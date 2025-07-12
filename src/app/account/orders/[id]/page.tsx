import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }
  const shippingCost = 5.00;
  const subtotal = order.total - shippingCost;

  return (
    <div>
        <div className='mb-6'>
            <Button asChild variant="outline">
                <Link href="/account/orders"> &larr; Back to Orders</Link>
            </Button>
        </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <CardTitle className="text-2xl font-headline">Order #{order.id}</CardTitle>
                <p className="text-muted-foreground">Placed on {order.date}</p>
            </div>
            <Badge
                variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                className={cn('mt-2 sm:mt-0', order.status === 'Delivered' && 'bg-green-600 text-white')}
            >
                {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-4">Items in this order</h3>
              <ul className="divide-y">
                {order.items.map(item => (
                  <li key={item.id} className="flex items-start gap-4 py-4">
                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md border" data-ai-hint="product photo"/>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                         <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Paid</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>John Doe</p>
                        <p>123 Main St</p>
                        <p>Anytown, USA 12345</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
