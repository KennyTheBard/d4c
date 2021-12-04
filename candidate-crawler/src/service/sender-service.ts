import axios from 'axios';


export class SenderService {

   constructor(
      private readonly destinationUrl: string
   ) {}

   public async send(data: any) {
      await axios.post(
         this.destinationUrl,
         data
      );
   } 

}