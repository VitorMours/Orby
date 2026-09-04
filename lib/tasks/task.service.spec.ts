import TaskService from "./task.service";

const mockListSelect = jest.fn();
const mockCreateSelect = jest.fn();
const mockSingle = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockEq = jest.fn();
const mockFrom = jest.fn(() => ({
    select: mockListSelect,
    insert: mockInsert,
    update: mockUpdate,
}));

jest.mock("@/lib/supabase", () => ({
    createSupabaseServer: jest.fn(async () => ({ from: mockFrom })),
}));

describe("Task Service", () => {
    const task: any = {
        name: "Study TypeScript",
        description: "Review service tests",
        conclusion: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockInsert.mockReturnValue({ select: mockCreateSelect });
        mockUpdate.mockReturnValue({ eq: mockEq });
        mockEq.mockReturnValue({ select: mockCreateSelect });
        mockCreateSelect.mockReturnValue({ single: mockSingle });
    });

    it("should be defined", () => {
        expect(TaskService).toBeDefined();
    });

    it("should have a createTask method", () => {
        const taskService = new TaskService();
        expect(taskService.createTask).toBeDefined();
    });

    it("should have a getTasks method", () => {
        const taskService = new TaskService();
        expect(taskService.getTasks).toBeDefined();
    });

    describe("getTasks", () => {
        it("should return all tasks", async () => {
            mockListSelect.mockResolvedValue({ data: [task], error: null });

            const tasks = await new TaskService().getTasks();

            expect(tasks).toEqual([task]);
            expect(mockFrom).toHaveBeenCalledWith("tasks");
            expect(mockListSelect).toHaveBeenCalledWith("*");
        });

        it("should throw when loading tasks fails", async () => {
            mockListSelect.mockResolvedValue({
                data: null,
                error: { message: "Unable to load tasks" },
            });

            await expect(new TaskService().getTasks()).rejects.toThrow("Unable to load tasks");
        });
    });

    describe("createTask", () => {
        it("should create and return a task", async () => {
            mockSingle.mockResolvedValue({ data: task, error: null });

            const createdTask = await new TaskService().createTask(task);

            expect(createdTask).toEqual(task);
            expect(mockFrom).toHaveBeenCalledWith("tasks");
            expect(mockInsert).toHaveBeenCalledWith(task);
            expect(mockCreateSelect).toHaveBeenCalledWith();
            expect(mockSingle).toHaveBeenCalledWith();
        });

        it("should throw when task creation fails", async () => {
            mockSingle.mockResolvedValue({
                data: null,
                error: { message: "Unable to create task" },
            });

            await expect(new TaskService().createTask(task)).rejects.toThrow("Unable to create task");
        });
    });

    describe("updateTask", () => {
        it("should update and return a task", async () => {
            mockSingle.mockResolvedValue({ data: task, error: null });

            const updatedTask = await new TaskService().updateTask("task-id", task);

            expect(updatedTask).toEqual(task);
            expect(mockFrom).toHaveBeenCalledWith("tasks");
            expect(mockUpdate).toHaveBeenCalledWith(task);
            expect(mockEq).toHaveBeenCalledWith("id", "task-id");
            expect(mockCreateSelect).toHaveBeenCalledWith();
            expect(mockSingle).toHaveBeenCalledWith();

        });

        it("should throw when task update fails", async () => {
            mockSingle.mockResolvedValue({
                data: null,
                error: { message: "Unable to update task" },
            });

            await expect(new TaskService().updateTask("task-id", { name: "Updated task" }))
                .rejects.toThrow("Unable to update task");
        });
    });
});