import { createSupabaseServer } from "../supabase";
import { CreateTask, Task } from "./task.schema";


export default class TaskService {

    public static async getTasks(): Promise<Task[]> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("tasks").select("*");

        if(error) {
            throw new Error(error.message);
        }

        return data as Task[];

    }

    public static async createTask(task: CreateTask): Promise<Task> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("tasks").insert(task).select().single();
        
        if(error) {
            throw new Error(error.message);
        }

        return await data as Task;    
    }

    public static async updateTask(taskId: string, task: Partial<CreateTask>): Promise<Task> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("tasks").update(task).eq("id", taskId).select().single();
        
        if(error) {
            throw new Error(error.message);
        }

        return await data as Task;
    }
}