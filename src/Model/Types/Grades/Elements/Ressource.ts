import { Element } from "../Element";
import { Section } from "./Section";

/** Represente une Ressource */
export class Ressource extends Element
{
    /**Liste des sections de la ressource */
    public get SectionList(): Section[]
    {
        return this._subElements as Section[];
    }
    /**
     * Constructeur par defaut d'une Ressource
     * @param coefficient Coefficient de la ressource
     * @param sections Sections de la ressource
     */
    constructor(coefficient: number, sections: Section[])
    {
        super(coefficient, sections);
    }
}