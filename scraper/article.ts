export default class Article {
    private title: string;
    private url: URL;
    private date: Date;

    constructor(title: string, url: URL, date: Date) {
        this.title = title;
        this.url = url;
        this.date = date;
    }

    /**
     * Transform to a plain object
     *
     * @returns object
     */
    toJson() {
        return {
            title: this.title,
            url: this.url.toString(),
            date: this.date.toJSON(),
            date_formatted: this.date.toLocaleString("nl-NL", {
                timeZone: "Europe/Amsterdam",
            }),
            unix_timestamp: Math.floor(this.date.getTime() / 1000),
        };
    }
}
