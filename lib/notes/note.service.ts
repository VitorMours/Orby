
import { NoteRecord, NoteRecordSchema } from "@/lib/notes/note.schema";
import { createSupabaseServer } from "@/lib/supabase";

export default class NoteService {

    public static async getNotes(ownerId: string): Promise<NoteRecord[]> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("owner", ownerId);

        if (error) {
            throw new Error(error.message);
        }

        return NoteRecordSchema.array().parse(data);
    }


}