import { IElementFactory } from "../../Interfaces/IElementFactory";
import { Semestre } from "../../Types/Grades/Elements/Semestre";
import { UE } from "../../Types/Grades/Elements/UE";
import { UEFactory } from "./UEFactory";

export class SemestreFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: SemestreFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    public GetSemester(): Semestre {
        let ueList: UE[] = UEFactory.Instance.GetAllUEs();
        let semester: Semestre = new Semestre(ueList);

        return semester;
    }
}