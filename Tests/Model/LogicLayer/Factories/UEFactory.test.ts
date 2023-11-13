import { UEFactory } from '../../../../src/Model/LogicLayer/Factories/UEFactory';
import { UE } from '../../../../src/Model/Types/Grades/Elements/UE';
import { UEDetails } from '../../../../src/Model/Types/Grades/UEDetails';
import { TestsSetup } from '../../../Mocks/TestsSetup';

TestsSetup.SetupBodyElementProperty();

describe('UEFactory', () => {
    describe('GetAllRessourceUE', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            let result: UE[] = UEFactory.GetAllUEs();
            expect(result.length).toBe(6);

            let testedUE: UE = result[0];
            let expectedDetailedResults: UEDetails = {
                UEResult : 16.13,
                CCResult : 14.88,
                SAEResult : 18.00,
                AllCCResults : [14.42, 14.94, 18.00],
                AllSAEResults : [18.00]
            }
            // expect(testedUE.SAEIndex).toBe(4); TODO: Fix this
            expect(testedUE.Average.toFixed(2)).toBe('16.13');
            let testedDetailedResults = testedUE.GetDetailedResults;
            expect(testedDetailedResults.UEResult.toFixed(2)).toBe(expectedDetailedResults.UEResult.toFixed(2));
            expect(testedDetailedResults.CCResult.toFixed(2)).toBe(expectedDetailedResults.CCResult.toFixed(2));
            expect(testedDetailedResults.SAEResult.toFixed(2)).toBe(expectedDetailedResults.SAEResult.toFixed(2));
            for (let i = 0; i < testedDetailedResults.AllCCResults.length; i++) {
                expect(testedDetailedResults.AllCCResults[i].toFixed(2)).toEqual(expectedDetailedResults.AllCCResults[i].toFixed(2));
            }
            for (let i = 0; i < testedDetailedResults.AllSAEResults.length; i++) {
                expect(testedDetailedResults.AllSAEResults[i].toFixed(2)).toEqual(expectedDetailedResults.AllSAEResults[i].toFixed(2));
            }
        });
    });
});