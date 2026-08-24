"use client";

import { Todo as TodoType } from "@/types";


interface TodoProps {
    items: TodoType[]
}

function validateItems(items: TodoProps[]) {
    items.forEach((item: TodoProps) => {
        typeof item


    });


}


const Todo: React.FC<TodoProps> = ({items}: TodoProps) => {

    return(
        <ul className="list shadow-md bg-base-100 rounded-box">
        
        </ul>
    );
}

export default Todo;