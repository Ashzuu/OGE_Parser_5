import { TableNotFoundError } from "../../../Types/Error/TableNotFoundError";
import { PageParser } from "../PageParser";

export class UEParser
{
    //#region Constants
    private readonly POLE_SAE_CLASS = "cell_BUT_SAE";
    private readonly POLE_CC_CLASS = "cell_BUT_RESSOURCE";
    //#endregion Constants
    private _ueTables: HTMLElement[] | undefined;
    
    /**
     * Constructeur
     * @param body Body de la page, sera utilisé pour recuperer les tables des UE
     */
    public constructor()
    {
        this._ueTables = undefined;
    }

    /** Retourne les tables des UE */
    public get UETables(): HTMLElement[]
    {
        if (!this._ueTables)
        {
            this._ueTables = Array.from(PageParser.Instance.BodyElement.querySelectorAll('table')) as HTMLElement[];
        }
        return this._ueTables;
    }
    
    /**
     * Retourne la table d'une UE
     * @param tableNumber Numéro de l'UE
     * @returns La table de l'UE
     * 
     * @throws TableNotFoundError si la table demandée n'existe pas
     */
    private GetUETable(tableNumber: number): HTMLElement
    {
        //Si l'index de la table n'est pas correct
        if (tableNumber < 0 ||
            tableNumber >= this.UETables.length) throw new TableNotFoundError();

        return this.UETables[tableNumber];
    }
    /**
     * Retourne le nom d'une UE
     * @param ueNumber Numéro de l'UE
     * @returns Le nom de l'UE
     * 
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     */
    public GetUERessourcesDiv(ueNumber: number): HTMLElement
    {
        let ueTable: HTMLElement = this.GetUETable(ueNumber);
        let ressourceDiv: HTMLElement = PageParser.GetChild(ueTable, [1]);

        //Retire les éléments separant les SAE et CC (ne sont pas des ressources)
        Array.from(ressourceDiv.children).forEach((child: Element) => {
            if (
                child.classList.contains(this.POLE_SAE_CLASS)
                || child.classList.contains(this.POLE_CC_CLASS)
                ) {
              ressourceDiv.removeChild(child);
            }
        });

        return ressourceDiv;
    }
    /**
     * Retourne l'idex de l'élément séparant les CC des SAE
     * @param ueNumber Numéro de l'UE
     * @returns Index de l'element "cell_BUT_SAE" dans la liste des enfants de la table de l'UE, -1 s'il y en a pas
     */
    public GetCCAndSAESeparationIndex(ueNumber: number): number
    {
        //N'utilise pas this._ueTables car on veut la table non modifiée
        let ueTable: HTMLElement = document.querySelectorAll('table')[ueNumber];
        let ressourceDiv: HTMLElement = PageParser.GetChild(ueTable, [1]);
        
        let saeIndex: number = -1;
        if (this.HasRegisteredSAE(ressourceDiv))
        {
            saeIndex = this.GetCCAndSAESeparationIndexFromDiv(ressourceDiv);
        }

        return saeIndex;
    }
    private GetCCAndSAESeparationIndexFromDiv(ressourceDiv: HTMLElement): number
    {
        //Index de l'element separant les CC des SAE
        let saeIndex = 0;
        let children : HTMLCollection = ressourceDiv.children;
        let length = children.length;

        const condition = (index: number): boolean =>
        {
            return !(children[index].classList.contains(this.POLE_SAE_CLASS)) && index < length;
        }

        while (condition(saeIndex)){ saeIndex++ }

        if (saeIndex >= length) saeIndex = -1;

        return saeIndex;
    }
    private HasRegisteredSAE(ressourceDiv: HTMLElement): boolean
    {
        let last: number = ressourceDiv.children.length - 1;
        return ressourceDiv.children[last].textContent?.trim() != "Pas de note saisie";
    }
}