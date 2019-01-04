import Methods from '../../../methods';

export default {
  name: 'server-methods',
  version: '1.0.0',
  async register(server) {
    server.method(Methods);
  },
}
