import { Section } from "../../Types/Grades/Elements/Section";
import { IElementFactory } from "../../Interfaces/IElementFactory";
import { PageParser } from "../Parsing/PageParser";
import { Note } from "../../Types/Grades/Elements/Note";
import { NoteFactory } from "./NoteFactory";
import { ChildNotFoundError } from "../../Types/Error/ChildNotFoundError";

/**
 * Fabrique de sections
 */
export class SectionFactory implements IElementFactory
{
    private constructor() {}
    private static _instance: SectionFactory;
    /** Retourne l'instance de la fabrique de sections */
    public static get Instance() { return this._instance || (this._instance = new this()); }

    /**
     * Retourne toutes les sections d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Tableau de sections
     * 
     * @throws TableNotFoundException Si la table demandées n'existe pas
     */
    public GetAllRessourceSection(ueNumber: number, ressourceNumber: number): Section[] {
        let sectionList: Section[] = [];
        let sectionCount: number = PageParser.Instance.GetSectionCount(ueNumber, ressourceNumber);
        for (let i = 0; i < sectionCount; i++){
            try{
                sectionList.push(this.GetSection(ueNumber, ressourceNumber, i));
            }
            catch {}
        }

        return sectionList;
    }
    
    private GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): Section{
        let grades: Note[] = NoteFactory.Instance.GetAllNotes(ueNumber, ressourceNumber, sectionNumber)
        let coefficient: number = PageParser.Instance.GetSectionCoefficient(ueNumber, ressourceNumber, sectionNumber);
        let section: Section = new Section(coefficient, grades);

        return section;
    }
}