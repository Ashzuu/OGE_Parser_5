import { ChildNotFoundError } from "../../../Types/Error/ChildNotFoundError";
import { GradeCoefficientPair } from "../../../Types/Grades/Elements/GradeCoefficientPair";
import { SectionParser } from "./SectionParser";
import { StringParser } from "../StringParser";

export class NoteParser
{
    //#region Attributes & Propeterties
    private _sectionParser: SectionParser = new SectionParser();
    public get SectionParser(): SectionParser { return this._sectionParser; }
    //#endregion Attributes & Propeterties
    /**
     * Retourne la liste des notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns La liste des notes de la section
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws NullSectionTextError si le texte de la section est 'null'
     */
    private GetNoteList(ueNumber: number, ressourceNumber: number, sectionNumber: number): GradeCoefficientPair[]
    {
        let section: HTMLElement = this.SectionParser.GetSection(ueNumber, ressourceNumber, sectionNumber);
        let notes: GradeCoefficientPair[] =  StringParser.GetNotesFromSectionInnerText(section.textContent);
        return notes;
    }
    /**
     * Retourne le nombre de notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns Le nombre de notes de la section
     */
    public GetNoteCount(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        let noteCount: number = 0;
        try { noteCount = this.GetNoteList(ueNumber, ressourceNumber, sectionNumber).length; }
        catch {}

        return noteCount;
    }
    /**
     * Retourne une note d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @param noteNumber Numéro de la note
     * @returns La note de la section
     * 
     * @throws ChildNotFoundError si un des éléments fils demandé n'existe pas
     * @throws TableNotFoundError si la table demandée n'existe pas
     * @throws NullSectionTextError si le texte de la section est 'null'
     */
    public GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): GradeCoefficientPair
    {
        let note: GradeCoefficientPair = this.GetNoteList(ueNumber, ressourceNumber, sectionNumber)[noteNumber];
        if (!note) throw new ChildNotFoundError();

        return note;
    }
}