import { IStorage } from "../../Model/Interfaces/IStorage";
import { SemesterNames } from "../../Model/LogicLayer/Parsing/SemesterNames";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../Model/Types/Storage/StoredSemester";

export class ChromeStorage implements IStorage {
    //#region Singleton
    private constructor() {
        // Initialize cache from Chrome's storage
        this.initCache();
    }

    private static _instance: ChromeStorage;
    public static get Instance(): ChromeStorage
    {
        if (!this._instance) this._instance = new this();
        this._instance.initCache();

        return this._instance;
    }
    //#endregion Singleton
    private cache: { [id: string]: StoredSemester; } = {};

    public Save(semester: Semestre): void {
        // Assuming semester has an 'id' field that is a string
        this.cache[SemesterNames.CurrentSemestre] = semester.ToStoredSemester();
        // Save the cache asynchronously
        this.AsyncSave(this.cache);
    }

    public Load(): { [id: string]: StoredSemester; } {
        return this.cache;
    }

    //#region Private
    private async initCache(): Promise<void> {
        console.log(">>initCache");
        console.log(this.cache);
        
        let temp: { [id: string]: StoredSemester; } = await this.AsyncLoad();
        for (let key in temp) {
            this.cache[key] = temp[key];
        }
        console.log(this.cache);
        console.log("<<initCache");
    }

    private async AsyncLoad(): Promise<{ [id: string]: StoredSemester; }> {
        return new Promise((resolve) => {
            chrome.storage.local.get(["SavedSemesters"], function (result) {
                resolve(result["SavedSemesters"] || {});
            });
        });
    }

    private async AsyncSave(semestersToSave: { [id: string]: StoredSemester}): Promise<void> {
        chrome.storage.local.set({ "SavedSemesters": semestersToSave });
    }
    //#endregion Private
}
