import TaskService from "./task.service";
import { TaskRecord } from "./task.schema";

const mockListSelect = jest.fn();
const mockCreateSelect = jest.fn();
const mockSingle = jest.fn();
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockEq = jest.fn();
const mockEqOwner = jest.fn();
const mockListEq = jest.fn();
const mockFrom = jest.fn(() => ({
    select: mockListSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
}));

jest.mock("@/lib/supabase", () => ({
    createSupabaseServer: jest.fn(async () => ({ from: mockFrom })),
}));

describe("Task Service", () => {
    const ownerId = "0fa0f072-4263-4df9-ab36-2618d804c02a";
    const task: TaskRecord = {
        id: "0fa0f072-4263-4df9-ab36-2618d804c02a",
        title: "Study TypeScript",
        content: "Review service tests",
        conclusionStatus: false,
        createdAt: "2026-09-15T00:00:00.000Z",
        updatedAt: "2026-09-15T00:00:00.000Z",
        archivedAt: null,
        owner: ownerId,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockInsert.mockReturnValue({ select: mockCreateSelect });
        mockUpdate.mockReturnValue({ eq: mockEq });
        mockDelete.mockReturnValue({ eq: mockEq });
        mockEq.mockReturnValue({ eq: mockEqOwner, select: mockCreateSelect });
        mockEqOwner.mockReturnValue({ select: mockCreateSelect });
        mockListSelect.mockReturnValue({ eq: mockListEq });
        mockCreateSelect.mockReturnValue({ single: mockSingle });
    });

    it("should be defined", () => {
        expect(TaskService).toBeDefined();
    });

    it("should have a createTask method", () => {
        expect(TaskService.createTask).toBeDefined();
    });

    it("should have a getTasks method", () => {
        expect(TaskService.getTasks).toBeDefined();
    });

    describe("getTasks", () => {
        it("should return all tasks", async () => {
            mockListEq.mockResolvedValue({ data: [task], error: null });

            const tasks = await TaskService.getTasks(ownerId);

            expect(tasks).toEqual([task]);
            expect(mockFrom).toHaveBeenCalledWith("todo");
            expect(mockListSelect).toHaveBeenCalledWith("*");
        });

        it("should throw when loading tasks fails", async () => {
            mockListEq.mockResolvedValue({
                data: null,
                error: { message: "Unable to load tasks" },
            });

            await expect(TaskService.getTasks(ownerId)).rejects.toThrow("Unable to load tasks");
        });
    });

    describe("createTask", () => {
        it("should create and return a task", async () => {
            mockSingle.mockResolvedValue({ data: task, error: null });

            const createdTask = await TaskService.createTask(ownerId, task);

            expect(createdTask).toEqual(task);
            expect(mockFrom).toHaveBeenCalledWith("todo");
            expect(mockInsert).toHaveBeenCalledWith({ ...task, owner: ownerId });
            expect(mockCreateSelect).toHaveBeenCalledWith();
            expect(mockSingle).toHaveBeenCalledWith();
        });

        it("should throw when task creation fails", async () => {
            mockSingle.mockResolvedValue({
                data: null,
                error: { message: "Unable to create task" },
            });

            await expect(TaskService.createTask(ownerId, task)).rejects.toThrow("Unable to create task");
        });
    });

    describe("updateTask", () => {
        it("should update and return a task", async () => {
            mockSingle.mockResolvedValue({ data: task, error: null });

            const updatedTask = await TaskService.updateTask(ownerId, "task-id", { title: task.title });

            expect(updatedTask).toEqual(task);
            expect(mockFrom).toHaveBeenCalledWith("todo");
            expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({ title: task.title }));
            expect(mockEq).toHaveBeenCalledWith("id", "task-id");
            expect(mockEqOwner).toHaveBeenCalledWith("owner", ownerId);
            expect(mockCreateSelect).toHaveBeenCalledWith();
            expect(mockSingle).toHaveBeenCalledWith();

        });

        it("should throw when task update fails", async () => {
            mockSingle.mockResolvedValue({
                data: null,
                error: { message: "Unable to update task" },
            });

            await expect(TaskService.updateTask(ownerId, "task-id", { title: "Updated task" }))
                .rejects.toThrow("Unable to update task");
        });
    });

    describe("deleteTask", () => {
        it("should delete a task", async () => {
            mockEqOwner.mockResolvedValue({ data: null, error: null });

            await TaskService.deleteTask(ownerId, "task-id");

            expect(mockFrom).toHaveBeenCalledWith("todo");
            expect(mockDelete).toHaveBeenCalledWith();
            expect(mockEq).toHaveBeenCalledWith("id", "task-id");
            expect(mockEqOwner).toHaveBeenCalledWith("owner", ownerId);
        });

        it("should throw when deletion fails", async () => {
            mockEqOwner.mockResolvedValue({
                data: null,
                error: { message: "Unable to delete task" },
            });

            await expect(TaskService.deleteTask(ownerId, "task-id")).rejects.toThrow("Unable to delete task");
        });
    });
});