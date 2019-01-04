import * as Future from 'fluture';

/**
 *
 * @param {() => IterableIterator<any>} routine
 *  this function takes a generator method that expects a request object and
 * returns a server method that either replys with an error if
 *  the generator resolves a rejection or success if it does not
 */
const createServerMethod = routine => (request, h) => Future
  .go(routine.bind(routine, request, h))
  .promise()
  .catch((err) => {
    console.log(err);
    return err;
  });

export default createServerMethod
