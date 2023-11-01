import { Element } from "../Element";
import { GradeCoefficientPair } from "./GradeCoefficientPair";

/** Represente une Note */
export class Note extends Element
{
    private _grade: number;
    public get Average(): number{
        return this._grade;
    }
    /**
     * Constructeur par defaut d'une Note
     * @param grade valeur de la note
     * @param coefficient coefficient de la note
     */
    constructor(grade: GradeCoefficientPair)
    {
        super(grade.coefficient, []);
        this._grade = grade.grade;
    }
}