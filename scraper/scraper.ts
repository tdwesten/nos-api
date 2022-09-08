import { NOS_ENDPOINTS } from "./enums/nos-endpoints";
import Request from "./request";
import * as cheerio from "cheerio";
import Article from "./article";
import JsonResponse from "./json-response";

export default class Scraper {
    async run(endpoint: NOS_ENDPOINTS, name: string) {
        const url = new URL(endpoint);
        const request = new Request(url);
        const body = await request.makeRequest();
        const articles = this.getArticles(body);

        const file = new JsonResponse(name);
        file.setData(articles);
        file.toFile();
    }

    getArticles(html: string) {
        const $ = cheerio.load(html);
        const articlesHtml = $("html body #archief > ul > li");
        const articles: Article[] = [];

        articlesHtml.each((index, element) => {
            articles.push(
                new Article(
                    this.extractTitle(element),
                    this.extractUrl(element),
                    this.extractDate(element)
                )
            );
        });

        return articles;
    }

    extractTitle(element: any): string {
        const $ = cheerio.load(element);
        return $(element).children("a").children(".list-time__title").text();
    }

    extractUrl(element: any): URL {
        const $ = cheerio.load(element);
        const url = $(element).children("a").attr("href");

        return new URL(`https://nos.nl${url}`);
    }

    extractDate(element: any): Date {
        const $ = cheerio.load(element);
        const date = $(element)
            .children("a")
            .children(".list-time__time")
            .children("time")
            .attr("datetime");

        return new Date(date as string);
    }
}
