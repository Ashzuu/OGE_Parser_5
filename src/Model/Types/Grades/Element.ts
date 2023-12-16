/** Classe abstraite representant un element dans le systeme de gestion des notes de OGE */
export abstract class Element{

    /** Moyenne de l'element */
    public get Average(): number
    {
        let actualAverage: number = 0;

        //S'il n'y a pas sous element on ne calcul rien et renvoie 0
        if (this._subElements.length > 0)
        {
            let averagesSum: number = 0;
            let coefficientSum: number = 0;
            
            this._subElements.forEach(lowerEl => {
                averagesSum += lowerEl.Average * lowerEl.Coefficient;
                coefficientSum += lowerEl.Coefficient;
            })
            
            actualAverage = averagesSum / coefficientSum;
        }

        return actualAverage;
    }
    /** Coefficient de l'element */
    public get Coefficient()
    {
        return this._coefficient;
    }

    protected _coefficient: number;
    protected _subElements: Element[];
    
    protected constructor(coef: number, subElements: Element[]){
        this._coefficient = coef;
        this._subElements = subElements;
    }
}