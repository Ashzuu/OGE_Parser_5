import { Ressource } from "../../Types/Grades/Elements/Ressource";
import { IElementFactory } from "../../Interfaces/IElementFactory";
import { PageParser } from "../Parsing/PageParser";
import { Section } from "../../Types/Grades/Elements/Section";
import { SectionFactory } from "./SectionFactory";

/**
 * Fabrique de ressources
 */
export class RessourceFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: RessourceFactory;
    /** Retourne l'instance de la fabrique de ressources */
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    /**
     * Retourne toutes les ressources d'une UE
     * @param ueNumber Numéro de l'UE
     * @returns Tableau de ressources
     */
    public GetAllUERessources(ueNumber: number): Ressource[] {
        let ressourceList: Ressource[] = [];
        let ressourceCount: number = PageParser.Instance.GetRessourceCount(ueNumber);
        for (let i = 0; i < ressourceCount; i++){
            try
            {
                ressourceList.push(this.GetRessource(ueNumber, i));
            }
            catch (ex) { }
        }

        return ressourceList;
    }
    /**
     * Retourne une ressource d'une UE
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Ressource
     */
    public GetRessource(ueNumber: number, ressourceNumber: number): Ressource {
        let sections: Section[] = SectionFactory.Instance.GetAllRessourceSection(ueNumber, ressourceNumber)
        let coefficient: number = PageParser.Instance.GetRessourceCoefficient(ueNumber, ressourceNumber);
        let name: string = PageParser.Instance.GetRessourceName(ueNumber, ressourceNumber);
        let ressource: Ressource = new Ressource(name, coefficient, sections);

        return ressource;
    }
}