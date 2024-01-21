import { Parser } from "webpack";
import { GradeParser } from "../../src/Model/LogicLayer/Parsing/GradeParser";
import { TestsSetup } from "../Mocks/TestsSetup";

beforeEach(() => {
    TestsSetup.SetupMockBody();
});

test("GradeParser", () => {
    describe("Counts each elements properly", () => {
        it("Counting UEs", () => {
            expect(GradeParser.Instance.UECount).toBe(6);
        });
        it("Counting Resources", () => {
            expect(GradeParser.Instance.RessourceCount(0)).toBe(0);
            expect(GradeParser.Instance.RessourceCount(1)).toBe(1);
            expect(GradeParser.Instance.RessourceCount(2)).toBe(7);
            expect(GradeParser.Instance.RessourceCount(3)).toBe(5);
            expect(GradeParser.Instance.RessourceCount(4)).toBe(6);
            expect(GradeParser.Instance.RessourceCount(5)).toBe(7);
        });
        it("Counting Sections", () => {

        });
    });
});