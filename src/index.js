import { compose } from 'glue';
import * as Manifest from './manifest';
import Modules from './server/lib/modules';

const composeOptions = {
  relativeTo: __dirname,
};

async function startServer() {
  const server = await compose(Manifest.get('/'), composeOptions);
  await server.register(Modules);
  await server.start();
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

startServer()
