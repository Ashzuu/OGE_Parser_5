import { SemestreFactory } from "./Model/LogicLayer/Factories/SemestreFactory";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { MainPageView } from "./View/MainPageView";
import { ChromeStorage } from "./Data/Storage/ChromeStorage";
import { Actions } from "./Model/LogicLayer/Communication/Actions";

let parsedSemester: Semestre = SemestreFactory.GetSemester();
ChromeStorage.Instance.Save(parsedSemester);
// DisplayGrades(parsedSemester);

//#region functions
function DisplayGrades(semestre: Semestre): void
{
    if (!PageParser.Instance.AreGradesShown)
    {
        MainPageView.Instance.AddGradeResultsToPage(semestre);
    }
}
//#endregion functions

chrome.runtime.onMessage.addListener((message: string) => {
    chrome.runtime.sendMessage(Actions.Answers[message]());
});