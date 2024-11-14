import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(200),
  password: z.string().trim().min(6, { message: "Must be at least 6 characters long" }),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(200),
  email: z.string().trim().email({ message: "Invalid email address" }).max(200),
  password: z.string().trim().min(6, { message: "Must be at least 6 characters long" }),
});