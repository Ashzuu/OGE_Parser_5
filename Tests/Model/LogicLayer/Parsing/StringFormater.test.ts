import { StringParser } from "../../../../src/Model/LogicLayer/Parsing/StringParser";

describe('StringParser', () => {
    describe('TestClearCoefficient', () => {
        test('Integers', () => {
            let result: number;
            
            result = StringParser.ClearCoefficient("(1)");
            expect(result).toBe(1);
            result = StringParser.ClearCoefficient("(1.0)");
            expect(result).toBe(1);
            result = StringParser.ClearCoefficient("(01.00)");
            expect(result).toBe(1);

            result = StringParser.ClearCoefficient("(10)");
            expect(result).toBe(10);
            result = StringParser.ClearCoefficient("(10.0)");
            expect(result).toBe(10);
            result = StringParser.ClearCoefficient("(10.00)");
            expect(result).toBe(10);
        });
        test('Decimals', () => {
            let result: number;
            
            result = StringParser.ClearCoefficient("(0.1)");
            expect(result).toBe(0.1);
            result = StringParser.ClearCoefficient("(1.1)");
            expect(result).toBe(1.1);
            result = StringParser.ClearCoefficient("(00.11)");
            expect(result).toBe(0.11);
            
            result = StringParser.ClearCoefficient("(10.50)");
            expect(result).toBe(10.5);
            result = StringParser.ClearCoefficient("(10.05)");
            expect(result).toBe(10.05);
            result = StringParser.ClearCoefficient("(20.23)");
            expect(result).toBe(20.23);
        });
    });
    describe('TestNormalizeGrade', () => {
        test('General Test', () => {
            let result: number;
            
            result = (StringParser as any).NormalizeGrade("20/20");
            expect(result).toBe(20);
            result = (StringParser as any).NormalizeGrade("10/10");
            expect(result).toBe(20);
            result = (StringParser as any).NormalizeGrade("50/50");
            expect(result).toBe(20);
        
            result = (StringParser as any).NormalizeGrade("10/20");
            expect(result).toBe(10);
            result = (StringParser as any).NormalizeGrade("5/10");
            expect(result).toBe(10);
            result = (StringParser as any).NormalizeGrade("25/50");
            expect(result).toBe(10);
            
            result = (StringParser as any).NormalizeGrade("5/20");
            expect(result).toBe(5);
            result = (StringParser as any).NormalizeGrade("2.5/10");
            expect(result).toBe(5);
            result = (StringParser as any).NormalizeGrade("12.5/50");
            expect(result).toBe(5);
            
            result = (StringParser as any).NormalizeGrade("0/20");
            expect(result).toBe(0);
            result = (StringParser as any).NormalizeGrade("0/10");
            expect(result).toBe(0);
            result = (StringParser as any).NormalizeGrade("0/50");
            expect(result).toBe(0);
        });
    });
    describe('TestGetNotesFromSectionInnerText', () => {
        test('Normal Test Case', () => {
            let testString: string;
            let result: {grade: number; coefficient: number; }[];

            testString = '\n                                            TD  [\n                                            \n                                                    5.00/5.0\n                                                    (1.0)\n                                                    4.00/5.0\n                                                    (3.0)\n                                            ] (1.0)\n                                        ';
            result = StringParser.GetNotesFromSectionInnerText(testString);
            expect(result.length).toBe(2);
            expect(result[0].grade).toBe(20);
            expect(result[0].coefficient).toBe(1);
            expect(result[1].grade).toBe(16);
            expect(result[1].coefficient).toBe(3);
            
            testString = '\n                                            TD1 Transactions [\n                                            \n                                                    18.00/20.0\n                                                    (1.0)\n                                            ] (1.0)\n                                        ';
            result = StringParser.GetNotesFromSectionInnerText(testString);
            expect(result.length).toBe(1);
            expect(result[0].grade).toBe(18);
            expect(result[0].coefficient).toBe(1);
        });

    });
    describe('TestGetGradeCoefficientPairs', () => {
        test('Normal Test Case', () => {
            let testString: string;
            let result: {grade: number; coefficient: number; }[];

            testString = '\n                                            \n                                                    5.00/5.0\n                                                    (1.0)\n                                                    4.00/5.0\n                                                    (3.0)\n                                            ';
            result = (StringParser as any).GetGradeCoefficientPairs(testString);
            const expectedResult = [{ grade: 20, coefficient: 1 }, { grade: 16, coefficient: 3 }]; 
            expect(result).toEqual(expectedResult);
        });
    });
});