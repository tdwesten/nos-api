import * as fs from "fs";
import * as path from "path";
import Article from "./article";
import { NOS_ENDPOINTS } from "./enums/nos-endpoints";

export default class JsonResponse {
    private data = [];
    private endpoint: string;
    private fileName: string;
    private date: Date;

    constructor(endpoint: string) {
        this.endpoint = new String(endpoint).toLocaleLowerCase();
        this.fileName = new String(endpoint).toLocaleLowerCase();
        this.date = new Date();
    }

    setData(data: Article[]) {
        this.data = data.map((item) => item.toJson()) as [];
    }

    toFile() {
        const content = {
            data: this.data,
            meta: {
                date: this.date.toString(),
                timestamp: Math.floor(this.date.getTime() / 1000),
                endpoint: this.endpoint,
                credits: "All credits for the content are with the NOS.NL",
            },
        };

        fs.writeFileSync(
            `../data/${this.fileName}.json`,
            JSON.stringify(content)
        );
    }
}
