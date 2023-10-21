import { Element } from "../Element";
import { Ressource } from "./Ressource";

/**
 * Represente une UE
 */
export class UE extends Element
{
    private _ressourceList: Ressource[];
    /**Liste des ressources de l'UE */
    public get RessourceList()
    {
        return this._ressourceList;
    }
    /**
     * Constructeur par defaut d'une UE
     * @param coefficient Coefficient de l'UE
     * @param ressources Ressources de l'UE
     */
    constructor(coefficient: number, ressources: Element[])
    {
        super(coefficient, ressources);
        this._ressourceList = this._lowerElements as Ressource[];
    }
}