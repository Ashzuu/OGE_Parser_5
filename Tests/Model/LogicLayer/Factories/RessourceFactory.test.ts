import { RessourceFactory } from '../../../../src/Model/LogicLayer/Factories/RessourceFactory';
import { Ressource } from '../../../../src/Model/Types/Grades/Elements/Ressource';
import { TestsSetup } from '../../../Mocks/TestsSetup';

TestsSetup.SetupBodyElementProperty();

describe('RessourceFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(RessourceFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllUERessources', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            let result: Ressource[] = RessourceFactory.Instance.GetAllUERessources(0);
            expect(result.length).toBe(4);

            let testedRessource: Ressource = result[2];
            expect(testedRessource.Name).toBe('Anglais');
            expect(testedRessource.Coefficient).toBe(6);
            expect(testedRessource.Average).toBe(18);
        });
        test('Not Throwing TableNotFound', () => {
            TestsSetup.SetupMockBody(1);
            expect(RessourceFactory.Instance.GetAllUERessources(-1));
            expect(RessourceFactory.Instance.GetAllUERessources(500));
        });
    });
});