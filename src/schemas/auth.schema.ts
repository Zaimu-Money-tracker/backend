import { z } from "zod";

const regex: { text: RegExp; phone: RegExp } = {
  text: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{0,}$/,
  phone: /^\+?[1-9]\d{1,14}$/,
};

export const register = z.object({
  name: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .min(3, {
      message:
        "A name this short? Please try again with at least 3 characters!",
    })
    .regex(regex.text, { message: "Name only can contain letters" })
    .trim()
    .toLowerCase(),
  lastName: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .min(3, {
      message:
        "A last name this short? Please try again with at least 3 characters!",
    })
    .regex(regex.text, { message: "Name only can contain letters" })
    .trim()
    .toLowerCase(),
  userName: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .min(3, {
      message:
        "Too short for a username! Please try again with at least 3 characters!",
    })
    .trim()
    .toLowerCase(),
  gender: z
    .string({ required_error: "Don't leave this field empty, it's important!" })
    .min(3, {
      message:
        "Gender is too short. Please try again with at least 3 characters!",
    })
    .trim()
    .toLowerCase(),
  profilePhoto: z
    .string({
      message: "The photo link doesn't seem right. Please recheck it!",
    })
    .trim()
    .optional(),
  profession: z
    .string({
      message:
        "That doesn't seem like a valid profession. Please insert a valid one!",
    })
    .min(3, {
      message: "Professions need at least 3 characters. Please try again!",
    })
    .regex(regex.text, {
      message:
        "That doesn't seem like a valid profession. Please insert a valid one!",
    })
    .trim()
    .toLowerCase()
    .optional(),
  birthDate: z
    .string({
      message:
        "Your date of birth doesn't look right. Please check the format!",
    })
    .date(),
  phoneNumber: z
    .string({
      message: "This phone number doesn't seem valid. Please recheck it!",
    })
    .regex(regex.phone)
    .optional(),
  email: z.string({ required_error: "We need your email to proceed!" }).email({
    message: "That doesn't look like a valid email address. Please recheck it!",
  }),
  password: z
    .string({ required_error: "Don't forget to set a password!" })
    .min(6, {
      message:
        "Your password is too short! Please try again with at least 6 characters!",
    }),
  settings: z.object({
    language: z
      .string({
        required_error: "Don't leave this field empty, it's important!",
      })
      .trim(),
    currency: z
      .string({
        required_error: "Don't leave this field empty, it's important!",
      })
      .trim(),
    theme: z
      .string({
        required_error: "Don't leave this field empty, it's important!",
      })
      .trim(),
    weekStart: z
      .string({ message: "Don't leave this field empty, it's important!" })
      .trim()
      .optional(),
    notifications: z.object({
      email: z
        .boolean({
          message: "Email notifications preference must be true or false.",
        })
        .optional(),
      push: z
        .boolean({
          message: "Push notifications preference must be true or false.",
        })
        .optional(),
      whatsApp: z
        .boolean({
          message: "WhastApp notifications preference must be true or false.",
        })
        .optional(),
      weeklyReport: z
        .boolean({ message: "Weekly report preference must be true or false." })
        .optional(),
      monthlyReport: z
        .boolean({
          message: "Monthly report preference must be true or false.",
        })
        .optional(),
    }),
  }),
});

export const login = z.object({
  email: z.string({ required_error: "We need your email to proceed!" }).email({
    message: "That doesn't look like a valid email address. Please recheck it!",
  }),
  password: z.string({
    required_error: "We also need your password to proceed!",
  }),
});
