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
        let storedSemester: StoredSemester = semester.ToStoredSemester();
        // this.cache[storedSemester.Name + Math.round(Math.random() * 1000)] = storedSemester;
        this.cache[storedSemester.Name] = storedSemester;
        this.SaveToLocalChromeStorage();
    }

    public Load(): { [id: string]: StoredSemester; } {
        return this.cache;
    }

    //#region Private
    private async initCache(): Promise<void> {
        let temp: { [id: string]: StoredSemester } = await this.LoadFromLocalChromeStorage();
        Object.assign(this.cache, temp)
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