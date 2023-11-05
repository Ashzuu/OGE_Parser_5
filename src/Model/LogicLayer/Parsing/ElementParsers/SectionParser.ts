import { PageParser } from "../PageParser";
import { RessourceParser } from "./RessourceParser";
import { StringParser } from "../StringParser";

export class SectionParser
{
    //#region Attributes & Propeterties
    private _ressourceParser: RessourceParser = new RessourceParser();
    public get RessourceParser(): RessourceParser { return this._ressourceParser; }
    //#endregion Attributes & Propeterties
    
    /**
     * Retourne la div d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns La div de la section
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     */
    public GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): HTMLElement
    {
        let sectionDiv: HTMLElement = this.RessourceParser.GetRessourceSectionDiv(ueNumber, ressourceNumber);
        let section: HTMLElement = PageParser.GetChild(sectionDiv, [sectionNumber + 1]);

        return section;
    }
    /**
     * Retourne le nombre de sections d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Le nombre de sections de la ressource
     */
    public GetSectionCount(ueNumber: number, ressourceNumber: number): number
    {
        let sectionCount: number = 0;
        try { sectionCount = this.RessourceParser.GetRessourceSectionDiv(ueNumber, ressourceNumber).childElementCount - 1; }
        catch {}

        return sectionCount;
    }
    /**
     * Retourne le coefficient d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns Le coefficient de la section
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws NullCoefficientError si le coefficient est null
     */
    public GetSectionCoefficient(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        let section: HTMLElement = this.GetSection(ueNumber, ressourceNumber, sectionNumber)
        let coefficientSpan: HTMLElement = section.children[section.childElementCount - 1] as HTMLElement;
        
        return StringParser.ClearCoefficient(coefficientSpan.textContent);
    }
}