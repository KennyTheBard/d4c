import express from 'express';
import * as dotenv from 'dotenv';
import { ElasticSearchService } from './service/elastic-search-service'

(async () => {
	dotenv.config();

	let elasticSearchService = new ElasticSearchService('http://127.0.0.1', '9200', 'trace', '7.2');

	await elasticSearchService.checkConnection();

	const app = express();

	elasticSearchService.save({
		name: 'george',
		date: Date.now()
	});

	app.listen(3000, () => console.log("Hakuna matata!"));

})();
