import * as Confidence from 'confidence';

const criteria = {
  env: process.env.NODE_ENV,
};

const projectName = '10x/scheduler';


export const config = {
  app: {
    env: process.env.APP_ENVIRONMENT || 'dev',
    keys: {
    },
    slackEndpoints: {
    },
    service: {
    },
  },
  baseUrl: {
    $filter: 'env',
    production: '',
    $default: '',
  },
  logging: {
    opsInterval: parseInt(process.env.LOGGING_OPSINTERVAL, 10) || 86400000,
  },
  port: {
    web: {
      $filter: 'env',
      test: 3501,
      production: process.env.PORT,
      $default: 3500,
    },
  },
  projectName,
};

const store = new Confidence.Store(config);

export const get = (key) => {
  const validKey = key.replace(/-/g, '_');
  return store.get(validKey, criteria);
};

export default get;
