import { Semestre } from "../../../Model/Types/Grades/Elements/Semestre";
import { GradeDisplay } from "../../GradeDisplay";

export class DebugGradeDisplay implements GradeDisplay {
    public DisplayGrades(semester: Semestre): void {
        semester.UEList.forEach(
            ue => console.log(Object.keys(ue).forEach(key => console.log(key, typeof key, (ue as any)[key])))
        );
    }
}