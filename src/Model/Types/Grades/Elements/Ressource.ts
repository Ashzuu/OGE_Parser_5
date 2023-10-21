import { Element } from "../Element";
import { Section } from "./Section";

/**
 * Represente une Ressource
 */
export class Ressource extends Element
{
    private _sectionList: Section[];
    /**Liste des sections de la ressource */
    public get SectionList()
    {
        return this._sectionList;
    }
    /**
     * Constructeur par defaut d'une Ressource
     * @param coefficient Coefficient de la ressource
     * @param sections Sections de la ressource
     */
    constructor(coefficient: number, sections: Element[])
    {
        super(coefficient, sections);
        this._sectionList = this._lowerElements as Section[];
    }
}