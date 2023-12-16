import { Popup } from "../../../../Popup/Popup";
import { Messages } from "../../../Enum/Messages";
import { IActionAnswerPair } from "../../../Interfaces/IActionAnswerPair";
import { ListenerMessage } from "../../../Types/Communication/ListenerMessage";
import { YearlyAverage } from "../../Results/YearlyAverage";

export class GetYearDetailsPair implements IActionAnswerPair
{
    public Message: string = Messages.GetYearDetails;

    public Action(params: any): void
    {
        Popup.DisplayYearlyAverage(params);
    }
    
    public Answer(): ListenerMessage
    {
        return {
            content: this.Message,
            params: new YearlyAverage().ToYearDetails()
        };
    }
}