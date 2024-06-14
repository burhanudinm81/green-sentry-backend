import Hapi from "@hapi/hapi";
import hapiAuthJwt2 from "hapi-auth-jwt2";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import { routes } from "./routes.js";
import { JWTService } from "../service/jwt-service.js";

const server = Hapi.server({
    host: 'localhost',
    port: 3000,
});

await server.register([
    hapiAuthJwt2,
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'Green Sentry API Documentation',
                version: '1.0.0'
            }
        }
    }
]);

server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,
    verifyOptions: {
        algorithms: ['HS256']
    },
    validate: JWTService.validate
});

server.auth.default('jwt');

server.route(routes);

await server.start();
console.log(`Server is running at ${server.info.uri}`);