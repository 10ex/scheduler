"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _methods = _interopRequireDefault(require("../../../methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'server-methods',
  version: '1.0.0',

  async register(server) {
    server.method(_methods.default);
  }

};
exports.default = _default;
//# sourceMappingURL=index.js.map