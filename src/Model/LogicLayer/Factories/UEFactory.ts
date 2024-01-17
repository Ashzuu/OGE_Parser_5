import { Ressource } from "../../Types/Grades/Elements/Ressource";
import { UE } from "../../Types/Grades/Elements/UE";
import { PageParser } from "../Parsing/PageParser";
import { RessourceFactory } from "./RessourceFactory";

export class UEFactory
{
    public static GetUEs(): UE[]
    {
        let count: number = PageParser.Instance.UECount;
        let ues: UE[] = [];
        for (let i = 0; i < count; i++)
        {
            ues.push(this.GetUE(i));
        }
        return ues;
    }
    private static GetUE(ix: number): UE
    {
        let coef: number = PageParser.Instance.UECoefficient(ix);
        let saeIx: number = PageParser.Instance.SaeIndex(ix);
        let ressources: Ressource[] = RessourceFactory.Ressources(ix);
        return new UE(coef, ressources, saeIx);
    }
}