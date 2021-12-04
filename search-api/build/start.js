"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const elastic_search_service_1 = require("./service/elastic-search-service");
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./util/logger");
(() => __awaiter(void 0, void 0, void 0, function* () {
    dotenv.config();
    const es = new elastic_search_service_1.ElasticSearchService(process.env.ES_HOST, process.env.ES_PORT);
    yield es.checkConnection();
    // es.saveJob({
    // 	name: 'george',
    // 	date: Date.now()
    // });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.post('/save-job', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield es.saveJob(req.body);
        }
        catch (e) {
            res.status(400).json(e);
        }
        res.status(200).send();
    }));
    app.post('/search-job', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { searchPhrase, skip, pageSize } = req.body;
        try {
            res.status(200).send(yield es.searchJob(searchPhrase, skip, pageSize));
        }
        catch (e) {
            res.status(400).json(e);
        }
    }));
    const port = process.env.EXPRESS_PORT;
    app.listen(port, () => logger_1.logger.info(`App listening on port ${port}`));
}))();
//# sourceMappingURL=start.js.map