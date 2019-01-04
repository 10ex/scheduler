
import * as Future from 'fluture';
import createServerMethod from '../lib/createServerMethod';

export function* helloWorld() {
  return yield Future.of('hello world');
}

const serverMethods = [
  {
    name: 'test.helloWorld',
    method: createServerMethod(helloWorld),
  },
];

export default serverMethods
