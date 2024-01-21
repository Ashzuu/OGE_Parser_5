import { Actions } from "./Model/LogicLayer/Communication/Actions";
import { Content } from "./Content";
import { GradeParser } from "./Model/LogicLayer/Parsing/GradeParser";

chrome.runtime.onMessage.addListener((message: string) => {
    chrome.runtime.sendMessage(Actions.Answers[message]());
});

new Content().Setup();