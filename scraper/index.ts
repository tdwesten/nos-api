import { NOS_ENDPOINTS } from "./enums/nos-endpoints";
import Scraper from "./scraper";

const scraper = new Scraper();

// Loop over all NOS_ENDPOINTS and create a new json-file in data/**.js
Object.entries(NOS_ENDPOINTS).forEach((item) => {
    const name = item[0];
    const endpoint = item[1];

    scraper.run(endpoint, name);
});

// Create data/index.json file based on NOS_ENDPOINTS
scraper.createIndexFile();
