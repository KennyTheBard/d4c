import { LinkedInProfileScraper } from 'linkedin-profile-scraper';


export class LinkedInScraper {

   private readonly scraper: LinkedInProfileScraper;
   private readonly idSet: Set<string> = new Set();

   constructor(linkedInCookie: string) {
      this.scraper = new LinkedInProfileScraper({
         sessionCookieValue: linkedInCookie
      });
   }

   public async scrap(
      sender: (job: any) => Promise<void>
   ) {
      await this.scraper.setup();

      const result = await this.scraper.run('https://www.linkedin.com/in/dragos-sandulescu-8a3a4617b/');

      console.log(JSON.stringify(result, null, 2));
   }

}