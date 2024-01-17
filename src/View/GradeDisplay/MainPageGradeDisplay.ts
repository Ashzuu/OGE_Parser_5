import { MainPageView } from "../MainPageView";
import { PageParser } from "../../Model/LogicLayer/Parsing/PageParser";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { IGradeDisplay } from "../../Model/Interfaces/IGradeDisplay";

export class MainPageGradeDisplay implements IGradeDisplay
{
    public DisplayGrades(semester: Semestre): void
    {
        if (!PageParser.Instance.AreGradesShown)
        {
            MainPageView.Instance.AddGradeResultsToPage(semester);
        }
    }
}