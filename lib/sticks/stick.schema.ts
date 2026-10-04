import { z } from "zod";

export const StickSchema = z.object({
    name:  z.string().min(1),
    description: z.string(),
    positionX: z.number(),
    positionY: z.number(),
    sizeWidth: z.number().min(1),
    sizeHeight: z.number().min(1),
});

export const CreateStickSchema = StickSchema.extend({
    owner: z.uuid()
});

export const StickRecordSchema = StickSchema.extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    owner: z.string(),
});


export type StickRecord = z.infer<typeof StickRecordSchema>;
export type CreateStick = z.infer<typeof CreateStickSchema>;
export type Stick = z.infer<typeof StickSchema>;