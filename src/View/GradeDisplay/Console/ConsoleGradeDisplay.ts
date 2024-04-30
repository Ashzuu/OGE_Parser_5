import { Semestre } from "../../../Model/Types/Grades/Elements/Semestre";
import { GradeDisplay } from "../../GradeDisplay";

/** Affichage des resultats dans la console */
export class ConsoleGradeDisplay implements GradeDisplay {

    public DisplayWarning(): void { }

    public DisplayGrades(semester: Semestre): void {
        semester.UEList.forEach(
            ue => console.log(ue.Average?.toFixed(2))
        );
    }
}