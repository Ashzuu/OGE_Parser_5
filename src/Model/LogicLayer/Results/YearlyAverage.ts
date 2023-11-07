import { SemesterNames } from "../Parsing/SemesterNames";
import { SemesterLoading } from "./SemesterLoading";

export class YearlyAverage
{
    private static get CurrentSemesterAverages(): number[]
    {
        return SemesterLoading.LoadCurrentSemester.Averages;        
    }
    private static get CorrespondingSemesterAverages(): number[]
    {
        return SemesterLoading.LoadCorrespondingSemester.Averages;
    }

    /**
     * Récupère les moyennes annuelles de chaque UE
     */
    public static get YearlyAverages(): number[]
    {
        //Resultats annuelles des UE
        let yearlyAverages: number[] = Array.from(this.CurrentSemesterAverages);
        if (SemesterNames.CorrespondingSemesterAvailable)
        {
            //Gere le cas ou un des deux semestres aurait pas le meme nombre d'UE que l'autre
            let n: number = Math.min(yearlyAverages.length, this.CorrespondingSemesterAverages.length);
            for (let i = 0; i < n; i++)
            {
                //Fait la moyenne de la valeur recupérée de this.CurrentSemesterAverages dans yearlyAverages et de this.CorrespondingSemesterAverages
                yearlyAverages[i] = (yearlyAverages[i] + this.CorrespondingSemesterAverages[i]) / 2;
            }
        }

        return yearlyAverages;
    }
    //#region Constantes
    private static readonly PASSING_GRADE: number = 8;
    private static readonly VALIDATING_GRADE: number = 10;
    //#region Constantes

    public static get IsPassing(): boolean
    {
        return this.YearlyAverages.every(average => average >= this.PASSING_GRADE);
    }

    public static get IsValidating(): boolean
    {
        return this.YearlyAverages.every(average => average >= this.VALIDATING_GRADE);
    }
}