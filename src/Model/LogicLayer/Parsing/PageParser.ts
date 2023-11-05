import { BodyElementNotFoundError } from "../../Types/Error/BodyElementNotFoundError";
import { ChildNotFoundError } from "../../Types/Error/ChildNotFoundError";
import { GradeCoefficientPair } from "../../Types/Grades/Elements/GradeCoefficientPair";
import { NoteParser } from "./ElementParsers/NoteParser";
import { RessourceParser } from "./ElementParsers/RessourceParser";
import { SectionParser } from "./ElementParsers/SectionParser";
import { UEParser } from "./ElementParsers/UEParser";

/**
 * Classe permettant de parser la page
 */
export class PageParser
{   
    //#region Singleton
    private constructor()
    {
        //Initialise bodyElement
        let docBodyElements: NodeListOf<HTMLBodyElement> =  document.querySelectorAll("body");
        if (docBodyElements.length == 0) throw new BodyElementNotFoundError();

        this._bodyElement = docBodyElements[0].cloneNode(true) as HTMLElement;
        //Initialise les sub Parser
        this._ueParser = new UEParser();
        this._ressourceParser = new RessourceParser();
        this._sectionParser = new SectionParser();
        this._noteParser = new NoteParser();
    }

    private static _instance: PageParser;
    /**Retourne l'instance du Parser de la page */
    public static get Instance() { return this._instance || (this._instance = new this()); }

    /**Remet a zero les données connu sur la page, utile quand on change de semestre */
    public static Reset() { this._instance = new this(); }
    //#endregion Singleton

    //#region Static Methods
    /**
     * Retourne l'élément enfant d'un élément HTML
     * @param htmlElement Élément HTML parent
     * @param pathToChild Index de chaque enfants à parcourir, equivalent à un chemin pour acceder à l'élément voulu
     * @returns L'élément HTML demandé
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     */
    public static GetChild(htmlElement: HTMLElement, pathToChild: number[]): HTMLElement
    {
        let element: HTMLElement = htmlElement;

        pathToChild.forEach(
            degree => {
                
                if (!element ||
                    degree < 0 ||
                    element.childElementCount <= degree) throw new ChildNotFoundError();
                
                element = element.children[degree] as HTMLElement;
            });
        
        return element;
    }
    //#endregion Static Methods

    //#region Saved HTMLElements
    private _bodyElement: HTMLElement;
    //#endregion Saved HTMLElements


    //#region Parser
    private _ueParser: UEParser;
    private _ressourceParser: RessourceParser;
    private _sectionParser: SectionParser;
    private _noteParser: NoteParser;
    //#endregion Parser

    //#region Properties
    /** 
     * Retourne le body de la page
     * @throws BodyElementNotFoundError si le body n'est pas trouvé dans le DOM
     */
    public get BodyElement(): HTMLElement { return this._bodyElement; }
    /** Retourne le nombre d'UE */
    public get UECount(): number
    {
        return this._ueParser.UETables.length;
    }
    /**
     * Retourne si les notes sont affichées
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     */
    public get AreGradesShown(): boolean
    {
        return PageParser.GetChild(this._ueParser.UETables[0], [0, 0]).childElementCount > 1
    }
    //#endregion Properties
    
    //#region UE
    public GetCCAndSAESeparationIndex(ueNumber: number): number
    {
        return this._ueParser.GetCCAndSAESeparationIndex(ueNumber);
    }
    //#endregion UE

    //#region Ressource
    public GetRessourceCount(ueNumber: number): number
    {
        return this._ressourceParser.GetRessourceCount(ueNumber);
    }
    public GetRessourceCoefficient(ueNumber: number, ressourceNumber: number): number
    {
        return this._ressourceParser.GetRessourceCoefficient(ueNumber, ressourceNumber);
    }
    //TODO: Degager le concept de ressourceName, on en a rien a foutre en vrai
    public GetRessourceName(ueNumber: number, ressourceNumber: number): string
    {
        return this._ressourceParser.GetRessourceName(ueNumber, ressourceNumber);
    }
    //#endregion Ressource

    //#region Section
    public GetSectionCount(ueNumber: number, ressourceNumber: number): number
    {
        return this._sectionParser.GetSectionCount(ueNumber, ressourceNumber);
    }
    public GetSectionCoefficient(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        return this._sectionParser.GetSectionCoefficient(ueNumber, ressourceNumber, sectionNumber);
    }
    //#endregion Section

    //#region Note
    public GetNoteCount(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        return this._noteParser.GetNoteCount(ueNumber, ressourceNumber, sectionNumber);
    }
    public GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): GradeCoefficientPair
    {
        return this._noteParser.GetNote(ueNumber, ressourceNumber, sectionNumber, noteNumber);
    }
    //#endregion Note
}