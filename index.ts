import { ServerSentEventGenerator } from "./lib/serverSentEventGenerator.js";

    const server = Bun.serve({
        port: 3000,
        fetch(req) {
          return new Response(Bun.file("./comp/index.html"));
        },
      });
      
      console.log(`Listening on http://localhost:${server.port} ...`);