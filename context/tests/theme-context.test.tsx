// contexts/ThemeContext.test.tsx
import { renderHook, act, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { ThemeProvider, useTheme } from "../theme-context";

function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("useTheme", () => {
  it("lança erro se usado fora do ThemeProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme deve ser usado dentro de um ThemeProvider"
    );

    spy.mockRestore();
  });

  it("inicia com tema 'light' por padrão", async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => {
      expect(result.current.theme).toBe("light");
    });
  });

  it("alterna entre light e dark ao chamar toggleTheme", async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => expect(result.current.theme).toBe("light"));

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("persiste o tema no localStorage", async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => expect(result.current.theme).toBe("light"));

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("lê o tema salvo no localStorage ao montar", async () => {
    localStorage.setItem("theme", "dark");

    const { result } = renderHook(() => useTheme(), { wrapper });

    await waitFor(() => {
      expect(result.current.theme).toBe("dark");
    });
  });
});