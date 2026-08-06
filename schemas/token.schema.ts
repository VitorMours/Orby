import { z } from "zod";

const SessionSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_at: z.number(),
    expires_in: z.number(),
    token_type: z.string()
});

export type Session = z.infer<typeof SessionSchema>;
