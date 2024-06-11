import Joi from "joi";
import { getActionList, login, register } from "./handler.js";

export const routes = [
    {
        path: '/api/v1/actions',
        method: 'GET',
        handler: getActionList,
    },
    {
        path: '/api/v1/users/register',
        method: 'POST',
        handler: register,
        options: {
            auth: false,
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
        handler: login,
        options: {
            auth: false,
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        }
    }
];