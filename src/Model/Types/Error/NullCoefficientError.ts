export class NullCoefficientError extends Error {
    constructor() {
        super("Coefficient text is null");
        this.name = "NullCoefficientError";
    }
}