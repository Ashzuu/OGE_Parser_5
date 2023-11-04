import { Ressource } from "../../../../src/Model/Types/Grades/Elements/Ressource";
import { Section } from "../../../../src/Model/Types/Grades/Elements/Section";

describe('Ressource', () => {
    test('Constructor', () => {
        let ressource: Ressource = new Ressource('name', 1, [new Section(1, []), new Section(1, []), new Section(1, [])]);
        expect(ressource.Name).toBe('name');
        expect(ressource.Coefficient).toBe(1);
        expect(ressource.SectionList.length).toBe(3);
    });
});