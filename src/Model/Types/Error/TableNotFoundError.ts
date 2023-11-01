export class TableNotFoundError extends Error {
    constructor() {
        super("Table not found");
        this.name = "TableNotFoundError";
    }
}