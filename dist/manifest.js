"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.get = exports.manifest = void 0;

var Confidence = _interopRequireWildcard(require("confidence"));

var Config = _interopRequireWildcard(require("./config"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const criteria = {
  env: process.env.NODE_ENV
};
const manifest = {
  server: {
    port: Config.get('/port/web')
  },
  register: {
    plugins: [{
      plugin: 'inert'
    }, {
      plugin: 'blipp',
      options: {
        showAuth: true
      }
    }, {
      plugin: 'good',
      options: {
        includes: {
          response: ['payload']
        },
        ops: {
          interval: Config.get('/logging/opsInterval')
        },
        reporters: {
          consoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              log: '*',
              response: '*'
            }]
          }, {
            module: 'good-console',
            args: [{
              log: '*',
              ops: '*',
              response: '*',
              request: '*',
              error: '*'
            }]
          }, 'stdout']
        }
      }
    }, {
      plugin: 'vision'
    }, {
      plugin: 'hapi-swaggered',
      options: {
        routeTags: ['api'],
        info: {
          title: 'Smoochbot API',
          description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
          version: _package.default.version
        }
      }
    }, {
      plugin: 'hapi-swaggered-ui',
      options: {
        title: 'Smoochbot API',
        path: '/docs',
        authorization: false,
        swaggerOptions: {
          validatorUrl: null,
          displayRequestDuration: true
        }
      }
    }]
  }
};
exports.manifest = manifest;
const store = new Confidence.Store(manifest);

const get = key => store.get(key, criteria);

exports.get = get;
var _default = get;
exports.default = _default;
//# sourceMappingURL=manifest.js.map