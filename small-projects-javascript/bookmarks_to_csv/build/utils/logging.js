"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyPrint = exports.pretty = void 0;

const pretty = obj => JSON.stringify(obj, null, 2); // eslint-disable-next-line no-console


exports.pretty = pretty;

const prettyPrint = obj => console.log(pretty(obj));

exports.prettyPrint = prettyPrint;