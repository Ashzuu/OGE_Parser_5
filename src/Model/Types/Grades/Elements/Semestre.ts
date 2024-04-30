import { Element } from "../Element";
import { UE } from "./UE";

/** Represente un Semestre */
export class Semestre extends Element {
    /**Liste des UE du semestre */
    public get UEList(): UE[] {
        return this.SubElements as UE[];
    }
    /**
     * Constructeur par defaut d'un Semestre
     * @param ueList Liste des UE du semestre
     */
    public constructor(ueList: UE[]) {
        super(1, ueList);
    }
}