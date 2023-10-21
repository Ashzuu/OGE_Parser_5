export abstract class Element{
    /**
     * Moyenne de l'element
     */
    public get Average()
    {
        let totalAverage: number = 0;
        let totalCoef: number = 0;

        this._lowerElements.forEach(lowerEl => {
            totalAverage += lowerEl.Average;
            totalCoef += lowerEl.Coefficient;
        })

        let actualAverage = totalAverage / totalCoef;
        return actualAverage;
    }
    /**
     * Coefficient de l'emlement
     */
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