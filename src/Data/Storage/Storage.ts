import { IStorage } from "../../Model/Interfaces/IStorage";
import { SemesterNames } from "../../Model/LogicLayer/Parsing/SemesterNames";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../Model/Types/Storage/StoredSemester";

export class Storage /*implements IStorage*/
{
    public static Save(semester: Semestre): void {
        this.Load().then((savedSemesters) => {
            savedSemesters[SemesterNames.CurrentSemestre] = semester.ToStoredSemester();
            this.AsyncSave(savedSemesters);
        });
    }
    public static async Load(): Promise<{ [id: string]: StoredSemester; }> {
        return new Promise((resolve) => {
            chrome.storage.local.get(["SavedSemesters"], function (result) {
                resolve(result["SavedSemesters"] || {});
            });
        });
    } 
    
    private static async AsyncSave(semestersToSave: { [id: string]: StoredSemester; }): Promise<void> {
        chrome.storage.local.set({ "SavedSemesters": semestersToSave });
    }
}