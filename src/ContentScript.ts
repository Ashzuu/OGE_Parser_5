import { Actions } from "./Model/LogicLayer/Communication/Actions";
import { Content } from "./Content";

chrome.runtime.onMessage.addListener((message: string) => {
    chrome.runtime.sendMessage(Actions.Answers[message]());
});

//Point d'entrée de l'extension
function main(): void
{
    Content.Setup();
}

document.onload = main;