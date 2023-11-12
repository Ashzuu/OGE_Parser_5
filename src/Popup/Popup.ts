import { Messages } from "../Model/Enum/Messages";
import { YearDetails } from "../Model/Types/Grades/YearDetails";
import { DOMElementBuilder } from "../View/DOMElementBuilder";

export class Popup {
    public static AskLoadCorrespondingSemester(params: any) {
        let message: string = `Vous devez charger le semestre ${params} pour avoir la vraie moyenne à l'année.`;
        document.getElementById("results")!.appendChild(DOMElementBuilder.CreateWarningMessage(message));
    }
    constructor() {}
    public static DisplayYearlyAverage(yearDetails: YearDetails): void {
        console.table(yearDetails);
        
        if (yearDetails.NeedToAskToLoadCorrespondingSemester)
        {
            Popup.SendMessageToContentScript(Messages.AskToLoadCorrespondingSemester);
        }
    }

    public static SendMessageToContentScript(message: string): void {
        let params = { active: true, currentWindow: true };
        chrome.tabs.query(
            params,
            (tab) => { console.log(tab); chrome.tabs.sendMessage(tab[0].id!, message) }
        );
    }
}