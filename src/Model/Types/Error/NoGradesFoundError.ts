import { OGEParserError } from "./OGEParserError";

export class NoGradesFoundError extends OGEParserError {
    constructor() {
        super("NoGradesFoundError", "No grades found");
    }
}