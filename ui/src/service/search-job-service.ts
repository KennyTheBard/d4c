import axios from 'axios';
import { JobListing } from '../@types/types';

export default class SearchJobService {

   async search(query: string, skip: number, pageSize: number): Promise<JobListing[]> {
      const response = await axios.get('http://localhost:8000/search-job'
         + `?searchPhrase=${query}&skip=${skip}&pageSize=${pageSize}`);
      
      return response.data;
   }
}