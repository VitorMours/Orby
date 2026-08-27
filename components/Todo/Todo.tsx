"use client";

import { Todo as TodoType } from "@/types";
import React from "react";
import TodoItem from "../TodoItem/TodoItem";

interface TodoProps {
    list: TodoType[]
}

function validateItems(list: TodoType[]) {
    if (list.length == 0) return false;
    return true;
}

const Todo: React.FC<TodoProps> = ({ list }: TodoProps) => {

    const listValidated = validateItems(list);

    return (
        <ul className="list shadow-md bg-base-100 rounded-box">
            {
                listValidated ?
                    list.map((item) => (
                        <TodoItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            content={item.content}
                            conclusionStatus={item.conclusionStatus}
                            onChange={(checked) => {
                                // trate a mudança de estado aqui (ex: chamar uma função recebida via props, ou atualizar estado no componente pai)
                            }}
                        />
                    ))
                : <></>
            }
        </ul>
    );
}

export default Todo;