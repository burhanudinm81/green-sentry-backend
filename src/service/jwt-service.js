import "dotenv/config";
import jwt from "jsonwebtoken";
import { DBService } from "./db-service.js";

export class JWTService {
    static async issue(options) {
        try {
            const { payload, expiresIn } = options;
            const token = await jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn
            });
            console.log(token);
            return token;
        } catch (error) {
            throw error;
        }
    }

    static async validate(decoded, request, h) {
        const { id, email } = decoded;
        const user = await DBService.findIdAndEmail(id, email);

        if (user) {
            return { isValid: true }
        }

        return { isValid: false };
    }
}