import { z } from "zod";

const regex: { category: RegExp } = {
  category: /^\w+$/,
};

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: "Don't forget to name your category!" })
    .min(3, {
      message:
        "The category name is too short! Please use at least 3 characters.",
    })
    .regex(regex.category, {
      message: "The category name doesn't seem right. Please recheck it!",
    })
    .trim()
    .toLowerCase(),
  limit: z
    .number({
      message: "The category limit must be a number. Please check it!",
    })
    .optional(),
});
