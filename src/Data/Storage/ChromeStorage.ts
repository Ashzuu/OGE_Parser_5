import { IStorage } from "../../Model/Interfaces/IStorage";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../Model/Types/Storage/StoredSemester";

export class ChromeStorage implements IStorage {
    //#region Constants
    //Clé utilisée pour identifier les semestres dans le chrome.storage.local
    private readonly STORAGE_KEY = "SavedSemesters";
    //#endregion Constants

    //#region Singleton
    private constructor() {}
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
        this.initCache();
        setTimeout(() => {
            let storedSemester: StoredSemester = semester.ToStoredSemester();
            // this.cache[Math.round(Math.random() * 1000000)] = storedSemester;
            this.cache[storedSemester.Name] = storedSemester;
            this.SaveToLocalChromeStorage();
        }, 50);
    }

    public Load(): { [id: string]: StoredSemester; } {
        return this.cache;
    }
    public Clear(): void
    {
        this.cache = {}; this.SaveToLocalChromeStorage();
    }

    //#region Private
    private async initCache(): Promise<void> {
        this.cache = await this.LoadFromLocalChromeStorage();
    }

    private async LoadFromLocalChromeStorage(): Promise<{ [id: string]: StoredSemester; }> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get([this.STORAGE_KEY], (result: any) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(result[this.STORAGE_KEY] || {});
            });
        });
    }

    private async SaveToLocalChromeStorage(): Promise<void> {
        await setTimeout(() => {}, 100);
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ [this.STORAGE_KEY]: this.cache }, () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve();
            });
        });
    }
    //#endregion Private
}