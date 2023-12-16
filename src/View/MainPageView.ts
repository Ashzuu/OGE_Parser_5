import { Semestre } from "../Model/Types/Grades/Elements/Semestre";
import { UE } from "../Model/Types/Grades/Elements/UE";
import { MainPageGradeView } from "./MainPageGradeView";

/** Classe de la vue de la page principale */
export class MainPageView
{
    private constructor()
    {    
        this._bodyElement = undefined;
        this._ueTables = undefined;
    }
    private static _instance: MainPageView;
    /** Instance de la classe */
    public static get Instance(): MainPageView{
        if (!this._instance) this._instance = new this();
        
        //Reset le body et ueTables a chaque appel pour etre sur qu'il soit bien a jour
        this._instance._bodyElement = undefined;
        this._instance._ueTables = undefined;
        return this._instance;
    }

    private _bodyElement: HTMLElement | undefined;    
    private _ueTables: HTMLElement[] | undefined;
    
    private get BodyElement(): HTMLElement
    {
        if (!this._bodyElement) this._bodyElement = document.querySelectorAll("body")[0] as HTMLElement;
        return this._bodyElement;
    }
    private get UETables(): HTMLElement[]
    {
        if (!this._ueTables){
            this._ueTables = Array.from(this.BodyElement.querySelectorAll('table')) as HTMLElement[];
        }
        
        return this._ueTables;
    }

    /**
     * Ajoute les resultats a la page
     * @param semester Semestre
     */
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
            .AddGradeResultToPage(ueObject.DetailedResults);
    }
}