import Hapi from "@hapi/hapi";
import { routes } from "./routes.js";

const server = Hapi.server({
    host: 'localhost',
    port: 3000,
});

server.route(routes);

await server.start();
console.log(`Server is running at ${server.info.uri}`);