import { z } from "zod";

export const StickSchema = z.object({
    name:  z.string(),
    description: z.string(),
    positionX: z.number(),
    positionY: z.number(),
    sizeWidth: z.number(),
    sizeHeight: z.number(),
});

export const StickRecordSchema = StickSchema.extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    owner: z.string(),
});

export type StickRecord = z.infer<typeof StickRecordSchema>;
export type Stick = z.infer<typeof StickSchema>;