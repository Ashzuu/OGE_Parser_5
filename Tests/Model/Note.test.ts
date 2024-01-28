import { SemesterFactory } from '../../src/Model/LogicLayer/Factories/SemesterFactory'
import { Semestre } from '../../src/Model/Types/Grades/Elements/Semestre';
import { TestsSetup } from '../Mocks/TestsSetup';

var semester: Semestre;

beforeEach(() => {
    TestsSetup.SetupMockBody();
    semester = new SemesterFactory().GetSemester();
});

test('Grades have the right coefficients', () => {
    const expected = [
        1,
        2,
        5.1,
        10.055
    ]
    const section: any = (semester.UEList[2] as any).Ressources[3].subElements[0];
    const found: number[] = section.subElements.map((r: any) => r.Coefficient);

    for (let i = 0; i < expected.length; i++) expect(found[i]).toEqual(expected[i]);
})

test('Grades have the right coefficients', () => {
    const expected = [
        20,
        16,
        16,
        15
    ]

    const section: any = (semester.UEList[2] as any).Ressources[3].subElements[0];
    const found: number[] = section.subElements.map((r: any) => r.Average);

    for (let i = 0; i < expected.length; i++) expect(found[i]).toEqual(expected[i]);
})