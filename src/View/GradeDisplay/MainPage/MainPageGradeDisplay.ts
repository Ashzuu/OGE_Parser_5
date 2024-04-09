import { Semestre } from "../../../Model/Types/Grades/Elements/Semestre";
import { GradeDisplay } from "../../GradeDisplay";
import { ViewParser } from "../../../Model/LogicLayer/Parsing/ViewParser";
import { MainPageGradeView } from "./MainPageGradeView";

export class MainPageGradeDisplay implements GradeDisplay {
    public DisplayGrades(semester: Semestre): void {
        if (!ViewParser.Instance.AreGradesShown) {
            MainPageGradeView.AddGradeResultsToPage(semester);
        }
    }
}