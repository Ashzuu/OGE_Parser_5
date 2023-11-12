import { Messages } from "../Model/Enum/Messages";
import { Actions } from "../Model/LogicLayer/Communication/Actions";
import { YearlyAverage } from "../Model/LogicLayer/Results/YearlyAverage";
import { ListenerMessage } from "../Model/Types/Communication/ListenerMessage";
import { Popup } from "./Popup";

chrome.runtime.onMessage.addListener((message: ListenerMessage) => {
    Actions.Actions[message.content](message.params);
});

const RELOAD_BUTTON_ID = "reloadButton";
const RESULTS_ID = "results";

let reloadButton = document.getElementById(RELOAD_BUTTON_ID);
let resultsDiv = document.getElementById(RESULTS_ID);

reloadButton!.addEventListener("click", () => {
    resultsDiv!.innerHTML = "";
    Popup.SendMessageToContentScript(Messages.GetYearDetails);
});