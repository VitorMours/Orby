import { z } from "zod";

export const UserSchema = z.object({
    firstName: z.string().min(3, "first name is required"),
    lastName: z.string().min(3, "last name is required"),
    email: z.email("email is required"),
    password: z.string().min(6, "password is required"),
    confirmPassword: z.string().min(6, "confirm password is required")
});


export type User = z.infer<typeof UserSchema>;