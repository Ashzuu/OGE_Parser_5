import { PageParser } from "../Model/LogicLayer/Parsing/PageParser";
import { UEDetails } from "../Model/Types/Grades/UEDetails";
import { DOMElementBuilder } from "./DOMElementBuilder";

export class MainPageGradeView
{
    /**
     * Constructeur
     * @param table Tableau des resultats 
     * @param saeIndex Index de la SAE
     */
    public constructor(table: HTMLTableElement, saeIndex: number)
    {
        this._table = table;
        this._saeIndex = saeIndex;
    }
    //#region Properties
    private readonly CELL_INSERTION_INDEX = 1;
    private _saeIndex: number;
    private get SaeIndex(): number { return this._saeIndex; }

    private _table: HTMLTableElement;
    private get Table(): HTMLTableElement { return this._table; }
    //#endregion Properties
    /**
     * Ajoute les resultats a la page
     * @param detailedUEResult Resultats
     */
    public AddGradeResultToPage(
        detailedUEResult: UEDetails
    ): void
    {
        debugger;
        this.AddGlobalUEResult(detailedUEResult.UEResult);
        this.AddGlobalCCResult(detailedUEResult.CCResult);
        this.AddGlobalSAEResult(detailedUEResult.SAEResult);
        this.AddAllCCResults(detailedUEResult.AllCCResults);
        this.AddAllSAEResults(detailedUEResult.AllSAEResults);
    }

    private AddAllSAEResults(allSAEResults: number[]) {
        
        let begin = this.SaeIndex + 2;
        let end = allSAEResults.length + begin;
        
        this.AddMultipleResult(
            allSAEResults,
            begin,
            end
            );
    }
    private AddAllCCResults(allCCResults: number[]) {
        let begin = 1;
        let end = Math.min(this.SaeIndex, allCCResults.length) + begin;

        this.AddMultipleResult(
            allCCResults,
            begin,
            end
            );
    }
    private AddGlobalSAEResult(saeResult: number) { this.AddSingleResult(saeResult, [1, this.SaeIndex + 1]); }
    private AddGlobalCCResult(ccResult: number) { this.AddSingleResult(ccResult, [1, 0]); }
    private AddGlobalUEResult(ueResult: number) { this.AddSingleResult(ueResult, [0, 0], false); }

    /**
     * Ajoute plusieurs resultats a la page
     * @param grades Notes
     * @param begin Index de debut dans le tableau
     * @param end Index de fin
     */
    private AddMultipleResult(grades: number[], begin: number, end: number){
        for (let i = begin; i < end; i++){
            this.AddSingleResult(grades[i - begin], [1, i]);
        }
    }
    /**
     * Ajoute un resultat a la page
     * @param grade Note
     * @param location Emplacement du resultat
     * @param isTD Est un element TD, sinon TH
     */
    private AddSingleResult(grade: number, location: number[], isTD: boolean = true){
        let resultHTML: HTMLTableCellElement = DOMElementBuilder.AddSingleResult(grade ?? 'NaN', isTD);
        let cell: HTMLTableCellElement = 
        (PageParser
        .GetChild(this.Table, location) as HTMLTableRowElement)
        .insertCell(this.CELL_INSERTION_INDEX
        );
        
        this.AddResultInCell(cell, resultHTML);
    }

    private AddResultInCell(cell: HTMLTableCellElement, result: HTMLTableCellElement): void
    {
        cell.outerHTML = result.outerHTML;
        cell.innerHTML = result.innerHTML;
    }
}