import { YearDetails } from "../Model/Types/Grades/YearDetails";
import { ViewStyle } from "./ViewStyle";

/** Classe creant les elements HTML pour les resultats*/
export class DOMElementBuilder
{
    /**
     * Ajoute un element HTML pour un resultat
     * @param grade Note
     * @param isTD Est un element TD, sinon TH
     * @returns Element HTML
     */
    public static AddSingleResult(grade: number, isTD: boolean): HTMLTableCellElement
    {
        let gradeType: string = (isTD) ? "R" : "UE";
        let child: HTMLTableCellElement = this.CreateTableCell(
            grade,
            [gradeType, ViewStyle.GetGradeColor(grade)],
            isTD
            );
        
        return child;
    }
    /**
     * Ajoute un element HTML pour un resultat
     * @param grade Note
     * @param classesToAdd Classes a ajouter 
     * @param isTD Est un element TD, sinon TH
     * @returns Element HTML
     */
    private static CreateTableCell(value: number | string, classesToAdd: string[], isTD: boolean): HTMLTableCellElement{
        let child: HTMLTableCellElement;
        if (isTD) child = document.createElement("td");
        else child = document.createElement("th")

        let innerHTML: string = "&nbsp;N/A&nbsp;";
        if (typeof value === "number"){
            if (value && value >= 0) innerHTML = value.toFixed(2);
        }
        else { innerHTML = value; }

        child.innerHTML = innerHTML;

        this.AddClasses(child, classesToAdd);

        return child;
    }

    private static AddClasses(child: HTMLElement, classesToAdd: string[]): void
    {
        classesToAdd.forEach(type => {
            child.classList.add(type);
        });
    }

    public static CreateWarningMessage(message: string): HTMLElement
    {
        let el: HTMLElement = document.createElement("td");
        el.innerText = message;

        this.AddClasses(el, ["warning"]);

        return el;
    }

    public static CreateTableHeader(yearName: string): HTMLTableSectionElement
    {
        let header: HTMLTableSectionElement = document.createElement("thead");
        let row: HTMLTableRowElement = document.createElement("tr");
        let yearNameCell: HTMLTableCellElement = document.createElement("th");
        yearNameCell.innerHTML = yearName;
        yearNameCell.colSpan = 2;
        row.appendChild(yearNameCell);
        header.appendChild(row);

        return header;
    }
    public static CreateTableBody(yearDetails: YearDetails): HTMLTableSectionElement
    {
        let body: HTMLTableSectionElement = document.createElement("tbody");
        for (let i = 0; i < yearDetails.YearlyAverages.length; i++) {
            let row: HTMLTableRowElement = document.createElement("tr");
            let average: number = yearDetails.YearlyAverages[i];

            let ueCell: HTMLTableCellElement = this.CreateTableCell("UE " + (i + 1), [], true);
            let averageCell: HTMLTableCellElement = this.CreateTableCell(average, ["R", ViewStyle.GetGradeColor(average)], true);
            row.appendChild(ueCell);
            row.appendChild(averageCell);
            body.appendChild(row);
        }

        return body;
    }
}