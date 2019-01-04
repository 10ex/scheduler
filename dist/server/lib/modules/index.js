"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverMethods = _interopRequireDefault(require("./server-methods"));

var _serverRoutes = _interopRequireDefault(require("./server-routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Modules = [_serverMethods.default, _serverRoutes.default];
var _default = Modules;
exports.default = _default;
//# sourceMappingURL=index.js.map