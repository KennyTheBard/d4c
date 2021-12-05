import {
   LinkedinScraper,
   events,
} from 'linkedin-jobs-scraper';

export class LinkedInScraper {

   private readonly scraper: LinkedinScraper;
   private readonly idSet: Set<string> = new Set();

   constructor() {
      this.scraper = new LinkedinScraper({
         headless: true,
         slowMo: 500,
         args: [
            "--lang=en-GB",
         ],
      });
   }

   public async scrap(
      locations: string[],
      queries: string[],
      sender: (job: any) => Promise<void>
   ) {
      // Add listeners for scraper events
      this.scraper.on(events.scraper.data, async (data) => {
         if (this.idSet.has(data.jobId)) {
            return;
         }
         await sender({
            source: 'linkedin',
            date: Date(),
            ...data
         });
         this.idSet.add(data.jobId);
      });

      this.scraper.on(events.scraper.error, (err) => {
         console.error(err);
      });

      this.scraper.on(events.scraper.end, () => {
         console.log('All done!');
      });

      // Add listeners for puppeteer browser events
      this.scraper.on(events.puppeteer.browser.targetcreated, () => {
      });
      this.scraper.on(events.puppeteer.browser.targetchanged, () => {
      });
      this.scraper.on(events.puppeteer.browser.targetdestroyed, () => {
      });
      this.scraper.on(events.puppeteer.browser.disconnected, () => {
      });

      // Run queries concurrently    
      await Promise.all([
         this.scraper.run(queries.map(q => {
            return {
               query: q
            };
         }), {
            locations: locations,
            optimize: true,
            limit: 1000,
            filters: {
               time: ''
            }
         })
      ]);
   }

   async close() {
      await this.scraper.close();
   }

}