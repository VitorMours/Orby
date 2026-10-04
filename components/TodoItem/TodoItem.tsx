"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface TodoItemProps {
    id: string;
    title: string;
    content: string;
    conclusionStatus: boolean;
    onChange: (checked: boolean) => void;
    onEdit?: () => void;
    editing?: boolean;
    onSaveEdit?: (title: string, content: string) => void;
    onCancelEdit?: () => void;
    onDelete?: () => void;
}

const TodoItem = ({ id, title, content, conclusionStatus, onChange, onEdit, editing = false, onSaveEdit, onCancelEdit, onDelete }: TodoItemProps) => {
    const [draftTitle, setDraftTitle] = useState(title);
    const [draftContent, setDraftContent] = useState(content);


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

                {editing ? (
                    <span className="flex flex-1 gap-2">
                        <input aria-label="Título da tarefa" className="input input-sm" value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} />
                        <input aria-label="Conteúdo da tarefa" className="input input-sm" value={draftContent} onChange={(event) => setDraftContent(event.target.value)} />
                    </span>
                ) : (
                    <span><strong>{title}:</strong> {content}</span>
                )}
            </label>

            <div className="flex gap-2">
                {editing ? (
                    <>
                        <button type="button" aria-label={`Salvar tarefa ${title}`} onClick={() => onSaveEdit?.(draftTitle, draftContent)}>Salvar</button>
                        <button type="button" aria-label={`Cancelar edição da tarefa ${title}`} onClick={onCancelEdit}>Cancelar</button>
                    </>
                ) : (
                    <button type="button" aria-label={`Editar tarefa ${title}`} onClick={onEdit}>
                        <Pencil size={18} />
                    </button>
                )}

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
