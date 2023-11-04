import { PageParser } from "../../src/Model/LogicLayer/Parsing/PageParser";

const fs = require('fs');
const path = require('path');

export class JestSetup
{
    private static mockHtml: string = "";
    // private static readonly PATH_TO_MOCKS: string = `C:/Users/ashot/Documents/GitHub/OGE_Parser/Tests/Mocks/`;
    private static readonly PATH_TO_MOCKS: string = `./Tests/Mocks/`;
    
    public static SetupBodyElementProperty(): void
    {
        Object.defineProperty(PageParser.Instance, 'BodyElement', {
            get: jest.fn(() => document.body),
        });
    }

    public static SetupMockBody(semester: number): void
    {
        let filePath: string = path.resolve(this.PATH_TO_MOCKS, `OGE${semester}.HTML`);
        this.mockHtml = fs.readFileSync(filePath, 'utf-8');
        document.body.innerHTML = this.mockHtml;
    };
}