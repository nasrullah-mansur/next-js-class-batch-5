"use client";

import { Button } from "@/components/ui/button";


export default function OrderSummery() {
    return (
        <>
            <div className=" border mt-[50px] border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
                        Order Summary
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        Review your order total before placing the order.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Breakdown */}
                    <dl className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <dt className="text-zinc-600">Subtotal</dt>
                            <dd className="font-medium text-zinc-900 tabular-nums">৳ 3,150</dd>
                        </div>

                        <div className="flex items-center justify-between">
                            <dt className="text-zinc-600">Delivery Charge</dt>
                            <dd className="font-medium text-zinc-900 tabular-nums">৳ 85</dd>
                        </div>
                    </dl>

                    {/* Divider */}
                    <div className="border-t border-zinc-200 pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base font-semibold text-zinc-900">Total</p>
                                <p className="text-xs text-zinc-500">Including delivery</p>
                            </div>
                            <p className="text-xl font-bold tracking-tight text-zinc-900 tabular-nums">
                                ৳ 3,235
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Button size={"lg"} className="rounded-none cursor-pointer mt-5 w-full">Place Order</Button>

        </>
    )
}
