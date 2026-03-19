export type StampCategory = "polymer" | "pre_ink" | "self_ink";
export type DeliveryType = "pickup" | "delivery";
export type OrderStatus =
  | "new"
  | "in_progress"
  | "proof_sent"
  | "approved"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  stamp_category: StampCategory;
  stamp_type: string;
  stamp_text: string;
  quantity: number;
  delivery_type: DeliveryType;
  delivery_address: string | null;
  status: OrderStatus;
  amount: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface StampTypeInfo {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface CategoryInfo {
  id: StampCategory;
  name: string;
  description: string;
  price: string;
  readyTime: string;
  image: string;
}
