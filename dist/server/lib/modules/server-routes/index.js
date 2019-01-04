"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

var _routes = _interopRequireDefault(require("../../../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'server-routes',
  version: '1.0.0',

  async register(server, options) {
    const routes = _ramda.default.map(routefn => routefn(server, options), _routes.default);

    server.route(routes);
  }

};
exports.default = _default;
//# sourceMappingURL=index.js.map