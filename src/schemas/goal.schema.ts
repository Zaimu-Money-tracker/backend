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
    .string({
      message: "The image link doesn't seem right. Please recheck it!",
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
  goal: z.number({
    required_error: "Don't leave this field empty, it's important!",
  }),
  date: z
    .string({
      message: "The date format looks incorrect. Please make sure it's valid!",
    })
    .datetime()
    .optional(),
});
