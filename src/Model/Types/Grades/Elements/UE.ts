import { UEDetails } from "../UEDetails";
import { Element } from "../Element";
import { Ressource } from "./Ressource";

/** Represente une UE */
export class UE extends Element {
    
    //#region private 
    private saeIndex: number;
    private name: string;

    private get Ressources(): Ressource[] {
        return this.SubElements as Ressource[];
    }
    private get CCRessources(): Ressource[] {
        let ccRessources: Ressource[] = [];

        //n est la limite des ressources CC
        let n: number = Math.min(this.SAEIndex, this.Ressources.length);
        for (let i = 0; i < n; i++) {
            ccRessources.push(this.Ressources[i]);
        }

        return ccRessources;
    }
    private get SAERessources(): Ressource[] {
        let saeRessources: Ressource[] = [];
        //SAEIndex est l'index de la premiere ressource SAE
        let begining: number = this.SAEIndex;

        if (begining > -1) {
            for (let i = begining; i < this.Ressources.length; i++) {
                saeRessources.push(this.Ressources[i]);
            }
        }

        return saeRessources;
    }
    private get GlobalCCAverage(): number {
        return this.GetAverage(this.CCRessources);
    }
    private get GlobalSAEAverage(): number {
        return this.GetAverage(this.SAERessources);
    }
    private get CCAverages(): number[] {
        return this.GetAverageList(this.CCRessources);
    }
    private get SAEAverages(): number[] {
        return this.GetAverageList(this.SAERessources);
    }

    private GetAverageList(ressources: Ressource[]): number[] {
        return ressources.map(res => { return res.Average }) as number[];
    }
    //#endregion private

    /**Nom de l'UE */
    public get Name(): string { return this.name; }
    /**Index de la premiere ressource du SAE */
    public get SAEIndex(): number {
        return (this.saeIndex != -1) ? this.saeIndex : this.Ressources.length;
    }

    /** Resultats detaillés de l'UE */
    public get Details(): UEDetails {
        return {
            Name: this.Name,
            UEResult: this.Average,
            CCResult: this.GlobalCCAverage,
            SAEResult: this.GlobalSAEAverage,
            AllCCResults: this.CCAverages,
            AllSAEResults: this.SAEAverages
        } as UEDetails;
    }

    /**
     * Constructeur par defaut d'une UE
     * @param coefficient Coefficient de l'UE
     * @param ressources Ressources de l'UE
     * @param saeIndex Index a partir du quel on rentre dans les Ressources de SAE, -1 s'il y en a pas
     * @param name Nom de l'UE
     */
    public constructor(coefficient: number, ressources: Ressource[], saeIndex: number, name: string = "") {
        super(coefficient, ressources);
        this.saeIndex = saeIndex;
        this.name = name;
    }
}