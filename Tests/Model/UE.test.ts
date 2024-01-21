import { SemesterFactory } from '../../src/Model/LogicLayer/Factories/SemesterFactory'
import { Semestre } from '../../src/Model/Types/Grades/Elements/Semestre';
import { TestsSetup } from '../Mocks/TestsSetup';

var semester: Semestre;

beforeEach(() => {
    TestsSetup.SetupMockBody();
    semester = SemesterFactory.GetSemester();
});

test('each UE has the right name', () => {
    const expected = [
        "UE3.1 PART EXIG APPL ALT",
        "UE3.2 SÉLE ALG ADEQ ALT",
        "UE3.2 SÉLE ALG ADEQ ALT",
        "UE3.3 DÉPLOY SERV ARCHI",
        "UE2.1 REALISER DEVELOPP",
        "UE2.6 TRAVAILLER EQUI"
    ]
    const found = semester.UEList.map(ue => ue.Name);

    expect(found).toEqual(expected);
});

test('each UE has the right coefficient', () => {
    const expected = [
        530,
        13,
        10000,
        130,
        200,
        101
    ]
    const found = semester.UEList.map(ue => ue.Coefficient);

    expect(found).toEqual(expected);
});