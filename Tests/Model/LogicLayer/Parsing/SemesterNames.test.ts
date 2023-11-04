// public static get CorrespondingSemesterAvailable(): boolean
// public static get SemestreList(): string[]
// public static get CurrentSemestre(): string
// public static get CorrespondingSemester(): string
import { SemesterNames } from '../../../../src/Model/LogicLayer/Parsing/SemesterNames';
import { JestSetup } from '../../../Mocks/JestSetup';

JestSetup.SetupBodyElementProperty();

describe('SemesterNames', () => {
    describe('CorrespondingSemesterAvailable', () => {
        test('Get', () => {
            JestSetup.SetupMockBody(1);
            expect(SemesterNames.CorrespondingSemesterAvailable).toBe(true);
            JestSetup.SetupMockBody(2);
            expect(SemesterNames.CorrespondingSemesterAvailable).toBe(true);
            JestSetup.SetupMockBody(3);
            expect(SemesterNames.CorrespondingSemesterAvailable).toBe(false);
        });
    });
    describe('SemestreList', () => {
        test('Get', () => {
            JestSetup.SetupMockBody(1);
            expect(SemesterNames.SemestreList).toStrictEqual(["INFO S1", "INFO S2", "INFO S3"]);
        });
    });
    describe('CurrentSemestre', () => {
        test('Get', () => {
            JestSetup.SetupMockBody(1);
            expect(SemesterNames.CurrentSemestre).toBe("INFO S1");
            JestSetup.SetupMockBody(2);
            expect(SemesterNames.CurrentSemestre).toBe("INFO S2");
            JestSetup.SetupMockBody(3);
            expect(SemesterNames.CurrentSemestre).toBe("INFO S3");
        });
    });
    describe('CorrespondingSemester', () => {
        test('Get', () => {
            JestSetup.SetupMockBody(1);
            expect(SemesterNames.CorrespondingSemester).toBe("INFO S2");
            JestSetup.SetupMockBody(2);
            expect(SemesterNames.CorrespondingSemester).toBe("INFO S1");
            JestSetup.SetupMockBody(3);
            expect(SemesterNames.CorrespondingSemester).toBe("INFO S4");
        });
    });
});