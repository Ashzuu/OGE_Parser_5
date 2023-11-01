import { PageParser } from "../../../LogicLayer/Parsing/PageParser";
import { SemesterNames } from "../../../LogicLayer/Parsing/SemesterNames";
import { StoredSemester } from "../../Storage/StoredSemester";
import { Element } from "../Element";
import { UE } from "./UE";

/** Represente un Semestre */
export class Semestre extends Element
{
    private _ueList: UE[];
    /**Liste des UE du semestre */
    public get UEList(): UE[]
    {
        return this._ueList;
    }
    /**
     * Constructeur par defaut d'un Semestre
     * @param ueList Liste des UE du semestre
     */
    constructor(ueList: Element[])
    {
        super(1, ueList);
        this._ueList = this._lowerElements as UE[];
    }

    public ToStoredSemester(): StoredSemester
    {
        let ueAverages: number[] = [];
        this.UEList.forEach(c => ueAverages.push(c.Average));

        let storedSemester: StoredSemester = {
            Name: SemesterNames.CurrentSemestre,
            Averages: ueAverages,
            Date: (PageParser.Instance.AreGradesShown) ? -1 : Math.floor(Date.now() / 1000)
        }

        return storedSemester;
    }
}