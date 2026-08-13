import { render } from "@testing-library/react";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
        <AuthProvider>
            <ThemeProvider initialTheme="light">
                {ui}
            </ThemeProvider>
        </AuthProvider>
    );
}