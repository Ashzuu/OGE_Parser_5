import { IElementFactory } from "../../Interfaces/IElementFactory";
import { Ressource } from "../../Types/Grades/Elements/Ressource";
import { UE } from "../../Types/Grades/Elements/UE";
import { PageParser } from "../Parsing/PageParser";
import { RessourceFactory } from "./RessourceFactory";

/** Fabrique d'UEs */
export class UEFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: UEFactory;
    /** Retourne l'instance de la fabrique d'UEs */
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    /**
     * Retourne toutes les UEs
     * @returns Tableau de toutes les UEs
     */
    public GetAllUEs(): UE[]
    {
        let ueList: UE[] = [];
        let ueCount: number = PageParser.Instance.UECount;
        for (let i = 0; i < ueCount; i++){
            ueList.push(this.GetUE(i));
        }

        return ueList;
    }
    /**
     * Retourne une UE
     * @param ueNumber Numéro de l'UE 
     * @returns UE
     */
    private GetUE(ueNumber: number): UE {
        let ressources: Ressource[] = RessourceFactory.Instance.GetAllUERessources(ueNumber);
        let saeIndex: number = PageParser.Instance.GetCCAndSAESeparationIndex(ueNumber);
        let ue: UE = new UE(1, ressources, saeIndex);

        return ue;
    }
}