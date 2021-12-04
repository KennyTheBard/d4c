import es from '@elastic/elasticsearch';

export class ElasticSearchService {
	private client: es.Client;
	private responses: Array<any>;

	public constructor(host: string, port: string, log: string, apiVersion: string) {
		const client = new es.Client({
			node: host + ':' + port
		});

		this.client = client;
	}

	public async checkConnection() {
		try {
			await this.client.ping({ }, { requestTimeout: 1000 });
		} catch (error) {
			console.log(error);
		}
	}

	public async save(response: any) {
		this.responses.push(response);
		await this.client.index({
			index: 'job-listing',
			body: {
				...response
			}
		})
	}

	public async search(index: string, type: string, body: string) {
		try {
			const response = await this.client.search({
				index: index,
				type: type,
				body: {
					query: {
						match: {
							body: body
						}
					}
				}
			});

			
			for (const responseMessage of response.body.hits.hits) {
				console.log(responseMessage);
			}

			return response;
		} catch (error) {
			console.trace(error.message)
		}
	}

	
	public getClient() {
		return this.client;
	}
}





// create 2 routes with expres => not here =? in a file called routes/ or start.