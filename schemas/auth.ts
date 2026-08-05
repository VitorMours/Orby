import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email("email is required"),
    password: z.string("password is required")
});

export type Login = z.infer<typeof LoginSchema>;