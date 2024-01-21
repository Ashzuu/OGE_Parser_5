import { Note } from "../../Types/Grades/Elements/Note";
import { Section } from "../../Types/Grades/Elements/Section";
import { GradeParser } from "../Parsing/GradeParser";
import { GradeFactory } from "./GradeFactory";

export class SectionFactory
{
    public static Sections(ue: number, res: number): Section[]
    {
        let count: number = GradeParser.Instance.SectionCount(ue, res);
        let sections: Section[] = [];
        for (let i = 0; i < count; i++)
        {
            sections.push(this.GetSection(ue, res, i));
        }
        return sections;
    }
    private static GetSection(ue: number, res: number, ix: number): Section
    {
        let coef: number = GradeParser.Instance.SectionCoefficient(ue, res, ix);
        let grades: Note[] = GradeFactory.Grades(ue, res, ix);
        return new Section(coef, grades);
    }
}