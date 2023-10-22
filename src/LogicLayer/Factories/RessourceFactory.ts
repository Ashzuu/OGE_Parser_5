import { Ressource } from "../../Model/Types/Grades/Elements/Ressource";
import { IElementFactory } from "../../Model/Interfaces/IElementFactory";
import { GradeParser } from "../Parsing/GradeParser";
import { Section } from "../../Model/Types/Grades/Elements/Section";
import { SectionFactory } from "./SectionFactory";

export class RessourceFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: RessourceFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    GetAllUERessources(ueNumber: number): Ressource[] {
        let ressourceList: Ressource[] = [];
        let ressourceCount: number = GradeParser.Instance.GetRessourceCount(ueNumber);
        for (let i = 0; i < ressourceCount; i++){
            try
            {
                ressourceList.push(this.GetRessource(ueNumber, i));
            }
            catch (ex) { }
        }

        return ressourceList;
    }
    GetRessource(ueNumber: number, ressourceNumber: number): Ressource {
        let sections: Section[] = SectionFactory.Instance.GetAllRessourceSection(ueNumber, ressourceNumber)
        let coefficient: number = GradeParser.Instance.GetRessourceCoefficient(ueNumber, ressourceNumber);
        let name: string = GradeParser.Instance.GetRessourceName(ueNumber, ressourceNumber);
        let ressource: Ressource = new Ressource(name, coefficient, sections);

        return ressource;
    }
}