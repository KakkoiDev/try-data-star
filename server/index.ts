import { VERSION } from "./consts.js";
import { ServerSentEventGenerator } from "./serverSentEventGenerator.js";
import type { Jsonifiable } from "type-fest";

//   `<html><head><script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v${VERSION}/bundles/datastar.js"></script></head><body><div id="toMerge" data-signals-foo="'World'" data-on-load="@get('/merge')">Hello</div></body></html>`,

    const server = Bun.serve({
        port: 3000,
        fetch(req) {
          return new Response("<h1>Hello World</h1>", {
            headers: {
                "Content-Type": "text/html",
            },
          });
        },
      });
      
      console.log(`Listening on http://localhost:${server.port} ...`);