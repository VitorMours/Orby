"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

interface TodoItemProps {
    id: string,
    title: string,
    content: string,
    conclusionStatus: boolean,
    onChange: (checked: boolean) => void
}

const TodoItem: React.FC<TodoItemProps> = ({id, title, content, conclusionStatus, onChange}: TodoItemProps ) => {
    return(
        <li className="list-row">
            <input type="checkbox" name="todo" id={`todo-${id}`} defaultChecked={conclusionStatus} onChange={(event) => onChange(event.target.checked)}/>
            <div>{title}</div>
            <div>{content}</div>
            <button><Pencil/></button>
            <button><Trash2/></button>
        </li>
    );
}

export default TodoItem;