import { StringFormater } from "../StringFormater";

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
    private _ueTables: HTMLElement[] | undefined;
    //#endregion Saved HTMLElements
    
    //#region Properties
    private get BodyElement(): HTMLElement
    {
        if (!this._bodyElement) this._bodyElement = document.querySelectorAll("body")[0].cloneNode(true) as HTMLElement;
        return this._bodyElement;
    }
    private get UETables(): HTMLElement[]
    {
        if (!this._ueTables){
            this._ueTables = this.GetAllUETables();
        }
        
        return this._ueTables;
    }
    public get UECount(): number
    {
        return this.UETables.length;
    }
    public get AreGradesShown(): boolean
    {
        return this.GetChild(this.UETables[0], [0, 0]).childElementCount > 1
    }
    //#endregion Properties
    
    public GetChild(htmlElement: HTMLElement, degree: number[]): HTMLElement
    {
        let element: HTMLElement = htmlElement;
        
        degree.forEach(
            deg => {
                element = element.children[deg] as HTMLElement; 
            });
        
        return element;
    }
    
    //#region UE
    private GetAllUETables(): HTMLElement[]
    {
        return Array.from(this.BodyElement.querySelectorAll('table')) as HTMLElement[];
    }
    private GetUETable(tableNumber: number): HTMLElement
    {
        return this.UETables[tableNumber];
    }
    private GetUERessourcesDiv(ueNumber: number): HTMLElement
    {
        let ueTable: HTMLElement = this.GetUETable(ueNumber);
        let ressourceDiv: HTMLElement = this.GetChild(ueTable, [1]);

        Array.from(ressourceDiv.children).forEach((child: Element) => {
            if (
                child.classList.contains('cell_BUT_SAE')
                || child.classList.contains('cell_BUT_RESSOURCE')
                ) {
              ressourceDiv.removeChild(child);
            }
        });

        return ressourceDiv;
    }
    public GetCCAndSAESeparationIndex(ueNumber: number): number
    {
        let ueTable: HTMLElement = document.querySelectorAll('table')[ueNumber];
        let ressourceDiv: HTMLElement = this.GetChild(ueTable, [1]);

        let saeIndex = -1;
        for (let i = 0; i < ressourceDiv.childElementCount; i++){
            if (ressourceDiv.children[i].classList.contains('cell_BUT_SAE')){
                saeIndex = i;
                break;
            }
        }

        return saeIndex;
    }
    //#endregion UE

    //#region Ressource
    private GetRessourceSectionDiv(ueNumber: number, ressourceNumber: number): HTMLElement
    {
        let ressourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let sectionDiv: HTMLElement = this.GetChild(ressourcesDiv, [ressourceNumber, 0])
        return sectionDiv;
    }
    public GetRessourceCount(ueNumber: number): number
    {
        return this.GetUERessourcesDiv(ueNumber).childElementCount;
    }
    public GetRessourceCoefficient(ueNumber: number, ressourceNumber: number): number
    {
        let ueRessourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let coefficientSpan: HTMLElement = this.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0]);
        if (coefficientSpan.innerText == "Pas de note saisie") throw new Error("No grades");
            coefficientSpan = this.GetChild(coefficientSpan, [1]);

        return StringFormater.ClearCoefficient(coefficientSpan.innerText);
    }
    public GetRessourceName(ueNumber: number, ressourceNumber: number): string
    {
        let ueRessourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let nameSpan: HTMLElement = this.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0, 0]);
        let nameText: string = nameSpan.innerText;

        return nameText;
    }
    //#endregion Ressource

    //#region Section
    private GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): HTMLElement
    {
        let sectionDiv: HTMLElement = this.GetRessourceSectionDiv(ueNumber, ressourceNumber);
        let section: HTMLElement = this.GetChild(sectionDiv, [sectionNumber]);

        return section;
    }
    public GetSectionCount(ueNumber: number, ressourceNumber: number): number
    {
        return this.GetRessourceSectionDiv(ueNumber, ressourceNumber).childElementCount;
    }
    public GetSectionCoefficient(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        let section: HTMLElement = this.GetSection(ueNumber, ressourceNumber, sectionNumber)
        let coefficientSpan: HTMLElement = section.children[section.childElementCount - 1] as HTMLElement;
        
        return StringFormater.ClearCoefficient(coefficientSpan.innerText);
    }
    //#endregion Section
    
    //#region Note
    private GetNoteList(ueNumber: number, ressourceNumber: number, sectionNumber: number): { grade: number; coefficient: number; }[]
    {
        let section: HTMLElement = this.GetSection(ueNumber, ressourceNumber, sectionNumber);
        return StringFormater.GetNotesFromSectionInnerText(section.innerText);
    }
    public GetNoteCount(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        return this.GetNoteList(ueNumber, ressourceNumber, sectionNumber).length;
    }
    public GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): { grade: number; coefficient: number; }
    {
        return this.GetNoteList(ueNumber, ressourceNumber, sectionNumber)[noteNumber];
    }
    //#endregion Note
}