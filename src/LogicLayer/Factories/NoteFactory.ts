import { IElementFactory } from "../../Model/Interfaces/IElementFactory";
import { Note } from "../../Model/Types/Grades/Elements/Note";
import { GradeParser } from "../Parsing/GradeParser";

export class NoteFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: NoteFactory;
    
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    GetAllNotes(ueNumber: number, ressourceNumber: number, sectionNumber: number): Note[] {
        let ressourceList: Note[] = [];
        let ueCount: number = GradeParser.Instance.GetNoteCount(ueNumber, ressourceNumber, sectionNumber);
        for (let i = 0; i < ueCount; i++)
        {
            ressourceList.push(this.GetNote(ueNumber, ressourceNumber, sectionNumber, i));
        }

        return ressourceList;
    }
    GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): Note {
        let grade: { grade: number; coefficient: number; } = GradeParser.Instance.GetNote(ueNumber, ressourceNumber, sectionNumber, noteNumber);
        let note: Note = new Note(grade.grade, grade.coefficient);

        return note;
    }
}