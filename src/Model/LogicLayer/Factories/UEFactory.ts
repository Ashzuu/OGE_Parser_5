import { Ressource } from "../../Types/Grades/Elements/Ressource";
import { UE } from "../../Types/Grades/Elements/UE";
import { GradeParser } from "../Parsing/GradeParser";
import { RessourceFactory } from "./RessourceFactory";

export class UEFactory
{
    public static GetUEs(): UE[]
    {
        let count: number = GradeParser.Instance.UECount;
        let ues: UE[] = [];
        for (let i = 0; i < count; i++)
        {
            ues.push(this.GetUE(i));
        }
        return ues;
    }
    private static GetUE(ix: number): UE
    {
        let coef: number = GradeParser.Instance.UECoefficient(ix);
        let saeIx: number = GradeParser.Instance.SaeIndex(ix);
        let ressources: Ressource[] = RessourceFactory.Ressources(ix);
        let name: string = GradeParser.Instance.UEName(ix);
        return new UE(coef, ressources, saeIx, name);
    }
}