import { Section } from "../../Types/Grades/Elements/Section";
import { IElementFactory } from "../../Interfaces/IElementFactory";
import { PageParser } from "../Parsing/PageParser";
import { Note } from "../../Types/Grades/Elements/Note";
import { NoteFactory } from "./NoteFactory";

/**
 * Fabrique de sections
 */
export class SectionFactory implements IElementFactory
{
    private constructor() {}

    /**
     * Retourne toutes les sections d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Tableau de sections
     * 
     * @throws TableNotFoundException Si la table demandées n'existe pas
     */
    public static GetAllRessourceSection(ueNumber: number, ressourceNumber: number): Section[] {
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
    
    private static GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): Section{
        let grades: Note[] = NoteFactory.GetAllNotes(ueNumber, ressourceNumber, sectionNumber)
        let coefficient: number = PageParser.Instance.GetSectionCoefficient(ueNumber, ressourceNumber, sectionNumber);
        let section: Section = new Section(coefficient, grades);

        return section;
    }
}