import { StringParser } from "./StringParser";

/**
 * Classe permettant de parser la page
 */
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
    /** Retourne le body de la page */
    private get BodyElement(): HTMLElement
    {
        if (!this._bodyElement) this._bodyElement = document.querySelectorAll("body")[0].cloneNode(true) as HTMLElement;
        return this._bodyElement;
    }
    /** Retourne les tables des UE */
    private get UETables(): HTMLElement[]
    {
        if (!this._ueTables){
            this._ueTables = this.GetAllUETables();
        }
        
        return this._ueTables;
    }
    /** Retourne le nombre d'UE */
    public get UECount(): number
    {
        return this.UETables.length;
    }
    /** Retourne si les notes sont affichées */
    public get AreGradesShown(): boolean
    {
        return this.GetChild(this.UETables[0], [0, 0]).childElementCount > 1
    }
    //#endregion Properties
    
    /**
     * Retourne l'élément enfant d'un élément HTML
     * @param htmlElement Élément HTML parent
     * @param degree Index de chaque enfin de l'élément à récupérer
     * @returns L'élément HTML demandé
     */
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
    /**
     * Retourne les tables des UE
     * @returns Les tables des UE
     */
    private GetAllUETables(): HTMLElement[]
    {
        return Array.from(this.BodyElement.querySelectorAll('table')) as HTMLElement[];
    }
    /**
     * Retourne la table d'une UE
     * @param tableNumber Numéro de l'UE
     * @returns La table de l'UE
     */
    private GetUETable(tableNumber: number): HTMLElement
    {
        return this.UETables[tableNumber];
    }
    /**
     * Retourne le nom d'une UE
     * @param ueNumber Numéro de l'UE
     * @returns Le nom de l'UE
     */
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
    /**
     * Retourne le nom d'une UE
     * @param ueNumber Numéro de l'UE
     * @returns Le nom de l'UE
     */
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
    /**
     * Retourne la div d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns La div de la ressource
     */
    private GetRessourceSectionDiv(ueNumber: number, ressourceNumber: number): HTMLElement
    {
        let ressourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let sectionDiv: HTMLElement = this.GetChild(ressourcesDiv, [ressourceNumber, 0])
        return sectionDiv;
    }
    /**
     * Retourne le nombre de ressources d'une UE
     * @param ueNumber Numéro de l'UE
     * @returns Le nombre de ressources de l'UE
     */
    public GetRessourceCount(ueNumber: number): number
    {
        return this.GetUERessourcesDiv(ueNumber).childElementCount;
    }
    /**
     * Retourne le coefficient d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Le coefficient de la ressource
     */
    public GetRessourceCoefficient(ueNumber: number, ressourceNumber: number): number
    {
        let ueRessourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let coefficientSpan: HTMLElement = this.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0]);
        if (coefficientSpan.innerText == "Pas de note saisie") throw new Error("No grades");
            coefficientSpan = this.GetChild(coefficientSpan, [1]);

        return StringParser.ClearCoefficient(coefficientSpan.innerText);
    }
    /**
     * Retourne le nom d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Le nom de la ressource
     */
    public GetRessourceName(ueNumber: number, ressourceNumber: number): string
    {
        let ueRessourcesDiv: HTMLElement = this.GetUERessourcesDiv(ueNumber);
        let nameSpan: HTMLElement = this.GetChild(ueRessourcesDiv, [ressourceNumber, 0, 0, 0]);
        let nameText: string = nameSpan.innerText;

        return nameText;
    }
    //#endregion Ressource

    //#region Section
    /**
     * Retourne la div d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns La div de la section
     */
    private GetSection(ueNumber: number, ressourceNumber: number, sectionNumber: number): HTMLElement
    {
        let sectionDiv: HTMLElement = this.GetRessourceSectionDiv(ueNumber, ressourceNumber);
        let section: HTMLElement = this.GetChild(sectionDiv, [sectionNumber]);

        return section;
    }
    /**
     * Retourne le nombre de sections d'une ressource
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @returns Le nombre de sections de la ressource
     */
    public GetSectionCount(ueNumber: number, ressourceNumber: number): number
    {
        return this.GetRessourceSectionDiv(ueNumber, ressourceNumber).childElementCount;
    }
    /**
     * Retourne le coefficient d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns Le coefficient de la section
     */
    public GetSectionCoefficient(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        let section: HTMLElement = this.GetSection(ueNumber, ressourceNumber, sectionNumber)
        let coefficientSpan: HTMLElement = section.children[section.childElementCount - 1] as HTMLElement;
        
        return StringParser.ClearCoefficient(coefficientSpan.innerText);
    }
    //#endregion Section
    
    //#region Note
    /**
     * Retourne la liste des notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns La liste des notes de la section
     */
    private GetNoteList(ueNumber: number, ressourceNumber: number, sectionNumber: number): { grade: number; coefficient: number; }[]
    {
        let section: HTMLElement = this.GetSection(ueNumber, ressourceNumber, sectionNumber);
        return StringParser.GetNotesFromSectionInnerText(section.innerText);
    }
    /**
     * Retourne le nombre de notes d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @returns Le nombre de notes de la section
     */
    public GetNoteCount(ueNumber: number, ressourceNumber: number, sectionNumber: number): number
    {
        return this.GetNoteList(ueNumber, ressourceNumber, sectionNumber).length;
    }
    /**
     * Retourne une note d'une section
     * @param ueNumber Numéro de l'UE
     * @param ressourceNumber Numéro de la ressource
     * @param sectionNumber Numéro de la section
     * @param noteNumber Numéro de la note
     * @returns La note de la section
     */
    public GetNote(ueNumber: number, ressourceNumber: number, sectionNumber: number, noteNumber: number): { grade: number; coefficient: number; }
    {
        return this.GetNoteList(ueNumber, ressourceNumber, sectionNumber)[noteNumber];
    }
    //#endregion Note
}