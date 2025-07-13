
import type { Product, Review, Order, CartItem } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Camiseta Blanca Clásica',
    description: 'Un clásico atemporal, esta camiseta blanca está hecha de 100% algodón premium para máxima comodidad y durabilidad. Perfecta para cualquier ocasión.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 25.00,
    rating: 4.5,
    reviewsCount: 120,
    specifications: { 'Material': '100% Algodón', 'Ajuste': 'Regular', 'Cuidado': 'Lavable a máquina' },
    tags: ['ropa', 'top', 'clásico'],
    collection: 'new-arrivals',
  },
  {
    id: '2',
    name: 'Mochila Explorador Urbano',
    description: 'Duradera y elegante, esta mochila está diseñada para el explorador urbano moderno. Con múltiples compartimentos y una funda acolchada para portátil, es tu compañera diaria perfecta.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.8,
    reviewsCount: 88,
    specifications: { 'Material': 'Nailon', 'Capacidad': '25L', 'Resistente al agua': 'Sí' },
    tags: ['accesorio', 'bolso', 'viaje'],
    collection: 'new-arrivals',
  },
  {
    id: '3',
    name: 'Auriculares con Cancelación de Ruido',
    description: 'Sumérgete en el sonido con estos auriculares de última generación con cancelación de ruido. Disfruta de un audio nítido y hasta 30 horas de batería.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 199.99,
    rating: 4.9,
    reviewsCount: 250,
    specifications: { 'Conectividad': 'Bluetooth 5.0', 'Duración de la batería': '30 horas', 'Cancelación de ruido': 'Activa' },
    tags: ['electrónica', 'audio', 'gadget'],
    collection: 'new-arrivals',
  },
  {
    id: '4',
    name: 'Reloj de Cuero Moderno',
    description: 'Un reloj elegante y minimalista que combina diseño clásico con estética moderna. Cuenta con una correa de cuero genuino y caja de acero inoxidable.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 150.00,
    rating: 4.7,
    reviewsCount: 95,
    specifications: { 'Caja': 'Acero inoxidable', 'Correa': 'Cuero genuino', 'Movimiento': 'Cuarzo' },
    tags: ['accesorio', 'reloj', 'moda'],
    collection: 'new-arrivals',
  },
  {
    id: '5',
    name: 'Camisa de Lino de Verano',
    description: 'Mantente fresco y elegante con nuestra camisa de lino ligera. Perfecta para climas cálidos, ofrece un ajuste relajado y comodidad transpirable.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.6,
    reviewsCount: 75,
    specifications: { 'Material': '100% Lino', 'Ajuste': 'Relajado', 'Estilo': 'Abotonada' },
    tags: ['ropa', 'verano', 'camisa'],
    collection: 'summer-collection',
  },
  {
    id: '6',
    name: 'Bolso de Lona para la Playa',
    description: 'El bolso perfecto para tus días de playa o paseos por la ciudad. Espacioso, duradero y chic sin esfuerzo, hecho de lona de alta calidad.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 35.00,
    rating: 4.8,
    reviewsCount: 110,
    specifications: { 'Material': 'Lona resistente', 'Tamaño': 'Grande', 'Bolsillos': '1 interior' },
    tags: ['accesorio', 'bolso', 'verano'],
    collection: 'summer-collection',
  },
  {
    id: '7',
    name: 'Gafas de Sol de Aviador Polarizadas',
    description: 'Protege tus ojos con estilo. Estas clásicas gafas de sol de aviador cuentan con lentes polarizadas para una máxima protección UV y reducción del deslumbramiento.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 55.00,
    rating: 4.9,
    reviewsCount: 180,
    specifications: { 'Montura': 'Aleación de metal', 'Lentes': 'Polarizadas UV400', 'Estilo': 'Aviador' },
    tags: ['accesorio', 'gafas de sol', 'verano'],
    collection: 'summer-collection',
  },
  {
    id: '8',
    name: 'Cámara de Acción Impermeable',
    description: 'Captura todas tus aventuras de verano en impresionante 4K. Esta cámara de acción impermeable está diseñada para resistir los elementos.',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    price: 120.00,
    originalPrice: 150.00,
    rating: 4.7,
    reviewsCount: 130,
    specifications: { 'Resolución': '4K 30fps', 'Impermeable': 'Hasta 30m', 'Wi-Fi': 'Sí' },
    tags: ['electrónica', 'cámara', 'aventura'],
    collection: 'summer-collection',
  }
];

export const reviews: Review[] = [
  { id: 'r1', author: 'Jane D.', avatar: 'https://placehold.co/40x40.png', rating: 5, date: '2023-05-10', text: '¡Me encanta esta camisa! La calidad es increíble y me queda perfecta.' },
  { id: 'r2', author: 'Mike P.', avatar: 'https://placehold.co/40x40.png', rating: 4, date: '2023-05-12', text: 'Gran mochila. Muy espaciosa y se ve genial. Las cremalleras podrían ser un poco más suaves.' },
  { id: 'r3', author: 'Sarah K.', avatar: 'https://placehold.co/40x40.png', rating: 5, date: '2023-05-15', text: 'La calidad de sonido de estos auriculares es de otro mundo. Vale cada céntimo.' },
];

const sampleCartItems: CartItem[] = [
    { id: '1', name: 'Camiseta Blanca Clásica', price: 25.00, image: 'https://placehold.co/100x100.png', quantity: 2 },
    { id: '2', name: 'Mochila Explorador Urbano', price: 75.00, image: 'https://placehold.co/100x100.png', quantity: 1 }
]

export const orders: Order[] = [
  { id: 'ORD-001', date: '2023-05-01', status: 'Entregado', total: 125.00, items: sampleCartItems },
  { id: 'ORD-002', date: '2023-04-15', status: 'Entregado', total: 199.99, items: [{id: '3', name: 'Auriculares con Cancelación de Ruido', price: 199.99, image: 'https://placehold.co/100x100.png', quantity: 1}] },
  { id: 'ORD-003', date: '2023-05-18', status: 'Procesando', total: 90.00, items: [{id: '5', name: 'Camisa de Lino de Verano', price: 45.00, image: 'https://placehold.co/100x100.png', quantity: 2}] },
  { id: 'ORD-004', date: '2023-03-20', status: 'Cancelado', total: 150.00, items: [{id: '4', name: 'Reloj de Cuero Moderno', price: 150.00, image: 'https://placehold.co/100x100.png', quantity: 1}] }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
}
