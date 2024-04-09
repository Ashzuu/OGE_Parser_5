import { Semestre } from "../../../Model/Types/Grades/Elements/Semestre";
import { GradeDisplay } from "../../GradeDisplay";

export class ConsoleGradeDisplay implements GradeDisplay {
    public DisplayGrades(semester: Semestre): void {
        semester.UEList.forEach(
            ue => console.log(ue.Average?.toFixed(2))
        );
    }
}