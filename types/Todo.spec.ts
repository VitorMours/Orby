import { Todo } from "./Todo";



describe("Type: todo", () => {
    it("deve aceitar um objeto válido", () => {
        const func = () => {};
        const todo: Todo = {
            id: "1",
            title: "Estudar Jest",
            content: "Aprender testes",
            conclusionStatus: false,
            onChange: func
        };

        expect(todo).toEqual({
            id: "1",
            title: "Estudar Jest",
            content: "Aprender testes",
            conclusionStatus: false,
            onChange: func
        });
    });
});