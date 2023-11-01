export class ChildNotFoundError extends Error {
    constructor() {
        super();
        this.name = "ChildNotFoundError";
    }
}