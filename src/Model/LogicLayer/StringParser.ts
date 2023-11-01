/**
 * Manager du format des titres
 * @remarks Utilisé pour normaliser le format des differents string utilisés dans le programme, surtout pour la partie IHM
 */
export class StringParser {
    /**
     * Nettoie le coefficient d'une section
     * @param coefficientText Texte à nettoyer, sous forme de string (ex: "(10.50)")
     * @returns Coefficient nettoyé sous forme de number
     */
    public static ClearCoefficient(coefficientText: string): number
    {
        coefficientText = coefficientText.replace("(", "");
        coefficientText = coefficientText.replace(")", "");

        return Number(coefficientText);
    }

    /**
     * Récupère les notes d'une section avec leur coefficient
     * @param sectionText Texte de la section à analyser
     * @returns Tableau d'objets contenant les notes et leur coefficient
     */
    public static GetNotesFromSectionInnerText(sectionText: string): { grade: number; coefficient: number; }[]
    {
        console.log(sectionText);
        sectionText = sectionText.slice(sectionText.indexOf('[') + 2, sectionText.indexOf(']') - 1);        
        return this.GetGradeCoefficientPairs(sectionText);
    }
    
    /**
     * Récupère les notes d'une section avec leur coefficient
     * @param sectionText Texte de la section à analyser
     * @returns Tableau d'objets contenant les notes et leur coefficient
     */
    private static GetGradeCoefficientPairs(sectionText: string): { grade: number; coefficient: number; }[] {
        let notes: string[] = sectionText.split(')');
        notes.pop();
        
        let pairs: { grade: number; coefficient: number; }[] = [];
        notes.forEach(n => {
            let split = n.split(" (");
            if (split.length == 1) split.push("-1");
            pairs.push(
                {
                    grade: this.NormalizeGrade(split[0]),
                    coefficient: this.ClearCoefficient(split[1])
                });
        })
        
        return pairs;
    }
    /**
     * Normalise une note
     * @param baseGrade Note à normaliser (ex: "10/20" ou "5/10")
     * @returns Note normalisée en etant rapporté à 20
     */
    private static NormalizeGrade(baseGrade: string): number
    {
        let split: string[] = baseGrade.split("/");
        let normalizedGrade: number = Number(split[0]) / Number(split[1]) * 20;

        return normalizedGrade;
    }
}