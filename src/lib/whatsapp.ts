import { WHATSAPP_NUMBER } from "./constants";

interface WhatsAppOrderData {
  orderNumber: string;
  stampCategory: string;
  stampType: string;
  stampText: string;
  quantity: number;
  deliveryType: string;
  deliveryAddress?: string | null;
  customerName: string;
  customerPhone: string;
}

export function formatWhatsAppMessage(data: WhatsAppOrderData): string {
  const categoryLabel = data.stampCategory
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
  const deliveryLine =
    data.deliveryType === "delivery"
      ? `Delivery: Courier to ${data.deliveryAddress}`
      : "Delivery: Pickup from shop";

  return [
    "Hi, I'd like to order a stamp from P MART!",
    "",
    `Order #: ${data.orderNumber}`,
    `Stamp: ${categoryLabel} — ${data.stampType}`,
    `Text: ${data.stampText}`,
    `Qty: ${data.quantity}`,
    deliveryLine,
    "",
    `Name: ${data.customerName}`,
    `Phone: ${data.customerPhone}`,
  ].join("\n");
}

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
