import { z } from "zod";


export const NoteSchema = z.object();
export const NoteCreateSchema = z.object();
export const NoteUpdateSchema = z.object();


export type Note = z.infer<typeof NoteSchema>