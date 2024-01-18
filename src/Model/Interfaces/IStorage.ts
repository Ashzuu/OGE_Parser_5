import { Semestre } from "../Types/Grades/Elements/Semestre";
import { StoredSemester } from "../Types/Storage/StoredSemester";

/** Interface des classes gerant le stockage des notes*/
export interface ISemesterStorage
{
    /** Semestre traité */
    get Semester(): Semestre | undefined;
    /**
     * Sauvegarde un semestre dans le stockage
     */
    Save(): Promise<void>;
    /**
     * Charge les semestres sauvegardés
     */
    Load(): Promise<{ [id: string]: StoredSemester; }>;
    /**
     * Efface tous les semestres sauvegardés
     */
    Clear(): Promise<void>;
}