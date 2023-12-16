import { IYearlyAverage } from "../../Interfaces/IYearlyAverage";
import { YearDetails } from "../../Types/Grades/YearDetails";
import { StoredSemester } from "../../Types/Storage/StoredSemester";
import { PageParser } from "../Parsing/PageParser";
import { SemesterNames } from "../Parsing/SemesterNames";
import { SemesterLoading } from "./SemesterLoading";

export class YearlyAverage implements IYearlyAverage
{
    //#region Private
    private semesterLoading;
    private currentSemester: StoredSemester | undefined;
    private correspondingSemester: StoredSemester | undefined;
    private async InitSemesters(): Promise<void>
    {
        this.currentSemester = await this.semesterLoading.LoadCurrentSemester();
            // .LoadCurrentSemester()
            // .then(
            //     (result) => {
            //         console.log("this.semesterLoading.LoadCurrentSemester().then()", result);
            //         this.currentSemester = result;
            //     }
            // );
        /*
        this.semesterLoading
            .LoadCorrespondingSemester()
            .then(
                (result) => this.correspondingSemester = result
                );*/
    }
    private CurrentSemesterAverages(): number[]
    {
        let start = Date.now();

        let ready = this.currentSemester != undefined;
        if (!ready) this.InitSemesters().then(() => {
            // console.log("this.InitSemesters().then()", Date.now() - start, "ms");
            ready = this.currentSemester != undefined
        });

        let start2 = Date.now();
        while (!ready) {
            if (Date.now() - start2 > 1000)
            {
                // console.log("CurrentSemesterAverages timed out", Date.now() - start, "ms");
                throw new Error("CurrentSemesterAverages timed out");
            }
        };

        return this.currentSemester!.Averages;
    }
    private CorrespondingSemesterAverages(): number[]
    {
        throw new Error("Not implemented");
    }
    
    //#region Constantes
    private readonly PASSING_GRADE: number = 8;
    private readonly VALIDATING_GRADE: number = 10;
    //#endregion Constantes

    //#endregion Private

    public constructor()
    {
        this.semesterLoading = new SemesterLoading();
        this.InitSemesters();
    }
    
    public get NeedToAskToLoadCorrespondingSemester(): boolean
    {
        return SemesterNames.CorrespondingSemesterAvailable && this.correspondingSemester == undefined;
    }

    public get YearName(): string
    {
        return SemesterNames.CurrentYearName;
    }

    public get YearlyAverages(): number[]
    {
        //Resultats annuelles des UE
        let yearlyAverages: number[] = Array.from(this.CurrentSemesterAverages());

        if (SemesterNames.CorrespondingSemesterAvailable)
        {
            let correspondingSemesterAverages: number[] = this.CorrespondingSemesterAverages();
            //Gere le cas ou un des deux semestres aurait pas le meme nombre d'UE que l'autre
            let n: number = Math.min(yearlyAverages.length, correspondingSemesterAverages.length);
            for (let i = 0; i < n; i++)
            {
                //Fait la moyenne de la valeur recupérée de this.CurrentSemesterAverages dans yearlyAverages et de this.CorrespondingSemesterAverages
                yearlyAverages[i] = (yearlyAverages[i] + correspondingSemesterAverages[i]) / 2;
            }
        }

        return yearlyAverages;
    }

    public get IsPassing(): boolean
    {
        //Retourne vrai si toutes les moyennes des UE sont superieures ou egales a 8
        return this.YearlyAverages.every(average => average >= this.PASSING_GRADE);
    }

    public get IsValidating(): boolean
    {
        //Retourne vrai si toutes les moyennes des UE sont superieures ou egales a 10
        return this.YearlyAverages.every(average => average >= this.VALIDATING_GRADE);
    }

    /** Retourne l'object sous forme de YearDetails */
    public ToYearDetails(): YearDetails {
        return {
            YearName: this.YearName,
            YearlyAverages: this.YearlyAverages,
            IsPassing: this.IsPassing,
            IsValidating: this.IsValidating,
            NeedToAskToLoadCorrespondingSemester: this.NeedToAskToLoadCorrespondingSemester
        }
    }
}