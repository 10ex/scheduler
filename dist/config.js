"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.get = exports.config = void 0;

var Confidence = _interopRequireWildcard(require("confidence"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const criteria = {
  env: process.env.NODE_ENV
};
const projectName = '10x/scheduler';
const config = {
  app: {
    env: process.env.APP_ENVIRONMENT || 'dev',
    keys: {},
    slackEndpoints: {},
    service: {}
  },
  baseUrl: {
    $filter: 'env',
    production: '',
    $default: ''
  },
  logging: {
    opsInterval: parseInt(process.env.LOGGING_OPSINTERVAL, 10) || 86400000
  },
  port: {
    web: {
      $filter: 'env',
      test: 3501,
      production: process.env.PORT,
      $default: 3500
    }
  },
  projectName
};
exports.config = config;
const store = new Confidence.Store(config);

const get = key => {
  const validKey = key.replace(/-/g, '_');
  return store.get(validKey, criteria);
};

exports.get = get;
var _default = get;
exports.default = _default;
//# sourceMappingURL=config.js.map