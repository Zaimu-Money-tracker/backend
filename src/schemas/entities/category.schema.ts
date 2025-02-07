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
  color: z
    .string({
      message: "The category color is not valid. Please check it!",
    })
    .trim()
    .toLowerCase(),
});
