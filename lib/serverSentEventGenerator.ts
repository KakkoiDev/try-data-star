import { sseHeaders } from "../types.ts";
import type { DatastarEventOptions, EventType } from "../types.ts";

import { ServerSentEventGenerator as AbstractSSEGenerator } from "./abstractServerSentEventGenerator.ts";

import type { Jsonifiable } from "type-fest";

function isRecord(obj: unknown): obj is Record<string, Jsonifiable> {
	return typeof obj === "object" && obj !== null;
}

/**
 * ServerSentEventGenerator class, responsible for initializing and handling
 * server-sent events (SSE) as well as reading signals sent by the client.
 * Cannot be instantiated directly, you must use the stream static method.
 */
export class ServerSentEventGenerator extends AbstractSSEGenerator {
	private controller: ReadableStreamDefaultController;

	protected constructor(controller: ReadableStreamDefaultController) {
		super();
		this.controller = controller;
	}

	/**
	 * Initializes the server-sent event generator and executes the onStart callback.
	 *
	 * @param req - The Web API Request object.
	 * @param onStart - A function that will be passed the initialized ServerSentEventGenerator class as it's first parameter.
	 * @param options? - An object that can contain onError and onCancel callbacks as well as a keepalive boolean.
	 * @returns A Response object with the SSE stream
	 */
	static stream(
		req: Request,
		onStart: (stream: ServerSentEventGenerator) => Promise<void> | void,
		options?: Partial<{
			onError: (error: unknown) => Promise<void> | void;
			onAbort: () => Promise<void> | void;
			keepalive: boolean;
		}>,
	): Response {
		let streamController: ReadableStreamDefaultController;

		const stream = new ReadableStream({
			start(controller) {
				streamController = controller;

				const generator = new ServerSentEventGenerator(controller);

				try {
					// Execute the onStart callback
					const result = onStart(generator);
					if (result instanceof Promise) {
						result.catch((error) => {
							if (options?.onError) {
								options.onError(error);
							}
							if (!options?.keepalive) {
								controller.close();
							}
						});
					}

					if (!options?.keepalive && !(result instanceof Promise)) {
						controller.close();
					}
				} catch (error) {
					if (options?.onError) {
						options.onError(error);
					}
					controller.close();
				}
			},
			cancel() {
				if (options?.onAbort) {
					options.onAbort();
				}
			},
		});

		return new Response(stream, {
			headers: sseHeaders as Record<string, string>,
		});
	}

	protected override send(
		event: EventType,
		dataLines: string[],
		options: DatastarEventOptions,
	): string[] {
		const eventLines = super.send(event, dataLines, options);

		for (const line of eventLines) {
			this.controller.enqueue(line);
		}

		return eventLines;
	}

	/**
	 * Reads client sent signals based on HTTP methods
	 *
	 * @params request - The Request object.
	 *
	 * @returns An object containing a success boolean and either the client's signals or an error message.
	 */
	static async readSignals(
		request: Request,
	): Promise<
		| { success: true; signals: Record<string, Jsonifiable> }
		| { success: false; error: string }
	> {
		if (request.method === "GET") {
			const url = new URL(request.url);
			const params = url.searchParams;

			try {
				if (params.has("datastar")) {
					const datastarParam = params.get("datastar");
					if (!datastarParam) {
						throw new Error("Datastar param is empty");
					}

					const signals = JSON.parse(datastarParam);
					if (isRecord(signals)) {
						return { success: true, signals };
					}

					throw new Error("Datastar param is not a record");
				}

				throw new Error("No datastar object in request");
			} catch (e: unknown) {
				if (isRecord(e) && "message" in e && typeof e.message === "string") {
					return { success: false, error: e.message };
				}

				return {
					success: false,
					error: "unknown error when parsing request",
				};
			}
		}

		try {
			const parsedBody = await request.json();
			return {
				success: true,
				signals: parsedBody as Record<string, Jsonifiable>,
			};
		} catch (e: unknown) {
			if (isRecord(e) && "message" in e && typeof e.message === "string") {
				return { success: false, error: e.message };
			}

			return {
				success: false,
				error: "unknown error when parsing request",
			};
		}
	}
}
