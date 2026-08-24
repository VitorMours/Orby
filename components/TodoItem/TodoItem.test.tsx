import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
    const defaultProps = {
        id: "1",
        title: "Estudar React",
        content: "Estudar testes unitários",
        conclusionStatus: false,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve renderizar o todo-item corretamente", () => {
        render(<TodoItem {...defaultProps} />);

        expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("deve renderizar o todo dentro de um list item", () => {
        render(<TodoItem {...defaultProps} />);

        const item = screen.getByRole("listitem");

        expect(item).toBeInTheDocument();
        expect(item.tagName).toBe("LI");
    });

    it("deve renderizar o título do todo", () => {
        render(<TodoItem {...defaultProps} />);

        expect(
            screen.getByText("Estudar React")
        ).toBeInTheDocument();
    });

    it("deve renderizar o conteúdo do todo", () => {
        render(<TodoItem {...defaultProps} />);

        expect(
            screen.getByText("Estudar testes unitários")
        ).toBeInTheDocument();
    });

    it("deve renderizar o checkbox", () => {
        render(<TodoItem {...defaultProps} />);

        expect(
            screen.getByRole("checkbox")
        ).toBeInTheDocument();
    });

    it("deve usar o id correto no checkbox", () => {
        render(<TodoItem {...defaultProps} />);

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).toHaveAttribute("id", "todo-1");
    });

    it("deve deixar o checkbox desmarcado quando conclusionStatus for false", () => {
        render(
            <TodoItem
                {...defaultProps}
                conclusionStatus={false}
            />
        );

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).not.toBeChecked();
    });

    it("deve deixar o checkbox marcado quando conclusionStatus for true", () => {
        render(
            <TodoItem
                {...defaultProps}
                conclusionStatus={true}
            />
        );

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).toBeChecked();
    });

    it("deve renderizar dois botões", () => {
        render(<TodoItem {...defaultProps} />);

        const buttons = screen.getAllByRole("button");

        expect(buttons).toHaveLength(2);
    });

    it("deve renderizar o botão de edição com o ícone Pencil", () => {
        render(<TodoItem {...defaultProps} />);

        const buttons = screen.getAllByRole("button");

        expect(buttons[0]).toContainHTML("<svg");
    });

    it("deve renderizar o botão de exclusão com o ícone Trash2", () => {
        render(<TodoItem {...defaultProps} />);

        const buttons = screen.getAllByRole("button");

        expect(buttons[1]).toContainHTML("<svg");
    });

    it("deve manter os dados recebidos pelas props", () => {
        render(
            <TodoItem
                id="123"
                title="Comprar pão"
                content="Comprar pão integral"
                conclusionStatus={false}
                onChange={() => {}}
            />
        );

        expect(screen.getByText("Comprar pão")).toBeInTheDocument();
        expect(
            screen.getByText("Comprar pão integral")
        ).toBeInTheDocument();

        expect(screen.getByRole("checkbox"))
            .toHaveAttribute("id", "todo-123");
    });
});