import { PageParser } from "../Model/LogicLayer/Parsing/PageParser";
import { DetailedUEResult } from "../Model/Types/Grades/DetailedUEResult";
import { Semestre } from "../Model/Types/Grades/Elements/Semestre";
import { UE } from "../Model/Types/Grades/Elements/UE";
import { MainPageGradeView } from "./MainPageGradeView";

export class MainPageView
{
    private constructor()
    {    
        this._bodyElement = undefined;
        this._ueTables = undefined;
    }
    private static _instance: MainPageView;
    public static get Instance(): MainPageView{
        if (!this._instance) this._instance = new this();

        return this._instance;
    }

    private _bodyElement: HTMLElement | undefined;    
    private _ueTables: HTMLElement[] | undefined;
    private get BodyElement(): HTMLElement
    {
        if (!this._bodyElement) this._bodyElement = document.querySelectorAll("body")[0];
        return this._bodyElement;
    }
    private get UETables(): HTMLElement[]
    {
        if (!this._ueTables){
            this._ueTables = Array.from(this.BodyElement.querySelectorAll('table')) as HTMLElement[];;
        }
        
        return this._ueTables;
    }
    // private _gradeView: MainPageGradeView[];
    // private get GradeView(): MainPageGradeView[] { return this._gradeView; }
    // private get InsertionCellIndex(): number{ return 1; }

    public AddGradeResultsToPage(semester: Semestre)
    {
        let n: number = Math.min(semester.UEList.length, this.UETables.length);
        for (let i = 0; i < n; i++){
            this.AddGradeResult(
                this.UETables[i] as HTMLTableElement,
                semester.UEList[i],
                );
        }
    }
    private AddGradeResult(table: HTMLTableElement, ueObject: UE){
        new MainPageGradeView(
            table,
            ueObject.SAEIndex)
            .AddGradeResultToPage(ueObject.GetDetailedResults);
    }
}