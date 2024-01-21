import { GradeParser } from "../../src/Model/LogicLayer/Parsing/GradeParser";
import { ViewParser } from "../../src/Model/LogicLayer/Parsing/ViewParser";
import { Parser } from "../../src/Model/LogicLayer/Parsing/Parser";

Object.defineProperty(Parser, 'BodyElement', {
    get: jest.fn(() => document.body),
});