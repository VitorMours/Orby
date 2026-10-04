import TaskService from "@/lib/tasks/task.service";
import { CreateTaskSchema, UpdateTaskSchema } from "@/lib/tasks/task.schema";
import AuthService from "@/lib/auth/auth.service";
import { NextResponse } from "next/server";



/**
 * Rota para busca dos elementos de todo dentro do sistema
 * @param request 
 * 
 * Recebe os dados do usuário e envia para o service, verificando os headers presentes,
 * a presença do token de autenticação
 */
export async function GET(request: Request) {
    try {
        const user = await AuthService.getSession();
        if (!user) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }

        const tasks = await TaskService.getTasks(user.id);
        return NextResponse.json({ status: 200, data: tasks });
    
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Erro interno",
            },
            { status: 500 }
        );
    }
}


export async function POST(request: Request) {
    try {
        const user = await AuthService.getSession();
        if (!user) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }

        const task = CreateTaskSchema.parse(await request.json());
        const createdTask = await TaskService.createTask(user.id, task);
        return NextResponse.json({ status: 201, data: createdTask }, { status: 201 });
    } catch (error) {
        const isValidationError = error instanceof Error && error.name === "ZodError";
        return NextResponse.json(
            { message: isValidationError ? "Dados da tarefa inválidos" : error instanceof Error ? error.message : "Erro interno" },
            { status: isValidationError ? 400 : 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const user = await AuthService.getSession();
        if (!user) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }

        const body = await request.json();
        const taskId = typeof body.id === "string" ? body.id : "";
        const task = UpdateTaskSchema.parse(body);
        const updatedTask = await TaskService.updateTask(user.id, taskId, task);
        return NextResponse.json({ status: 200, data: updatedTask });
    } catch (error) {
        const isValidationError = error instanceof Error && error.name === "ZodError";
        return NextResponse.json(
            { message: isValidationError ? "Dados da tarefa inválidos" : error instanceof Error ? error.message : "Erro interno" },
            { status: isValidationError ? 400 : 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await AuthService.getSession();
        if (!user) {
            return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
        }

        const taskId = new URL(request.url).searchParams.get("id");
        if (!taskId) {
            return NextResponse.json({ message: "ID da tarefa é obrigatório" }, { status: 400 });
        }

        await TaskService.deleteTask(user.id, taskId);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Erro interno" },
            { status: 500 }
        );
    }
}