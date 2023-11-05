import { OGEExtendedAPI } from "../../../../Data/API/OGEExtendedAPI";
import { IAPIConnector } from "../../../Interfaces/IAPIConnector";
import { NullCoefficientError } from "../../../Types/Error/NullCoefficientError";
import { RessourceNameNotFoundError } from "../../../Types/Error/RessourceNameNotFoundError";
import { UnknownCoefficientError } from "../../../Types/Error/UnknownCoefficientError";
import { PageParser } from "../PageParser";
import { SemesterNames } from "../SemesterNames";
import { StringParser } from "../StringParser";
import { UEParser } from "./UEParser";

export class RessourceParser
{
    //#region Attributes & Propeterties
    private _ueParser: UEParser = new UEParser();
    public get UEParser(): UEParser { return this._ueParser; }
    //#endregion Attributes & Propeterties
    /**
     * Retourne la div d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns La div de la ressource
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     */
    public GetRessourceSectionDiv(ueNumber: number, ressourceNumber: number): HTMLElement
    {
        let ressourcesDiv: HTMLElement = this.UEParser.GetUERessourcesDiv(ueNumber);
        let sectionDiv: HTMLElement = PageParser.GetChild(ressourcesDiv, [ressourceNumber, 0])
        return sectionDiv;
    }
    /**
     * Retourne le nombre de ressources d'une UE
     * @param ueNumber Numéro de l'UE
     * @returns Le nombre de ressources de l'UE
     */
    public GetRessourceCount(ueNumber: number): number
    {
        let resCount: number = 0;
        try { resCount = this.UEParser.GetUERessourcesDiv(ueNumber).childElementCount; }
        catch {}

        return resCount;
    }
    /**
     * Retourne le coefficient d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Le coefficient de la ressource
     * 
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     */
    public GetRessourceCoefficient(ueNumber: number, ressourceNumber: number): number
    {
        let ueRessourcesDiv: HTMLElement = this.UEParser.GetUERessourcesDiv(ueNumber);
        let coefficientSpan: HTMLElement = PageParser.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0]);

        let coefficient: number = 0;

        try{ coefficient = StringParser.ClearCoefficient(coefficientSpan.textContent); }
        catch (ex)
        {
            if (ex instanceof NullCoefficientError)
            {
                try
                {
                    let api: IAPIConnector = new OGEExtendedAPI();
                    coefficient = api.GetCoefficient(
                        SemesterNames.CurrentFiliere,
                        [
                            SemesterNames.CurrentSemestreNumber,
                            ueNumber,
                            ressourceNumber
                        ]
                    );
                }
                catch (ex)
                {
                    if (!(ex instanceof UnknownCoefficientError)) throw ex;
                    else coefficient = 0;
                }
            }
            else throw ex;
        }

        return coefficient;
    }
    /**
     * Retourne le nom d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Le nom de la ressource
     * 
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws RessourceNameNotFoundError si le nom de la ressource n'est pas trouvé
     */
    public GetRessourceName(ueNumber: number, ressourceNumber: number): string
    {
        let ueRessourcesDiv: HTMLElement = this.UEParser.GetUERessourcesDiv(ueNumber);
        let nameSpan: HTMLElement = PageParser.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0, 0]);
        
        if (nameSpan.textContent == null) throw new RessourceNameNotFoundError();

        let nameText: string = nameSpan.textContent as string;
        //Remplace les sauts de ligne par des espaces
        return nameText.replace(/\n +/g, ' ');
    }
}