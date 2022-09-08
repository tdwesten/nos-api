import { NOS_ENDPOINTS } from "./enums/nos-endpoints";
import Scraper from "./scraper";

const scraper = new Scraper();

scraper.run(NOS_ENDPOINTS.ALGEMEEN, "algemeen");
scraper.run(NOS_ENDPOINTS.BINNENLAND, "binnenland");
