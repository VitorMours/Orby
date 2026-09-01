"use client"
import Todo from "@/components/Todo/Todo";
import TodoItem from "@/components/TodoItem/TodoItem";

export default function TodoPage() {

    return (
        <main className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-bold">Todo</h1>
                <button className="btn btn-primary rounded-md"> Criar Task </button>
            </div>
            
            <Todo>
                <TodoItem id={"mmock"} title={"mmock"} content={"mmock"} conclusionStatus={false} onChange={function (checked: boolean): void {
                    throw new Error("Function not implemented.");
                }}
                />
            </Todo>
        </main>
    );
}