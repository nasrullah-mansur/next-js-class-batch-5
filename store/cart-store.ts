
// src/stores/counter-store.ts

import { CartType } from '@/types/cart'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type CartStore = {
    carts: CartType[]
}

export type CounterActions = {
    addToCart: (cart: CartType) => void;
    removeFromCart: (id: number) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;

}

export type CounterDataStore = CartStore & CounterActions

export const defaultInitState: CartStore = {
    carts: [],
}

export const createCartStore = (
    initState: CartStore = defaultInitState
) => {
    return createStore<CounterDataStore>()(
        persist(
            (set) => ({
                ...initState,

                // Add product to cart
                addToCart: (cart) =>
                    set((state) => {
                        const isExist = state.carts.some(
                            (item) => item.product_id === cart.product_id && item.size === cart.size
                        )

                        if (isExist) {
                            return {
                                carts: state.carts.map((item) =>
                                    cart.product_id && item.size === cart.size
                                        ? {
                                            ...item,
                                            quantity: cart.quantity
                                        }
                                        : item
                                ),
                            }
                        }

                        return {
                            carts: [...state.carts, cart],
                        }
                    }),

                // Remove product from cart
                removeFromCart: (id) =>
                    set((state) => ({
                        carts: state.carts.filter(
                            (item) => item.id !== id
                        ),
                    })),

                // Increment quantity
                incrementQuantity: (id) =>
                    set((state) => ({
                        carts: state.carts.map((item) =>
                            item.id === id
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                }
                                : item
                        ),
                    })),

                // Decrement quantity
                decrementQuantity: (id) =>
                    set((state) => ({
                        carts: state.carts.map((item) =>
                            item.id === id
                                ? {
                                    ...item,
                                    quantity: Math.max(
                                        1,
                                        item.quantity - 1
                                    ),
                                }
                                : item
                        ),
                    })),
                updateQuantity: (id, quantity) => set((state) => ({
                    carts: state.carts.map(item => {
                        if (item.id === id) {
                            return {
                                ...item,
                                quantity,
                            }
                        }

                        return item;
                    })
                }))
            }),
            {
                name: 'cart-storage',
                storage: createJSONStorage(() => localStorage),
                skipHydration: false,
            }
        )
    )
}
