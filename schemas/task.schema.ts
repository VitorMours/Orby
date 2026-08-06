import { z } from "zod";

const TaskSchema = z.object({
    name: z.string().min(3, "name is required").max(50, "the name is too long"),
    description: z.string().max(100, "description is too long"),
    conclusion: z.boolean(),
});
const CreateTaskSchema = TaskSchema.omit({conclusion: true});

export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type Task = z.infer<typeof TaskSchema>;