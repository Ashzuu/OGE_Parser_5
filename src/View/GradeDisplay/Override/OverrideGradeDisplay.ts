import { Content } from '../../../Content';
import { Semestre } from '../../../Model/Types/Grades/Elements/Semestre';
import { GradeDisplay } from '../../GradeDisplay';
import { MainPageGradeDisplay } from '../MainPage/MainPageGradeDisplay';

export class OverrideGradeDisplay implements GradeDisplay {
    DisplayGrades(semester: Semestre): void {
        this.mainPage.DisplayGrades(semester);
        OverrideGradeDisplay.UEs.forEach(x => OverrideGradeDisplay.addListenerToUE(x));
        OverrideGradeDisplay.Ressources.forEach(x =>
            OverrideGradeDisplay.addListenerToRessource(x),
        );
        OverrideGradeDisplay.Sections.forEach(x => OverrideGradeDisplay.addListenerToSection(x));
    }
    DisplayWarning(): void {
        this.mainPage.DisplayWarning();
    }

    //#region Attributes
    private mainPage: MainPageGradeDisplay;
    public constructor() {
        this.mainPage = new MainPageGradeDisplay();
    }
    private static get Sections(): HTMLElement[] {
        return Array.from(document.querySelectorAll('tbody tr td div:has(sub)'));
    }
    private static get Ressources(): HTMLElement[] {
        return Array.from(document.querySelectorAll('tbody tr td div:not(:has(sub))'));
    }
    private static get UEs(): HTMLElement[] {
        return Array.from(document.querySelectorAll('.cell_BUT_RESSOURCE, .cell_BUT_SAE'));
    }

    private static get ResultCells(): HTMLElement[] {
        return Array.from(document.querySelectorAll('table td:not(:first-child)'));
    }
    //#endregion Attributes

    //#region addEventListerner
    private static addListenerToUE(x: HTMLElement) {
        x.addEventListener('dblclick', (e: Event) => this.DoubleClick(e, 'UE'));
    }
    private static addListenerToRessource(x: HTMLElement) {
        x.addEventListener('dblclick', (e: Event) => this.DoubleClick(e, 'Ressource'));
    }
    private static addListenerToSection(x: HTMLElement) {
        x.addEventListener('dblclick', (e: Event) => this.DoubleClick(e, 'Section'));
    }

    private static DoubleClick(e: Event, type: string): void {
        switch (type) {
            case 'Section':
                OverrideGradeDisplay.AddGrade(e);
                break;
            case 'Ressource':
                OverrideGradeDisplay.AddSection(e);
                break;
            case 'UE':
                OverrideGradeDisplay.AddRessource(e);
                break;

            default:
                break;
        }
    }
    //#endregion addEventListerner

    //#region Add
    private static AddRessource(e: Event) {
        if (e.target === null) return;
        let target: HTMLElement = e.target as HTMLElement;

        while (
            !target.classList.contains('cell_BUT_RESSOURCE') &&
            !target.classList.contains('cell_BUT_SAE')
        ) {
            target = target.parentElement!;
        }
        const isSae = target.classList.contains('cell_BUT_SAE');
        console.log(target);
        target = target.parentElement!;

        if (!this.isDone(target)) return;

        const newElement: HTMLElement = document.createElement('tr');
        newElement.style.background = '#ffffff';
        newElement.innerHTML = `
            <td style="width: 100%; padding: 5px">
                <div style="margin-bottom:5px;">
                    <span style="font-weight:bold; text-decoration:underline;"><input></span>
                    <span style="font-weight:normal; text-decoration:none; font-size: 9pt;">(<input>)</span>
                </div>
            </td>
            `;
        OverrideGradeDisplay.addListenerToRessource(newElement);

        const onkeydown = (key: any, el: HTMLInputElement, fix: number | undefined = undefined) => {
            if (['Enter', 'Tab'].includes(key)) {
                if (fix === undefined) el.outerHTML = el.value;
                else el.outerHTML = Number(el.value).toFixed(fix);
            } else if (key == 'Escape') {
                newElement.remove();
            }
        };

        const inputs: HTMLInputElement[] = Array.from(
            newElement.querySelectorAll('input'),
        ) as HTMLInputElement[];

        //@ts-ignore
        inputs[0].onkeydown = e => {
            onkeydown(e.key, e.target);
        };
        inputs[0].style.width = '5rem';
        inputs[0].type = 'text';
        inputs[0].placeholder = 'nom';

        //@ts-ignore
        inputs[1].onkeydown = e => {
            onkeydown(e.key, e.target, 1);
        };
        inputs[1].style.width = '5rem';
        inputs[1].type = 'number';
        inputs[1].placeholder = 'coefficient';

        let ix;
        if (!isSae) {
            if ((target.children[1] as any).innerText == 'Pas de note saisie')
                target.children[1].remove();
            ix = Array.from(target.children).indexOf(target.querySelector('.cell_BUT_SAE')!);
        } else {
            ix = target.childElementCount - 1;
            if ((target.children[ix] as any).innerText == 'Pas de note saisie')
                target.children[ix].remove();
        }
        target.insertBefore(newElement, target.children[ix]);
    }

    private static AddSection(e: Event) {
        if (e.target === null) return;
        let target: HTMLElement = e.target as HTMLElement;

        while (target.nodeName !== 'DIV') {
            target = target.parentElement!;
        }

        if (!this.isDone(target)) return;
        target = target.parentElement!;

        const onkeydown = (key: any, el: HTMLInputElement, fix: number | undefined = undefined) => {
            if (['Enter', 'Tab'].includes(key)) {
                if (fix === undefined) el.outerHTML = el.value;
                else el.outerHTML = Number(el.value).toFixed(fix);
            } else if (key == 'Escape') {
                newElement.remove();
            }
        };

        const newElement = document.createElement('div');
        newElement.style.fontSize = '9pt';
        newElement.appendChild(document.createElement('input'));
        newElement.appendChild(document.createComment('---'));
        newElement.appendChild(document.createTextNode(' [ '));
        newElement.appendChild(document.createComment('---'));
        newElement.appendChild(document.createTextNode(' ] '));
        newElement.innerHTML += ' <sub><span>(<input>)</span></sub>';

        OverrideGradeDisplay.addListenerToSection(newElement);

        const inputs: HTMLInputElement[] = Array.from(
            newElement.querySelectorAll('input'),
        ) as HTMLInputElement[];

        //@ts-ignore
        inputs[0].onkeydown = e => {
            onkeydown(e.key, e.target);
        };
        inputs[0].style.width = '5rem';
        inputs[0].type = 'text';
        inputs[0].placeholder = 'nom';

        //@ts-ignore
        inputs[1].onkeydown = e => {
            onkeydown(e.key, e.target, 1);
        };
        inputs[1].style.width = '5rem';
        inputs[1].type = 'number';
        inputs[1].placeholder = 'coefficient';

        target.appendChild(newElement);
    }

    private static AddGrade(e: Event) {
        if (e.target === null) return;
        let target: HTMLElement = e.target as HTMLElement;

        while (target.nodeName !== 'DIV') {
            target = target.parentElement!;
        }

        if (!this.isDone(target)) return;

        const onkeydown = (key: any, el: any, fix: number | undefined = undefined) => {
            if (['Enter', 'Tab'].includes(key)) {
                if (fix === undefined) el.outerHTML = el.value;
                else el.outerHTML = Number(el.value).toFixed(fix);
                this.tryUpdate(newElement);
            } else if (key == 'Escape') {
                newElement.remove();
                this.tryUpdate(newElement);
            }
        };

        const newElement = document.createElement('span');
        newElement.innerHTML = `
        <span style="font-weight:bold;"><input placeholder="note"></span>/<input placeholder="diviseur">
        <sub><span>(<input placeholder="coefficient">)</span></sub>`;

        const inputs: HTMLInputElement[] = Array.from(
            newElement.querySelectorAll('input'),
        ) as HTMLInputElement[];
        inputs.forEach(x => {
            x.style.width = '5rem';
            x.type = 'number';
        });

        inputs[0].onkeydown = (e: any) => {
            onkeydown(e.key, e.target, 2);
        };
        inputs[1].onkeydown = (e: any) => {
            onkeydown(e.key, e.target, 1);
        };
        inputs[2].onkeydown = (e: any) => {
            onkeydown(e.key, e.target, 1);
        };

        const ix: number = target.childNodes.length - 3;
        target.insertBefore(newElement, target.childNodes[ix]);
    }
    //#endregion Add

    private static isDone(target: HTMLElement) {
        return Array.from(target.querySelectorAll('input')).length == 0;
    }
    private static async tryUpdate(target: HTMLElement) {
        if (this.isDone(target)) {
            OverrideGradeDisplay.ResultCells.forEach(x => x.remove());
            new Content().Setup();
        }
    }
}
