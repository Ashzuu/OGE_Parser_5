import { DetailedUEResult } from "../DetailedUEResult";
import { Element } from "../Element";
import { Ressource } from "./Ressource";

/**
 * Represente une UE
 */
export class UE extends Element
{
    private _ressourceList: Ressource[];
    private _saeIndex: number;
    public get SAEIndex(): number { return this._saeIndex; }
    /**Liste des ressources de l'UE */
    private get RessourceList(): Ressource[]
    {
        return this._ressourceList;
    }
    private get CCRessources(): Ressource[]
    {
        let ccRessources: Ressource[] = [];

        let n: number = Math.min(this.SAEIndex - 1, this.RessourceList.length);
        for (let i = 0; i < n; i++){
            ccRessources.push(this._ressourceList[i]);
        }

        return ccRessources;
    }
    private get SAERessources(): Ressource[]
    {
        let saeRessources: Ressource[] = [];
        for (let i = this.SAEIndex - 1; i < this.RessourceList.length; i++){
            saeRessources.push(this._ressourceList[i]);
        }

        return saeRessources;
    }
    
    private get GetGlobalCCAverage(): number
    {
        let avg = -1;
        let sum = 0;
        let coef = 0;

        this.CCRessources.forEach(res => {
            sum += res.Average * res.Coefficient;
            coef += res.Coefficient;
        })
        if (coef > 0) avg = sum / coef;

        return avg;
    }
    private get GetGlobalSAEAverage(): number
    {
        let avg = -1;
        let sum = 0;
        let coef = 0;

        this.SAERessources.forEach(res => {
            sum += res.Average * res.Coefficient;
            coef += res.Coefficient;
        })
        if (coef > 0) avg = sum / coef;

        return avg;
    }

    private get GetCCAverages(): number[]
    {
        let averages: number[] = [];
        let n = Math.min(this._saeIndex - 1, this._ressourceList.length)
        for (let i = 0; i < n; i++){
            averages.push(this._ressourceList[i].Average);
        }

        return averages;
    }
    private get GetSAEAverages(): number[]
    {
        let averages: number[] = [];
        for (let i = this._saeIndex - 1; i < this._ressourceList.length; i++){
            averages.push(this._ressourceList[i].Average);
        }

        return averages;
    }

    public get GetDetailedResults(): DetailedUEResult
    {
        return {
            UEResult : this.Average,
            CCResult : this.GetGlobalCCAverage,
            SAEResult : this.GetGlobalSAEAverage,
            AllCCResults : this.GetCCAverages,
            AllSAEResults : this.GetSAEAverages
        } as DetailedUEResult;
    }
    /**
     * Constructeur par defaut d'une UE
     * @param coefficient Coefficient de l'UE
     * @param ressources Ressources de l'UE
     */
    constructor(coefficient: number, ressources: Element[], saeIndex: number)
    {
        super(coefficient, ressources);
        this._ressourceList = this._lowerElements as Ressource[];

        this._saeIndex = saeIndex;
    }
}