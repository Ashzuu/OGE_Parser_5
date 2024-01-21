import { BodyElementNotFoundError } from "../../Types/Error/BodyElementNotFoundError";
import { ChildNotFoundError } from "../../Types/Error/ChildNotFoundError";
import { GradeCoefficientPair } from "../../Types/Grades/Elements/GradeCoefficientPair";
import { Parser } from "./Parser";
import { StringParser } from "./StringParser";
import { ViewParser } from "./ViewParser";

/**
 * Classe permettant de parser la page
 */
export class GradeParser extends Parser
{   
    //#region Singleton
    private constructor() { super(); }

    private static instance: GradeParser;
    /**Retourne l'instance du Parser de la page */
    public static get Instance(): GradeParser { return this.instance || (this.instance = new this()); }

    /**Remet a zero les données connu sur la page, utile quand on change de semestre */
    public static Reset() { this.instance = new this(); }
    //#endregion Singleton


    private GetResources(ue: number): HTMLElement[]
    {
        return this.GetRawRessources(ue)
            .filter(p => p.childElementCount >= this.RESSOURCE_CHILD_COUNT_MIN) as HTMLElement[];
    }
    private GetSections(ue: number, res: number): HTMLElement[]
    {
        return Array.from(
            this.GetResources(ue)[res]?.querySelectorAll(this.SECTION_SELECTOR) ?? []
            ).filter(p => p.childElementCount >= this.SECTION_CHILD_COUNT_MIN) as HTMLElement[];
    }
    public GetGrades(ueIndex: number, resIndex: number, sectionIndex: number): GradeCoefficientPair[]
    {
        return StringParser.GetNotesFromSectionInnerText(this.GetSections(ueIndex, resIndex)[sectionIndex]?.textContent ?? "");
    }

    //#endregion Properties

    //#region Coefficient Methods
    public RessourceCount(ue: number): number { return this.GetResources(ue).length; }
    public SectionCount(ue: number, res: number): number { return this.GetSections(ue, res).length; }
    public SaeIndex(ue: number): number
    {        
        let poleSaeEl: HTMLElement = ViewParser.Instance.GetPoleSaeElement(ue).querySelector("td") as HTMLElement;
        return this.GetRawRessources(ue).indexOf(poleSaeEl) - 1;
    }

    public UECoefficient(ue: number): number
    {
        let rawCoeff: string = this.Tables[ue]?.querySelector(this.UE_COEFFICENT_SELECTOR)?.textContent ?? "";

        return StringParser.ClearCoefficient(rawCoeff);
    }
    public RessourceCoefficient(ue: number, res: number): number
    {
        let rawCoeff: string = this.GetResources(ue)[res]?.querySelector(this.RESSOURCE_COEFFICENT_SELECTOR)?.textContent ?? "";

        return StringParser.ClearCoefficient(rawCoeff);
    }
    public SectionCoefficient(ue: number, res: number, sect: number): number
    {
        let rawCoeff: string = this.GetSections(ue, res)[sect]?.querySelector(this.SECTION_COEFFICENT_SELECTOR)?.textContent ?? "";

        return StringParser.ClearCoefficient(rawCoeff);
    }

    public UEName(ue: number): string
    {
        return this.Tables[ue]
        ?.querySelector(this.UE_NAME_SELECTOR)
        ?.childNodes[0]
        .textContent
        ?.replace(/\n */g, "")
        ?? "";
    }
    //#endregion Coefficient Methods
}