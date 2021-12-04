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
class ElasticSearchService {
    constructor(host, port, log, apiVersion) {
        const client = new elasticsearch_1.default.Client({
            host: host + ':' + port,
            log: log,
            apiVersion: apiVersion,
        });
        this.client = client;
    }
    checkConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.ping({ requestTimeout: 1000 });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    save(response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.responses.push(response);
            yield this.client.index({
                index: 'job-listing',
                body: Object.assign({}, response)
            });
        });
    }
    search(index, type, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.search({
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
                for (const responseMessage of response.hits.hits) {
                    console.log(responseMessage);
                }
                return response;
            }
            catch (error) {
                console.trace(error.message);
            }
        });
    }
    getClient() {
        return this.client;
    }
}
exports.ElasticSearchService = ElasticSearchService;
// create 2 routes with expres => not here =? in a file called routes/ or start.
//# sourceMappingURL=elastic-search-service.js.map