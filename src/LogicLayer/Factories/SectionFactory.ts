import { Section } from "../../Model/Types/Grades/Elements/Section";
import { IElementFactory } from "../../Model/Interfaces/IElementFactory";
import { GradeParser } from "../Parsing/GradeParser";
import { Note } from "../../Model/Types/Grades/Elements/Note";
import { NoteFactory } from "./NoteFactory";

export class SectionFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: SectionFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }

    public GetAllRessourceSection(ueNumber: number, ressourceNumber: number): Section[] {
        let sectionList: Section[] = [];
        let sectionCount: number = GradeParser.Instance.GetSectionCount(ueNumber, ressourceNumber);
        for (let i = 1; i < sectionCount; i++){
            sectionList.push(this.GetSection(ueNumber, ressourceNumber, i));
        }

        return sectionList;
    }
    public GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): Section{
        let grades: Note[] = NoteFactory.Instance.GetAllNotes(ueNumber, ressourceNumber, sectionNumber)
        let coefficient: number = GradeParser.Instance.GetSectionCoefficient(ueNumber, ressourceNumber, sectionNumber);
        let section: Section = new Section(coefficient, grades);

        return section;
    }
}