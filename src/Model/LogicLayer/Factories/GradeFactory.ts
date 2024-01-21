import { Note } from "../../Types/Grades/Elements/Note";
import { Semestre } from "../../Types/Grades/Elements/Semestre";
import { GradeParser } from "../Parsing/GradeParser";

export class GradeFactory
{
    public static Grades(ue: number, res: number, sect: number): Note[]
    {
        return GradeParser.Instance.GetGrades(ue, res, sect).map(n => new Note(n));
    }
}