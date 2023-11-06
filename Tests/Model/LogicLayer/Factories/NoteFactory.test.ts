import { NoteFactory } from '../../../../src/Model/LogicLayer/Factories/NoteFactory';
import { Note } from '../../../../src/Model/Types/Grades/Elements/Note';
import { TestsSetup } from '../../../Mocks/TestsSetup';

describe('NoteFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(NoteFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllNotes', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            let result: Note[] = NoteFactory.Instance.GetAllNotes(0, 0, 2);
            expect(result).toStrictEqual(
                [
                    new Note({grade: 8, coefficient: 1}),
                    new Note({grade: 16, coefficient: 1}),
                ]
            );
        });
    });
});