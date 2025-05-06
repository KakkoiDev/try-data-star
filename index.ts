import { ServerSentEventGenerator } from "./lib/serverSentEventGenerator.js";

const server = Bun.serve({
	port: 3000,
	fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === "/home") {
			// Creates a new `ServerSentEventGenerator` instance
			return ServerSentEventGenerator.stream(req, async (stream) => {
				// Merges HTML fragments into the DOM.
				const fileContent = await Bun.file("./comp/home.html").text();
				stream.mergeFragments(fileContent);
			});
		}

		return new Response(Bun.file("./comp/index.html"));
	},
});

console.log(`Listening on http://localhost:${server.port} ...`);
