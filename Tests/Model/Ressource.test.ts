import { SemesterFactory } from '../../src/Model/LogicLayer/Factories/SemesterFactory'
import { Ressource } from '../../src/Model/Types/Grades/Elements/Ressource';
import { Semestre } from '../../src/Model/Types/Grades/Elements/Semestre';
import { TestsSetup } from '../Mocks/TestsSetup';

var semester: Semestre;

beforeEach(() => {
    TestsSetup.SetupMockBody();
    semester = new SemesterFactory().GetSemester();
});

test("Ressources have the right coefficient", () => {
    const expected = [
        5,
        13,
        5,
        0,
        0,
        0,
        40
    ]
    const found: number[] = (semester.UEList[2] as any).Ressources.map((r: Ressource) => r.Coefficient);

    for (let i = 0; i < expected.length; i++) expect(found[i]).toEqual(expected[i]);
});

test("Ressources have the right amount of sections", () => {
    const expected = [
        1,
        4,
        2,
        3,
        0,
        0,
        5
    ]
    const found: number[] = (semester.UEList[2] as any).Ressources.map((r: any) => r.subElements.length);

    for (let i = 0; i < expected.length; i++) expect(found[i]).toEqual(expected[i]);
});