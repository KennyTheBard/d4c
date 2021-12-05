import express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { ElasticSearchService } from './service/elastic-search-service'
import cors from 'cors';
import { logger } from './util/logger';


(async () => {
	dotenv.config();

	const es = new ElasticSearchService(process.env.ES_HOST, process.env.ES_PORT);
	await es.checkConnection();

	const app = express();
	app.use(express.json());
   app.use(cors());

	app.post('/save-job', async (req: Request, res: Response) => {
		logger.debug('Save new job');
		try {
			await es.saveJob(req.body);
		} catch (e) {
			res.status(400).json(e);
		}

      res.status(200).send();
   });

	app.get('/search-job', async (req: Request, res: Response) => {
		logger.debug('Search jobs');
		try {
			res.status(200).send(
				await es.searchJob(
					req.query.searchPhrase as string,
					req.query.skip && +req.query.skip,
					req.query.pageSize && +req.query.pageSize
				)
			);
		} catch (e) {
			res.status(400).json(e);
		}
   });

	const port = process.env.EXPRESS_PORT;
	app.listen(port, () => logger.info(`App listening on port ${port}`));
})();
