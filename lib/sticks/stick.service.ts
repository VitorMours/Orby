import { createSupabaseServer } from "@/lib/supabase";

export type Stick = {
    id: string;
    name: string | null;
    description: string | null;
    positionX: number | null;
    positionY: number | null;
    sizeWidth: number | null;
    sizeHeight: number | null;
    createdAt: string;
    updatedAt: string;
    owner: string;
};

export default class StickService {
    public static async getSticks(ownerId: string): Promise<Stick[]> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase
            .from("sticks")
            .select("*")
            .eq("owner", ownerId);

        if (error) {
            throw new Error(error.message);
        }

        return data as Stick[];
    }
}
