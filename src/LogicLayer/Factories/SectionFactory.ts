import { Section } from "../../Model/Grades/Elements/Section";

export class SectionFactory
{
    private constructor() {}
    private static _instance: SectionFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }

    public GetElement(): Section{
        throw new Error("Method not implemented");
    }
}