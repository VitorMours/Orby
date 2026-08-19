import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

// TODO: Terminar de fazer as coisas com base no TDD
describe("Todo", () => {
    it("should render todo list", () => {
        const component = render(<Todo/>);
        const todoList = screen.getByRole("list");
        expect(todoList).toBeInTheDocument(); 
    });
});