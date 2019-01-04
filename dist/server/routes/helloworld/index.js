"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function helloWorld(server, options) {
  return {
    method: 'GET',
    path: '/',
    config: {
      id: 'helloWorld',
      tags: ['hello', 'world'],
      description: 'return hello world',
      pre: [],
      handler: server.methods.test.helloWorld
    }
  };
}

var _default = helloWorld;
exports.default = _default;
//# sourceMappingURL=index.js.map