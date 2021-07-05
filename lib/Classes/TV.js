"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Movies_1 = require("./Movies");
var request_1 = require("../utils/request");
var get_params_1 = require("../utils/get-params");
var TV = /** @class */ (function (_super) {
    __extends(TV, _super);
    function TV(apiKey) {
        var _this = _super.call(this, apiKey) || this;
        _this.apiKey = apiKey;
        return _this;
    }
    TV.prototype.discoverTv = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryParams;
            return __generator(this, function (_a) {
                if (query && query.length > 0) {
                    queryParams = query;
                    return [2 /*return*/, request_1.default("\n        https://api.themoviedb.org/3/discover/tv?api_key=" + this.apiKey + get_params_1.default(queryParams))];
                }
                else {
                    return [2 /*return*/, request_1.default("\n      https://api.themoviedb.org/3/discover/tv?api_key=" + this.apiKey)];
                }
                return [2 /*return*/];
            });
        });
    };
    TV.prototype.tv = function (id, args) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, providers, getProviders, append, reqParams, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providers = {};
                        if (args === undefined) {
                            return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + this.apiKey)];
                        }
                        getProviders = args.getProviders, append = args.append;
                        reqParams = append ? append.join(',') : '';
                        query = reqParams.length > 0 ? "&append_to_response=" + reqParams : '';
                        if (!(getProviders === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getTvProvider(id, 1)];
                    case 1:
                        providers = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + this.apiKey + query)];
                    case 3:
                        resp = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, resp), { providers: providers })];
                }
            });
        });
    };
    TV.prototype.tvShows = function (type, page) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = "https://api.themoviedb.org/3/tv/" + type + "?api_key=" + this.apiKey + "&page=" + page;
                return [2 /*return*/, request_1.default(url)];
            });
        });
    };
    TV.prototype.getSimilarTv = function (id, page) {
        if (id === void 0) { id = 0; }
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/similar?api_key=" + this.apiKey + "&page=" + page)];
            });
        });
    };
    /**
     * Get images of the  tv show by there ids
     * @example getImages(337404)
     * @param {number} id valid id of  tv
     * @returns {Promise} Promise containing object with properties : id,backdrops,posters
     */
    TV.prototype.getTVImages = function (id) {
        if (id === void 0) { id = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/images?api_key=" + this.apiKey)];
            });
        });
    };
    /**
     * Get Providers list of tv show
     * @param {number} id id of the tv
     * @param {number} page page number default:1
     * @returns {Promise} object with property id results
     */
    TV.prototype.getTvProvider = function (id, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=" + this.apiKey + "&page=" + page)];
            });
        });
    };
    /**
     * Get the changes occurred in  tv by there id
     * @example getChanges(337404)
     * @param {number} id id of the tv
     * @param {number} page page number
     * @returns {Promise} object with propert of change
     */
    TV.prototype.getTvChanges = function (id, page) {
        if (id === void 0) { id = 0; }
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/changes?api_key=" + this.apiKey + "&page=" + page)];
            });
        });
    };
    /**
     * Get keywords related to the  tv by there id
     * @example getKeywords(337404)
     * @param {number} id id of the movie or tv
     * @returns {Promise} object with property of id and results
     */
    TV.prototype.getTvKeywords = function (id) {
        if (id === void 0) { id = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/keywords?api_key=" + this.apiKey)];
            });
        });
    };
    TV.prototype.getTvCertifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/certification/tv/list?api_key=" + this.apiKey)];
            });
        });
    };
    TV.prototype.getTvSeason = function (id, seasonNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber + "?api_key=" + this.apiKey + "&language=en-US")];
            });
        });
    };
    TV.prototype.getTvSeasonDetail = function (id, seasonNumber, detail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber + "/" + detail + "?api_key=" + this.apiKey + "&language=en-US")];
            });
        });
    };
    TV.prototype.getTVEpisodes = function (id, seasonNumber, episodeNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber + "/episode/" + episodeNumber + "?api_key=" + this.apiKey + "&language=en-US")];
            });
        });
    };
    TV.prototype.getTvEpisodeDetail = function (id, seasonNumber, episodeNumber, detail) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber + "/episode/" + episodeNumber + "/" + detail + "?api_key=" + this.apiKey + "&language=en-US")];
            });
        });
    };
    TV.prototype.getTvEpisodeGroup = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, request_1.default("https://api.themoviedb.org/3/tv/episode_group/{id}?api_key=" + this.apiKey + "&language=en-US")];
            });
        });
    };
    return TV;
}(Movies_1.default));
exports.default = TV;
