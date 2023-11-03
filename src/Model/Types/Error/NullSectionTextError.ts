import { OGEParserError } from "./OGEParserError";

export class NullSectionTextError extends OGEParserError{
    constructor() {
        super("NullSectionText", "Section text is null");
    }
}