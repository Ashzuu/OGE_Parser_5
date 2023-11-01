import { Semestre } from "../Types/Grades/Elements/Semestre";
import { StoredSemester } from "../Types/Storage/StoredSemester";

/** Interface des classes gerant le stockage des notes*/
export interface IStorage
{
    Save(semester: Semestre): void;
    Load(): { [id: string]: StoredSemester; };
}