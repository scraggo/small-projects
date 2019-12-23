"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCSV = void 0;

var _papaparse = _interopRequireDefault(require("papaparse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// With implicit header row
// (keys of first object populate header row)
// const csv = Papa.unparse([
//   {
//     'Column 1': 'foo',
//     'Column 2': 'bar'
//   },
//   {
//     'Column 1': 'abc',
//     'Column 2': 'def'
//   }
// ]);
const getCSV = arr => _papaparse.default.unparse(arr);

exports.getCSV = getCSV;