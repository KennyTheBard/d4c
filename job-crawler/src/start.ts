import { SenderService } from './service/sender-service';
import { LinkedInScraper } from './scrapper/linkedin-scraper';
import * as dotenv from 'dotenv';
import { scheduleJob } from 'node-schedule';


(async () => {
   dotenv.config();

   const senderService = new SenderService(process.env.DESTINATION_URL);
   const linkedInScrapper = new LinkedInScraper();

   scheduleJob('0 */1 * * * *', async () => await linkedInScrapper.scrap(['United States'], senderService.send));
})();