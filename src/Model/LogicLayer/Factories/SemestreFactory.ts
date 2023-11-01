import { IElementFactory } from "../../Interfaces/IElementFactory";
import { Semestre } from "../../Types/Grades/Elements/Semestre";
import { UE } from "../../Types/Grades/Elements/UE";
import { UEFactory } from "./UEFactory";

/** Fabrique de semestre */
export class SemestreFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: SemestreFactory;
    /** Retourne l'instance de la fabrique de semestre */
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    /**
     * Retourne le semestre
     * @returns Semestre
     */
    public GetSemester(): Semestre {
        let ueList: UE[] = UEFactory.Instance.GetAllUEs();
        let semester: Semestre = new Semestre(ueList);

        return semester;
    }
}