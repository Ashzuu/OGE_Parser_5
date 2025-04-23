/**
 * Error thrown when trying to register a service that is already registered.
 */
export class ServiceAlreadyRegistered extends Error {
	/**
	 * Default constructor.
     * @param name The name of the service that raised the error.
     */
	public constructor(name: string) {
		super(`Service already registered: ${name}`);
	}
}