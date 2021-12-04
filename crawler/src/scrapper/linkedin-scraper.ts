import {
   LinkedinScraper,
   events,
} from 'linkedin-jobs-scraper';

export class LinkedInScraper {

   constructor() {}

   public async scrap(
      loactions: string[],
      sender: (job: any) => Promise<void>
   ) {
      // Each scraper instance is associated with one browser.
      // Concurrent queries will run on different pages within the same browser instance.
      const scraper = new LinkedinScraper({
         headless: true,
         slowMo: 500,
         args: [
            "--lang=en-GB",
         ],
      });

      // Add listeners for scraper events
      scraper.on(events.scraper.data, (data) => {
         console.log(
            
            data.description.length,
            data.descriptionHTML.length,
            `Query='${data.query}'`,
            `Location='${data.location}'`,
            `Id='${data.jobId}'`,
            `Title='${data.title}'`,
            `Company='${data.company ? data.company : "N/A"}'`,
            `Place='${data.place}'`,
            `Date='${data.date}'`,
            `Link='${data.link}'`,
            `applyLink='${data.applyLink ? data.applyLink : "N/A"}'`,
            `senorityLevel='${data.senorityLevel}'`,
            `function='${data.jobFunction}'`,
            `employmentType='${data.employmentType}'`,
            `industries='${data.industries}'`,
            `descriprion='${data.description}'`
         );
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
               query: "Developer",
            },
         ], { // Global options for this run, will be merged individually with each query options (if any)
            locations: loactions,
            optimize: true,
            limit: 1000,
         }),
      ]);

      // Close browser
      await scraper.close();
   }

}