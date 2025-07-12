export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  specifications: { [key: string]: string };
  tags: string[];
  collection: 'new-arrivals' | 'summer-collection';
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
