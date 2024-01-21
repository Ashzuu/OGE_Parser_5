import { Ressource } from "../../Types/Grades/Elements/Ressource";
import { Section } from "../../Types/Grades/Elements/Section";
import { GradeParser } from "../Parsing/GradeParser";
import { SectionFactory } from "./SectionFactory";

export class RessourceFactory
{
    public static Ressources(ue: number): Ressource[]
    {
        let count: number = GradeParser.Instance.RessourceCount(ue);
        let ressources: Ressource[] = [];
        for (let i = 0; i < count; i++)
        {
            ressources.push(this.GetRessource(ue, i));
        }
        return ressources;
    }
    private static GetRessource(ue: number, ix: number): Ressource
    {
        let coef: number = GradeParser.Instance.RessourceCoefficient(ue, ix);
        let sections: Section[] = SectionFactory.Sections(ue, ix);
        return new Ressource(coef, sections);
    }
}