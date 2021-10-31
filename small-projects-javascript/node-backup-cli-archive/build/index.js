"use strict";

var _commander = _interopRequireDefault(require("./commander"));

var _backup = _interopRequireDefault(require("./backup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const main = async () => (0, _backup.default)(_commander.default);

main();