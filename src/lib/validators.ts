import { z } from "zod";

export const orderFormSchema = z
  .object({
    customer_name: z.string().min(1, "Name is required"),
    customer_phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
    customer_email: z.string().email("Invalid email").optional().or(z.literal("")),
    stamp_category: z.enum(["polymer", "pre_ink", "self_ink"], {
      error: "Select a stamp category",
    }),
    stamp_type: z.string().min(1, "Select a stamp type"),
    stamp_text: z.string().min(1, "Enter the text for your stamp"),
    quantity: z.number().int().min(1, "Minimum quantity is 1"),
    delivery_type: z.enum(["pickup", "delivery"], {
      error: "Select delivery method",
    }),
    delivery_address: z.string().optional(),
    honeypot: z.string().max(0, "Bot detected"),
  })
  .refine(
    (data) =>
      data.delivery_type === "pickup" ||
      (data.delivery_address && data.delivery_address.length > 0),
    {
      message: "Delivery address is required for courier delivery",
      path: ["delivery_address"],
    }
  );

export type OrderFormData = z.infer<typeof orderFormSchema>;
