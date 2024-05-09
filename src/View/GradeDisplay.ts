import {Semestre} from "../Model/Types/Grades/Elements/Semestre";

/** Interface des classes s'occupant de l'affichage des resultats du semestre */
export interface GradeDisplay {
    /**
     * Affiche les resultats sur l'interface graphique adaptée
     * @param semester Semestre à afficher
     */
    DisplayGrades(semester: Semestre): void;

    /** Affiche le warning sur le fait que les valeurs affichées */
    DisplayWarning(): void;
}