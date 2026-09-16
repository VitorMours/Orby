import { createSupabaseServer } from "../supabase";
import { CreateTask, TaskRecord, TaskRecordSchema, UpdateTask } from "./task.schema";

/**
 * Service do banco de dados focado em criar, deletar, atualizar
 * e usar as tasks criadas pelo usuário, de forma fácil e 
 * rápida, tanto nas rotas presentes 
 * como em outras rotas que temos dentro do sistema
 */
export default class TaskService {

    /**
     * Serviço focado em pegar as tasks do usuário, com o 
     * objetivo do mesmo ter acesso a elas, e poder fazer uma 
     * listagem das mesmas 
     * 
     * @returns Promise<Task[]>
     * 
     */
    public static async getTasks(id: string): Promise<TaskRecord[]> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("todo").select("*").eq("owner", id);

        if(error) {
            throw new Error(error.message);
        }

        return TaskRecordSchema.array().parse(data);
    }

    public static async createTask(task: CreateTask): Promise<TaskRecord> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("todo").insert(task).select().single();
        
        if(error) {
            throw new Error(error.message);
        }

        return TaskRecordSchema.parse(data);
    }

    public static async updateTask(taskId: string, task: UpdateTask): Promise<TaskRecord> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase.from("todo").update(task).eq("id", taskId).select().single();
        
        if(error) {
            throw new Error(error.message);
        }

        return TaskRecordSchema.parse(data);
    }
}