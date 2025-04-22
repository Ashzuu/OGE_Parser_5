/** Classe creant les elements HTML pour les resultats*/
export class DOMElementBuilder {
    //#region constants
    //Classe CSS correspondante dans le CSS injecté pour les cellules de notes rajoutées
    private static readonly ADDED_GRADE_CLASS: string = 'R';
    //Si les notes peuvent etre oranges (entre 8 inclu et 10 exclu)
    private static readonly CAN_BE_ORANGE = true;
    //#endregion constants

    //#region public methods
    /**
     * Ajoute un element HTML pour un resultat
     * @param grade Note
     * @returns Cellule HTML de la note
     * @remarks La cellule aura la classe CSS correspondant et celle pour la couleur de la note
     */
    public static CreateResultCell(grade: number): HTMLTableCellElement {
        let gradeType: string = this.ADDED_GRADE_CLASS;
        return this.CreateTableCell(grade?.toFixed(2) ?? 'NaN', [
            gradeType,
            this.GetGradeColor(grade),
        ]);
    }

    //#endregion public methods

    //#region private methods
    private static CreateTableCell(
        value: number | string,
        classesToAdd: string[],
    ): HTMLTableCellElement {
        let child: HTMLTableCellElement;
        child = document.createElement('td');

        let innerHTML: string = '&nbsp;N/A&nbsp;';
        if (typeof value === 'number') {
            if (value && value >= 0) innerHTML = value.toFixed(2);
        } else {
            innerHTML = value;
        }

        child.innerHTML = innerHTML;

        this.AddClasses(child, classesToAdd);

        return child;
    }

    private static AddClasses(child: HTMLElement, classesToAdd: string[]): void {
        classesToAdd.forEach(type => {
            child.classList.add(type);
        });
    }

    private static GetGradeColor(grade: number): string {
        let color: string = 'Green';
        if (isNaN(grade)) {
            color = 'Black';
        } else if (grade < 10) {
            if (this.CAN_BE_ORANGE && grade >= 8) color = 'Orange';
            else color = 'Red';
        }

        return color;
    }

    //#endregion private methods
}
