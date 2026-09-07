"use client"
import { useState } from "react";
import Todo from "@/components/Todo/Todo";
import TodoItem from "@/components/TodoItem/TodoItem";
import { Task } from "@/lib/tasks/task.schema";

export default function TodoPage() {
    const [creatingTask, setCreatingTask] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    async function handleSaveNewTask(title: string) {
        if (!title.trim()) {
            setCreatingTask(false);
            return;
        }
        setIsSaving(true);
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({ title }),
            });
            const newTask: Task = await res.json();
            setTasks((prev) => [newTask, ...prev]);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSaving(false);
            setCreatingTask(false);
        }
    }

    async function createTask(event: React.MouseEvent<HTMLButtonElement>) {
        try {
            event.preventDefault();
            setCreatingTask(true);

        } catch (error) {
            console.log(error);
        }
    }


    return ( // TODO: Corrigir o todo item se preciso para criar a task
        <main className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold">Todo</h1>
                <button className="btn btn-primary rounded-md" onClick={createTask} disabled={creatingTask}> Criar Task </button>
            </div>

            <Todo>
                {/* {creatingTask && (
                    <TodoItem
                        task={{ id: "draft", title: "", completed: false } as Task}
                        editing
                        autoFocus
                        onSave={handleSaveNewTask}
                        onCancel={() => setCreatingTask(false)}
                        isSaving={isSaving}
                    />
                )}
                {tasks.map((task) => (
                    <TodoItem key={task.id} task={task} />
                ))} */}
            </Todo>
        </main>
    );
}