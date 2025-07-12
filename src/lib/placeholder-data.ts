import type { Product, Review, Order, CartItem } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    description: 'A timeless classic, this white tee is made from 100% premium cotton for ultimate comfort and durability. Perfect for any occasion.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 25.00,
    rating: 4.5,
    reviewsCount: 120,
    specifications: { 'Material': '100% Cotton', 'Fit': 'Regular', 'Care': 'Machine Washable' },
    tags: ['apparel', 'top', 'classic'],
    collection: 'new-arrivals',
  },
  {
    id: '2',
    name: 'Urban Explorer Backpack',
    description: 'Durable and stylish, this backpack is designed for the modern urban explorer. With multiple compartments and a padded laptop sleeve, it\'s your perfect daily companion.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.8,
    reviewsCount: 88,
    specifications: { 'Material': 'Nylon', 'Capacity': '25L', 'Water Resistant': 'Yes' },
    tags: ['accessory', 'bag', 'travel'],
    collection: 'new-arrivals',
  },
  {
    id: '3',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these state-of-the-art noise-cancelling headphones. Enjoy crystal-clear audio and up to 30 hours of battery life.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 199.99,
    rating: 4.9,
    reviewsCount: 250,
    specifications: { 'Connectivity': 'Bluetooth 5.0', 'Battery Life': '30 Hours', 'Noise Cancellation': 'Active' },
    tags: ['electronics', 'audio', 'gadget'],
    collection: 'new-arrivals',
  },
  {
    id: '4',
    name: 'Modern Leather Watch',
    description: 'A sleek and minimalist timepiece that combines classic design with modern aesthetics. Features a genuine leather strap and stainless steel case.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 150.00,
    rating: 4.7,
    reviewsCount: 95,
    specifications: { 'Case': 'Stainless Steel', 'Strap': 'Genuine Leather', 'Movement': 'Quartz' },
    tags: ['accessory', 'watch', 'fashion'],
    collection: 'new-arrivals',
  },
  {
    id: '5',
    name: 'Summer Linen Shirt',
    description: 'Stay cool and stylish with our lightweight linen shirt. Perfect for warm weather, it offers a relaxed fit and breathable comfort.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.6,
    reviewsCount: 75,
    specifications: { 'Material': '100% Linen', 'Fit': 'Relaxed', 'Style': 'Button-Down' },
    tags: ['apparel', 'summer', 'shirt'],
    collection: 'summer-collection',
  },
  {
    id: '6',
    name: 'Beachside Canvas Tote',
    description: 'The perfect tote for your beach days or city strolls. Spacious, durable, and effortlessly chic, made from high-quality canvas.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 35.00,
    rating: 4.8,
    reviewsCount: 110,
    specifications: { 'Material': 'Heavy-duty canvas', 'Size': 'Large', 'Pockets': '1 Interior' },
    tags: ['accessory', 'bag', 'summer'],
    collection: 'summer-collection',
  },
  {
    id: '7',
    name: 'Polarized Aviator Sunglasses',
    description: 'Protect your eyes with style. These classic aviator sunglasses feature polarized lenses for maximum UV protection and glare reduction.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 55.00,
    rating: 4.9,
    reviewsCount: 180,
    specifications: { 'Frame': 'Metal Alloy', 'Lenses': 'Polarized UV400', 'Style': 'Aviator' },
    tags: ['accessory', 'sunglasses', 'summer'],
    collection: 'summer-collection',
  },
  {
    id: '8',
    name: 'Waterproof Action Camera',
    description: 'Capture all your summer adventures in stunning 4K. This waterproof action camera is built to withstand the elements.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.7,
    reviewsCount: 130,
    specifications: { 'Resolution': '4K 30fps', 'Waterproof': 'Up to 30m', 'Wi-Fi': 'Yes' },
    tags: ['electronics', 'camera', 'adventure'],
    collection: 'summer-collection',
  }
];

export const reviews: Review[] = [
  { id: 'r1', author: 'Jane D.', avatar: 'https://placehold.co/40x40.png', rating: 5, date: '2023-05-10', text: 'Absolutely love this shirt! The quality is amazing and it fits perfectly.' },
  { id: 'r2', author: 'Mike P.', avatar: 'https://placehold.co/40x40.png', rating: 4, date: '2023-05-12', text: 'Great backpack. Very spacious and looks great. The zippers could be a bit smoother.' },
  { id: 'r3', author: 'Sarah K.', avatar: 'https://placehold.co/40x40.png', rating: 5, date: '2023-05-15', text: 'The sound quality on these headphones is out of this world. Worth every penny.' },
];

const sampleCartItems: CartItem[] = [
    { id: '1', name: 'Classic White Tee', price: 25.00, image: 'https://placehold.co/100x100.png', quantity: 2 },
    { id: '2', name: 'Urban Explorer Backpack', price: 75.00, image: 'https://placehold.co/100x100.png', quantity: 1 }
]

export const orders: Order[] = [
  { id: 'ORD-001', date: '2023-05-01', status: 'Delivered', total: 125.00, items: sampleCartItems },
  { id: 'ORD-002', date: '2023-04-15', status: 'Delivered', total: 199.99, items: [{id: '3', name: 'Wireless Noise-Cancelling Headphones', price: 199.99, image: 'https://placehold.co/100x100.png', quantity: 1}] },
  { id: 'ORD-003', date: '2023-05-18', status: 'Processing', total: 90.00, items: [{id: '5', name: 'Summer Linen Shirt', price: 45.00, image: 'https://placehold.co/100x100.png', quantity: 2}] },
  { id: 'ORD-004', date: '2023-03-20', status: 'Cancelled', total: 150.00, items: [{id: '4', name: 'Modern Leather Watch', price: 150.00, image: 'https://placehold.co/100x100.png', quantity: 1}] }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
}
