import { OGEParserError } from "./OGEParserError";

export class BodyElementNotFoundError extends OGEParserError{
    constructor() {
        super("BodyElementNotFoundError", "Body element not found");
    }
}