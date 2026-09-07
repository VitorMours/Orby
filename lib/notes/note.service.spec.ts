import NoteService from "./note.service";


describe("Note Service", () => {
    it("Should be note service defined", () => {
        expect(NoteService).toBeDefined();
    });

    it("Should have getNotes defined", () => {
        expect(NoteService.getNotes).toBeDefined();
    });
    
    // describe("getNotes", () => {});  
    // describe("getNoteById", () => {});  
    // describe("createNote", () => {});  
    // describe("updateNoteById", () => {});  
    // describe("deleteNoteById", () => {});  
});