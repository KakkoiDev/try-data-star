import { ServerSentEventGenerator } from "./lib/serverSentEventGenerator.js";

const server = Bun.serve({
	port: 3000,
	fetch(req) {
		const url = new URL(req.url);
		const path = url.pathname;

		// Handle JavaScript/TypeScript files with correct MIME type
		if (path.endsWith(".js") || path.endsWith(".ts")) {
			return new Response(Bun.file(`./comp${path}`), {
				headers: {
					"Content-Type": "application/javascript",
				},
			});
		}

		// Handle CSS files with correct MIME type
		if (path.endsWith(".css")) {
			return new Response(Bun.file(`./comp${path}`), {
				headers: {
					"Content-Type": "text/css",
				},
			});
		}

		if (path === "/home") {
			// Creates a new `ServerSentEventGenerator` instance
			return ServerSentEventGenerator.stream(req, async (stream) => {
				// Merges HTML fragments into the DOM.
				stream.mergeFragments(/*html*/ `
        <main id="main">
          <main-component title="home">
          <div>
            <p>This is the home page.</p>
          </div>
          </main-component>
        </main>
        `);
			});
		}

		if (path === "/about") {
			// Creates a new `ServerSentEventGenerator` instance
			return ServerSentEventGenerator.stream(req, async (stream) => {
				// Merges HTML fragments into the DOM.
				stream.mergeFragments(/*html*/ `
        <main id="main">
          <main-component title="about">
          <div>
            <p>This is the about page.</p>
          </div>
          </main-component>
        </main>
        `);
			});
		}

		return new Response(Bun.file("./comp/index.html"));
	},
});

console.log(`Listening on http://localhost:${server.port} ...`);
