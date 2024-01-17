import { UEDetails } from "../UEDetails";
import { Element } from "../Element";
import { Ressource } from "./Ressource";

/** Represente une UE */
export class UE extends Element
{
    private _saeIndex: number;
    /**Index de la premiere ressource du SAE */
    public get SAEIndex(): number
    {
        //Si l'index est connu il sera different de -1,
        //S'il est inconnu on prend le nombre de ressources de l'UE en considerant qu'il n'y a pas de SAE
        let ret: number;
        if (this._saeIndex == -1) ret = this.RessourceList.length;
        //S'il est different de zero on prend en compte le cas ou il serait erroné et serait superieur au nombre de ressources de l'UE
        else ret = Math.min(this._saeIndex, this.RessourceList.length);
        
        return ret;
    }
    /**Liste des ressources de l'UE */
    private get RessourceList(): Ressource[]
    {
        return this._subElements as Ressource[];
    }
    /**Liste des ressources du pôle CC*/
    private get CCRessources(): Ressource[]
    {
        let ccRessources: Ressource[] = [];

        //n est la limite des ressources CC
        let n: number = Math.min(this.SAEIndex - 1, this.RessourceList.length);
        for (let i = 0; i < n; i++){
            ccRessources.push(this.RessourceList[i]);
        }

        return ccRessources;
    }
    /**Liste des ressources du pôle SAE */
    private get SAERessources(): Ressource[]
    {
        let saeRessources: Ressource[] = [];
        //SAEIndex est l'index de la premiere ressource SAE
        let begining: number = this.SAEIndex - 1;

        if (begining > -1)
        {
            for (let i = begining; i < this.RessourceList.length; i++)
            {
                saeRessources.push(this.RessourceList[i]);
            }
        }
        return saeRessources;
    }
    /**Moyenne globale du pôle CC*/
    private get GetGlobalCCAverage(): number | undefined
    {
        return this.GetAverage(this.CCRessources);
    }
    /**Moyenne globale du pôle SAE */
    private get GetGlobalSAEAverage(): number | undefined
    {
        return this.GetAverage(this.SAERessources);
    }
    /**Moyenne de chaque ressources du pôle CC */
    private get GetCCAverages(): number[]
    {
        return this.GetAverageList(this.CCRessources);
    }
    /**Moyenne de chaque ressources du pôle SAE */
    private get GetSAEAverages(): number[]
    {
        return this.GetAverageList(this.SAERessources);
    }

    private GetAverageList(ressources: Ressource[]): number[]
    {
        let averages: number[] = [];
        ressources.forEach(res => { if (res.Average) averages.push(res.Average)});

        return averages;
    }

    /** Resultats detaillés de l'UE */
    public get DetailedResults(): UEDetails
    {
        return {
            UEResult : this.Average,
            CCResult : this.GetGlobalCCAverage,
            SAEResult : this.GetGlobalSAEAverage,
            AllCCResults : this.GetCCAverages,
            AllSAEResults : this.GetSAEAverages
        } as UEDetails;
    }

    /**
     * Constructeur par defaut d'une UE
     * @param coefficient Coefficient de l'UE
     * @param ressources Ressources de l'UE
     */
    constructor(coefficient: number, ressources: Ressource[], saeIndex: number)
    {
        super(coefficient, ressources);
        this._saeIndex = saeIndex;
    }
}