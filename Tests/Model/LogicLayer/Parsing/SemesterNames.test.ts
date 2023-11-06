// public static get CorrespondingSemesterAvailable(): boolean
// public static get SemestreList(): string[]
// public static get CurrentSemestre(): string
// public static get CorrespondingSemester(): string
import { SemesterNames } from '../../../../src/Model/LogicLayer/Parsing/SemesterNames';
import { TestsSetup } from '../../../Mocks/TestsSetup';

TestsSetup.SetupBodyElementProperty();

describe('SemesterNames', () => {
    describe('CorrespondingSemesterAvailable', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemesterNames.CorrespondingSemesterAvailable).toBe(true);
            TestsSetup.SetupMockBody(2);
            expect(SemesterNames.CorrespondingSemesterAvailable).toBe(true);
            TestsSetup.SetupMockBody(3);
            expect(SemesterNames.CorrespondingSemesterAvailable).toBe(false);
        });
    });
    describe('SemestreList', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemesterNames.SemestreList).toStrictEqual(["INFO S1", "INFO S2", "INFO S3"]);
        });
    });
    describe('CurrentSemestre', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemesterNames.CurrentSemestre).toBe("INFO S1");
            TestsSetup.SetupMockBody(2);
            expect(SemesterNames.CurrentSemestre).toBe("INFO S2");
            TestsSetup.SetupMockBody(3);
            expect(SemesterNames.CurrentSemestre).toBe("INFO S3");
        });
    });
    describe('CorrespondingSemester', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemesterNames.CorrespondingSemester).toBe("INFO S2");
            TestsSetup.SetupMockBody(2);
            expect(SemesterNames.CorrespondingSemester).toBe("INFO S1");
            TestsSetup.SetupMockBody(3);
            expect(SemesterNames.CorrespondingSemester).toBe("INFO S4");
        });
    });
});