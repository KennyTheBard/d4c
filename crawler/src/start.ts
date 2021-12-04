import {
   LinkedinScraper,
   relevanceFilter,
   timeFilter,
   typeFilter,
   experienceLevelFilter,
   events,
} from 'linkedin-jobs-scraper';

(async () => {
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

   // Custom function executed on browser side to extract job description
   const descriptionFn = () => (document.querySelector(".description__text") as HTMLElement)
      .innerText
      .replace(/[\s\n\r]+/g, " ")
      .trim();

   // Run queries concurrently    
   await Promise.all([
      // Run queries serially
      scraper.run([
         {
            query: "Engineer",
            options: {
               locations: ["United States"], // This will be merged with the global options => ["United States", "Europe"]
               filters: {
                  type: [typeFilter.FULL_TIME, typeFilter.CONTRACT]
               },
            }
         },
         {
            query: "Sales",
            options: {
               limit: 10, // This will override global option limit (33)
            }
         },
      ], { // Global options for this run, will be merged individually with each query options (if any)
         locations: ["Europe"],
         optimize: true,
         limit: 33,
      }),
   ]);

   // Close browser
   await scraper.close();
})();