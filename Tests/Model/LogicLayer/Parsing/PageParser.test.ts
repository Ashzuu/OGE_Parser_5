import { PageParser } from "../../../../src/Model/LogicLayer/Parsing/PageParser";
import { GradeCoefficientPair } from "../../../../src/Model/Types/Grades/Elements/GradeCoefficientPair";
import { TestsSetup } from "../../../Mocks/TestsSetup";

TestsSetup.SetupBodyElementProperty();

describe('PageParser', () => {
    describe('Instance', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(PageParser.Instance).toBeDefined();
        });
    });
    describe('GetGrades', () => {
        test('GetGrades', () => {
            TestsSetup.SetupMockBody(1);

            let grades = PageParser.Instance.GetGrades(0, 0, 1);
            expect(grades).toBeDefined();

            let expected :GradeCoefficientPair[] = [
                {grade: 19, coefficient: 1},
                {grade: 8, coefficient: 1},
                {grade: 10, coefficient: 1},
                {grade: 20, coefficient: 1},
            ];
            expect(grades).toEqual(expected);
        });
    });
});