import { Popup } from "../../../../Popup/Popup";
import { Messages } from "../../../Enum/Messages";
import { IActionAnswerPair } from "../../../Interfaces/IActionAnswerPair";
import { ListenerMessage } from "../../../Types/Communication/ListenerMessage";
import { SemesterNames } from "../../Parsing/SemesterNames";

export class AskToLoadCorrespondingSemesterPair implements IActionAnswerPair
{
    public Message: string = Messages.AskToLoadCorrespondingSemester;

    public Action(params: any): void
    {
        Popup.AskLoadCorrespondingSemester(params);
    }
    
    public Answer(): ListenerMessage
    {
        return {
            content: this.Message,
            params: SemesterNames.CorrespondingSemester
        };
    }
}