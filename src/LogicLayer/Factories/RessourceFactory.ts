import { Ressource } from "../../Model/Grades/Elements/Ressource";
import { IElementFactory } from "../../Model/Interfaces/IElementFactory";

export class RessourceFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: RessourceFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    GetElement(): Element {
        throw new Error("Method not implemented.");
    }
}