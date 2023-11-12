import { ChromeStorage } from "../../../Data/Storage/ChromeStorage";
import { StoredSemester } from "../../Types/Storage/StoredSemester";
import { SemesterNames } from "../Parsing/SemesterNames";

export class SemesterLoading
{
    public static get LoadCurrentSemester(): StoredSemester
    {
        ChromeStorage.Instance;

        let semesterName: string = SemesterNames.CurrentSemestre;
        return this.LoadSemester(semesterName);
    }
    public static get LoadCorrespondingSemester(): StoredSemester
    {
        ChromeStorage.Instance;

        let semesterName: string = SemesterNames.CorrespondingSemester;
        return this.LoadSemester(semesterName);
    }

    private static LoadSemester(semesterName: string): StoredSemester
    {
        let start = Date.now();
        while (Date.now() - start < 200) {};
        if (ChromeStorage.Instance.Load()[semesterName] == undefined) throw new Error('Semester not found TODO');

        return ChromeStorage.Instance.Load()[semesterName];
    }
}