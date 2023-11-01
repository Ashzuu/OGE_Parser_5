import { StringFormater } from "../StringFormater";

export class SemesterNames
{
    private static CURRENT_SEMESTER_CLASSES: string = "ui-tabmenuitem ui-state-default ui-state-active ui-corner-top";
    private static SEMESTER_LIST_CLASSES: string = "ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all";
    private static get BodyElement(): HTMLElement { return document.querySelectorAll("body")[0].cloneNode(true) as HTMLElement; }

    private static readonly CORRESPONDING_SEMESTER_NUMBER: { [id: number] : number; } = {
        1: 2,
        2: 1,
        3: 4,
        4: 3,
        5: 6,
        6: 5,
        7: 8,
        8: 7
    
    }
    
    public static get CorrespondingSemesterAvailable(): boolean
    {
        return this.SemestreList.includes(this.CorrespondingSemester);
    }

    public static get SemestreList(): string[]
    {
        let semestreList: string[] = [];
        let semestreNameUL : HTMLElement = this.BodyElement.getElementsByClassName(this.SEMESTER_LIST_CLASSES)[0] as HTMLElement;

        Array.from(semestreNameUL.children).forEach(li => {
            semestreList.push(
                StringFormater.FormatSemesterName(
                    (li as HTMLElement).innerText
                    )
                );
        });

        return semestreList;
    }

    public static get CurrentSemestre(): string
    {
        let semestreNameUL : HTMLElement = this.BodyElement.getElementsByClassName(this.CURRENT_SEMESTER_CLASSES)[0] as HTMLElement;
        return StringFormater.FormatSemesterName(semestreNameUL.innerText);
    }

    public static get CorrespondingSemester(): string
    {
        let semestreName: string = this.CurrentSemestre.slice(0, -1);
        let currentSemestreNumber: number = Number(this.CurrentSemestre.slice(-1));

        return semestreName + String(this.CORRESPONDING_SEMESTER_NUMBER[currentSemestreNumber])
    }
}