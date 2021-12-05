import { JobListing } from './../@types/types.d';
import es from '@elastic/elasticsearch';
import { logger } from '../util/logger';


export class ElasticSearchService {
	private client: es.Client;

	public constructor(host: string, port: string) {
		const client = new es.Client({
			node: `${host}:${port}`
		});

		this.client = client;
	}

	public async checkConnection() {
		try {
			await this.client.ping({}, { requestTimeout: 1000 });
		} catch (error) {
			console.log(error);
		}
	}

	// TODO: duplicate search/save for job/candidate

	public async saveJob(job: JobListing) {
		try {
			await this.client.index({
				index: 'job',
				id: `${job.source}-${job.jobId}`,
				op_type: 'create',
				body: {
					...job
				}
			})
		} catch (error) {
			if (error?.body?.error?.root_cause[0].type === 'version_conflict_engine_exception') {
				logger.info('Duplicate job listing ignored');
			} else {
				logger.error('Error on saving job listing', JSON.stringify(error, null, 2));
			}
		}
	}

	public async searchJob(
		searchPhrase: string,
		skip?: number,
		pageSize?: number,
	) {
		const searchFields = [
			'title', 'description', 'jobFunction', 'industries', 'senorityLevel', 'place', 'company'
		]
		try {			
			const response = await this.client.search({
				index: 'job',
				from: skip ?? 0,
				size: pageSize ?? 20,
				body: {
					query: {
						multi_match: {
							query: searchPhrase,
							fields: searchFields,
							type: 'most_fields',
						}
					}
				}
			});

			return response.body?.hits?.hits?.map(h => h._source).filter(h => !!h) ?? [];
		} catch (error) {
			logger.error(error)
		}
	}


	public getClient() {
		return this.client;
	}
}





// create 2 routes with expres => not here => in a file called routes/ or start.