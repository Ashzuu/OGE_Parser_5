export class NoGradesFoundError extends Error {
    constructor() {
        super("No grades found");
        this.name = "NoGradesFoundError";
    }
}