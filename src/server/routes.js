import Joi from "joi";
import { getActionList, login, register } from "./handler.js";

export const routes = [
    {
        path: '/api/v1/articles',
        method: 'GET',
        options: {
            handler: getActionList,
            description: 'Get All Article',
            notes: 'Return all articles. To get this resources you must <b>authenticate</b> first. Action is an article about anything that inspire or educate user about environmental pollution caused by waste.',
            tags: ['api', 'Article']
        }
    },
    {
        path: '/api/v1/users/register',
        method: 'POST',
        options: {
            handler: register,
            auth: false,
            description: 'Register a User',
            notes: 'Use this endpoint to register a user. When register is Success, it will return a message that user is registered succesfully',
            tags: ['api', 'User Account'],
            validate: {
                payload: Joi.object().keys({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        }
    },
    {
        path: '/api/v1/users/login',
        method: 'POST',
        options: {
            handler: login,
            auth: false,
            description: 'Log in to an account',
            notes: 'Use this endpoint to log in to an account. When register is Success, it will return a JWT token and message that user is logged in succesfully',
            tags: ['api', 'User Account'],
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        }
    }
];