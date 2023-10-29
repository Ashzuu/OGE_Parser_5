import { SemestreFactory } from "./Model/LogicLayer/Factories/SemestreFactory";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { MainPageView } from "./View/MainPageView";

let semester: Semestre = SemestreFactory.Instance.GetSemester();

if (!PageParser.Instance.AreGradesShown)
{
    MainPageView.Instance.AddGradeResultsToPage(semester);
}