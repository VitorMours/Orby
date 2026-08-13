import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import useAuth from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

jest.mock("@/context/auth-context", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

function renderNavbar() {
    return render(
        <ThemeProvider initialTheme="light">
            <Navbar />
        </ThemeProvider>
    );
}

describe("Navbar", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseAuth.mockReturnValue({
            user: null,
            isAuthenticated: false,
            loading: false,
            login: jest.fn(),
            logout: jest.fn(),
            validate: jest.fn(),
        });
    });

    it("Renderizando o navbar", () => {
        renderNavbar();
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("Renderiza o botão de Login", () => {
        renderNavbar();
        expect(screen.getByRole("link", {name: "Log in"})).toBeInTheDocument();
    });

    it("Aloca corretamente o path de login no botão", () => {
        renderNavbar();
        const loginLink = screen.getByRole("link", { name: "Log in" });
        expect(loginLink).toHaveAttribute("href", "/auth/login");
    });
    
    it("Renderiza o botão de Cadastro", () => {
        renderNavbar();
        expect(screen.getByRole("link", {name: "Sign up"})).toBeInTheDocument();
    });
    
    it("Aloca corretamente o path de sign up no botão", () => {
        renderNavbar();
        const signupLink = screen.getByRole("link", { name: "Sign up" });
        expect(signupLink).toHaveAttribute("href", "/auth/signup");
    });

    describe("Desktop", () => {
        it("Deve conter os links de autenticacao explicitamente", () => {
            renderNavbar();
            const loginLink = screen.getByText("Log in").closest("div");
            expect(loginLink).toHaveClass("hidden", "md:flex");
        });
        it("Botao de login deve estar visivel", () => {
            renderNavbar();
            const button = screen.getByRole("link", { name: "Log in"});
            expect(button).toBeVisible();
        });

        it("Botao de sign up deve estar visivel", () => {
            renderNavbar();
            const button = screen.getByRole("link", { name: "Sign up"});
            expect(button).toBeVisible();
        });

        it("Botao de menu deve estar invisivel", () => {
            renderNavbar();
            const menuButton = screen.getByLabelText("open sidebar");
            expect(menuButton).toHaveClass("flex", "md:hidden");
        });
    });

    describe("Mobile", () => {
        it("Deve possuir botao de menu somente em telas pequenas", () => {
        renderNavbar();
        const menuButton = screen.getByLabelText("open sidebar");
        expect(menuButton).toHaveClass("flex", "md:hidden");
        });

        it("Menu deve conter botão de drawer para links de autenticacao", () => {
        renderNavbar();
        const menuButton = screen.getByLabelText("open sidebar");
        expect(menuButton).toHaveAttribute("for", "dashboard-drawer");
        });
    });
});