import { LinkedInScraper } from './scrapper/linkedin-scraper';
import * as dotenv from 'dotenv';
import { scheduleJob } from 'node-schedule';
import { logger } from './util/logger';
import axios from 'axios';

const send = async (data: any) => {
   logger.info('Sending job listing', data);
   await axios.post(
      process.env.DESTINATION_URL,
      data
   );
}

const LOCATIONS = ['Romania', 'Hungary', 'Estonia', 'Bulgaria', 'Italy', 'France', 'United Kingdom', 'California', 'New Tork', 'Denmark', 'Belgium', 'Spain', 'Mexico'];
const QUERIES = ['Developer', 'Engineer', 'Sales', 'Manager', 'Analyst', 'Admin', 'DevOp', 'QA'];


(async () => {
   dotenv.config();

   const linkedInScrapper = new LinkedInScraper();

   const scrap = async () => await linkedInScrapper.scrap(
      LOCATIONS,
      QUERIES,
      send
   );
   await scrap();

   scheduleJob('0 */5 * * * *', async () => await scrap());
})();