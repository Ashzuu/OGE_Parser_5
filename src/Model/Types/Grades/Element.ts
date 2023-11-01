/** Classe abstraite representant un element dans le systeme de gestion des notes de OGE */
export abstract class Element{
    /** Moyenne de l'element */
    public get Average(): number
    {
        let totalAverage: number = 0;
        let totalCoef: number = 0;

        this._lowerElements.forEach(lowerEl => {
            totalAverage += lowerEl.Average * lowerEl.Coefficient;
            totalCoef += lowerEl.Coefficient;
        })
        
        let actualAverage = totalAverage / totalCoef;
        if (totalCoef == 0)
            actualAverage = 0;
        return actualAverage;
    }
    /** Coefficient de l'emlement */
    public get Coefficient()
    {
        return this._coefficient;
    }

    protected _coefficient: number;
    protected _lowerElements: Element[];
    
    protected constructor(coef: number, lowerElements: Element[]){
        this._coefficient = coef;
        this._lowerElements = lowerElements;
    }
}