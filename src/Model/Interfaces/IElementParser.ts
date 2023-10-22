
import { Element } from "../Types/Grades/Element";

export interface IElementParser{
    CreateElement(htmlElement: HTMLElement): Element;
}