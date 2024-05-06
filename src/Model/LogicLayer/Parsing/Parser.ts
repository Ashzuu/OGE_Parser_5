export abstract class Parser {
    //UE
    protected readonly UE_SELECTOR: string = "thead > tr";
    protected readonly UE_NAME_SELECTOR: string = "thead > tr > td > div";
    //#endregion Saved HTMLElements

    //#region Constants
    protected readonly UE_COEFFICENT_SELECTOR: string = "thead > tr > td > div > span";
    //RESSOURCES
    protected readonly RESSOURCE_COEFFICENT_SELECTOR: string = "div > span:nth-child(2)";
    protected readonly RESSOURCE_AND_POLES_SELECTOR: string = 'tbody > tr > td';
    protected readonly RESSOURCE_SELECTOR: string = '.cell_BUT_RESSOURCE~tr:not(.cell_BUT_SAE)';
    protected readonly CC_RESSOURCE_SELECTOR: string = '.cell_BUT_RESSOURCE~tr:not(.cell_BUT_SAE~tr, .cell_BUT_SAE)';
    protected readonly SAE_RESSOURCE_SELECTOR: string = '.cell_BUT_SAE~tr';
    //SECTIONS
    protected readonly SECTION_COEFFICENT_SELECTOR: string = "sub:last-child";
    protected readonly SECTION_SELECTOR: string = 'div';
    //GRADES
    protected readonly POLE_ELEMENT_FIRST_SELECTOR: string = "tbody > tr";
    protected readonly POLE_ELEMENT_SECOND_SELECTOR: string = "td span > span";
    protected readonly POLE_CC_INDEX: number = 0;
    protected readonly POLE_SAE_INDEX: number = 1;
    protected readonly MAX_COUNT_WHEN_GRADES_ARE_HIDDEN: number = 1;
    //#region Saved HTMLElements
    private readonly bodyElement: HTMLElement;

    protected constructor() {
        this.bodyElement = document.querySelector("body") as HTMLElement;
    }
    //#endregion Constants

    /** Retourne le nombre d'UE */
    public get UECount(): number {
        return this.Tables.length;
    }

    public get AreGradesShown(): boolean {
        let childCount = this.Tables[0]
                ?.querySelector(this.UE_SELECTOR)
                ?.childElementCount
            ?? this.MAX_COUNT_WHEN_GRADES_ARE_HIDDEN + 1;

        return childCount > this.MAX_COUNT_WHEN_GRADES_ARE_HIDDEN;
    }

    protected get Tables(): HTMLElement[] {
        return Array.from(this.Body.querySelectorAll('table'));
    }

    //#region Properties
    private get Body(): HTMLElement {
        return this.bodyElement;
    }

    //#region Static Methods
    /**
     * Retourne l'élément enfant d'un élément HTML
     * @param htmlElement Élément HTML parent
     * @param pathToChild Index de chaque enfants à parcourir, equivalent à un chemin pour acceder à l'élément voulu
     * @returns L'élément HTML demandé
     */
    public static GetChild(htmlElement: HTMLElement, pathToChild: number[]): HTMLElement {
        let element: HTMLElement = htmlElement;

        pathToChild.forEach(
            degree => {

                if (!element ||
                    degree < 0 ||
                    element.childElementCount <= degree) throw new Error("ChildNotFound");

                element = element.children[degree] as HTMLElement;
            });

        return element;
    }

    //#endregion Static Methods


    protected GetRawRessources(ue: number, selector: string = this.RESSOURCE_SELECTOR): HTMLElement[] {
        return Array.from(this.Tables[ue]?.querySelectorAll(selector) ?? [])
            .filter(p => p.textContent?.replace(/\s/g, "") != "Pasdenotesaisie") as HTMLElement[];
    }
}