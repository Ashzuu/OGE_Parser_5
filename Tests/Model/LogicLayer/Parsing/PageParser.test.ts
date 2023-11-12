import { PageParser } from "../../../../src/Model/LogicLayer/Parsing/PageParser";
import { UEParser } from "../../../../src/Model/LogicLayer/Parsing/ElementParsers/UEParser";
import { ChildNotFoundError } from "../../../../src/Model/Types/Error/ChildNotFoundError";
import { TableNotFoundError } from "../../../../src/Model/Types/Error/TableNotFoundError";
import { TestsSetup } from "../../../Mocks/TestsSetup";

TestsSetup.SetupBodyElementProperty();

describe('PageParser', () => {
    describe('Instance', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(PageParser.Instance).toBeDefined();
        });
    });
    describe('Reset', () => {
        test('Different instances', () => {
            TestsSetup.SetupMockBody(1);
            let firstInstance = PageParser.Instance;
            PageParser.Reset();
            let secondInstance = PageParser.Instance;

            expect(firstInstance).not.toBe(secondInstance);
        });
    });
    describe('UECount', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            PageParser.Reset();
            expect(PageParser.Instance.UECount).toBe(6);
        });
    });
    describe('AreGradesShown', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            PageParser.Reset();
            let checkedElement = new UEParser().UETables[0].children[0].children[0];
            
            expect(PageParser.Instance.AreGradesShown).toBe(true);
            while (checkedElement.childElementCount > 1) { checkedElement.removeChild(checkedElement.children[1]); }
            expect(PageParser.Instance.AreGradesShown).toBe(false);
        });
    });
    describe('GetChild', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(1);
            PageParser.Reset();
            let table = new UEParser().UETables[0];
            let searchedElement = table.children[0].children[0];
            let foundElement = PageParser.GetChild(table, [0, 0]);

            expect(foundElement).toBe(searchedElement);
        });
        test('ChildNotFoundError', () => {
            TestsSetup.SetupMockBody(1);
            PageParser.Reset();
            let table = new UEParser().UETables[0];
            expect(() => { PageParser.GetChild(table, [0, 50]) } ).toThrow(ChildNotFoundError);
            expect(() => { PageParser.GetChild(table, [0, -50]) } ).toThrow(ChildNotFoundError);
            expect(() => { PageParser.GetChild(table, [-1]) } ).toThrow(ChildNotFoundError);
            expect(() => { PageParser.GetChild(table, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } ).toThrow(ChildNotFoundError);
        });
    });
    describe('GetCCAndSAESeparationIndex', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(0)).toBe(5);
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(1)).toBe(5);
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(2)).toBe(5);
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(3)).toBe(5);
            
            TestsSetup.SetupMockBody(3);
            PageParser.Reset();
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(0)).toBe(2);
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(1)).toBe(2);
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(2)).toBe(2);
            expect(PageParser.Instance.GetCCAndSAESeparationIndex(3)).toBe(3);
        });
    });
    describe('GetRessourceCount', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetRessourceCount(0)).toBe(6);
            expect(PageParser.Instance.GetRessourceCount(1)).toBe(6);
            expect(PageParser.Instance.GetRessourceCount(2)).toBe(6);
        });
    });
    describe('GetRessourceCoefficient', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetRessourceCoefficient(0, 0)).toBe(21);
            expect(PageParser.Instance.GetRessourceCoefficient(0, 1)).toBe(21);
            expect(PageParser.Instance.GetRessourceCoefficient(0, 2)).toBe(12);
            expect(PageParser.Instance.GetRessourceCoefficient(0, 3)).toBe(6);
            expect(PageParser.Instance.GetRessourceCoefficient(0, 4)).toBe(2);
            expect(PageParser.Instance.GetRessourceCoefficient(0, 5)).toBe(38);
        });
        test('ChildNotFoundError', () => {
            TestsSetup.SetupMockBody(1);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetRessourceCoefficient(0, 50) }).toThrow(ChildNotFoundError);
            expect(() => { PageParser.Instance.GetRessourceCoefficient(0, -50) }).toThrow(ChildNotFoundError);
        });
        test('TableNotFoundError', () => {
            TestsSetup.SetupMockBody(1);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetRessourceCoefficient(-1, 0) }).toThrow(TableNotFoundError);
            expect(() => { PageParser.Instance.GetRessourceCoefficient(50, 0) }).toThrow(TableNotFoundError);
        });
    });
    describe('GetRessourceName', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetRessourceName(0, 0)).toBe('Développ orienté objets');
            expect(PageParser.Instance.GetRessourceName(0, 1)).toBe('Développ d\'appli avec IHM');
            expect(PageParser.Instance.GetRessourceName(0, 2)).toBe('Qualité de développement');
            expect(PageParser.Instance.GetRessourceName(0, 3)).toBe('Communication Technique');
            expect(PageParser.Instance.GetRessourceName(0, 4)).toBe('Portfolio');
            expect(PageParser.Instance.GetRessourceName(0, 5)).toBe('Développement d\'une appli');
        });
        test('ChildNotFoundError', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetRessourceName(0, 50) }).toThrow(ChildNotFoundError);
            expect(() => { PageParser.Instance.GetRessourceName(0, -50) }).toThrow(ChildNotFoundError);
        });
        test('TableNotFoundError', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetRessourceName(-1, 0) }).toThrow(TableNotFoundError);
            expect(() => { PageParser.Instance.GetRessourceName(50, 0) }).toThrow(TableNotFoundError);
        });
    });
    describe('GetSectionCount', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetSectionCount(0, 0)).toBe(2);
            expect(PageParser.Instance.GetSectionCount(0, 1)).toBe(4);
            expect(PageParser.Instance.GetSectionCount(0, 2)).toBe(1);
            expect(PageParser.Instance.GetSectionCount(0, 3)).toBe(1);
            expect(PageParser.Instance.GetSectionCount(0, 4)).toBe(2);
            expect(PageParser.Instance.GetSectionCount(0, 5)).toBe(2);
        });
    });
    describe('GetSectionCoefficient', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetSectionCoefficient(0, 1, 0)).toBe(1);
            expect(PageParser.Instance.GetSectionCoefficient(0, 1, 1)).toBe(1.5);
            expect(PageParser.Instance.GetSectionCoefficient(0, 1, 2)).toBe(0.2);
            expect(PageParser.Instance.GetSectionCoefficient(0, 1, 3)).toBe(1);
        });
        test('ChildNotFoundError', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetSectionCoefficient(0, 1, 50) }).toThrow(ChildNotFoundError);
            expect(() => { PageParser.Instance.GetSectionCoefficient(0, 1, -50) }).toThrow(ChildNotFoundError);
        });
        test('TableNotFoundError', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetSectionCoefficient(-1, 0, 0) }).toThrow(TableNotFoundError);
            expect(() => { PageParser.Instance.GetSectionCoefficient(50, 0, 0) }).toThrow(TableNotFoundError);
        });
    });
    describe('GetNoteCount', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetNoteCount(0, 0, 0)).toBe(2);
            expect(PageParser.Instance.GetNoteCount(0, 0, 1)).toBe(9);
        });
    });
    describe('GetNote', () => {
        test('Normal Case Tests', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(PageParser.Instance.GetNote(0, 0, 0, 0)).toStrictEqual({grade: 17, coefficient: 1});
            expect(PageParser.Instance.GetNote(0, 0, 0, 1)).toStrictEqual({grade: 15, coefficient: 1.5});
        });
        test('ChildNotFoundError', () => {
            TestsSetup.SetupMockBody(2);
            PageParser.Reset();
            expect(() => { PageParser.Instance.GetNote(0, 0, 0, 50) }).toThrow(ChildNotFoundError);
            expect(() => { PageParser.Instance.GetNote(0, 0, 0, -50) }).toThrow(ChildNotFoundError);
        });
    });
});