import { authMiddleware } from "./auth.middleware";
import { MiddlewareFn } from "./types";

describe("Auth Middleware", () => {
    it("Deve ser uma instancia de <MiddlewareFn>", () => {
        expect(typeof authMiddleware).toBe("function");
    });
});
