import UserService from "./user.service";

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockResolvedValue({
    getAll: () => [],
    set: () => {},
  }),
}));

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: { id: "0fa0f072-4263-4df9-ab36-2618d804c02a", firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
      error: null,
    }),
  }),
}));



describe("User Service", () => {

    it("Should have user service class defined", () => {
        const userService = new UserService();
        expect(userService).toBeDefined();
    });

    it("Should have createUser method defined", () => {
        expect(UserService.createUser).toBeDefined();
    });

    it("should have getUser method defined", () => {
        expect(UserService.getUserById).toBeDefined();
    });

    it("should have updateUser method defined", () => {
        expect(UserService.updateUserById).toBeDefined();
    });

    it("getUserById should return a user object when called with a valid userId", async () => {
        const userId = "0fa0f072-4263-4df9-ab36-2618d804c02a";
        const mockUser = { id: userId, firstName: "John", lastName: "Doe", email: "john.doe@example.com" };
        const user = await UserService.getUserById(userId);
        console.log(user);
        expect(user).toEqual(mockUser);
    });

    it("getUserById should return a error when called with a invalid userId", async () => {
        const { createServerClient } = require("@supabase/ssr");
        const mockClient = createServerClient();

        mockClient.single.mockResolvedValueOnce({
            data: null,
            error: { message: "User not found" },
        });
        const userId = "1";
        await expect(UserService.getUserById(userId)).rejects.toThrow("User not found");
    });

    it("updateUserById should return a user object when called with a valid userId and body", async () => {});
});