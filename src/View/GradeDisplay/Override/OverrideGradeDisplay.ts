import { Content } from "../../../Content";
import { Semestre } from "../../../Model/Types/Grades/Elements/Semestre";
import { GradeDisplay } from "../../GradeDisplay";
import { MainPageGradeDisplay } from "../MainPage/MainPageGradeDisplay";

export class OverrideGradeDisplay implements GradeDisplay {
    private mainPage: MainPageGradeDisplay;
    public constructor() {
        this.mainPage = new MainPageGradeDisplay();
    }
    private static get Sections(): HTMLElement[] { return Array.from(document.querySelectorAll("tbody tr td div:has(sub)")) }
    private static get Ressources(): HTMLElement[] { return Array.from(document.querySelectorAll("tbody tr td div:not(:has(sub))")) }
    private static get UEs(): HTMLElement[] { return Array.from(document.querySelectorAll("table > thead > tr > td:first-child")) }

    private static get ResultCells(): HTMLElement[] { return Array.from(document.querySelectorAll("table td:not(:first-child)")) }

    DisplayGrades(semester: Semestre): void {
        this.mainPage.DisplayGrades(semester)
        OverrideGradeDisplay.UEs.forEach(x => OverrideGradeDisplay.addListenerToUE(x));
        OverrideGradeDisplay.Ressources.forEach(x => OverrideGradeDisplay.addListenerToRessource(x));
        OverrideGradeDisplay.Sections.forEach(x => OverrideGradeDisplay.addListenerToSection(x));

    }
    DisplayWarning(): void {
        this.mainPage.DisplayWarning();
    }

    //#region addEventListerner
    private static addListenerToUE(x: HTMLElement) { x.addEventListener("dblclick", (e: Event) => this.DoubleClick(e, "UE")); }
    private static addListenerToRessource(x: HTMLElement) { x.addEventListener("dblclick", (e: Event) => this.DoubleClick(e, "Ressource")); }
    private static addListenerToSection(x: HTMLElement) { x.addEventListener("dblclick", (e: Event) => this.DoubleClick(e, "Section")); }
    //#endregion addEventListerner

    private static DoubleClick(e: Event, type: string): void {
        switch (type) {
            case "Section":
                OverrideGradeDisplay.AddGrade(e);
                break;
            case "Ressource":
                OverrideGradeDisplay.AddSection(e);
                break;
            case "UE":
                OverrideGradeDisplay.AddRessource(e);
                break;

            default:
                break;
        }
    }
    private static AddRessource(e: Event) {
        console.log("UE", this.Ressources[0]);
    }
    private static AddSection(e: Event) {
        if (e.target === null) return;
        let target: HTMLElement = e.target as HTMLElement;

        while (target.nodeName !== "DIV") {
            target = target.parentElement!;
        }
        target = target.parentElement!;

        const newElement = document.createElement("div");
        newElement.style.fontSize = '9pt';
        newElement.innerHTML = `
            <input> [
                <div display="inline"><div>
            ] <sub><span>(<input>)</span></sub>
            `;

        const add = (name: string) => {
            const d = document.createElement("div");
            d.outerHTML = name;
            newElement.appendChild(d)
        }

        add("<input>")
        add("[")
        add("]")
        add("<sub><span>(<input>)</span></sub>")

        console.log(newElement);

        OverrideGradeDisplay.addListenerToSection(newElement);

        //@ts-ignore
        const validation = (e, el) => { if (['Enter', 'Tab'].includes(e.key)) { el.outerHTML = el.value; this.tryUpdate(el) }; };

        const inputs: HTMLInputElement[] = Array.from(newElement.querySelectorAll("input")) as HTMLInputElement[];

        //@ts-ignore
        inputs[0].onkeydown = (e) => { if (['Enter', 'Tab'].includes(e.key)) { e.target.outerHTML = e.target.value; this.tryUpdate(e.target) }; }
        inputs[0].style.width = "5rem";
        inputs[0].type = 'text';

        //@ts-ignore
        inputs[1].onkeydown = (e) => { if (['Enter', 'Tab'].includes(e.key)) { e.target.outerHTML = Number(e.target.value).toFixed(2); this.tryUpdate(e.target) }; }
        inputs[1].style.width = "5rem";
        inputs[1].type = 'number';


        target.appendChild(newElement);
        console.log(target)

    }
    private static isDone(target: HTMLElement) { return (Array.from(target.querySelectorAll("input")).length == 0); }
    private static tryUpdate(target: HTMLElement) {
        if (this.isDone(target)) setTimeout(() => {
            OverrideGradeDisplay.ResultCells.forEach(x => x.remove());
            new Content().Setup();
        }, 100);
    };
    private static AddGrade(e: Event) {
        if (e.target === null) return;
        let target: HTMLElement = e.target as HTMLElement;

        while (target.nodeName !== "DIV")
            target = target.parentElement!;


        if (!this.isDone(target)) return;

        //@ts-ignore
        const validation = (e, el, fix) => { if (['Enter', 'Tab'].includes(e.key)) { el.outerHTML = Number(el.value).toFixed(fix) }; };

        const newElement = document.createElement("span");
        newElement.innerHTML = `
        <span style="font-weight:bold;"><input placeholder="note"></span>/<input placeholder="diviseur">
        <sub><span>(<input placeholder="coefficient">)</span></sub>`;

        const inputs: HTMLInputElement[] = Array.from(newElement.querySelectorAll("input")) as HTMLInputElement[];
        inputs.forEach(x => {
            x.onkeydown = (e) => { validation(e, e.target, 2); this.tryUpdate(target) }
            x.style.width = "5rem";
            x.type = 'number';
        });

        inputs[inputs.length - 1].onkeydown = (e) => { validation(e, e.target, 1); this.tryUpdate(target); };

        target.insertBefore(newElement, target.childNodes[target.childNodes.length - 3])
    }
}