import * as Confidence from 'confidence';
import * as Config from './config';
import Package from '../package.json'

const criteria = {
  env: process.env.NODE_ENV,
};
export const manifest = {

  server: {
    port: Config.get('/port/web'),
  },
  register: {
    plugins: [
      {
        plugin: 'inert',
      },
      {
        plugin: 'blipp',
        options: {
          showAuth: true,
        },
      },
      {
        plugin: 'good',
        options: {
          includes: {
            response: ['payload'],
          },
          ops: { interval: Config.get('/logging/opsInterval') },
          reporters: {
            consoleReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }],
            }, {
              module: 'good-console',
              args: [{
                log: '*', ops: '*', response: '*', request: '*', error: '*',
              }],
            }, 'stdout'],
          },
        },
      },
      {
        plugin: 'vision',
      },
      {
        plugin: 'hapi-swaggered',
        options: {
          routeTags: ['api'],
          info: {
            title: 'Smoochbot API',
            description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
            version: Package.version,
          },
        },
      },
      {
        plugin: 'hapi-swaggered-ui',
        options: {
          title: 'Smoochbot API',
          path: '/docs',
          authorization: false,
          swaggerOptions: {
            validatorUrl: null,
            displayRequestDuration: true,
          },
        },
      },
    ],
  },
};

const store = new Confidence.Store(manifest);
export const get = key => store.get(key, criteria);

export default get
