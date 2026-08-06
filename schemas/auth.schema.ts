import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email("email is required"),
    password: z.string("password is required")
});

export const RegisterSchema = z.object({
    firstName: z.string("first name is required").max(100),
    lastName: z.string("last name is required").max(100),
    email: z.email("email is required"),
    password: z.string("password is required").min(6).max(100)
});


export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;