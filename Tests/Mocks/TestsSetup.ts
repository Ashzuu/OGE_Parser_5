import { PageParser } from "../../src/Model/LogicLayer/Parsing/PageParser";
import { UE } from "../../src/Model/Types/Grades/Elements/UE";

const fs = require('fs');
const path = require('path');
  
export class TestsSetup
{
    private static mockHtml: string = "";
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

    public static CreateUEList(expectedAverages: number[]): UE[]
    {
        let ueList: UE[] = [];
        for (let i = 0; i < 6; i++)
        {
            let ue: UE = new UE(0, [], 0);
            Object.defineProperty(ue, 'Average', {
                get: jest.fn(() => expectedAverages[i]),
            });
            ueList.push(ue);
        }
        return ueList;
    }
}