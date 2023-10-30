/**
 * Manager du format des titres
 * @remarks Utilisé pour normaliser le format des differents string utilisés dans le programme, surtout pour la partie IHM
 */
export class StringFormater
{
    public static FormatSemesterName(baseName: string): string
    {
        let formatedName: string = baseName;
            formatedName = formatedName.replace(/\d+.\d+-/g, '');
            formatedName = formatedName.replace(/-.*Semestre /g, ' S');

        return formatedName;
    }

    public static ClearCoefficient(coefficientText: string): number
    {
        coefficientText = coefficientText.replace("(", "");
        coefficientText = coefficientText.replace(")", "");

        return Number(coefficientText);
    }

    public static GetNotesFromSectionInnerText(sectionText: string): { grade: number; coefficient: number; }[]
    {
        sectionText = sectionText.slice(sectionText.indexOf('[') + 2, sectionText.indexOf(']') - 1);        
        return this.GetGradeCoefficientPairs(sectionText);
    }
    
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
    private static NormalizeGrade(baseGrade: string): number
    {
        let split: string[] = baseGrade.split("/");
        let normalizedGrade: number = Number(split[0]) / Number(split[1]) * 20;

        return normalizedGrade;
    }
}