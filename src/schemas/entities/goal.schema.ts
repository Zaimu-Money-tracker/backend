import { z } from "zod";

export const createGoalScheme = z.object({
  name: z
    .string({ required_error: "Don't forget to name your goal!" })
    .min(3, {
      message: "The goal name is too short! Please use at least 3 characters.",
    })
    .trim()
    .toLowerCase(),
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
      message: "The goal description doesn't seem right. Please recheck it!",
    })
    .min(3, {
      message:
        "The goal description is too short! Please use at least 3 characters.",
    })
    .max(256, {
      message:
        "The goal description is too long! Please keep it under 256 characters.",
    })
    .trim()
    .toLowerCase()
    .optional(),
  progress: z.number({
    required_error: "Don't leave this field empty, it's important!",
  }),
  targetAmount: z.number({
    required_error: "Don't leave this field empty, it's important!",
  }),
});
