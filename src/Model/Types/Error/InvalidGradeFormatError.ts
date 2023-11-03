import { OGEParserError } from "./OGEParserError";

export class InvalidGradeFormatError extends OGEParserError {
    constructor() {
        super("InvalidGradeFormat", "Invalid grade format");
    }
}