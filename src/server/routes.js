import { getActionList } from "./handler.js";

export const routes = [
    {
        path: '/api/v1/actions',
        method: 'GET',
        handler: getActionList,
    },
];