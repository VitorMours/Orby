import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
    it("Renderizando o navbar", () => {
        render(<Navbar />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("Renderiza o botão de Login", () => {
        render(<Navbar />);
        expect(screen.getByRole("link", {name: "Log in"})).toBeInTheDocument();
    });

    it("Aloca corretamente o path de login no botão", () => {
        render(<Navbar/>);
        const loginLink = screen.getByRole("link", { name: "Log in" });
        expect(loginLink).toHaveAttribute("href", "/auth/login");
    });
    
    it("Renderiza o botão de Cadastro", () => {
        render(<Navbar />);
        expect(screen.getByRole("link", {name: "Sign up"})).toBeInTheDocument();
    });
    
    it("Aloca corretamente o path de sign up no botão", () => {
        render(<Navbar/>);
        const signupLink = screen.getByRole("link", { name: "Sign up" });
        expect(signupLink).toHaveAttribute("href", "/auth/signup");
    });

    describe("Desktop", () => {
        it("Deve conter os links de autenticacao explicitamente", () => {
            render(<Navbar />);
            const loginLink = screen.getByText("Log in").closest("div");
            expect(loginLink).toHaveClass("hidden", "md:flex");
        });
        it("Botao de login deve estar visivel", () => {
            render(<Navbar />);
            const button = screen.getByRole("link", { name: "Log in"});
            expect(button).toBeVisible();
        });

        it("Botao de sign up deve estar visivel", () => {
            render(<Navbar/>);
            const button = screen.getByRole("link", { name: "Sign up"});
            expect(button).toBeVisible();
        });

        it("Botao de menu deve estar invisivel", () => {
            render(<Navbar/>);
            const menuButton = screen.getByLabelText("open sidebar");
            expect(menuButton).toHaveClass("flex", "md:hidden");
        });
    });

    describe("Mobile", () => {
        it("Deve possuir botao de menu somente em telas pequenas", () => {
        render(<Navbar />);
        const menuButton = screen.getByLabelText("open sidebar");
        expect(menuButton).toHaveClass("flex", "md:hidden");
        });

        it("Menu deve conter botão de drawer para links de autenticacao", () => {
        render(<Navbar />);
        const menuButton = screen.getByLabelText("open sidebar");
        expect(menuButton).toHaveAttribute("for", "dashboard-drawer");
        });
    });
});