import type { Metadata } from "next";
import { Suspense } from "react";
import OrderForm from "@/components/order/OrderForm";

export const metadata: Metadata = {
  title: "Place Order",
  description: "Order your custom rubber stamp online. Fill in your details and we'll design a proof for your approval.",
};

export default function OrderPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-gold-muted dark:text-gold text-xs tracking-[4px] uppercase mb-2">Place Your Order</p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Order a Custom Stamp</h1>
        <p className="text-[#888] dark:text-[#777] mt-2">Fill in the details below and we&apos;ll get started on your stamp</p>
      </div>
      <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
        <OrderForm />
      </Suspense>
    </div>
  );
}
