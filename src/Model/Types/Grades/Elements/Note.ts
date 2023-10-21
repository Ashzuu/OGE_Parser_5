import { Element } from "../Element";

/**
 * Represente une Note
 */
export class Note extends Element
{
    private _grade: number;
    /**
     * Note avec le coefficient prit en compte
     */
    public get Grade()
    {
        return this._grade * this.Coefficient;
    }

    /**
     * Constructeur par defaut d'une Note
     * @param grade valeur de la note
     * @param coefficient coefficient de la note
     */
    constructor(grade: number, coefficient: number)
    {
        super(coefficient, []);
        this._grade = grade;
    }
}