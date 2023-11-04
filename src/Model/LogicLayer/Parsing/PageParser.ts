import { BodyElementNotFoundError } from "../../Types/Error/BodyElementNotFoundError";
import { ChildNotFoundError } from "../../Types/Error/ChildNotFoundError";
import { NoGradesFoundError } from "../../Types/Error/NoGradesFoundError";
import { NullCoefficientError } from "../../Types/Error/NullCoefficientError";
import { RessourceNameNotFoundError } from "../../Types/Error/RessourceNameNotFoundError";
import { TableNotFoundError } from "../../Types/Error/TableNotFoundError";
import { GradeCoefficientPair } from "../../Types/Grades/Elements/GradeCoefficientPair";
import { StringParser } from "./StringParser";

/**
 * Classe permettant de parser la page
 */
export class PageParser
{   
    //#region Singleton
    private constructor()
    {
        this._bodyElement = undefined;
        this._ueTables = undefined;
    }

    private static _instance: PageParser;
    /**Retourne l'instance du Parser de la page */
    public static get Instance() { return this._instance || (this._instance = new this()); }

    /**Remet a zero les données connu sur la page, utile quand on change de semestre */
    public static Reset() { this._instance = new this(); }
    //#endregion Singleton

    //#region Saved HTMLElements
    private _bodyElement: HTMLElement | undefined;    
    private _ueTables: HTMLElement[] | undefined;
    //#endregion Saved HTMLElements
    
    //#region Properties
    /** 
     * Retourne le body de la page
     * @throws BodyElementNotFoundError si le body n'est pas trouvé dans le DOM
     */
    private get BodyElement(): HTMLElement
    {
        if (!this._bodyElement) {

            let docBodyElements: NodeListOf<HTMLBodyElement> =  document.querySelectorAll("body");
            if (docBodyElements.length == 0) throw new BodyElementNotFoundError();

            this._bodyElement = docBodyElements[0].cloneNode(true) as HTMLElement;
        }
        return this._bodyElement;
    }
    /** Retourne les tables des UE */
    private get UETables(): HTMLElement[]
    {
        if (!this._ueTables){
            this._ueTables = this.GetAllUETables();
        }
        
        return this._ueTables;
    }
    /** Retourne le nombre d'UE */
    public get UECount(): number
    {
        return this.UETables.length;
    }
    /**
     * Retourne si les notes sont affichées
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     */
    public get AreGradesShown(): boolean
    {
        return this.GetChild(this.GetUETable(0), [0, 0]).childElementCount > 1
    }
    //#endregion Properties
    
    /**
     * Retourne l'élément enfant d'un élément HTML
     * @param htmlElement Élément HTML parent
     * @param degrees Index de chaque enfants à parcourir, equivalent à un chemin pour acceder à l'élément voulu
     * @returns L'élément HTML demandé
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     */
    public GetChild(htmlElement: HTMLElement, degrees: number[]): HTMLElement
    {
        let element: HTMLElement = htmlElement;

        degrees.forEach(
            deg => {
                if (!element || deg < 0 || element.childElementCount <= deg) throw new ChildNotFoundError();
                
                element = element.children[deg] as HTMLElement;
            });
        
        return element;
    }
    
    //#region UE
    /**
     * Retourne les tables des UE
     * @returns Les tables des UE
     */
    private GetAllUETables(): HTMLElement[]
    {
        return Array.from(this.BodyElement.querySelectorAll('table')) as HTMLElement[];
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
    private GetUERessourcesDiv(ueNumber: number): HTMLElement
    {
        let ueTable: HTMLElement = this.GetUETable(ueNumber);
        let ressourceDiv: HTMLElement = this.GetChild(ueTable, [1]);

        Array.from(ressourceDiv.children).forEach((child: Element) => {
            if (
                child.classList.contains('cell_BUT_SAE')
                || child.classList.contains('cell_BUT_RESSOURCE')
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
        //N'utilise pas this.GetUETable() car on veut la table non modifiée
        let ueTable: HTMLElement = document.querySelectorAll('table')[ueNumber];
        let ressourceDiv: HTMLElement = this.GetChild(ueTable, [1]);

        //Index de l'element separant les CC des SAE
        let saeIndex = -1;
        for (let i = 0; i < ressourceDiv.childElementCount && saeIndex == -1; i++){
            if (ressourceDiv.children[i].classList.contains('cell_BUT_SAE')){
                saeIndex = i;
            }
        }

        return saeIndex;
    }
    //#endregion UE

    //#region Ressource
    /**
     * Retourne la div d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns La div de la ressource
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     */
    private GetRessourceSectionDiv(ueNumber: number, ressourceNumber: number): HTMLElement
    {
        let ressourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let sectionDiv: HTMLElement = this.GetChild(ressourcesDiv, [ressourceNumber, 0])
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
        try { resCount = this.GetUERessourcesDiv(ueNumber).childElementCount; }
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
        let ueRessourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let coefficientSpan: HTMLElement = this.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0]);

        let coefficient: number = 0;

        try{ coefficient = StringParser.ClearCoefficient(coefficientSpan.textContent); }
        catch (ex)
        {
            if (ex instanceof NullCoefficientError)
            {
                //TODO : Gérer le cas ou le coefficient est null grace a l'API
                coefficient = 0;
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
        let ueRessourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let nameSpan: HTMLElement = this.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0, 0]);
        
        if (nameSpan.textContent == null) throw new RessourceNameNotFoundError();

        let nameText: string = nameSpan.textContent as string;
        return nameText.replace(/\n +/g, ' ');
    }
    //#endregion Ressource

    //#region Section
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
    private GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): HTMLElement
    {
        let sectionDiv: HTMLElement = this.GetRessourceSectionDiv(ueNumber, ressourceNumber);
        let section: HTMLElement = this.GetChild(sectionDiv, [sectionNumber + 1]);

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
        try { sectionCount = this.GetRessourceSectionDiv(ueNumber, ressourceNumber).childElementCount - 1; }
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
    //#endregion Section
    
    //#region Note
    /**
     * Retourne la liste des notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns La liste des notes de la section
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws NullSectionTextError si le texte de la section est 'null'
     */
    private GetNoteList(ueNumber: number, ressourceNumber: number, sectionNumber: number): GradeCoefficientPair[]
    {
        let section: HTMLElement = this.GetSection(ueNumber, ressourceNumber, sectionNumber);
        let notes: GradeCoefficientPair[] =  StringParser.GetNotesFromSectionInnerText(section.textContent);
        return notes;
    }
    /**
     * Retourne le nombre de notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns Le nombre de notes de la section
     */
    public GetNoteCount(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        let noteCount: number = 0;
        try { noteCount = this.GetNoteList(ueNumber, ressourceNumber, sectionNumber).length; }
        catch {}

        return noteCount;
    }
    /**
     * Retourne une note d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @param noteNumber Numéro de la note
     * @returns La note de la section
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws NullSectionTextError si le texte de la section est 'null'
     */
    public GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): GradeCoefficientPair
    {
        let note: GradeCoefficientPair = this.GetNoteList(ueNumber, ressourceNumber, sectionNumber)[noteNumber];
        if (!note) throw new ChildNotFoundError();

        return note;
    }
    //#endregion Note
}