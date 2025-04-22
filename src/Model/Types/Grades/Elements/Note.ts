import { Element } from '../Element';
import { GradeCoefficientPair } from './GradeCoefficientPair';

/** Represente une Note */
export class Note extends Element {
    private readonly grade: number;

    /**
     * Constructeur par defaut d'une Note
     * @param grade pair de la note sur 20 et de son coefficient
     */
    public constructor(grade: GradeCoefficientPair) {
        super(grade.coefficient, []);
        this.grade = grade.grade;
    }

    public get Average(): number {
        return this.grade;
    }
}
