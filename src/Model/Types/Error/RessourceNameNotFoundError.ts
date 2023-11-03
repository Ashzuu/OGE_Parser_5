import { OGEParserError } from "./OGEParserError";

export class RessourceNameNotFoundError extends OGEParserError{
    constructor() {
        super("RessourceNameNotFound", "Ressource name not found");
    }
}