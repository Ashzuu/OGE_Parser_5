import { IStorage } from "../../Model/Interfaces/IStorage";
import { SemesterNames } from "../../Model/LogicLayer/Parsing/SemesterNames";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../Model/Types/Storage/StoredSemester";

export class Storage implements IStorage
{
    //#region Singleton
    private constructor() {}
    private static _instance: Storage;
    public static get Instance() { return this._instance || (this._instance = new this()); }
    //#endregion Singleton
    
    public Save(semester: Semestre): void {
        this.Load().then((savedSemesters) => {
            savedSemesters[SemesterNames.CurrentSemestre] = semester.ToStoredSemester();
            this.AsyncSave(savedSemesters);
        });
    }
    public Load(): { [id: string]: StoredSemester; } {
        throw new Error("Not impl");
    }
    public async AsyncLoad(): Promise<{ [id: string]: StoredSemester; }> {
        return new Promise((resolve) => {
            chrome.storage.local.get(["SavedSemesters"], function (result) {
                resolve(result["SavedSemesters"] || {});
            });
        });
    } 
    
    private async AsyncSave(semestersToSave: { [id: string]: StoredSemester; }): Promise<void> {
        chrome.storage.local.set({ "SavedSemesters": semestersToSave });
    }
}