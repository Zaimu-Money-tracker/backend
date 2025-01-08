import { z } from "zod";

const regex: { text: RegExp; phone: RegExp } = {
  text: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{0,}$/,
  phone: /^\+?[1-9]\d{1,14}$/,
};

export const register = z.object({
  name: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "Name too short, insert a valid name" })
    .regex(regex.text, { message: "Name not valid" })
    .trim()
    .toLowerCase(),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last name too short, insert a valid last name" })
    .regex(regex.text, { message: "Last name not valid" })
    .trim()
    .toLowerCase(),
  userName: z
    .string({ required_error: "User name is required" })
    .min(3, { message: "User name too short, insert a valid user name" })
    .trim()
    .toLowerCase(),
  gender: z
    .string({ required_error: "Gender is required" })
    .min(3, { message: "Gender not valid" })
    .trim()
    .toLowerCase(),
  profilePhoto: z
    .string({ message: "Invalid profile photo" })
    .trim()
    .optional(),
  profession: z
    .string({ message: "Invalid profesion" })
    .min(3, { message: "Invalid profession" })
    .regex(regex.text, { message: "Invalid profession" })
    .trim()
    .toLowerCase()
    .optional(),
  birthDate: z.string({ message: "Invalid date" }).date(),
  phoneNumber: z
    .string({ message: "Phone number not valid" })
    .regex(regex.phone)
    .optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password is too short" }),
  settings: z.object({
    language: z.string({ message: "Language not valid" }).trim(),
    currency: z.string({ message: "Language not valid" }).trim(),
    theme: z.string({ message: "Language not valid" }).trim(),
    weekStart: z.string({ message: "Language not valid" }).trim().optional(),
    notifications: z.object({
      email: z.boolean({ message: "Email notifications not valid" }).optional(),
      push: z.boolean({ message: "Email notifications not valid" }).optional(),
      whatsApp: z
        .boolean({ message: "Email notifications not valid" })
        .optional(),
      weeklyReport: z
        .boolean({ message: "Email notifications not valid" })
        .optional(),
      monthlyReport: z
        .boolean({ message: "Email notifications not valid" })
        .optional(),
    }),
  }),
});

export const login = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }),
});
