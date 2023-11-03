import { OGEParserError } from "./OGEParserError";

export class ChildNotFoundError extends OGEParserError{
    constructor() {
        super("ChildNotFoundError", "Child element not found");
    }
}