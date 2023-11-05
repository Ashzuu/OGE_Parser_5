import { OGEParserError } from "./OGEParserError";

export class UnknownCoefficientError extends OGEParserError
{
    constructor()
    {
        super("UnknownCoefficientError", "API doesn't have this coefficient stored");
    }
}