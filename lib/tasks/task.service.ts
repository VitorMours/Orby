import { createSupabaseServer } from "../supabase";
import { CreateTask, Task } from "./task.schema";


export default class TaskService {

    public async getTasks(): Promise<Task[]> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("tasks").select("*");

        if(error) {
            throw new Error(error.message);
        }

        return data as Task[];

    }


    //public async createTask(task: CreateTask): Promise<Task> {
    //    
    //}

}