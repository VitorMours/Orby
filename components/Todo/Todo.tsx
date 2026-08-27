"use client";

import React from "react";

interface TodoProps {
    children?: React.ReactNode;
}

const Todo: React.FC<TodoProps> = ({ children }) => {
    return (
        <ul className="list shadow-md bg-base-100 rounded-box">
            {children}
        </ul>
    );
};

export default Todo;
