"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Future = _interopRequireWildcard(require("fluture"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 *
 * @param {() => IterableIterator<any>} routine
 *  this function takes a generator method that expects a request object and
 * returns a server method that either replys with an error if
 *  the generator resolves a rejection or success if it does not
 */
const createServerMethod = routine => (request, h) => Future.go(routine.bind(routine, request, h)).promise().catch(err => {
  console.log(err);
  return err;
});

var _default = createServerMethod;
exports.default = _default;
//# sourceMappingURL=createServerMethod.js.map