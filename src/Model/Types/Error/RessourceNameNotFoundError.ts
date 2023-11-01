export class RessourceNameNotFoundError extends Error {
    constructor() {
        super("Ressource name not found");
        this.name = "RessourceNameNotFound";
    }
}