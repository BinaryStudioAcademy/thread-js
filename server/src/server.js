import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Knex from 'knex';
import { Model } from 'objection';
import qs from 'qs';

import knexConfig from '../knexfile.js';
import { initApi } from './api/api.js';
import { ENV, ExitCode } from './common/enums/enums.js';
import { socketInjector as socketInjectorPlugin } from './plugins/plugins.js';
import { auth, comment, image, post, user, socket } from './services/services.js';

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  },
  querystringParser: str => qs.parse(str, { comma: true })
});

socket.initializeIo(app.server);

const knex = Knex(knexConfig);
Model.knex(knex);

app.register(cors, {
  cors: {
    origin: 'http://localhost:3000',
    methods: '*'
  }
});
app.register(socketInjectorPlugin, { io: socket.io });
app.register(initApi, {
  services: {
    auth,
    comment,
    image,
    post,
    user
  },
  prefix: ENV.APP.API_PATH
});

const staticPath = new URL('../../client/build', import.meta.url);
app.register(fastifyStatic, {
  root: staticPath.pathname,
  prefix: '/'
});

app.setNotFoundHandler((req, res) => {
  res.sendFile('index.html');
});

const startServer = async () => {
  try {
    await app.listen(ENV.APP.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(ExitCode.ERROR);
  }
};
startServer();
