import { Semestre } from "../Model/Types/Grades/Elements/Semestre";
import { UE } from "../Model/Types/Grades/Elements/UE";
import { MainPageGradeView } from "./MainPageGradeView";

/** Classe de la vue de la page principale */
export class MainPageView
{
    private constructor()
    {    
        this.bodyElement = undefined;
        this.ueTables = undefined;
    }
    private static instance: MainPageView;
    /** Instance de la classe */
    public static get Instance(): MainPageView{
        if (!this.instance) this.instance = new this();
        
        //Reset le body et ueTables a chaque appel pour etre sur qu'il soit bien a jour
        this.instance.bodyElement = undefined;
        this.instance.ueTables = undefined;
        return this.instance;
    }

    private bodyElement: HTMLElement | undefined;    
    private ueTables: HTMLElement[] | undefined;
    
    private get BodyElement(): HTMLElement
    {
        if (!this.bodyElement) this.bodyElement = document.querySelectorAll("body")[0] as HTMLElement;
        return this.bodyElement;
    }
    private get UETables(): HTMLElement[]
    {
        if (!this.ueTables){
            this.ueTables = Array.from(this.BodyElement.querySelectorAll('table')) as HTMLElement[];
        }
        
        return this.ueTables;
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
            .AddGradeResultToPage(ueObject.Details);
    }
}