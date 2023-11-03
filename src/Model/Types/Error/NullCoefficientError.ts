import { OGEParserError } from "./OGEParserError";

export class NullCoefficientError extends OGEParserError {
    constructor() {
        super("NullCoefficientError", "Coefficient text is null");
    }
}