"use client"

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'
import { toast } from "@/hooks/use-toast"

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
  toggleCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addItem: (product, quantity = 1) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
           toast({ title: "Item updated in cart", description: `${product.name} quantity increased.` });
        } else {
          set({
            items: [...currentItems, { 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                image: product.images[0],
                quantity 
            }],
          })
          toast({ title: "Item added to cart", description: `${product.name} has been added.` });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        })
        toast({ title: "Item removed from cart" });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
            get().removeItem(productId);
            return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ items }) => ({ items }),
    }
  )
)
