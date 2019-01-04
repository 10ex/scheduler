"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _test = _interopRequireDefault(require("./test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API = [_test.default]; // @ts-ignore

const Methods = _ramda.default.reduce(_ramda.default.concat, [], API);

var _default = Methods;
exports.default = _default;
//# sourceMappingURL=index.js.map