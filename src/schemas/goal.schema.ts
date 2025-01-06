import { z } from "zod";

export const createGoalScheme = z.object({
  name: z
    .string({ message: "Transaction name is required" })
    .min(3, { message: "Transaction name is too short" })
    .trim()
    .toLowerCase(),
  image: z.string({ message: "Invalid profile photo" }).trim().optional(),
  description: z
    .string({ message: "Transaction name is required" })
    .min(3, { message: "Transaction name is too short" })
    .max(256, { message: "Transaction name is too long" })
    .trim()
    .toLowerCase()
    .optional(),
  progress: z.number({ message: "Progress is required" }),
  goal: z.number({ message: "Goal is required" }),
  date: z.string({ message: "Invalid date" }).datetime().optional(),
});
