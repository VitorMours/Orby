import { CreateUserSchema, UserSchema } from "./user.schema";

const validUser = {
    id: "0fa0f072-4263-4df9-ab36-2618d804c02a",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
};

const validCreateUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
};

describe("UserSchema", () => {
    describe("Schema definitions", () => {
        it("should have UserSchema defined", () => {
            expect(UserSchema).toBeDefined();
        });

        it("should have CreateUserSchema defined", () => {
            expect(CreateUserSchema).toBeDefined();
        });
    });

    describe("Valid users", () => {
        it("should validate a valid user object", () => {
            const result = UserSchema.safeParse(validUser);

            expect(result.success).toBe(true);
        });

        it("should validate a valid create user object", () => {
            const result = CreateUserSchema.safeParse(validCreateUser);

            expect(result.success).toBe(true);
        });
    });

    describe("Required fields", () => {
        it.each(["id", "firstName", "lastName", "email"])(
            "should reject a user without %s",
            (field) => {
                const user = { ...validUser };
                delete user[field as keyof typeof user];

                expect(UserSchema.safeParse(user).success).toBe(false);
            },
        );

        it.each(["firstName", "lastName", "email"])(
            "should reject a create user without %s",
            (field) => {
                const user = { ...validCreateUser };
                delete user[field as keyof typeof user];

                expect(CreateUserSchema.safeParse(user).success).toBe(false);
            },
        );
    });

    describe("Invalid field types", () => {
        it.each([
            ["id", { ...validUser, id: 123 }],
            ["firstName", { ...validUser, firstName: 123 }],
            ["lastName", { ...validUser, lastName: 123 }],
            ["email", { ...validUser, email: 123 }],
        ])("should reject an invalid %s type", (_, user) => {
            expect(UserSchema.safeParse(user).success).toBe(false);
        });

        it.each([
            ["firstName", { ...validCreateUser, firstName: 123 }],
            ["lastName", { ...validCreateUser, lastName: 123 }],
            ["email", { ...validCreateUser, email: 123 }],
        ])("should reject an invalid create user %s type", (_, user) => {
            expect(CreateUserSchema.safeParse(user).success).toBe(false);
        });
    });

    describe("ID validation", () => {
        it("should reject an invalid UUID", () => {
            expect(
                UserSchema.safeParse({ ...validUser, id: "0" }).success,
            ).toBe(false);
        });

        it("should reject an empty UUID", () => {
            expect(
                UserSchema.safeParse({ ...validUser, id: "" }).success,
            ).toBe(false);
        });

        it("should reject a null UUID", () => {
            expect(
                UserSchema.safeParse({ ...validUser, id: null }).success,
            ).toBe(false);
        });
    });

    describe("Email validation", () => {
        it.each([
            "john.doe",
            "john.doe@",
            "@example.com",
            "john doe@example.com",
            "",
        ])("should reject invalid email: %s", (email) => {
            expect(
                UserSchema.safeParse({ ...validUser, email }).success,
            ).toBe(false);
        });

        it("should reject an invalid email in CreateUserSchema", () => {
            expect(
                CreateUserSchema.safeParse({
                    ...validCreateUser,
                    email: "invalid-email",
                }).success,
            ).toBe(false);
        });
    });

    describe("Invalid objects", () => {
        it("should reject an empty object", () => {
            expect(UserSchema.safeParse({}).success).toBe(false);
            expect(CreateUserSchema.safeParse({}).success).toBe(false);
        });

        it("should reject null and undefined", () => {
            expect(UserSchema.safeParse(null).success).toBe(false);
            expect(UserSchema.safeParse(undefined).success).toBe(false);
            expect(CreateUserSchema.safeParse(null).success).toBe(false);
            expect(CreateUserSchema.safeParse(undefined).success).toBe(false);
        });

        it("should reject non-object values", () => {
            expect(UserSchema.safeParse("user").success).toBe(false);
            expect(CreateUserSchema.safeParse("user").success).toBe(false);
        });
    
    });
});