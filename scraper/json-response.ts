import * as fs from "fs";
import Article from "./article";

export default class JsonResponse {
    private declare data: object | [];
    private endpoint: string;
    private fileName: string;
    private date: Date;

    constructor(endpoint: string) {
        this.endpoint = new String(endpoint).toLocaleLowerCase();
        this.fileName = new String(endpoint).toLocaleLowerCase();
        this.date = new Date();
    }

    /**
     * Set data object
     *
     * @param data
     */
    setData(data: Article[]) {
        this.data = data.map((item) => item.toJson()) as [];
    }

    /**
     * Set data as untyped object
     *
     * @param data
     */
    setDataAsJson(data: object | []) {
        this.data = data;
    }

    /**
     * Write to json file
     */
    toFile() {
        const content = {
            data: this.data,
            meta: {
                date: this.date.toString(),
                timestamp: Math.floor(this.date.getTime() / 1000),
                endpoint: this.endpoint,
                credits:
                    "All copyrights and other rights to the content belongs to NOS.nl. As creator I do not want to infringe on the rights of the content in any way. But I do find it crazy that the NOS.nl as an organization that is funded from public money does not have an open API. ",
                version: "1.0.0",
                contact: "https://twitter.com/tdwesten",
            },
        };

        fs.writeFileSync(
            `../data/${this.fileName}.json`,
            JSON.stringify(content)
        );
    }
}
