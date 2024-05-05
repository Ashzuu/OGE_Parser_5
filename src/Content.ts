import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { SemesterFactory } from "./Model/LogicLayer/Factories/SemesterFactory";
import { Injector } from "./DependencyInjector";
import { Parser } from "./Model/LogicLayer/Parsing/Parser";
import { GradeDisplay } from "./View/GradeDisplay";

/** Gestion du contenu de la page principale */
export class Content {
    /** Met en place le traitement de la page */
    public Setup(): void {
        //Parsing de la page
        const semester = this.ProcessSemester();

        const gradeDisplay: GradeDisplay = Injector.GradeDisplay;
        //Changement de la phrase Remarque
        gradeDisplay.DisplayWarning();
        //Affichage des moyennes
        gradeDisplay.DisplayGrades(semester);
    }

    // Parse la page actuelle, sauvegarde les resultats, et les affiche
    private ProcessSemester(): Semestre {
        //Remise a zero des donnees
        Parser.Reset();
        //Parsing de la page
        return new SemesterFactory().GetSemester() ?? new Error("Semestre non trouvé");
    }
}