export class BodyElementNotFoundError extends Error{
    constructor() {
        super("Body not found");
        this.name = "BodyElementNotFoundError";
    }
}