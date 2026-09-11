import { z } from "zod";

export const UserIdSchema = z.string().uuid();
export const UserSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string().min(3, "first name is required").max(100),
    lastName: z.string().min(3, "last name is required").max(100),
    email: z.email("email is required")
});
export const CreateUserSchema = UserSchema.omit({ id: true });

// Need to create the user id type.
export type UserID = z.infer<typeof UserIdSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type User = z.infer<typeof UserSchema>;