import { CreateStickSchema, StickRecordSchema, StickSchema } from "./stick.schema";

describe("Stick Schemas", () => {
    
    let defaultStickDict: unknown;

    beforeEach(() => {
        defaultStickDict = {
            name:  "asd",
            description: "asdasdasd",
            positionX: -1,
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

    it("Should have CreateStickSchema", () => {
        expect(CreateStickSchema).toBeDefined();
    });


    describe("Stick Default Schema", () => {
        it("Should validate a valid stick dict",() => {
            const stick = StickSchema.parse(defaultStickDict);
            expect(stick).toBeDefined();
            expect(stick.name).toBe("asd");
            expect(stick.description).toBe("asdasdasd");
            expect(stick.positionX).toBe(-1);
            expect(stick.positionY).toBe(0);
            expect(stick.sizeWidth).toBe(12);
            expect(stick.sizeHeight).toBe(500);
        });

        it("Should raise error when receive invalid dict", () => {
            const invalidDict = {
                name:  12,
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth: 12,
                sizeHeight: 500,
            }; 
            expect(() => StickSchema.parse(invalidDict)).toThrow();
        });

        it("Should raise error with name smaller then 1", () => {
            const invalidDict = {
                name:  "",
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth: 12,
                sizeHeight: 500,
            }; 
            expect(() => StickSchema.parse(invalidDict)).toThrow();

            const validDict = {
                name:  "1",
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth: 12,
                sizeHeight: 500,
            }; 
            const stick = StickSchema.parse(validDict); 
            expect(stick).toBeDefined();
            expect(stick.name).toBe("1");
            expect(stick.description).toBe("asdasdasd");
        });

        it("Should raise error with sizes smaller then 1", () => {
            const invalidDict1 = {
                name:  "asd",
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth: 0,
                sizeHeight: 12,
            }; 
            const invalidDict2 = {
                name:  "asd",
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth:12,
                sizeHeight: 0,
            }; 
            const invalidDict3 = {
                name:  "asd",
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth: 0,
                sizeHeight: 0,
            }; 

            expect(() => StickSchema.parse(invalidDict1)).toThrow();
            expect(() => StickSchema.parse(invalidDict2)).toThrow();
            expect(() => StickSchema.parse(invalidDict3)).toThrow();

            const validDict = {
                name:  "1",
                description: "asdasdasd",
                positionX: -1,
                positionY: 0,
                sizeWidth: 12,
                sizeHeight: 500,
            }; 
            const stick = StickSchema.parse(validDict); 
            expect(stick).toBeDefined();
            expect(stick.name).toBe("1");
            expect(stick.description).toBe("asdasdasd");     
        })
    });
});  

