import { IElementFactory } from "../../Interfaces/IElementFactory";
import { Note } from "../../Types/Grades/Elements/Note";
import { PageParser } from "../Parsing/PageParser";

/**
 * Fabrique de notes
 */
export class NoteFactory implements IElementFactory
{

    private constructor() {}
    private static _instance: NoteFactory;
    /** Retourne l'instance de la fabrique de notes */
    public static get Instance() { return this._instance || (this._instance = new this()); }
    
    /**
     * Retourne toutes les notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns Tableau de notes
     */
    public GetAllNotes(ueNumber: number, ressourceNumber: number, sectionNumber: number): Note[] {
        let ressourceList: Note[] = [];
        let ueCount: number = PageParser.Instance.GetNoteCount(ueNumber, ressourceNumber, sectionNumber);
        for (let i = 0; i < ueCount; i++)
        {
            ressourceList.push(this.GetNote(ueNumber, ressourceNumber, sectionNumber, i));
        }

        return ressourceList;
    }
    /**
     * Retourne une note d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @param noteNumber Numéro de la note
     * @returns Note
     */
    private GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): Note {
        let grade: { grade: number; coefficient: number; } = PageParser.Instance.GetNote(ueNumber, ressourceNumber, sectionNumber, noteNumber);
        let note: Note = new Note(grade.grade, grade.coefficient);

        return note;
    }
}