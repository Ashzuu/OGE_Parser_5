import { DetailedUEResult } from "../DetailedUEResult";
import { Element } from "../Element";
import { Ressource } from "./Ressource";

/** Represente une UE */
export class UE extends Element
{
    private _ressourceList: Ressource[];
    private _saeIndex: number;
    /**Index de la premiere ressource du SAE */
    public get SAEIndex(): number { return (this._saeIndex != -1) ? this._saeIndex : this.RessourceList.length; }
    /**Liste des ressources de l'UE */
    private get RessourceList(): Ressource[]
    {
        return this._ressourceList;
    }
    /**Liste des ressources du pôle CC*/
    private get CCRessources(): Ressource[]
    {
        let ccRessources: Ressource[] = [];

        let n: number = Math.min(this.SAEIndex - 1, this.RessourceList.length);
        for (let i = 0; i < n; i++){
            ccRessources.push(this._ressourceList[i]);
        }

        return ccRessources;
    }
    /**Liste des ressources du pôle SAE */
    private get SAERessources(): Ressource[]
    {
        let saeRessources: Ressource[] = [];
        for (let i = this.SAEIndex - 1; i < this.RessourceList.length; i++){
            saeRessources.push(this._ressourceList[i]);
        }

        return saeRessources;
    }
    /**Moyenne globale du pôle CC*/
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
    /**Moyenne globale du pôle SAE */
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
    /**Moyenne de chaque ressources du pôle CC */
    private get GetCCAverages(): number[]
    {
        let averages: number[] = [];
        let n = Math.min(this._saeIndex - 1, this._ressourceList.length)
        for (let i = 0; i < n; i++){
            averages.push(this._ressourceList[i].Average);
        }

        return averages;
    }
    /**Moyenne de chaque ressources du pôle SAE */
    private get GetSAEAverages(): number[]
    {
        let averages: number[] = [];
        for (let i = this._saeIndex - 1; i < this._ressourceList.length; i++){
            averages.push(this._ressourceList[i].Average);
        }

        return averages;
    }

    /** Resultats detaillés de l'UE */
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