import { ViewStyle } from "./ViewStyle";

export class DOMElementBuilder
{
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

    private static CreateTableCell(grade: number, classesToAdd: string[], isTD: boolean): HTMLTableCellElement{
        let child: HTMLTableCellElement;
        if (isTD) child = document.createElement("td");
        else child = document.createElement("th")

        let innerHTML: string = "&nbsp;N/A&nbsp;";
        if (grade && grade >= 0) innerHTML = grade.toFixed(2);
        child.innerHTML = innerHTML;

        classesToAdd.forEach(type => {
            child.classList.add(type);
        });

        return child;
    }
}