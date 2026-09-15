import { z } from "zod";

const NoteFieldsSchema = z.object({
    title: z.string().trim().min(1, "title is required"),
    content: z.string().nullable(),
});

export const NoteSchema = NoteFieldsSchema;
export const NoteCreateSchema = z.object({
    title: NoteFieldsSchema.shape.title,
    content: NoteFieldsSchema.shape.content.optional(),
});
export const NoteUpdateSchema = NoteFieldsSchema.partial().refine(
    (note) => Object.keys(note).length > 0,
    "at least one note field is required",
);
export const NoteRecordSchema = NoteFieldsSchema.extend({
    id: z.uuid(),
    createdAt: z.string().datetime({ local: true }),
    updatedAt: z.string().datetime({ local: true }),
    owner: z.uuid().nullable(),
});

export type Note = z.infer<typeof NoteSchema>;
export type NoteCreate = z.infer<typeof NoteCreateSchema>;
export type NoteUpdate = z.infer<typeof NoteUpdateSchema>;
export type NoteRecord = z.infer<typeof NoteRecordSchema>;