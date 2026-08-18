import { render, screen } from "@testing-library/react";
import Drawer from "./Drawer";
import useAuth from "@/context/auth-context";

jest.mock("@/context/auth-context", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe("Drawer", () => {
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

    it("Deve renderizar o drawer na interface", () => {
        render(<Drawer />);

        expect(
            screen.getByRole("complementary")
        ).toBeInTheDocument();
    });

    describe("Usuário não autenticado", () => {

        it("Deve renderizar as opções de autenticação", () => {
            render(<Drawer />);

            expect(
                screen.getByText("Login")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Sign in")
            ).toBeInTheDocument();

            expect(
                screen.queryByText("Homepage")
            ).not.toBeInTheDocument();

            expect(
                screen.queryByText("Settings")
            ).not.toBeInTheDocument();
        });

        it("Login deve apontar para /auth/login", () => {
            render(<Drawer />);

            expect(
                screen.getByRole("link", { name: "Login" })
            ).toHaveAttribute("href", "/auth/login");
        });

        it("Sign in deve apontar para /auth/signup", () => {
            render(<Drawer />);

            expect(
                screen.getByRole("link", { name: "Sign in" })
            ).toHaveAttribute("href", "/auth/signup");
        });
    });

    describe("Usuário autenticado", () => {

        beforeEach(() => {
            mockUseAuth.mockReturnValue({
                user: {} as any,
                isAuthenticated: true,
                loading: false,
                login: jest.fn(),
                logout: jest.fn(),
                validate: jest.fn(),
            });
        });

        it("Deve renderizar as opções de navegação", () => {
            render(<Drawer />);

            expect(
                screen.getByText("Homepage")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Settings")
            ).toBeInTheDocument();

            expect(
                screen.queryByText("Login")
            ).not.toBeInTheDocument();

            expect(
                screen.queryByText("Sign in")
            ).not.toBeInTheDocument();
        });
    });
});