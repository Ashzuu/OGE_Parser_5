import { ChromeStorage } from "./Data/Storage/ChromeStorage";
import { SemestreFactory } from "./Model/LogicLayer/Factories/SemestreFactory";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { MainPageView } from "./View/MainPageView";

/** Gestion du contenu de la page principale */
export class Content
{
    //#region constants
    private static readonly LOADING_ICON_CLASS: string = 'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container statusDialog';
    private static readonly SEMESTER_LINKS_CLASS: string = 'ui-menuitem-link ui-corner-all';
    //#endregion constants

    //#region Properties
    private static get SemesterLinks(): HTMLElement[]
    {
        return Array.from(
            document.getElementsByClassName(
                this.SEMESTER_LINKS_CLASS
            )
        ) as HTMLElement[];
    }
    private static get LoadingIcon(): HTMLElement
    {
        return document.getElementsByClassName(this.LOADING_ICON_CLASS)[0] as HTMLElement;
    }
    //#endregion Properties

    /** Met en place le traitement de la page */
    public static Setup(): void
    {
        this.ProcessSemester();
        this.SetSemesterLinksListeners();
    }

    /**
     * Parse la page actuelle, sauvegarde les resultats, et les affiche
     */
    private static ProcessSemester(): void
    {
        //Remise a zero des donnees
        PageParser.Reset();
        //Parsing de la page
        let parsedSemester: Semestre = SemestreFactory.GetSemester();
        //Sauvegarde du semestre retrouvé
        ChromeStorage.Instance.Save(parsedSemester);
        //Affichage des moyennes
        this.DisplayGrades(parsedSemester);
    }

    /**
     * Affiche les moyennes du semestre sur la page principale si elles ne sont pas deja affichees
     * @param semestre Semestre à afficher
     */
    private static DisplayGrades(semestre: Semestre): void
    {
        //Lance l'affichage des resultats si les moyennes sont pas deja affichees
        if (!PageParser.Instance.AreGradesShown)
        {
            MainPageView.Instance.AddGradeResultsToPage(semestre);
        }
    }

    /** Ajoute les listeners sur les liens des semestres */
    private static SetSemesterLinksListeners(): void
    {
        //Constantes creant un delai pour etre sur que la page soit bien rechargee
        const DELAY_BETWEEN_CHECKS = 200;
        const DELAY_AFTER_PAGE_RELOAD = 100;

        //Recuperation des liens des semestres
        let elements: HTMLElement[] = this.SemesterLinks
        //Ajout des listeners sur les liens des semestres
        elements.forEach(element => {
            element.addEventListener('click', async () => {
                //Icon de chargement affichee pendant le changement de semestre
                let loadingIcon: HTMLElement = this.LoadingIcon

                //Attend que la page soit rechargee, en reverifiant avec un intervalle de DELAY_BETWEEN_CHECKS
                //Elle est bien rechargee quand l'icone de chargement n'est plus visible (display: none)
                while (loadingIcon.style.display != "none")
                {
                    await new Promise(
                        r => setTimeout(r, DELAY_BETWEEN_CHECKS)
                    );
                }
                
                //Met un decalage de DELAY_AFTER_PAGE_RELOAD pour etre sur que la page soit bien rechargee
                setTimeout(() => {
                    this.Setup();
                }, DELAY_AFTER_PAGE_RELOAD);
            });
        });
    }
}