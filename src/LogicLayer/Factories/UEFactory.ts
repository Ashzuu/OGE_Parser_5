import { IElementFactory } from "../../Model/Interfaces/IElementFactory";
import { Ressource } from "../../Model/Types/Grades/Elements/Ressource";
import { UE } from "../../Model/Types/Grades/Elements/UE";
import { GradeParser } from "../Parsing/GradeParser";
import { RessourceFactory } from "./RessourceFactory";

export class UEFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: UEFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    public GetAllUEs(): UE[]
    {
        let ueList: UE[] = [];
        let ueCount: number = GradeParser.Instance.UECount;
        for (let i = 0; i < ueCount; i++){
            ueList.push(this.GetUE(i));
        }

        return ueList;
    }

    private GetUE(ueNumber: number): UE {
        let ressources: Ressource[] = RessourceFactory.Instance.GetAllUERessources(ueNumber);
        let ue: UE = new UE(1, ressources);

        return ue;
    }
}