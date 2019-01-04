"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _helloworld = _interopRequireDefault(require("./helloworld"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouterGetters = _ramda.default.flatten([_helloworld.default]);

var _default = RouterGetters;
exports.default = _default;
//# sourceMappingURL=index.js.map