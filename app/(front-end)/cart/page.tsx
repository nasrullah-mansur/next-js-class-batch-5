

import CartItems from '@/components/front-end/pages/cart/cartItems';
import CustomerInfo from '@/components/front-end/pages/cart/customerInfo';
import OrderSummery from '@/components/front-end/pages/cart/orderSummery';
import Container from '@/components/ui/container';

export default function Cart() {

  return (
    <Container className="px-[20px] my-6">
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-8">
          <h1 className="text-3xl font-bold mb-4">Our Carts</h1>

          <CartItems />

          <h2 className="text-2xl py-6 font-semibold">Customer Information</h2>


          <CustomerInfo />
        </div>
        <div className="col-span-4">


          <OrderSummery />

        </div>
      </div>
    </Container>
  )
}
