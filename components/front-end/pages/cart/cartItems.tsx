"use client";

import { CounterButton } from '@/components/counter-button';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/providers/cartProvider';
import { product_discount } from '@/utils/product_discount';
import Image from 'next/image';

export default function CartItems() {

    const { carts, removeFromCart, updateQuantity } = useCartStore(store => store);

    const handleDelete = (id: number) => {

        const isConfirm = confirm("are you sure?");

        if (!isConfirm) return;

        removeFromCart(id);
    }


    const handleUpdateQuantity = (id: number, quantity: number) => {
        updateQuantity(id, quantity)
    }

    return (
        <div>
            {carts.map(cart => (
                <div key={cart.id} className="flex mb-3 border p-1 gap-x-2">
                    <div>
                        <Image
                            src={cart.image}
                            alt={cart.title}
                            width={80}
                            height={100}
                        />
                    </div>
                    <div>
                        <h4>{cart.title}</h4>
                        <p>{cart.discountPrice} <span className="line-through">{cart.mainPrice}</span></p>
                        <p>{product_discount(cart.discount, cart.discount_type)}</p>
                        <p>Size: {cart.size}</p>

                        <CounterButton min={1} initialCount={cart.quantity} onChange={(count) => handleUpdateQuantity(cart.id, count)} />

                    </div>

                    <div className="ml-auto">
                        <Button onClick={() => handleDelete(cart.id)}>Delete</Button>

                        <div>
                            <span>{cart.discountPrice} x {cart.quantity}</span>
                            <p className="font-semibold">= {cart.discountPrice * cart.quantity}</p>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}
