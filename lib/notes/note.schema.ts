import { Content } from "next/font/google";
import { z } from "zod";


export const NoteSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export const NoteCreateSchema = z.object({});
export const NoteUpdateSchema = z.object({});


export type Note = z.infer<typeof NoteSchema>