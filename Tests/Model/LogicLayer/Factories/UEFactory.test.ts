import { UEFactory } from '../../../../src/Model/LogicLayer/Factories/UEFactory';
import { DetailedUEResult } from '../../../../src/Model/Types/Grades/DetailedUEResult';
import { UE } from '../../../../src/Model/Types/Grades/Elements/UE';
import { JestSetup } from '../../../Mocks/JestSetup';

JestSetup.SetupBodyElementProperty();

describe('UEFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            JestSetup.SetupMockBody(1);
            expect(UEFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceUE', () => {
        test('Normal Test Case', () => {
            JestSetup.SetupMockBody(1);
            let result: UE[] = UEFactory.Instance.GetAllUEs();
            expect(result.length).toBe(6);

            let testedUE: UE = result[0];
            let expectedDetailedResults: DetailedUEResult = {
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