"use client";

import { Pencil, Trash2 } from "lucide-react";

interface TodoItemProps {
    id: string;
    title: string;
    content: string;
    conclusionStatus: boolean;
    onChange: (checked: boolean) => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const TodoItem = ({
    id,
    title,
    content,
    conclusionStatus,
    onChange,
    onEdit,
    onDelete,
}: TodoItemProps) => {
    return (
        <li className="flex items-center justify-between gap-4 p-4">
            <label
                htmlFor={`todo-${id}`}
                className="label flex-1 cursor-pointer"
            >
                <input
                    type="checkbox"
                    className="checkbox"
                    name="todo"
                    id={`todo-${id}`}
                    checked={conclusionStatus}
                    onChange={(event) => onChange(event.target.checked)}
                />

                <span>
                    <strong>{title}:</strong> {content}
                </span>
            </label>

            <div className="flex gap-2">
                <button
                    type="button"
                    aria-label={`Editar tarefa ${title}`}
                    onClick={onEdit}
                >
                    <Pencil size={18} />
                </button>

                <button
                    type="button"
                    aria-label={`Excluir tarefa ${title}`}
                    onClick={onDelete}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
