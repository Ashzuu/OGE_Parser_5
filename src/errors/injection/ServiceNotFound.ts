/**
 * Error thrown when a service is not found.
 */
export class ServiceNotFound extends Error {
	/**
	 * Default constructor.
	 * @param name The name of the service that raised the error.
	 */
	public constructor(name: string) {
		super(`Service not found: ${name}`);
	}
}