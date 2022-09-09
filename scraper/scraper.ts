import { NOS_ENDPOINTS } from "./enums/nos-endpoints";
import Request from "./request";
import * as cheerio from "cheerio";
import Article from "./article";
import JsonResponse from "./json-response";

export default class Scraper {
    /**
     * Run scraper
     *
     * @param endpoint
     * @param name
     */
    async run(endpoint: string, name: string) {
        const url = new URL(endpoint);
        const request = new Request(url);
        const body = await request.makeRequest();
        const articles = this.getArticles(body);

        const file = new JsonResponse(name);
        file.setData(articles);
        file.toFile();
    }

    /**
     * Create data/index.json file based on NOS_ENDPOINTS
     *
     */
    createIndexFile() {
        const file = new JsonResponse("index");

        const contents: any = [];

        Object.entries(NOS_ENDPOINTS).forEach((item) => {
            const endpoint = item[0];
            const url = `https://tdwesten.github.io/nos-api/data/${endpoint}.json`;
            contents.push({
                name: endpoint,
                url: url,
            });
        });

        file.setDataAsJson(contents);
        file.toFile();
    }

    /**
     * Scrape articles from HTML
     *
     * @param html
     * @returns Article[]
     */
    getArticles(html: string): Article[] {
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

    /**
     * Extract title
     *
     * @param element
     * @returns string
     */
    extractTitle(element: any): string {
        const $ = cheerio.load(element);
        return $(element).children("a").children(".list-time__title").text();
    }

    /**
     * Extract url
     *
     * @param element
     * @returns URL
     */
    extractUrl(element: any): URL {
        const $ = cheerio.load(element);
        const url = $(element).children("a").attr("href");

        return new URL(`https://nos.nl${url}`);
    }

    /**
     * Extract Date
     *
     * @param element
     * @returns Date
     */
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
