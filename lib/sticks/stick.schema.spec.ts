import { StickRecordSchema, StickSchema } from "./stick.schema";

describe("Stick Schema", () => {
    
    let defaultStickDict: unknown;

    beforeEach(() => {
        defaultStickDict = {
            name:  "asd",
            description: "asdasdasd",
            positionX: 0,
            positionY: 0,
            sizeWidth: 12,
            sizeHeight: 500,
        };
    });
    
    
    it("Should have StickRecordSchema", () => {
        expect(StickRecordSchema).toBeDefined();
    });

    it("Should have Stick Schema", () => {
        expect(StickSchema).toBeDefined();
    });


    describe("Stick Schema", () => {
        it("Should validate a valid stick dict",() => {
            const stick = StickSchema.parse(defaultStickDict);
            expect(stick).toBeDefined();
            expect(stick.name).toBe("asd")

        });
    });
});  

