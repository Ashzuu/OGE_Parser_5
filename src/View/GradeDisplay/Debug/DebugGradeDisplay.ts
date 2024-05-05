import { Semestre } from "../../../Model/Types/Grades/Elements/Semestre";
import { GradeDisplay } from "../../GradeDisplay";

/** Affichage des resultats pour le debuggage */
export class DebugGradeDisplay implements GradeDisplay {
    public DisplayWarning(): void { }

    public DisplayGrades(semester: Semestre): void {
        semester.UEList.forEach(
            ue => Object.keys(ue).forEach(key => console.log(key, typeof key, (ue as any)[key]))
        );
    }
}