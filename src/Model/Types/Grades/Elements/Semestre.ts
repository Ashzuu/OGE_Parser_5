import { Element } from "../Element";
import { UE } from "./UE";

/**
 * Represente un Semestre
 */
export class Semestre extends Element
{
    private _ueList: UE[];
    /**Liste des UE du semestre */
    public get UEList()
    {
        return this._ueList;
    }
    /**
     * Constructeur par defaut d'un Semestre
     * @param coefficient coefficient du semestre
     * @param ueList Liste des UE du semestre
     */
    constructor(coefficient: number, ueList: Element[])
    {
        super(coefficient, ueList);
        this._ueList = this._lowerElements as UE[];
    }
}