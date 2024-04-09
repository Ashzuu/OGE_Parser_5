import { ViewParser } from "../../../Model/LogicLayer/Parsing/ViewParser";
import { UEDetails } from "../../../Model/Types/Grades/UEDetails";
import { DOMElementBuilder } from "../../DOMElementBuilder";

export class MainPageGradeView {
    /**
     * Constructeur
     * @param table Tableau des resultats 
     * @param saeIndex Index de la SAE
     */
    public constructor(tableIndex: number) {
        this.index = tableIndex;
    }
    //#region Properties
    private index: number;
    private readonly CELL_INSERTION_INDEX = 1;

    //#endregion Properties
    /**
     * Ajoute les resultats a la page
     * @param detailedUEResult Resultats
     */
    public AddGradeResultToPage(detailedUEResult: UEDetails): void {
        const d = detailedUEResult;
        const vp = ViewParser.Instance;

        this.AddSingleResults(d.UEResult, vp.GetUEElement);
        this.AddSingleResults(d.CCResult, vp.GetPoleCCElement);
        this.AddSingleResults(d.SAEResult, vp.GetPoleSaeElement);
        this.AddMultipleResults(d.AllCCResults, vp.GetCCGradeElements);
        this.AddMultipleResults(d.AllSAEResults, vp.GetSAEGradeElements);
    }

    private AddMultipleResults(results: number[], func: (ue: number) => HTMLElement[]): void {
        const saeElements: HTMLTableRowElement[] = <HTMLTableRowElement[]>func(this.index);
        for (let i = 0; i < results.length; i++) {
            this.AddCell(saeElements[i], results[i]);
        }
    }
    private AddSingleResults(ueResult: number, func: (ue: number) => HTMLElement): void {
        let ueEl: HTMLTableRowElement = <HTMLTableRowElement>func(this.index);
        this.AddCell(ueEl, ueResult);
    }

    private AddCell(element: HTMLTableRowElement, result: number): void {
        element.insertCell(this.CELL_INSERTION_INDEX).outerHTML = DOMElementBuilder.CreateResultCell(result).outerHTML;
    }
}