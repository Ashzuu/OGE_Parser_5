import { Semestre } from "../Model/Types/Grades/Elements/Semestre";

export interface GradeDisplay {
    DisplayGrades(semester: Semestre): void;
}