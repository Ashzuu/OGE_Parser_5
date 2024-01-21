import { Parser } from "webpack";
import { GradeParser } from "../../src/Model/LogicLayer/Parsing/GradeParser";
import { TestsSetup } from "../Mocks/TestsSetup";

beforeEach(() => {
    TestsSetup.SetupMockBody();
});

describe("GradeParser", () => {
    test("Counting UEs", () => {
        expect(GradeParser.Instance.UECount).toBe(6);
    });
    test("Counting Resources", () => {
        expect(GradeParser.Instance.RessourceCount(0)).toBe(0);
        expect(GradeParser.Instance.RessourceCount(1)).toBe(1);
        expect(GradeParser.Instance.RessourceCount(2)).toBe(7);
        expect(GradeParser.Instance.RessourceCount(3)).toBe(5);
        expect(GradeParser.Instance.RessourceCount(4)).toBe(6);
        expect(GradeParser.Instance.RessourceCount(5)).toBe(7);
    });
    test("Counting Sections", () => {
        expect(GradeParser.Instance.SectionCount(2, 0)).toBe(1);
        expect(GradeParser.Instance.SectionCount(2, 1)).toBe(4);
        expect(GradeParser.Instance.SectionCount(2, 2)).toBe(2);
        expect(GradeParser.Instance.SectionCount(2, 3)).toBe(3);
        expect(GradeParser.Instance.SectionCount(2, 4)).toBe(0);
        expect(GradeParser.Instance.SectionCount(2, 5)).toBe(0);
        expect(GradeParser.Instance.SectionCount(2, 6)).toBe(5);
    });

    test("Ressource Coefficient", () => {
        expect(GradeParser.Instance.RessourceCoefficient(2, 0)).toBe(5);
        expect(GradeParser.Instance.RessourceCoefficient(2, 1)).toBe(13);
        expect(GradeParser.Instance.RessourceCoefficient(2, 2)).toBe(5);
        expect(GradeParser.Instance.RessourceCoefficient(2, 3)).toBe(0);
        expect(GradeParser.Instance.RessourceCoefficient(2, 4)).toBe(0);
        expect(GradeParser.Instance.RessourceCoefficient(2, 5)).toBe(0);
        expect(GradeParser.Instance.RessourceCoefficient(2, 6)).toBe(40);
    });
    test("Section Coefficient", () => {
        expect(GradeParser.Instance.SectionCoefficient(2, 6, 0)).toBe(0.5);
        expect(GradeParser.Instance.SectionCoefficient(2, 6, 1)).toBe(1);
        expect(GradeParser.Instance.SectionCoefficient(2, 6, 2)).toBe(6);
        expect(GradeParser.Instance.SectionCoefficient(2, 6, 3)).toBe(4);
        expect(GradeParser.Instance.SectionCoefficient(2, 6, 4)).toBe(6);
    });

    test("SAE Index", () => {
        expect(GradeParser.Instance.SaeIndex(0)).toBe(0);
        expect(GradeParser.Instance.SaeIndex(1)).toBe(1);
        expect(GradeParser.Instance.SaeIndex(2)).toBe(6);
        expect(GradeParser.Instance.SaeIndex(3)).toBe(5);
        expect(GradeParser.Instance.SaeIndex(4)).toBe(4);
        expect(GradeParser.Instance.SaeIndex(5)).toBe(5);
    });
});