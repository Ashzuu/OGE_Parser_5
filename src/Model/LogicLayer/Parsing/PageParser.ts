import { BodyElementNotFoundError } from "../../Types/Error/BodyElementNotFoundError";
import { ChildNotFoundError } from "../../Types/Error/ChildNotFoundError";
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
        //Initialise bodyElement
        this._bodyElement = document.querySelector("body")?.cloneNode(true) as HTMLElement ?? new BodyElementNotFoundError();
        this._bodyElement = document.querySelector("body") as HTMLElement ?? new BodyElementNotFoundError();
    }

    private static _instance: PageParser;
    /**Retourne l'instance du Parser de la page */
    public static get Instance() { return this._instance || (this._instance = new this()); }

    /**Remet a zero les données connu sur la page, utile quand on change de semestre */
    public static Reset() { this._instance = new this(); }
    //#endregion Singleton

    //#region Constants
    private readonly UE_COEFFICENT_SELECTOR: string = "thead > tr > td > div > span";
    private readonly RESSOURCE_COEFFICENT_SELECTOR: string = "div > span:nth-child(2)";
    private readonly SECTION_COEFFICENT_SELECTOR: string = "sub:last-child";
    private readonly RESSOURCE_SELECTOR: string = 'tbody > tr > td';
    private readonly RESSOURCE_CHILD_COUNT_MIN: number = 2;
    private readonly SECTION_SELECTOR: string = 'div';
    private readonly SECTION_CHILD_COUNT_MIN: number = 3;
    private readonly POLE_SAE_TEXT_SELECTOR: string = "tr > td:has(span > span)";
    private readonly POLE_SAE_TEXT_INDEX: number = 1;
    private readonly MAX_COUNT_WHEN_GRADE_HIDDEN: number = 1;
    //#endregion Constants


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

    //#region Properties
    /** 
     * Retourne le body de la page
     * @throws BodyElementNotFoundError si le body n'est pas trouvé dans le DOM
     */
    public get Body(): HTMLElement { return this._bodyElement; }

    private get Tables(): HTMLElement[] { return Array.from(this.Body.querySelectorAll('table')); }
    /** Retourne le nombre d'UE */
    public get UECount(): number { return this.Tables.length; }
    
    public get AreGradesShown(): boolean
    {
         return (
            this.Tables[0]
            ?.querySelector("thead > tr")
            ?.childElementCount 
            ?? this.MAX_COUNT_WHEN_GRADE_HIDDEN + 1)
            > this.MAX_COUNT_WHEN_GRADE_HIDDEN;
    }

    private GetRawRessources(ue: number): HTMLElement[]
    {
        return Array.from(
            this.Tables[ue].querySelectorAll(this.RESSOURCE_SELECTOR)
            );
    }

    private GetResources(ue: number): HTMLElement[]
    {
        return this.GetRawRessources(ue).filter(p => p.childElementCount >= this.RESSOURCE_CHILD_COUNT_MIN) as HTMLElement[];
    }
    private GetSections(ueIndex: number, resIndex: number): HTMLElement[]
    {
        return Array.from(
            this.GetResources(ueIndex)[resIndex].querySelectorAll(this.SECTION_SELECTOR)
            ).filter(p => p.childElementCount >= this.SECTION_CHILD_COUNT_MIN) as HTMLElement[];
    }
    public GetGrades(ueIndex: number, resIndex: number, sectionIndex: number): GradeCoefficientPair[]
    {
        return StringParser.GetNotesFromSectionInnerText(this.GetSections(ueIndex, resIndex)[sectionIndex].textContent ?? "");
    }

    //#endregion Properties

    //#region Coefficient Methods
    public RessourceCount(ue: number): number { return this.GetResources(ue).length; }
    public SectionCount(ue: number, res: number): number { return this.GetSections(ue, res).length; }
    public SaeIndex(ue: number): number
    {
        let poleSaeEl: HTMLElement = this.Tables[ue].querySelectorAll(this.POLE_SAE_TEXT_SELECTOR)[this.POLE_SAE_TEXT_INDEX] as HTMLElement;
        
        return this.GetRawRessources(ue).indexOf(poleSaeEl) - 1;
    }

    public UECoefficient(ue: number): number
    {
        let rawCoeff: string = this.Tables[ue].querySelector(this.UE_COEFFICENT_SELECTOR)?.textContent ?? "";

        return StringParser.ClearCoefficient(rawCoeff);
    }
    public RessourceCoefficient(ue: number, res: number): number
    {
        let rawCoeff: string = this.GetResources(ue)[res].querySelector(this.RESSOURCE_COEFFICENT_SELECTOR)?.textContent ?? "";

        return StringParser.ClearCoefficient(rawCoeff);
    }
    public SectionCoefficient(ue: number, res: number, sect: number): number
    {
        let rawCoeff: string = this.GetSections(ue, res)[sect].querySelector(this.SECTION_COEFFICENT_SELECTOR)?.textContent ?? "";

        return StringParser.ClearCoefficient(rawCoeff);
    }

    //#endregion Coefficient Methods
}