import { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from "./task.schema";

describe("Task Schema", () => {
  let defaultTaskDict: { title: string; content: string | null; conclusionStatus: boolean };

  beforeEach(() => {
    defaultTaskDict = {
      title: "task 1",
      content: "task 1 description",
      conclusionStatus: false
    };
  });

  it("should validate a valid dict task", () => {
    const task = TaskSchema.parse(defaultTaskDict);
    expect(task).toBeDefined();
    expect(task.title).toBe(defaultTaskDict.title);
  });

  it("should can access valid task data", () => {
    const task = TaskSchema.parse({
      title: "task 1",
      content: "task 1 description",
      conclusionStatus: false
    });
    expect(task).toBeDefined();
    expect(task.title).toBe("task 1");
    expect(task.content).toBe("task 1 description");
    expect(task.conclusionStatus).toBe(false);
  });

  it("should reject an invalid name task", () => {
    const result = TaskSchema.safeParse({
      title: "",
      content: "desc",
      conclusionStatus: false
    });
    expect(result.success).toBe(false);
  });

  it("should reject an invalid description task", () => {
    const result = TaskSchema.safeParse({
      title: "task 1",
      content: "ababababababababababababababababababababababababababababababababababababababababababababababababababa",
      conclusionStatus: false
    });
    expect(result.success).toBe(false);
  });

  it("should reject an invalid conclusion task", () => {
    const result = TaskSchema.safeParse({
      title: "task 1",
      content: "asdsad",
      conclusionStatus: ""
    });
    expect(result.success).toBe(false);
  });

  it("should validate a task creation payload", () => {
    expect(CreateTaskSchema.safeParse({ title: "task 1" }).success).toBe(true);
  });

  it("should reject an empty task update", () => {
    expect(UpdateTaskSchema.safeParse({}).success).toBe(false);
  });
});