import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import http from 'http';
import Knex from 'knex';
import { Model } from 'objection';
import qs from 'qs';
import { Server as SocketServer } from 'socket.io';

import knexConfig from '../knexfile.js';
import { initApi } from './api/api.js';
import { ENV, ExitCode } from './common/enums/enums.js';
import { socketInjector as socketInjectorPlugin } from './plugins/plugins.js';
import { auth, comment, image, post, user } from './services/services.js';
import { handlers as socketHandlers } from './socket/handlers.js';

const app = fastify({
  logger: {
    prettyPrint: {
      ignore: 'pid,hostname'
    }
  },
  querystringParser: str => qs.parse(str, { comma: true })
});

const socketServer = http.Server(app);
const io = new SocketServer(socketServer, {
  cors: {
    origin: '*',
    credentials: true
  }
});

const knex = Knex(knexConfig);
Model.knex(knex);

io.on('connection', socketHandlers);

app.register(cors);
app.register(socketInjectorPlugin, { io });
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

socketServer.listen(ENV.APP.SOCKET_PORT);
