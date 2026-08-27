import { requestMiddleware } from "./request.middleware";
import { MiddlewareFn } from "./types";

describe("Request Middleware", () => {
    it("Deve ser uma instancia de <MiddlewareFn>", () => {
        expect(typeof requestMiddleware).toBe("function");
    });
});
