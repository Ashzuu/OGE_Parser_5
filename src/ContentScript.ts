import { SemestreFactory } from "./Model/LogicLayer/Factories/SemestreFactory";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { MainPageView } from "./View/MainPageView";
import { ChromeStorage } from "./Data/Storage/ChromeStorage";
import { Actions } from "./Model/LogicLayer/Communication/Actions";
import { Messages } from "./Model/Enum/Messages";

main();
//#region functions
export function ProcessSemester(): void
{
    //Remise a zero des donnees
    PageParser.Reset();
    let parsedSemester: Semestre = SemestreFactory.GetSemester();
    ChromeStorage.Instance.Save(parsedSemester);
    DisplayGrades(parsedSemester);
}

function DisplayGrades(semestre: Semestre): void
{
    // if (!PageParser.Instance.AreGradesShown)
    // {
        MainPageView.Instance.AddGradeResultsToPage(semestre);
    // }
}
//#endregion functions

function SetListeners(): void
{
    let elements: HTMLElement[] = Array.from(document.getElementsByClassName('ui-menuitem-link ui-corner-all')) as HTMLElement[];
    elements.forEach(element => {
        element.addEventListener('click', async () => {
            let start = Date.now();
            let loadingThingy: HTMLElement = document.getElementsByClassName('ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container statusDialog')[0] as HTMLElement;
            while (loadingThingy.style.display != "none") { await new Promise(r => setTimeout(r, 200)); }
            //TODO ProcessSemester(); ne fonctionne pas 
            setTimeout(() => {
                ProcessSemester();
                SetListeners();
                console.log("Done in", (Date.now() - start), "ms");
            }, 100);
        });
    });
}
chrome.runtime.onMessage.addListener((message: string) => {
    chrome.runtime.sendMessage(Actions.Answers[message]());
});


function main(): void
{
    ProcessSemester();
    SetListeners();
}