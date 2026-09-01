import { TaskSchema } from "./task.schema";

describe("Task Schema", () => {
  let defaultTaskDict: { name: string; description: string; conclusion: boolean };

  beforeEach(() => {
    defaultTaskDict = {
      name: "task 1",
      description: "task 1 description",
      conclusion: false
    };
  });

  it("should validate a valid dict task", () => {
    const task = TaskSchema.parse(defaultTaskDict);
    expect(task).toBeDefined();
    expect(task.name).toBe(defaultTaskDict.name);
  });

  it("should can access valid task data", () => {
    const task = TaskSchema.parse({
      name: "task 1",
      description: "task 1 description",
      conclusion: false
    });
    expect(task).toBeDefined();
    expect(task.name).toBe("task 1");
    expect(task.description).toBe("task 1 description");
    expect(task.conclusion).toBe(false);
  });

  it("should reject an invalid name task", () => {
    const result = TaskSchema.safeParse({
      name: "ab",
      description: "desc",
      conclusion: false
    });
    expect(result.success).toBe(false);
  });

  it("should reject an invalid description task", () => {
    const result = TaskSchema.safeParse({
      name: "task 1",
      description: "ababababababababababababababababababababababababababababababababababababababababababababababababababa",
      conclusion: false
    });
    expect(result.success).toBe(false);
  });

  it("should reject an invalid conclusion task", () => {
    const result = TaskSchema.safeParse({
      name: "task 1",
      description: "asdsad",
      conclusion: ""
    });
    expect(result.success).toBe(false);
  });
});