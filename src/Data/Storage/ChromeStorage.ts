import { IStorage } from "../../Model/Interfaces/IStorage";
import { Semestre } from "../../Model/Types/Grades/Elements/Semestre";
import { StoredSemester } from "../../Model/Types/Storage/StoredSemester";

/** Classe gérant le stockage des notes dans le chrome.storage.local */
export class ChromeStorage implements IStorage {
    //#region Constants
    //Clé utilisée pour identifier les semestres dans le chrome.storage.local
    private readonly STORAGE_KEY = "SavedSemesters";
    //#endregion Constants

    //#region Singleton
    private constructor()
    {
        this.InitCache();
    }
    private static _instance: ChromeStorage;
    public static get Instance(): ChromeStorage
    {
        if (!this._instance) this._instance = new this();
        this._instance.InitCache();

        return this._instance;
    }
    //#endregion Singleton

    //#region InstanceBound
        //#region Attributes
    private cache: { [id: string]: StoredSemester; } = {};
    private queue: StoredSemester[] = [];
        //#endregion Attributes
        //#region Properties
    private get IsUpToDate(): boolean
    {
        return this.queue.length == 0;
    }
        //#endregion Properties
    //#endregion InstanceBound

    public async Save(semester: Semestre): Promise<void> {
        let storedSemester: StoredSemester = semester.ToStoredSemester();
        
        this.AddToCache(storedSemester);
        this.SaveToLocalChromeStorage();
    }

    public async Load(): Promise<{ [id: string]: StoredSemester; }> {
        // if (this.IsUpToDate) return new Promise((resolve) => {resolve(this.cache);});
        //TODO probleme synchronisation du cache
        // if (this.IsUpToDate) return this.cache;
        // else return this.LoadFromLocalChromeStorage();
        return this.cache;
    }
    public async Clear(): Promise<void>
    {
        this.cache = {}; this.SaveToLocalChromeStorage();
    }

    //#region Private
    private i = 0;
    private InitCache(done: boolean = false): void
    {
        if (!done)
        {            
            this.LoadFromLocalChromeStorage().then((result) => {
                if (!done){
                    Object.assign(result, this.cache);
                }
                done = true;
            });
            setTimeout(() => {
                if (this.CheckCache()) this.queue = [];
                else this.InitCache(done);
            }, 10);
        }
    }

    private CheckCache(): boolean
    {
        let ret: boolean = true;
        for (let semester of this.queue)
        {
            if (this.cache[semester.Name] == undefined)
            {
                ret = false;
                break;
            }
        }

        return ret;
    }
    private AddToCache(semester: StoredSemester): void
    {
        this.cache[Math.round(Math.random() * 1000000)] = semester;
        // this.cache[semester.Name] = semester;
        this.queue.push(semester);
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