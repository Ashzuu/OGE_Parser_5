import Injector from './DependencyInjector';
import './loader';
import { SemesterFactory } from './Model/LogicLayer/Factories/SemesterFactory';
import { Parser } from './Model/LogicLayer/Parsing/Parser';
import { Semestre } from './Model/Types/Grades/Elements/Semestre';
import { GradeDisplay } from './View/GradeDisplay';

/** Gestion du contenu de la page principale */
export class Content {
    /** Met en place le traitement de la page */
    public Setup(): void {
        //Parsing de la page
        const semester = this.ProcessSemester();
        this.Display(semester);
    }

    // Parse la page actuelle, sauvegarde les resultats, et les affiche
    private ProcessSemester(): Semestre {
        //Remise a zero des donnees
        Parser.Reset();
        //Parsing de la page
        return new SemesterFactory().GetSemester() ?? new Error('Semestre non trouvé');
    }

    private Display(semester: Semestre) {
        const gradeDisplay = Injector.resolve<GradeDisplay>('GradeDisplay');
        //Changement de la phrase Remarque
        gradeDisplay.DisplayWarning();
        //Affichage des moyennes
        gradeDisplay.DisplayGrades(semester);
    }
}

new Content().Setup();
