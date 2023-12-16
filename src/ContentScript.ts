import { Actions } from "./Model/LogicLayer/Communication/Actions";
import { Content } from "./Content";

chrome.runtime.onMessage.addListener((message: string) => {
    chrome.runtime.sendMessage(Actions.Answers[message]());
});

//Point d'entrée de l'extension
function main(): void
{
    new Content().Setup();
}

main();

//TODO: Si ressources a pas de notes ca plante