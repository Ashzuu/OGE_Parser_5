export class InvalidGradeFormatError extends Error {
    constructor() {
        super("Invalid grade format");
        this.name = "InvalidGradeFormat";
    }
}