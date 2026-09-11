import { ZodError, ZodUUID } from "zod";
import { NoteSchema, NoteUpdateSchema, NoteCreateSchema, Note } from "./note.schema";

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

    describe("NoteSchema", () => {
        it("Should be able to validate notes with schema", () => {
            const note: Note = {title:"asd", content:"asd"};
            const parse = NoteSchema.parse(note);
            expect(parse.title).toBe(note.title);
            expect(parse.content).toBe(note.title);
        });
        
        it("Should be able to raise error missing title data", () => {
            const note: Note = {title:"", content:"asd"};
            expect(() => NoteSchema.safeParse(note)).toThrow(ZodError);
            
        });
    });


});