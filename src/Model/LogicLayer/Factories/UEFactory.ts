import { IElementFactory } from "../../Interfaces/IElementFactory";
import { Ressource } from "../../Types/Grades/Elements/Ressource";
import { UE } from "../../Types/Grades/Elements/UE";
import { PageParser } from "../Parsing/PageParser";
import { RessourceFactory } from "./RessourceFactory";

/** Fabrique d'UEs */
export class UEFactory implements IElementFactory
{
    private constructor() {}    
    /**
     * Retourne toutes les UEs
     * @returns Tableau de toutes les UEs
     * 
     */
    public static GetAllUEs(): UE[]
    {
        let ueList: UE[] = [];
        let ueCount: number = 1; //TODO: PageParser.Instance.UECount;
        // let ueCount: number = PageParser.Instance.UECount;
        
        for (let i = 0; i < ueCount; i++){
            try{ ueList.push(this.GetUE(i)); } catch {}
        }

        return ueList;
    }
    
    private static GetUE(ueNumber: number): UE {
        let ressources: Ressource[] = RessourceFactory.GetAllUERessources(ueNumber);
        let saeIndex: number = -1;
        try { saeIndex = PageParser.Instance.GetCCAndSAESeparationIndex(ueNumber); } catch {}
        let ue: UE = new UE(1, ressources, saeIndex);

        return ue;
    }
}