import { Semestre } from "../Types/Grades/Elements/Semestre";
import { StoredSemester } from "../Types/Storage/StoredSemester";

export interface IStorage
{
    Save(semester: Semestre): void;
    Load(): { [id: string] : StoredSemester; };
}