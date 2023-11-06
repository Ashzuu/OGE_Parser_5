import { UE } from "../../../../src/Model/Types/Grades/Elements/UE";
import { Semestre } from "../../../../src/Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../../../src/Model/Types/Storage/StoredSemester";
import { Ressource } from "../../../../src/Model/Types/Grades/Elements/Ressource";
import { PageParser } from "../../../../src/Model/LogicLayer/Parsing/PageParser";
import { TestsSetup } from "../../../Mocks/TestsSetup";

TestsSetup.SetupBodyElementProperty();

describe('Semestre', () => {
    test('Constructor', () => {
        let semestre: Semestre = new Semestre([new UE(0, [], 0)]);
        expect(semestre).toBeDefined();
    });
    test('ToStoredSemester', () => {
        let expectedAverages: number[] = [16.13, 12.63, 16.35, 15.03, 13.19, 12.57];

        TestsSetup.SetupMockBody(1);
        let semestre: Semestre = new Semestre(TestsSetup.CreateUEList(expectedAverages));
        let storedSemestre: StoredSemester = semestre.ToStoredSemester();

        expect(storedSemestre.Name).toBe('INFO S1');
        for (let i = 0; i < storedSemestre.Averages.length; i++){
            expect(storedSemestre.Averages[i].toFixed(2)).toBe(expectedAverages[i].toFixed(2))
        }
        expect(storedSemestre.Date).toBe(-1);

        TestsSetup.SetupMockBody(3);
        PageParser.Reset();
        storedSemestre = semestre.ToStoredSemester();
        expect(storedSemestre.Name).toBe('INFO S3');
        expect(storedSemestre.Date).not.toBe(-1);
    });
});