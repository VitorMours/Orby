import { NoteSchema, NoteUpdateSchema, NoteCreateSchema } from "./note.schema";

describe("Note Schema", () => {

    it("Should note schema be defined", () => {
        expect(NoteSchema).toBeDefined();
    });

    it("Should note update schema be defined", () => {
        expect(NoteUpdateSchema).toBeDefined();
    });

    it("Should note create schema be defined", () => {
        expect(NoteCreateSchema).toBeDefined();
    });

    // describe("NoteSchema", () => {
    //     it("Should be able to create notes from schema", () => {
            

    //     });
        
    //     it("Should be able to validate notes with schema", () => {


    //     });
    // });


});