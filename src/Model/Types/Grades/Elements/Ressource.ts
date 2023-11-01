import { Element } from "../Element";
import { Section } from "./Section";

/** Represente une Ressource */
export class Ressource extends Element
{
    private _sectionList: Section[];
    private _name: string;
    /**Liste des sections de la ressource */
    public get SectionList(): Section[]
    {
        return this._sectionList;
    }

    public get Name(): string
    {
        return this._name;
    }
    /**
     * Constructeur par defaut d'une Ressource
     * @param coefficient Coefficient de la ressource
     * @param sections Sections de la ressource
     */
    constructor(name: string, coefficient: number, sections: Element[])
    {
        super(coefficient, sections);
        this._name = name;
        this._sectionList = this._lowerElements as Section[];
    }
}