"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helloWorld = helloWorld;
exports.default = void 0;

var Future = _interopRequireWildcard(require("fluture"));

var _createServerMethod = _interopRequireDefault(require("../lib/createServerMethod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function* helloWorld() {
  return yield Future.of('hello world');
}

const serverMethods = [{
  name: 'test.helloWorld',
  method: (0, _createServerMethod.default)(helloWorld)
}];
var _default = serverMethods;
exports.default = _default;
//# sourceMappingURL=test.js.map