import {
   LinkedinScraper,
   events,
} from 'linkedin-jobs-scraper';

export class LinkedInScraper {

   private readonly idSet: Set<string> = new Set();

   constructor() {}

   public async scrap(
      locations: string[],
      sender: (job: any) => Promise<void>
   ) {
      // Each scraper instance is associated with one browser.
      // Concurrent queries will run on different pages within the same browser instance.
      const scraper = new LinkedinScraper({
         headless: true,
         slowMo: 350,
         args: [
            "--lang=en-GB",
         ],
      });

      // Add listeners for scraper events
      scraper.on(events.scraper.data, async (data) => {
         if (this.idSet.has(data.jobId)) {
            return;
         }
         await sender(data);
         this.idSet.add(data.jobId);
      });

      scraper.on(events.scraper.error, (err) => {
         console.error(err);
      });

      scraper.on(events.scraper.end, () => {
         console.log('All done!');
      });

      // Add listeners for puppeteer browser events
      scraper.on(events.puppeteer.browser.targetcreated, () => {
      });
      scraper.on(events.puppeteer.browser.targetchanged, () => {
      });
      scraper.on(events.puppeteer.browser.targetdestroyed, () => {
      });
      scraper.on(events.puppeteer.browser.disconnected, () => {
      });

      // Run queries concurrently    
      await Promise.all([
         // Run queries serially
         scraper.run([
            {
               query: 'Developer'
            },
         ], { // Global options for this run, will be merged individually with each query options (if any)
            locations: locations,
            optimize: true,
            limit: 100,
            filters: {
               time: ''
            }
         }),
      ]);

      // Close browser
      await scraper.close();
   }

}