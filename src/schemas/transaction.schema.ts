import { z } from "zod";

const regex: { type: RegExp; category: RegExp } = {
  type: /^(income|expense)$/,
  category: /^\w+$/,
};

export const createTransactionSchema = z.object({
  type: z.string({ message: "Type is required" }).regex(regex.type),
  amount: z.number({ message: "Amount is required" }),
  name: z
    .string({ message: "Transaction name is required" })
    .min(3, { message: "Transaction name is too short" })
    .trim()
    .toLowerCase(),
  category: z
    .string({ message: "Invalid category" })
    .regex(regex.category)
    .trim()
    .toLowerCase()
    .optional(),
  image: z.string({ message: "Invalid profile photo" }).trim().optional(),
  description: z
    .string({ message: "Transaction name is required" })
    .min(3, { message: "Transaction name is too short" })
    .max(256, { message: "Transaction name is too long" })
    .trim()
    .toLowerCase()
    .optional(),
  date: z.string({ message: "Invalid date" }).datetime().optional(),
});
