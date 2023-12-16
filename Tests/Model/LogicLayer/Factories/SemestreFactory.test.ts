import { SemestreFactory } from '../../../../src/Model/LogicLayer/Factories/SemestreFactory';
import { TestsSetup } from '../../../Mocks/TestsSetup';

TestsSetup.SetupBodyElementProperty();

describe('SemestreFactory', () => {
    describe('GetAllRessourceSemestre', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemestreFactory.GetSemester()).toBeDefined();
        });
    });
});