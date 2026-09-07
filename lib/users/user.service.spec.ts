import UserService from "./user.service";

const mockSingle = jest.fn();
const mockSelect = jest.fn();
const mockEq = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockFrom = jest.fn(() => ({
    select: mockSelect,
    eq: mockEq,
    single: mockSingle,
    insert: mockInsert,
  update: mockUpdate,
}));

jest.mock("@/lib/supabase", () => ({
    createSupabaseServer: jest.fn(async () => ({ from: mockFrom })),
}));



describe("User Service", () => {
  const userId = "0fa0f072-4263-4df9-ab36-2618d804c02a";
  const mockUser = { id: userId, firstName: "John", lastName: "Doe", email: "john.doe@example.com" };
  const createUserBody = { firstName: "John", lastName: "Doe", email: "john.doe@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelect.mockReturnValue({ eq: mockEq, single: mockSingle });
    mockEq.mockReturnValue({ single: mockSingle, select: mockSelect });
    mockInsert.mockReturnValue({ select: mockSelect });
    mockUpdate.mockReturnValue({ eq: mockEq });
  });

    it("Should have user service class defined", () => {
        const userService = new UserService();
        expect(userService).toBeDefined();
    });

    it("Should have createUser method defined", () => {
        expect(UserService.createUser).toBeDefined();
    });

    it("should have getUserById method defined", () => {
        expect(UserService.getUserById).toBeDefined();
    });

    it("should have updateUserById method defined", () => {
        expect(UserService.updateUserById).toBeDefined();
    });


    describe("getUserById", () => {
        it("getUserById should return a user object when called with a valid userId", async () => {
          mockSingle.mockResolvedValue({ data: mockUser, error: null });

            const user = await UserService.getUserById(userId);

            expect(user).toEqual(mockUser);
          expect(mockFrom).toHaveBeenCalledWith("users");
          expect(mockEq).toHaveBeenCalledWith("id", userId);
        });

        it("getUserById should return a error when called with a invalid userId", async () => {
          mockSingle.mockResolvedValue({
                data: null,
                error: { message: "User not found" },
            });

            await expect(UserService.getUserById(userId)).rejects.toThrow("User not found");
        });
    });

    describe("createUser", () => {
      it("should return the created user", async () => {
        mockSelect.mockResolvedValue({ data: [mockUser], error: null });

        const user = await UserService.createUser(createUserBody);

        expect(user).toEqual(mockUser);
        expect(mockFrom).toHaveBeenCalledWith("users");
        expect(mockInsert).toHaveBeenCalledWith(createUserBody);
      });

      it("should throw when user creation fails", async () => {
        mockSelect.mockResolvedValue({
          data: [],
          error: { message: "Unable to create user" },
        });

        await expect(UserService.createUser(createUserBody)).rejects.toThrow("Unable to create user");
      });
    });

    describe("updateUserById", () => {
      it("should return the updated user", async () => {
        const updateBody = { firstName: "Jane" };
        mockSelect.mockReturnValue({ single: mockSingle });
        mockSingle.mockResolvedValue({ data: { ...mockUser, ...updateBody }, error: null });

        const user = await UserService.updateUserById(userId, updateBody);

        expect(user).toEqual({ ...mockUser, ...updateBody });
        expect(mockFrom).toHaveBeenCalledWith("users");
        expect(mockUpdate).toHaveBeenCalledWith(updateBody);
        expect(mockEq).toHaveBeenCalledWith("id", userId);
      });

      it("should throw when user update fails", async () => {
        mockSelect.mockReturnValue({ single: mockSingle });
        mockSingle.mockResolvedValue({
          data: null,
          error: { message: "Unable to update user" },
        });

        await expect(UserService.updateUserById(userId, { firstName: "Jane" }))
          .rejects.toThrow("Unable to update user");
      });
    });
});