import { Semestre } from "../../Types/Grades/Elements/Semestre";
import { UE } from "../../Types/Grades/Elements/UE";
import { UEFactory } from "./UEFactory";


export class SemesterFactory
{
    public static GetSemester(): Semestre
    {
        let ue: UE[] = UEFactory.GetUEs();
        let semester = new Semestre(ue);

        return semester;
    }
}
