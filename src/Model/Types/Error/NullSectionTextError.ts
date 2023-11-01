export class NullSectionTextError extends Error {
    constructor() {
        super("Section text is null");
        this.name = "NullSectionText";
    }
}