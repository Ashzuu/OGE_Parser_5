import { InvalidGradeFormatError } from "../../Types/Error/InvalidGradeFormatError";
import { NullCoefficientError } from "../../Types/Error/NullCoefficientError";
import { NullSectionTextError } from "../../Types/Error/NullSectionTextError";
import { GradeCoefficientPair } from "../../Types/Grades/Elements/GradeCoefficientPair";

/**
 * Manager du format des titres
 * @remarks Utilisé pour normaliser le format des differents string utilisés dans le programme, surtout pour la partie IHM
 */
export class StringParser {
    /**
     * Nettoie le coefficient d'une section
     * @param coefficientText Texte à nettoyer, sous forme de string (ex: "(10.50)")
     * @returns Coefficient nettoyé sous forme de number
     * 
     * @throws NullCoefficientError Si le texte du coefficient est 'null'
     */
    public static ClearCoefficient(coefficientText: string | null): number
    {
        if (coefficientText == null) throw new NullCoefficientError();
        if (coefficientText.includes("(")) coefficientText = coefficientText.slice(coefficientText.lastIndexOf('('), -1);
        coefficientText = coefficientText.replace("(", "");
        coefficientText = coefficientText.replace(")", "");

        return Number(coefficientText);
    }

    /**
     * Récupère les notes d'une section avec leur coefficient
     * @param sectionText Texte de la section à analyser
     * @returns Tableau d'objets contenant les notes et leur coefficient
     * 
     * @throws NullSectionTextError Si le texte de la section est 'null'
     */
    public static GetNotesFromSectionInnerText(sectionText: string | null): GradeCoefficientPair[]
    {   
        if (sectionText == null) throw new NullSectionTextError();

        sectionText = sectionText.slice(sectionText.indexOf('[') + 2, sectionText.indexOf(']') - 1); 
        return this.GetGradeCoefficientPairs(sectionText);
    }
    
    /**
     * Récupère les notes d'une section avec leur coefficient
     * @param sectionText Texte de la section à analyser
     * @returns Tableau d'objets contenant les notes et leur coefficient
     */
    private static GetGradeCoefficientPairs(sectionText: string): GradeCoefficientPair[] {
        sectionText = sectionText.replace(/\n/g, "");
        let notes: string[] = sectionText.split(')');
        notes.pop();
        
        let pairs: GradeCoefficientPair[] = [];
        notes.forEach(n => {
            let split = n.split(" (");
            if (split.length == 1) split.push("-1");
            try{
                pairs.push(
                    {
                    grade: this.NormalizeGrade(split[0]),
                    coefficient: this.ClearCoefficient(split[1])
                });
            }
            catch (ex){
                if (!(ex instanceof InvalidGradeFormatError ||
                    ex instanceof NullCoefficientError
                    )) throw ex;
            }
        })
        
        return pairs;
    }
    /**
     * Normalise une note
     * @param baseGrade Note à normaliser (ex: "10/20" ou "5/10")
     * @returns Note normalisée en etant rapporté à 20
     * 
     * @throws InvalidGradeFormatError Si le format de la note est invalide
     */
    private static NormalizeGrade(baseGrade: string): number
    {
        let validFormat: RegExp = new RegExp(/(\d*\.\d*|\d*)\/(\d*\.\d*|\d*)/g); 
        if (!validFormat.test(baseGrade)) throw new InvalidGradeFormatError();

        let split: string[] = baseGrade.split("/");
        let normalizedGrade: number = Number(split[0]) / Number(split[1]) * 20;

        return normalizedGrade;
    }
}