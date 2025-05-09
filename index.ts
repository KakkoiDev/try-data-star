import { ServerSentEventGenerator } from "./lib/serverSentEventGenerator.js";
import { db } from "./lib/db.ts";
import type { User } from "./types.ts";

const server = Bun.serve({
	port: 3000,
	async fetch(req) {
		const url = new URL(req.url);
		const path = url.pathname;

		// Handle files with correct MIME type
		if (/[\w\/]+\.\w+/.test(path)) {
			let mimeType = "text/plain";
			let directory = "./public";
			const extension = path.split(".").pop();

			switch (extension) {
				case "js":
					mimeType = "application/javascript";
					break;
				case "ts":
					mimeType = "application/javascript";
					directory = "./components";
					break;
				case "css":
					mimeType = "text/css";
					break;
				case "html":
					mimeType = "text/html";
					break;
			}

			return new Response(Bun.file(`${directory}${path}`), {
				headers: {
					"Content-Type": mimeType,
				},
			});
		}

		// Handle routes using switch statement
		switch (path) {
			case "/home": {
				// get the users from the database using the shared connection
				const user = db.query("SELECT * FROM users").all() as User[];
				console.log(user);
				// Creates a new `ServerSentEventGenerator` instance
				return ServerSentEventGenerator.stream(req, (stream) => {
					// Merges HTML fragments into the DOM.
					stream.mergeFragments(/*html*/ `
        <main id="main">
          <main-component title="home">
          <div>
            <p>This is the home page.</p>
			${user.map((user) => `<p>${user.username}</p>`).join("")}
          </div>
          </main-component>
        </main>
        `);
				});
			}

			case "/about": {
				// Creates a new `ServerSentEventGenerator` instance
				return ServerSentEventGenerator.stream(req, (stream) => {
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

			default:
				return new Response(Bun.file("./index.html"));
		}
	},
});

console.log(`Listening on http://localhost:${server.port} ...`);
