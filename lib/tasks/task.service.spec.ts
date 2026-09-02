import TaskService from "./task.service";

describe("Task Service", () => {
    it("should be defined", () => {
        expect(TaskService).toBeDefined();
    });

    //it("should have a createTask method", () => {
    //    const taskService = new TaskService();
    //    expect(taskService.createTask).toBeDefined();
    //});

    it("should have a getTasks method", () => {
        const taskService = new TaskService();
        expect(taskService.getTasks).toBeDefined();
    });

    //it("", () => {});



});