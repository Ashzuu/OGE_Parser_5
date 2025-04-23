import { ServiceAlreadyRegistered } from './errors/injection/ServiceAlreadyRegistered';
import { ServiceNotFound } from './errors/injection/ServiceNotFound';

//#region Type Alias
/** Alias for a class constructor. */
type Constructor<T = any> = new (...args: any[]) => T;
/** Alias for the list of names of the dependencies of a service. */
type Dependencies = string[];
/** Type of a service entry in the injector. */
type Entry<T = any> = { implementation: Constructor<T>; dependencies: Dependencies; instance?: T };
//#endregion Type Alias

/**
 * Dependency injection container.
 */
export default class Injector {
    /** Private constructor to prevent instantiation. */
    private constructor() {}
    /** Map of registered service entries. */
    private static serviceEntries: Map<string, Entry> = new Map();

    /**
     * Register a service in the injector.
     * @param name Name of the service.
     * @param implementation Implementation of the service.
     * @param dependencies Names of the dependencies of the service.
     *
     * @throws {ServiceAlreadyRegistered} if the service is already registered.
     *
     * @author Ashot MANUKYAN
     */
    public static register(
        name: string,
        implementation: Constructor,
        dependencies: Dependencies = [],
    ): void {
        if (this.serviceEntries.has(name)) {
            throw new ServiceAlreadyRegistered(name);
        }

        this.serviceEntries.set(name, {
            implementation,
            dependencies,
        });
    }

    /**
     * Resolve a service from the injector.
     * @param name Name of the service.
     * @returns The instance of the service.
     *
     * @throws {ServiceNotFound} if the service is not registered.
     *
     * @author Ashot MANUKYAN
     */
    public static resolve<T>(name: string): T {
        const entry = this.serviceEntries.get(name);
        if (!entry) {
            throw new ServiceNotFound(name);
        }

        if (!entry.instance) {
            const { implementation, dependencies } = entry as Entry<T>;
            const dependencyInstances = dependencies.map(dep => this.resolve(dep));

            entry.instance = new implementation(...dependencyInstances);
        }

        return entry.instance;
    }
}
