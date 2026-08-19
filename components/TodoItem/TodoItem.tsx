"use client";
import { Pencil, Trash2 } from "lucide-react";

export default function TodoItem() {
    return(
        <li className="list-row">
            <input type="checkbox" name="todo" id="todo" />
            <div >asdsad</div>
            <button><Pencil/></button>
            <button><Trash2/></button>
        </li>
    );
}