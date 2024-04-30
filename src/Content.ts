import { GradeParser } from "./Model/LogicLayer/Parsing/GradeParser";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { SemesterFactory } from "./Model/LogicLayer/Factories/SemesterFactory";
import { Injector } from "./DependencyInjector";

/** Gestion du contenu de la page principale */
export class Content {
    //#region constants
    private readonly LOADING_ICON_CLASS: string = 'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container statusDialog';
    private readonly SEMESTER_LINKS_CLASS: string = 'ui-menuitem-link ui-corner-all';
    //#endregion constants

    //#region Properties
    private get SemesterLinks(): HTMLElement[] {
        return <HTMLElement[]>Array.from(
            document.getElementsByClassName(this.SEMESTER_LINKS_CLASS)
        );
    }
    private get LoadingIcon(): HTMLElement {
        return <HTMLElement>document.getElementsByClassName(this.LOADING_ICON_CLASS)[0];
    }
    //#endregion Properties

    /** Met en place le traitement de la page */
    public Setup(): void {
        //Parsing de la page
        const semester = this.ProcessSemester();
        
        const gradeDisplay = Injector.GradeDisplay;
        //Changement de la phrase Remarque
        gradeDisplay.DisplayWarning();
        //Affichage des moyennes
        gradeDisplay.DisplayGrades(semester);
    }

    // Parse la page actuelle, sauvegarde les resultats, et les affiche
    private ProcessSemester(): Semestre {
        //Remise a zero des donnees
        GradeParser.Reset();
        //Parsing de la page
        return new SemesterFactory().GetSemester() ?? new Error("Semestre non trouvé");
    }
}