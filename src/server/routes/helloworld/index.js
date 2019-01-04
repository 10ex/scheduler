function helloWorld(server, options) {
  return {
    method: 'GET',
    path: '/',
    config: {
      id: 'helloWorld',
      tags: ['hello', 'world'],
      description: 'return hello world',
      pre: [

      ],
      handler: server.methods.test.helloWorld,
    },
  };
}

export default helloWorld;
