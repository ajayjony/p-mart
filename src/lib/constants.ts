import { CategoryInfo, StampTypeInfo, OrderStatus } from "@/types";

export const WHATSAPP_NUMBER = "917401999111";
export const SHOP_EMAIL = "prakashstores2015@gmail.com";
export const SHOP_ADDRESS = "2/PC-5, Mogappair West, Chennai-600 037";
export const SHOP_NAME = "P MART";
export const SHOP_FULL_NAME = "Prakash Printers (Rubber Stamps)";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "polymer",
    name: "Polymer Stamps",
    description: "Ordinary stamps used with a stamp pad. Durable and affordable.",
    price: "₹150",
    readyTime: "1 Day",
    image: "/images/stamps/polymer-company.png",
  },
  {
    id: "pre_ink",
    name: "Pre-Ink Stamps",
    description: "Built-in ink pad for instant use. No separate stamp pad needed.",
    price: "₹300",
    readyTime: "10 Minutes",
    image: "/images/stamps/prink-company.png",
  },
  {
    id: "self_ink",
    name: "Self-Ink Stamps",
    description: "Premium self-inking mechanism. Clean, professional impressions every time.",
    price: "₹400",
    readyTime: "1 Day",
    image: "/images/stamps/selfink-company.png",
  },
];

export const STAMP_TYPES: StampTypeInfo[] = [
  { id: "company-signature", name: "Company Signature", description: "For Proprietor / Director / Proprietrix", image: "/images/stamps/polymer-company.png" },
  { id: "school-trust", name: "School / Trust / Association", description: "For Principal / Trustee / President / Secretary", image: "/images/stamps/polymer-company.png" },
  { id: "address", name: "Address Stamp", description: "Company or personal address stamp", image: "/images/stamps/polymer-address.png" },
  { id: "doctor", name: "Doctor Stamp", description: "Name, Reg No, Department, Hospital", image: "/images/stamps/polymer-doctor.png" },
  { id: "academic", name: "Academic Stamp", description: "Name, Degree, HOD, Department, College", image: "/images/stamps/polymer-company.png" },
  { id: "sales-person", name: "Sales Person", description: "Name and mobile number stamp", image: "/images/stamps/polymer-company.png" },
  { id: "approved-received", name: "Approved / Received / Paid", description: "Status marking stamps for documents", image: "/images/stamps/polymer-company.png" },
  { id: "round-oval", name: "Round / Oval Seal", description: "Company seals with city and pincode", image: "/images/stamps/polymer-round.png" },
  { id: "date-stamp", name: "Date Stamp", description: "Adjustable date stamps", image: "/images/stamps/selfink-date.png" },
  { id: "bank-stamp", name: "Bank Stamp", description: "Bank name, branch, cashier stamps", image: "/images/stamps/selfink-bank.png" },
];

export const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-status-new" },
  in_progress: { label: "In Progress", color: "bg-status-in-progress" },
  proof_sent: { label: "Proof Sent", color: "bg-status-proof-sent" },
  approved: { label: "Approved", color: "bg-status-approved" },
  paid: { label: "Paid", color: "bg-status-paid" },
  shipped: { label: "Shipped", color: "bg-status-shipped" },
  delivered: { label: "Delivered", color: "bg-status-delivered" },
  cancelled: { label: "Cancelled", color: "bg-status-cancelled" },
};

export const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  new: ["in_progress", "cancelled"],
  in_progress: ["proof_sent", "cancelled"],
  proof_sent: ["approved", "cancelled"],
  approved: ["paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};
