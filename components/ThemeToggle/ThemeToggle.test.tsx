// components/ThemeToggle.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
//import useEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "@/context/theme-context";

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}


// TODO: Corrijir o comportamento esperado dentro do sistema de forma que possibilite testar a mudanca de tema
describe("ThemeToggle", () => {
  it("renderiza o botão", async () => {
    renderWithProvider();
    await waitFor(() => {
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
  });

//  it("troca o data-theme do html ao clicar", async () => {
//    const user = userEvent.setup();
//    renderWithProvider();
//
//    await waitFor(() => {
//      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
//    });

//    await user.click(screen.getByRole("checkbox"));

//    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
//  });
});