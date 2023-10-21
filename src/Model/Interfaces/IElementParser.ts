
import { Element } from "../Grades/Element";

export interface IElementParser{
    CreateElement(htmlElement: HTMLElement): Element;
}