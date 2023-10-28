import { Element } from "../Element";
import { UE } from "./UE";

/**
 * Represente un Semestre
 */
export class Semestre extends Element
{
    private _ueList: UE[];
    /**Liste des UE du semestre */
    public get UEList(): UE[]
    {
        return this._ueList;
    }
    /**
     * Constructeur par defaut d'un Semestre
     * @param ueList Liste des UE du semestre
     */
    constructor(ueList: Element[])
    {
        super(1, ueList);
        this._ueList = this._lowerElements as UE[];
    }
}