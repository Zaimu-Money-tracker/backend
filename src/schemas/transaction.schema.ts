import { z } from "zod";

const regex: { type: RegExp; category: RegExp } = {
  type: /^(income|expense)$/,
  category: /^\w+$/,
};

export const createTransactionSchema = z.object({
  type: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .regex(regex.type, {
      message: "The transaction type doesn't seem right. Please recheck it!",
    }),
  amount: z.number({
    required_error: "Don't leave this field empty, it's important!",
  }),
  name: z
    .string({ required_error: "Don't forget to name your transaction!" })
    .min(3, {
      message:
        "The transaction name is too short! Please use at least 3 characters.",
    })
    .trim()
    .toLowerCase(),
  category: z
    .string({
      message:
        "The transaction category doesn't seem right. Please recheck it!",
    })
    .regex(regex.category, {
      message:
        "The transaction category doesn't seem right. Please recheck it!",
    })
    .trim()
    .toLowerCase()
    .optional(),
  image: z
    .object({
      url: z
        .string({ message: "Don't leave this field empty, it's important!" })
        .optional(),
      id: z
        .string({ message: "Don't leave this field empty, it's important!" })
        .optional(),
    })
    .optional(),
  description: z
    .string({
      message:
        "The transaction description doesn't seem right. Please recheck it!",
    })
    .min(3, {
      message:
        "The transaction description is too short! Please use at least 3 characters.",
    })
    .max(256, {
      message:
        "The transaction description is too long! Please keep it under 256 characters.",
    })
    .trim()
    .toLowerCase()
    .optional(),
  recurring: z.boolean({
    message: "Recurring transaction must be true or false.",
  }),
  recurrency: z
    .string({
      message:
        "The recurrency for this transaction doesn't seem right. Please recheck it!",
    })
    .trim()
    .optional(),
});
