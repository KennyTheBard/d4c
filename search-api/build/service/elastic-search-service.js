"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSearchService = void 0;
const elasticsearch_1 = __importDefault(require("@elastic/elasticsearch"));
const logger_1 = require("../util/logger");
class ElasticSearchService {
    constructor(host, port) {
        const client = new elasticsearch_1.default.Client({
            node: `${host}:${port}`
        });
        this.client = client;
    }
    checkConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.ping({}, { requestTimeout: 1000 });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // TODO: duplicate search/save for job/candidate
    saveJob(job) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.index({
                    index: 'job',
                    id: `${job.source}-${job.jobId}`,
                    op_type: 'create',
                    body: Object.assign({}, job)
                });
            }
            catch (error) {
                if (((_b = (_a = error === null || error === void 0 ? void 0 : error.body) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.root_cause[0].type) === 'version_conflict_engine_exception') {
                    logger_1.logger.info('Duplicate job listing ignored');
                }
                else {
                    logger_1.logger.error('Error on saving job listing', JSON.stringify(error, null, 2));
                }
            }
        });
    }
    searchJob(searchPhrase, skip, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchWords = searchPhrase.split(' ');
            const searchFields = [
                'title', 'description', 'jobFunction', 'industries', 'senorityLevel'
            ];
            try {
                logger_1.logger.debug({
                    query: {
                        bool: {
                            should: searchFields.flatMap(field => searchWords.map(word => {
                                return {
                                    match: {
                                        [field]: word
                                    }
                                };
                            }))
                        }
                    }
                });
                const response = yield this.client.search({
                    index: 'job',
                    from: skip !== null && skip !== void 0 ? skip : 0,
                    size: pageSize !== null && pageSize !== void 0 ? pageSize : 20,
                    body: {
                        query: {
                            bool: {
                                must: {
                                    query_string: {
                                        query: searchPhrase
                                    }
                                }
                            }
                        }
                    }
                });
                logger_1.logger.debug(response.body.hits.hits);
                return response;
            }
            catch (error) {
                logger_1.logger.error(error);
            }
        });
    }
    getClient() {
        return this.client;
    }
}
exports.ElasticSearchService = ElasticSearchService;
// create 2 routes with expres => not here => in a file called routes/ or start.
//# sourceMappingURL=elastic-search-service.js.map