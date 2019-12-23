"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCheerioFile = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _fs = require("./fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCheerioFile = async filepath => {
  const file = await (0, _fs.readFileAsync)(filepath, {
    encoding: 'utf8'
  });
  return _cheerio.default.load(file);
};

exports.getCheerioFile = getCheerioFile;