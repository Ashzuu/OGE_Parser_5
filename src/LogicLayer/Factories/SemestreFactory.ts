import { IElementFactory } from "../../Model/Interfaces/IElementFactory";

export class SemestreFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: SemestreFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    GetElement(): Element {
        throw new Error("Method not implemented.");
    }
}