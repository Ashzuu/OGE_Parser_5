import { Semestre } from "../Types/Grades/Elements/Semestre";
import { StoredSemester } from "../Types/Storage/StoredSemester";

/** Interface des classes gerant le stockage des notes*/
export interface IStorage
{
    /**
     * Sauvegarde un semestre dans le stockage
     * @param semester Le semestre à sauvegarder
     */
    Save(semester: Semestre): Promise<void>;
    /**
     * Charge les semestres sauvegardés
     */
    Load(): Promise<{ [id: string]: StoredSemester; }>;
    /**
     * Efface tous les semestres sauvegardés
     */
    Clear(): Promise<void>;
}