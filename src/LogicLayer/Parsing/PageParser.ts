export class PageParser
{   
    //#region Singleton
    private constructor()
    {
        this._bodyElement = undefined;
        this._ueTables = undefined;
    }
    private static _instance: PageParser;
    
    /**Retourne l'instance du Parser de la page */
    public static get Instance() { return this._instance || (this._instance = new this()); }

    /**Remet a zero les données connu sur la page, utile quand on change de semestre */
    public static Reset() { this._instance = new this(); }
    //#endregion Singleton

    //#region Saved HTMLElements
    private _bodyElement: HTMLElement | undefined;
    private get BodyElement(): HTMLElement
    {
        return this._bodyElement 
            || (this._bodyElement = document.getElementsByName("body")[0]); 
    }
    
    private _ueTables: HTMLElement[] | undefined;
    private get UETables(): HTMLElement[]
    {
        if (!this._ueTables){
            this._ueTables = [];

            let ueTablesDiv = this.GetUETablesDiv();
            for (let i = 2; i < ueTablesDiv.children.length; i++){
                let table: HTMLElement = this.GetChild(ueTablesDiv, [i, 0]);
                this._ueTables!.push(table);
            }
        }

        return this._ueTables!;
    }

    //#endregion Saved HTMLElements
    
    private GetChild(htmlElement: HTMLElement, degree: number[]): HTMLElement{
        let element: HTMLElement = htmlElement;
        degree.forEach(deg => {
            element = element.children[deg] as HTMLElement;
        })
        
        return element;
    }
    private GetUETablesDiv(): HTMLElement{
        let bodyElement: HTMLElement = this.BodyElement;
        let ueTableDiv: HTMLElement = this.GetChild(bodyElement, [0, 0, 2, 0, 2]);

        return ueTableDiv;
    }
    private GetUETable(tableNumber: number): HTMLElement{
        return this.UETables[tableNumber];
    }
}