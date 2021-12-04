import express from 'express';
import * as dotenv from 'dotenv';
import { ElasticSearchService } from './service/elastic-search-service'

(async () => {
	dotenv.config();

	let elasticSearchService = new ElasticSearchService('localhost', '9200', 'trace', '7.2');

	await elasticSearchService.checkConnection();

	const app = express();

	app.listen(3000, () => console.log("Hakuna matata!"));

})();
