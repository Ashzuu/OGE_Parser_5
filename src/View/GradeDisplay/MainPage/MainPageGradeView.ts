import { ViewParser } from '../../../Model/LogicLayer/Parsing/ViewParser';
import { Semestre } from '../../../Model/Types/Grades/Elements/Semestre';
import { UEDetails } from '../../../Model/Types/Grades/UEDetails';
import { DOMElementBuilder } from '../../DOMElementBuilder';

/** Aide à l'affichage des resultats sur la page principale */
export class MainPageGradeView {
    //#region Properties
    private readonly CELL_INSERTION_INDEX = 1;

    //#region static
    /**
     * Ajoute les resultats a la page
     * @param semester Semestre
     */
    public static AddGradeResultsToPage(semester: Semestre) {
        const view = new MainPageGradeView();
        let n: number = Math.min(semester.UEList.length, ViewParser.Instance.UECount);

        for (let i = 0; i < n; i++) {
            view.AddGradeResultToPage(i, semester.UEList[i].Details);
        }
    }

    //#endregion Properties
    /**
     * Ajoute les resultats a la page
     * @param tableIndex Index de la table sur le DOM
     * @param detailedUEResult Resultats de l'UE correspondante
     */
    public AddGradeResultToPage(tableIndex: number, detailedUEResult: UEDetails): void {
        const ix = tableIndex;
        const d = detailedUEResult;
        const vp = ViewParser.Instance;

        //Evite la perte de contexte quand les methodes seront passées en parametre
        this.AddSingleResults(ix, d.UEResult, vp.GetUEElement);

        this.AddSingleResults(ix, d.CCResult, vp.GetPoleCCElement);
        this.AddMultipleResults(ix, d.AllCCResults, vp.GetCCGradeElements);

        this.AddSingleResults(ix, d.SAEResult, vp.GetPoleSaeElement);
        this.AddMultipleResults(ix, d.AllSAEResults, vp.GetSAEGradeElements);
    }

    private AddMultipleResults(
        tableIndex: number,
        results: number[],
        func: (ue: number) => HTMLElement[],
    ): void {
        const elements: HTMLTableRowElement[] = <HTMLTableRowElement[]>func(tableIndex);

        for (let i = 0; i < results.length; i++) {
            this.AddCell(elements[i], results[i]);
        }
    }

    private AddSingleResults(
        tableIndex: number,
        ueResult: number,
        func: (ue: number) => HTMLElement,
    ): void {
        let ueEl: HTMLTableRowElement = <HTMLTableRowElement>func(tableIndex);
        this.AddCell(ueEl, ueResult);
    }

    private AddCell(element: HTMLTableRowElement, result: number): void {
        element.insertCell(this.CELL_INSERTION_INDEX).outerHTML =
            DOMElementBuilder.CreateResultCell(result).outerHTML;
    }

    //#endregion static
}
