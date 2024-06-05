import { getAllActions } from "../db/db.js";

export async function getActionList(request, h) {
    const { totalResult, result} = await getAllActions();

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
}