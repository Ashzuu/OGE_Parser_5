import { SemesterFactory } from '../../src/Model/LogicLayer/Factories/SemesterFactory'
import { Section } from '../../src/Model/Types/Grades/Elements/Section';
import { Semestre } from '../../src/Model/Types/Grades/Elements/Semestre';
import { TestsSetup } from '../Mocks/TestsSetup';

var semester: Semestre;

beforeEach(() => {
    TestsSetup.SetupMockBody();
    semester = new SemesterFactory().GetSemester();
});

test('Sections have the right coefficients', () => {
    const expected = [
        1,
        2,
        1.1,
        10.05
    ]
    const found: number[] = (semester.UEList[2] as any).Ressources[1].subElements.map((r: Section) => r.Coefficient);

    for (let i = 0; i < expected.length; i++) expect(found[i]).toEqual(expected[i]);
});

test('Sections have the right amount of grades', () => {
    const expected = [
        4,
        3,
        2
    ]
    const found: number[] = (semester.UEList[2] as any).Ressources[3].subElements.map((r: any) => r.subElements.length);

    for (let i = 0; i < expected.length; i++) expect(found[i]).toEqual(expected[i]);
});