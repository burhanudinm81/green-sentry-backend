import { nanoid } from "nanoid";
import { DBService } from "../service/db-service.js";
import { HashService } from "../service/hash-service.js";
import Boom from "@hapi/boom";
import { JWTService } from "../service/jwt-service.js";

export async function getActionList(request, h) {
    try {
        const { totalResult, result } = await DBService.getAllActions();

        const articles = [];
        result.forEach(res => {
            articles.push({
                author: res.author,
                source: res.news_source,
                title: res.title,
                description: res.description,
                url: res.url,
                url_to_image: res.url_to_image,
            });
        });

        const response = h.response({
            status: "ok",
            totalResult: totalResult,
            articles: articles
        });
        response.code(200);
        response.type("application/json");
        return response;
    } catch (error) {
        console.error(error);
        throw Boom.badImplementation();
    }
}

export async function register(request, h) {
    try {
        const {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        } = request.payload;

        const id = nanoid();
        const hashedPassword = await HashService.hashPassword(password);

        const user = {
            id,
            firstName,
            lastName,
            email,
            hashedPassword
        };

        const result = await DBService.saveUserData(user);

        const response = h.response({
            status: 'OK',
            message: 'User has successfully register',
        });

        response.code(200);
        response.type("application/json");
        return response;
    } catch (error) {
        console.error(error);
        throw Boom.badImplementation();
    }
}

export async function login(request, h) {
    const { email, password } = request.payload;
    const user = await DBService.findEmail(email);

    if (!user) {
        throw Boom.unauthorized('The credential provided is invalid');
    }

    const matched = await HashService.comparePassword(password, user.hashed_password);

    if (!matched) {
        throw Boom.unauthorized('The credential provided is invalid')
    }

    const token = await JWTService.issue({
        payload: {
            id: user.id,
            email: user.email
        },
        expiresIn: '1h'
    });

    const response = h.response({
        status: 'OK',
        message: 'User logged in successfully',
        token: token
    });

    return response;
}