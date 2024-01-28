import { SemesterFactory } from '../../src/Model/LogicLayer/Factories/SemesterFactory'
import { Semestre } from '../../src/Model/Types/Grades/Elements/Semestre';
import { TestsSetup } from '../Mocks/TestsSetup';

var semester: Semestre;

beforeEach(() => {
    TestsSetup.SetupMockBody();
    semester = new SemesterFactory().GetSemester();
});

test('semester is created', () => {
    expect(semester).toBeDefined();
});

test('semester has a UE list', () => {
    expect(semester.UEList).not.toBeNull();
    expect(semester.UEList.length).not.toBe(0);
    semester.UEList.forEach(ue => { expect(ue).toBeDefined() });
});