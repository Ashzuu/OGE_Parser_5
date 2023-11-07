import { ChromeStorage } from "../../../Data/Storage/ChromeStorage";
import { IStorage } from "../../Interfaces/IStorage";
import { StoredSemester } from "../../Types/Storage/StoredSemester";
import { SemesterNames } from "../Parsing/SemesterNames";

export class SemesterLoading
{
    public static get LoadCurrentSemester(): StoredSemester
    {
        let semesterName: string = SemesterNames.CurrentSemestre;
        return ChromeStorage.Instance.Load()[semesterName];
    }
    public static get LoadCorrespondingSemester(): StoredSemester
    {
        let semesterName: string = SemesterNames.CorrespondingSemester;
        return ChromeStorage.Instance.Load()[semesterName];
    }
}