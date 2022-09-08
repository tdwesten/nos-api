import { NOS_ENDPOINTS } from "./enums/nos-endpoints";
import Scraper from "./scraper";

const scraper = new Scraper();

Object.entries(NOS_ENDPOINTS).forEach((item) => {
    const name = item[0];
    const endpoint = item[1];

    scraper.run(endpoint, name);
});

scraper.createIndexFile();
