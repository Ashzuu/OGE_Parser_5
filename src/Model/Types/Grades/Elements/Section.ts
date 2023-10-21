import { Element } from "../Element";
import { Note } from "./Note";

/**
 * Represente une Section
 */
export class Section extends Element
{
    private _gradeList: Note[];
    /**
     * Liste des notes dans la section
     */
    public get GradeList()
    {
        return this._gradeList;
    }
    
    /**
     * Constructeur par defaut d'une Section
     * @param coefficient Coefficient de la section
     * @param notes Liste des notes de la section
     */
    constructor(coefficient: number, notes: Element[])
    {
        super(coefficient, notes);
        this._gradeList = this._lowerElements as Note[];
    }
}