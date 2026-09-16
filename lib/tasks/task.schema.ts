import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string().trim().min(1, "title is required"),
    content: z.string().max(100, "content is too long").nullable(),
    conclusionStatus: z.boolean(),
});

export const CreateTaskSchema = z.object({
    title: z.string().trim().min(1, "title is required"),
    content: z.string().max(100, "content is too long").nullable().optional(),
});
    
export const UpdateTaskSchema = TaskSchema.omit({conclusionStatus: true}).partial().refine(
    (task) => Object.keys(task).length > 0,
    "at least one task field is required",
);

export const TaskRecordSchema = TaskSchema.extend({
    id: z.uuid(),
    createdAt: z.string().datetime({ local: true }),
    updatedAt: z.string().datetime({ local: true }),
    archivedAt: z.string().datetime({ local: true }).nullable(),
    owner: z.uuid().nullable(),
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
export type TaskRecord = z.infer<typeof TaskRecordSchema>;