import { z } from "zod";


// TODO: Correct the schemas and create the tests
const StickRecordSchema = z.object({
    id: z.string(),
    name:  z.string(),
    description: z.string(),
    positionX: z.number(),
    positionY: z.number(),
    sizeWidth: z.number(),
    sizeHeight: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    owner: z.string(),
});


const StickCreateSchema = z.object({});