import { Semestre } from "../Model/Types/Grades/Elements/Semestre";

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

    public AddResultsToPage(semester: Semestre)
    {
        let n: number = Math.min(semester.UEList.length, this.UETables.length);
        for (let i = 0; i < n; i++){
            this.AddResult(
                this.UETables[i] as HTMLTableElement,
                semester.UEList[i].Average
                );
        }
    }
    private AddResult(table: HTMLTableElement, grade: number){
        let child: HTMLElement = this.CreateChild(grade);
        table.tHead!.rows[0].appendChild(child);
    }
    CreateChild(grade: number): HTMLTableCellElement {
        let child: HTMLTableCellElement = document.createElement("th");
        child.innerHTML = grade.toFixed(2);
        
        return child;
    }
    private GetChild(htmlElement: HTMLElement, degree: number[]): HTMLElement{
        let element: HTMLElement = htmlElement;
        
        degree.forEach(
            deg => {
                element = element.children[deg] as HTMLElement; 
            });
        
        return element;
    }
}