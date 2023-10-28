
import { DOMManipulator } from "../Model/LogicLayer/DomManipulator";
import { PageParser } from "../Model/LogicLayer/Parsing/PageParser";
import { DetailedUEResult } from "../Model/Types/Grades/DetailedUEResult";
import { DOMElementBuilder } from "./DOMElementBuilder";

export class MainPageGradeView
{
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
    
    public AddGradeResultToPage(
        detailedUEResult: DetailedUEResult
    ): void
    {
        this.AddGlobalUEResult(detailedUEResult.UEResult);
        this.AddGlobalCCResult(detailedUEResult.CCResult);
        this.AddGlobalSAEResult(detailedUEResult.SAEResult);
        this.AddAllCCResults(detailedUEResult.AllCCResults);
        this.AddAllSAEResults(detailedUEResult.AllSAEResults);
    }

    private AddAllSAEResults(allSAEResults: number[]) {
        
        let begin = this.SaeIndex + 1;
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
    private AddGlobalSAEResult(saeResult: number) { this.AddSingleResult(saeResult, [1, this.SaeIndex]); }
    private AddGlobalCCResult(ccResult: number) { this.AddSingleResult(ccResult, [1, 0]); }
    private AddGlobalUEResult(ueResult: number) { this.AddSingleResult(ueResult, [0, 0], false); }

    private AddMultipleResult(grades: number[], begin: number, end: number){
        for (let i = begin; i < end; i++){
            this.AddSingleResult(grades[i - begin], [1, i]);
        }
    }
    private AddSingleResult(grade: number, location: number[], isTD: boolean = true){
        let resultHTML: HTMLTableCellElement = DOMElementBuilder.AddSingleResult(grade, isTD);
        let cell: HTMLTableCellElement = 
        (PageParser
        .Instance
        .GetChild(this.Table, location) as HTMLTableRowElement)
        .insertCell(this.CELL_INSERTION_INDEX
        );
        
        DOMManipulator.AddResultInCell(cell, resultHTML);
    }
}