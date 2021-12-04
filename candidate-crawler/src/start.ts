import { SenderService } from './service/sender-service';
import { LinkedInScraper } from './scrapper/linkedin-scraper';
import * as dotenv from 'dotenv';
import { scheduleJob } from 'node-schedule';


(async () => {
   dotenv.config();

   const senderService = new SenderService(process.env.DESTINATION_URL);
   const linkedInScrapper = new LinkedInScraper('AQEDASnZe1sDO7TMAAABfNyAM5UAAAF9mRuFEVYATJ0-Jo3GYBvKmBC9v_oEAyyf94Kgpu8uI5w16_-4K8NE3XlDsMZg0pHIjeuGFZ6gu12Carx6m0U1x7yUdvcCN6E8-NxTRsm2oj6NSOv2FDz0x0Ws');

   await linkedInScrapper.scrap(senderService.send)
   // scheduleJob('0 */1 * * * *', async () => await linkedInScrapper.scrap(senderService.send));
})();