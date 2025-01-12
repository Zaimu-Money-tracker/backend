import { z } from "zod";

const regex: { type: RegExp; category: RegExp } = {
  type: /^(income|expense)$/,
  category: /^\w+$/,
};

export const createShortcutScheme = z.object({
  name: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .min(3, {
      message:
        "The shortcut name is too short! Please use at least 3 characters.",
    })
    .trim()
    .toLowerCase(),
  type: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .regex(regex.type, {
      message: "The shortcut type doesn't seem right. Please recheck it!",
    }),
  category: z
    .string({
      message: "The shortcut category doesn't seem right. Please recheck it!",
    })
    .regex(regex.category, {
      message: "The shortcut category doesn't seem right. Please recheck it!",
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
  amount: z.number({
    required_error: "Don't leave this field empty, it's important!",
  }),
});
