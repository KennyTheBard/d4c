import { LinkedInScraper } from './scrapper/linkedin-scraper';


(async () => {
   const linkedInScrapper = new LinkedInScraper();

   await linkedInScrapper.scrap([]);
})();