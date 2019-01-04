"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatAddress = exports.isObj = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isObj = _ramda.default.compose(_ramda.default.equals('Object'), _ramda.default.type);

exports.isObj = isObj;

const formatAddress = _ramda.default.compose(_ramda.default.join(' '), _ramda.default.values);

exports.formatAddress = formatAddress;
//# sourceMappingURL=utils.js.map