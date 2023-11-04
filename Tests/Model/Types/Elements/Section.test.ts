import { Note } from "../../../../src/Model/Types/Grades/Elements/Note";
import { Section } from "../../../../src/Model/Types/Grades/Elements/Section";

describe('Section', () => {
    test('Constructor', () => {
        let section: Section = new Section(1, [new Note({grade: 1, coefficient: 2})]);
        expect(section.Coefficient).toBe(1);
        expect(section.GradeList.length).toBe(1);
    });
});