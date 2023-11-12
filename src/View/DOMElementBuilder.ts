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
    private static CreateTableCell(grade: number, classesToAdd: string[], isTD: boolean): HTMLTableCellElement{
        let child: HTMLTableCellElement;
        if (isTD) child = document.createElement("td");
        else child = document.createElement("th")

        let innerHTML: string = "&nbsp;N/A&nbsp;";
        if (grade && grade >= 0) innerHTML = grade.toFixed(2);
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
}