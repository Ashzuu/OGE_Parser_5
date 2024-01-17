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
            for (let i = 1; i <= 3; i++)
            {
                TestsSetup.SetupMockBody(i);
                let dict: {args: [number, number, number], expected: {grade: number, coefficient: number}[] }[] = GetDict(i);
                
                dict.forEach((d) => {
                    let grades = PageParser.Instance.GetGrades(...d.args);
                    expect(grades).toEqual(d.expected);
                });
            }
        });
    });
});

function GetDict(id: number)
{
    return id == 1 ?
    [
        { args: [0, 0, 1] as [number, number, number], expected: [{grade: 19, coefficient: 1},{grade: 8, coefficient: 1},{grade: 10, coefficient: 1},{grade: 20, coefficient: 1}] },
        { args: [0, 2, 0] as [number, number, number], expected: [{grade: 18, coefficient: 1}] },
        { args: [5, 6, 1] as [number, number, number], expected: [{grade: 14.50, coefficient: 1}] },
        { args: [1, 0, 1] as [number, number, number], expected: [{grade: 13, coefficient: 1}, {grade: 18, coefficient: 0.25}, {grade: 15, coefficient: 1}, ] },
    ]
    : id == 2 ?
    [
        { args: [2, 5, 0] as [number, number, number], expected: [{grade: 14.5, coefficient: 1}] },
        { args: [2, 5, 1] as [number, number, number], expected: [{grade: 17.6, coefficient: 1}] },
        { args: [5, 6, 3] as [number, number, number], expected: [{grade: 15, coefficient: 1}] },
    ]
    :
    [
        { args: [0, 0, 0] as [number, number, number], expected: [] },
    ];
}