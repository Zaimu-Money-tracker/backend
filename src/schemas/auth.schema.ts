import { z } from "zod";

const regex: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{3,}$/;

export const register = z.object({
  name: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "Name too short, insert a valid name" })
    .regex(regex, { message: "Name not valid" })
    .trim()
    .toLowerCase(),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last name too short, insert a valid last name" })
    .regex(regex, { message: "Last name not valid" })
    .trim()
    .toLowerCase(),
  userName: z
    .string({ required_error: "User name is required" })
    .min(3, { message: "User name too short, insert a valid user name" })
    .trim()
    .toLowerCase(),
  profilePhoto: z
    .string({ message: "Invalid profile photo" })
    .trim()
    .optional(),
  profession: z
    .string({ message: "Invalid profesion" })
    .min(3, { message: "Invalid profession" })
    .regex(regex, { message: "Invalid profession" })
    .trim()
    .toLowerCase()
    .optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password is too short" }),
});

export const login = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }),
});
