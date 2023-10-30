import { IStorage } from "../../Model/Interfaces/IStorage";
import { SemesterNames } from "../../Model/LogicLayer/Parsing/SemesterNames";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../Model/Types/Storage/StoredSemester";

export class ChromeStorage implements IStorage {
    private cache: { [id: string]: StoredSemester; } = {};

    public constructor() {
        // Initialize cache from Chrome's storage
        this.initCache();
    }

    public Save(semester: Semestre): void {
        // Assuming semester has an 'id' field that is a string
        this.cache[SemesterNames.CurrentSemestre] = semester.ToStoredSemester();
        // Save the cache asynchronously
        this.AsyncSave();
    }

    public Load(): { [id: string]: StoredSemester; } {
        return this.cache;
    }

    //#region Private
    private async initCache(): Promise<void> {
        this.cache = await this.AsyncLoad();
    }

    private async AsyncLoad(): Promise<{ [id: string]: StoredSemester; }> {
        return new Promise((resolve) => {
            chrome.storage.local.get(["SavedSemesters"], function (result) {
                resolve(result["SavedSemesters"] || {});
            });
        });
    }

    private async AsyncSave(): Promise<void> {
        chrome.storage.local.set({ "SavedSemesters": this.cache });
    }
    //#endregion Private
}
