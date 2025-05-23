import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1).max(255).trim(),
  password: z.string().min(6).max(30),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
