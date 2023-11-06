// public get SAEIndex(): number { return (this._saeIndex != -1) ? this._saeIndex : this.RessourceList.length; }
// public get GetDetailedResults(): DetailedUEResult
// constructor(coefficient: number, ressources: Element[], saeIndex: number)

import { UE } from "../../../../src/Model/Types/Grades/Elements/UE";
import { Semestre } from "../../../../src/Model/Types/Grades/Elements/Semestre";
import { DetailedUEResult } from "../../../../src/Model/Types/Grades/DetailedUEResult";
import { TestsSetup } from "../../../Mocks/TestsSetup";
import { Ressource } from "../../../../src/Model/Types/Grades/Elements/Ressource";

TestsSetup.SetupBodyElementProperty();

describe('UE', () => {
    test('Constructor', () => {
        let ue: UE = new UE(0, [], 0);
        expect(ue).toBeDefined();
    });
    test('SAEIndex', () => {
        let ue: UE;
        ue = new UE(0, CreateRessourceList(10), 5);
        expect(ue.SAEIndex).toBe(5);
        
        ue = new UE(0, CreateRessourceList(3), 5);
        expect(ue.SAEIndex).toBe(3);
        
        ue = new UE(0, CreateRessourceList(5), -1);
        expect(ue.SAEIndex).toBe(5);
    });
})

function CreateRessourceList(arg0: number): Ressource[] {
    let ressourceList: Ressource[] = [];
    for (let i = 0; i < arg0; i++) { ressourceList.push(new Ressource("", 0, [])); }
    return ressourceList;
}
