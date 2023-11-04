import { SemestreFactory } from "./Model/LogicLayer/Factories/SemestreFactory";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";
import { SemesterNames } from "./Model/LogicLayer/Parsing/SemesterNames";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { MainPageView } from "./View/MainPageView";
import { ChromeStorage } from "./Data/Storage/ChromeStorage";
import { StoredSemester } from "./Model/Types/Storage/StoredSemester";

let semester: Semestre = SemestreFactory.Instance.GetSemester();

semester.UEList.forEach(ue => {console.log(ue.Average);});
// if (!PageParser.Instance.AreGradesShown)
// {
//     MainPageView.Instance.AddGradeResultsToPage(semester);
// }