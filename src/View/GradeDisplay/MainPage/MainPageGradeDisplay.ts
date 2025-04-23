import { ViewParser } from '../../../Model/LogicLayer/Parsing/ViewParser';
import { Semestre } from '../../../Model/Types/Grades/Elements/Semestre';
import { GradeDisplay } from '../../GradeDisplay';
import { MainPageGradeView } from './MainPageGradeView';

/** Affichage des resultats sur la page principale */
export class MainPageGradeDisplay implements GradeDisplay {
    private readonly GRADE_WARNING_BASE_ID: string = 'mainBilanForm:bilanAvantJuryMobilePanel1';
    private readonly GRADE_WARNING_DATE_FORMAT: RegExp = new RegExp(/\d{1,2} .+ 20\d\d/);
    private readonly GRADE_WARNING_PATH: number[] = [0, 0, 1];

    public DisplayWarning(): void {
        const warningDiv: HTMLElement | null = document.getElementById(this.GRADE_WARNING_BASE_ID);

        let finalText: string | undefined = undefined;
        if (warningDiv && warningDiv.textContent != null) {
            let base: string = warningDiv.textContent;
            base = base.replace(/\n/g, '');
            base = base.trim();

            let semesterEndDate: string = base.match(this.GRADE_WARNING_DATE_FORMAT)?.[0] ?? '';

            finalText =
                "Important : Les <b>vraies</b> moyennes et classements ne seront visibles qu'à partir du " +
                semesterEndDate +
                '.</br>&emsp;&emsp;' +
                "<b>Tout ce qui est produit par l'extension est une estimation et n'a aucune réélle valeur.</b>";
        }

        //Si le finalText n'est pas null warningDiv ne devrait pas l'etre non plus
        if (finalText) {
            ViewParser.GetChild(warningDiv!, this.GRADE_WARNING_PATH).innerHTML = finalText;
        }
    }

    public DisplayGrades(semester: Semestre): void {
        if (!ViewParser.Instance.AreGradesShown) {
            MainPageGradeView.AddGradeResultsToPage(semester);
        }
    }
}
