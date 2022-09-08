import axios from "axios";

export default class Request {
    private url: URL;

    constructor(url: URL) {
        this.url = url;
    }

    /**
     * @returns Promise
     */
    async makeRequest(): Promise<string> {
        const response = await axios.get(this.url.toString());
        const body = await response.data;

        return body;
    }
}
