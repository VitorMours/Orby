"use client"
import Todo from "@/components/Todo/Todo";
import TodoItem from "@/components/TodoItem/TodoItem";

export default function TodoPage() {

    return (
        <main className="p-5">
            <Todo>
                <TodoItem id={"mmock"} title={"mmock"} content={"mmock"} conclusionStatus={false} onChange={function (checked: boolean): void {
                    throw new Error("Function not implemented.");
                }}
                />
            </Todo>
        </main>
    );
}