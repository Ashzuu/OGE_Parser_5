import { Actions } from "./Model/LogicLayer/Communication/Actions";
import { Content } from "./Content";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";

chrome.runtime.onMessage.addListener((message: string) => {
    chrome.runtime.sendMessage(Actions.Answers[message]());
});

new Content().Setup();