import { Note } from "../../../../src/Model/Types/Grades/Elements/Note";

describe('Note', () => {
    test('Constructor', () => {
        let note: Note = new Note({grade: 1, coefficient: 2});
        expect(note.Average).toBe(1);
        expect(note.Coefficient).toBe(2);
    });
});