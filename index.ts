import { ServerSentEventGenerator } from "./lib/serverSentEventGenerator.js";

const server = Bun.serve({
	port: 3000,
	fetch(req) {
		const url = new URL(req.url);
		const path = url.pathname;

		// Handle files with correct MIME type
		if (/[\w\/]+\.\w+/.test(path)) {
			let mimeType = "text/plain";
			const extension = path.split(".").pop();

			switch (extension) {
				case "js":
				case "ts":
					mimeType = "application/javascript";
					break;
				case "css":
					mimeType = "text/css";
					break;
			}

			return new Response(Bun.file(`./comp${path}`), {
				headers: {
					"Content-Type": mimeType,
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
