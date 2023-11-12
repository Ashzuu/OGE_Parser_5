import { Popup } from "../../../Popup/Popup";
import { Messages } from "../../Enum/Messages";
import { ActionDict } from "../../Types/Communication/ActionDict";
import { AnswersDict } from "../../Types/Communication/AnswersDict";
import { ListenerMessage } from "../../Types/Communication/ListenerMessage";
import { SemesterNames } from "../Parsing/SemesterNames";
import { YearlyAverage } from "../Results/YearlyAverage";

/** Actions et Reponses possibles dans la communication entre le content script et le popup */
export class Actions
{
    private constructor()
    {
        //GetYearDetails
        this.actions[Messages.GetYearDetails] = (params: any) => { Popup.DisplayYearlyAverage(params); }
        this.answers[Messages.GetYearDetails] = () => {
            return {
                content: Messages.GetYearDetails,
                params: new YearlyAverage().ToYearDetails()
            };
        }
        
        //AskToLoadCorrespondingSemester
        this.actions[Messages.AskToLoadCorrespondingSemester] = (params: any) => { Popup.AskLoadCorrespondingSemester(params); }
        this.answers[Messages.AskToLoadCorrespondingSemester] = () => {
            return {
                content: Messages.AskToLoadCorrespondingSemester,
                params: SemesterNames.CorrespondingSemester
            };
        }
    }

    private static instance: Actions = new Actions();
    private readonly actions: ActionDict = {}
    /**
     * Dictionnaire des actions possibles
     * @remarks Les clées sont les messages possibles venant de l'enum Messages
     */
    public static get Actions(): ActionDict
    {        
        return this.instance.actions;
    }

    private readonly answers: AnswersDict = {}
    /**
     * Dictionnaire des actions possibles
     * @remarks Les clées sont les messages possibles venant de l'enum Messages
     */
    public static get Answers(): AnswersDict
    {        
        return this.instance.answers;
    }
    
}