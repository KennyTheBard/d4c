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

(async () => {
   dotenv.config();

   const linkedInScrapper = new LinkedInScraper();

   scheduleJob('0 */10 * * * *', async () => {
      await linkedInScrapper.scrap(
         ['United States', 'Europe'],
         ['Developer', 'Engineer', 'Sales', 'Manager', 'Analyst', 'Admin', 'DevOp', 'QA'],
         send
      );
   });
})();