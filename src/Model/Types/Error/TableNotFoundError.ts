import { OGEParserError } from "./OGEParserError";

export class TableNotFoundError extends OGEParserError{
    constructor() {
        super("TableNotFoundError", "Table not found");
    }
}