import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";


// TODO: TErminar de fazer o componente com base no TDD
describe("TodoItem", () => {
    it("deve renderizar corretamente o todo-item", () => {
        render(<TodoItem 
                    id="1" 
                    title="Estudar React" 
                    content="" 
                    conclusionStatus={false}
                    onChange={() => {}} 
        />);
        const item = screen.getByRole("checkbox");
        expect(item).toBeInTheDocument();
    });

    it("O todo-item deve estar dentro de um list", () => {
        render(<TodoItem
                    id="1" 
                    title="Estudar React" 
                    content="" 
                    conclusionStatus={false}
                    onChange={() => {}} 
        />);
        const item = screen.getByRole("checkbox").parentElement;
        expect(item).toBeInTheDocument();
        expect(item?.tagName).toBe("LI");
        expect(item).toHaveRole("listitem");
    });
});