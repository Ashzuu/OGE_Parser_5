import { IElementFactory } from "../../Interfaces/IElementFactory";
import { Semestre } from "../../Types/Grades/Elements/Semestre";
import { UE } from "../../Types/Grades/Elements/UE";
import { PageParser } from "../Parsing/PageParser";
import { UEFactory } from "./UEFactory";

/** Fabrique de semestre */
export class SemestreFactory implements IElementFactory
{
    private constructor() {}

    /**
     * Retourne le semestre de la page actuelle
     * @returns Semestre
     */
    public static GetSemester(): Semestre {
        //Recuperation des UEs
        let ueList: UE[] = UEFactory.GetAllUEs();
        let semester: Semestre = new Semestre(ueList);

        return semester;
    }
}