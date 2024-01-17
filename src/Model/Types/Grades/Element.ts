/** Classe abstraite representant un element dans le systeme de gestion des notes de OGE */
export abstract class Element{

    /** Moyenne de l'element */
    public get Average(): number | undefined
    {
        return this.GetAverage(this._subElements);
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

    protected GetAverage(elements: Element[]): number | undefined
    {
        let actualAverage: number | undefined = undefined;

        //S'il n'y a pas sous element on ne calcul rien et renvoie 0
        if (elements.length > 0)
        {
            let averagesSum: number = 0;
            let coefficientSum: number = 0;
            
            elements.forEach(el => {
                const avg: number | undefined = el.Average;
                if (avg != undefined && !isNaN(avg))
                {
                    const coef: number = el.Coefficient;

                    averagesSum += avg * coef;
                    coefficientSum += coef;
                }
            })
            actualAverage = averagesSum / coefficientSum;
        }

        return actualAverage;
    }
}