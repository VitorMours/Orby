import { render, screen } from "@testing-library/react";
import Drawer from "./Drawer";



describe("Drawer", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render the drawer in the interface", () => {
        render(<Drawer />);
        expect(screen.getByRole("complementary")).toBeInTheDocument();
    });

    it("Deve redenrizar as opcoes de autenticacao se nao estiver autenticado", () => {
        render(<Drawer/>);
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Sign in")).toBeInTheDocument();
        expect(screen.getByText("Homepage")).not.toBeInTheDocument();
        expect(screen.getByText("Settings")).not.toBeInTheDocument();
    });

    it("Deve renderizar opcoes de navegacao se autenticado", () => {
        render(<Drawer/>);
        expect(screen.getByText("Login")).not.toBeInTheDocument();
        expect(screen.getByText("Sign in")).not.toBeInTheDocument();
        expect(screen.getByText("Homepage")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });



});