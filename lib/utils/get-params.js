"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getParams = function (arr) { return arr.map(function (q) { return "&" + q.param + "=" + q.value; }).join(''); };
exports.default = getParams;
