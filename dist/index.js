"use strict";

var _glue = require("glue");

var Manifest = _interopRequireWildcard(require("./manifest"));

var _modules = _interopRequireDefault(require("./server/lib/modules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const composeOptions = {
  relativeTo: __dirname
};

async function startServer() {
  const server = await (0, _glue.compose)(Manifest.get('/'), composeOptions);
  await server.register(_modules.default);
  await server.start();
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
startServer();
//# sourceMappingURL=index.js.map