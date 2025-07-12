import Link from 'next/link';
import { orders } from '@/lib/placeholder-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function OrdersPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="space-y-6">
                {orders.map(order => (
                    <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                            </div>
                             <Badge
                                variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                                className={cn(order.status === 'Delivered' && 'bg-green-600 text-white')}
                             >
                                {order.status}
                             </Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline">
                                <Link href={`/account/orders/${order.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
