import { NoteFactory } from '../../../../src/Model/LogicLayer/Factories/NoteFactory';
import { Note } from '../../../../src/Model/Types/Grades/Elements/Note';
import { TestsSetup } from '../../../Mocks/TestsSetup';

describe('NoteFactory', () => {
    describe('GetAllNotes', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            let result: Note[] = NoteFactory.GetAllNotes(0, 0, 2);
            expect(result).toStrictEqual(
                [
                    new Note({grade: 8, coefficient: 1}),
                    new Note({grade: 16, coefficient: 1}),
                ]
            );
        });
    });
});