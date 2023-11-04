// public get SAEIndex(): number { return (this._saeIndex != -1) ? this._saeIndex : this.RessourceList.length; }
// public get GetDetailedResults(): DetailedUEResult
// constructor(coefficient: number, ressources: Element[], saeIndex: number)

import { UE } from "../../../../src/Model/Types/Grades/Elements/UE";
import { Semestre } from "../../../../src/Model/Types/Grades/Elements/Semestre";
import { DetailedUEResult } from "../../../../src/Model/Types/Grades/DetailedUEResult";
import { JestSetup } from "../../../Mocks/JestSetup";
import { Ressource } from "../../../../src/Model/Types/Grades/Elements/Ressource";

JestSetup.SetupBodyElementProperty();

describe('UE', () => {
    test('Constructor', () => {
        let ue: UE = new UE(0, [], 0);
        expect(ue).toBeDefined();
    });
    test('SAEIndex', () => {
        let ue: UE = new UE(0, [], 5);
        expect(ue.SAEIndex).toBe(5);
        
        ue = new UE(0, [new Ressource("", 0, []), new Ressource("", 0, []), new Ressource("", 0, [])], -1);
        expect(ue.SAEIndex).toBe(3);
    });
})