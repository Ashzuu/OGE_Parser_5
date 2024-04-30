/** Objet detaillant l'année */
export type YearDetails = {
    /** Intitulé de l'année */
    YearName: string;
    /** Moyennes de chaque UE a l'année */
    YearlyAverages: number[];
    /** Il sera possible de passer a l'année suivante */
    IsPassing: boolean;
    /** L'année sera validée */
    IsValidating: boolean;
    /** Vrai s'il y a besoin de demander de charger le semestre correspondant, Faux sinon */
    NeedToAskToLoadCorrespondingSemester: boolean;
}