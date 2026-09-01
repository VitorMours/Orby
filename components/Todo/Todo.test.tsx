import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import TodoItem from "../TodoItem/TodoItem";

describe("Todo", () => {
    it("should render todo list", () => {
        render(
            <Todo>
                <TodoItem
                    id="1"
                    title="Estudar React"
                    content="Estudar React Testing Library"
                    conclusionStatus={false}
                    onChange={() => {}}
                />
            </Todo>
        );

        const todoList = screen.getByRole("list");

        expect(todoList).toBeInTheDocument();
    });

    it("should render empty list when no items are provided", () => {
        render(<Todo />);

        const todoList = screen.getByRole("list");

        expect(todoList).toBeInTheDocument();
        expect(todoList).toBeEmptyDOMElement();
    });

    it("should render todo items", () => {
        render(
            <Todo>
                <TodoItem
                    id="1"
                    title="Estudar React"
                    content="Estudar React Testing Library"
                    conclusionStatus={false}
                    onChange={() => {}}
                />
            </Todo>
        );

        expect(screen.getByText("Estudar React:")).toBeInTheDocument();
        expect(
            screen.getByText("Estudar React Testing Library")
        ).toBeInTheDocument();
    });
});
