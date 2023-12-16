import { ChromeStorage } from "../../../Data/Storage/ChromeStorage";
import { StoredSemester } from "../../Types/Storage/StoredSemester";
import { SemesterNames } from "../Parsing/SemesterNames";

export class SemesterLoading
{
    public constructor() { }
    public async LoadCurrentSemester(): Promise<StoredSemester>
    {
        let semesterName: string = SemesterNames.CurrentSemestre;
        return await this.LoadSemester(semesterName)
    }
    public async LoadCorrespondingSemester(): Promise<StoredSemester>
    {
        let semesterName: string = SemesterNames.CorrespondingSemester;
        return this.LoadSemester(semesterName);
    }

    private async LoadSemester(semesterName: string): Promise<StoredSemester>
    {
        let loadedSemester: StoredSemester = (await ChromeStorage.Instance.Load())[semesterName];

        if (loadedSemester == undefined) throw new Error("Semestre non trouvé TODO");
        else return loadedSemester;
    }
}