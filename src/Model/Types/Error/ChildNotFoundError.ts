export class ChildNotFoundError extends Error {
    constructor() {
        super("Child element not found");
        this.name = "ChildNotFoundError";
    }
}