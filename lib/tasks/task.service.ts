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

    public static async createTask(ownerId: string, task: CreateTask): Promise<TaskRecord> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase
            .from("todo")
            .insert({ ...task, owner: ownerId })
            .select()
            .single();
        
        if(error) {
            throw new Error(error.message);
        }

        return TaskRecordSchema.parse(data);
    }

    public static async updateTask(ownerId: string, taskId: string, task: UpdateTask): Promise<TaskRecord> {
        const supabase = await createSupabaseServer();
        const { data, error } = await supabase
            .from("todo")
            .update({ ...task, updatedAt: new Date().toISOString() })
            .eq("id", taskId)
            .eq("owner", ownerId)
            .select()
            .single();
        
        if(error) {
            throw new Error("Unable to update task");
        }

        return TaskRecordSchema.parse(data);
    }

    public static async deleteTask(ownerId: string, taskId: string): Promise<void> {
        const supabase = await createSupabaseServer();
        const { error } = await supabase
            .from("todo")
            .delete()
            .eq("id", taskId)
            .eq("owner", ownerId);

        if (error) {
            throw new Error(error.message);
        }
    }
}