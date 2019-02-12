import R from 'ramda';
import RouterGetters from '../../../routes';

export default {
  name: 'server-routes',
  version: '1.0.0',
  async register(server, options) {
    const routes = R.map(routefn => routefn(server, options), RouterGetters);
    server.route(routes);
  },
}
