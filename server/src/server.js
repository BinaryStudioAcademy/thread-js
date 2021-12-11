import fastify from 'fastify';
import cors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import http from 'http';
import Knex from 'knex';
import { Model } from 'objection';
import path from 'path';
import qs from 'qs';
import socketIO from 'socket.io';

import { initApi } from './api/api';
import { ENV } from './common/enums/enums';
import knexConfig from '../knexfile';
import { socketInjector as socketInjectorPlugin } from './plugins/plugins';
import * as services from './services/services';
import { handlers as socketHandlers } from './socket/handlers';

const app = fastify({
  logger: {
    prettyPrint: {
      ignore: 'pid,hostname'
    }
  },
  querystringParser: str => qs.parse(str, { comma: true })
});

const socketServer = http.Server(app);
const io = socketIO(socketServer, {
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
app.register(initApi, { services, prefix: ENV.APP.API_PATH });

const staticPath = path.join(`${__dirname}/../client/build`);
app.register(fastifyStatic, { root: staticPath, prefix: '/' });

const startServer = async () => {
  try {
    await app.listen(ENV.APP.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
startServer();

socketServer.listen(ENV.APP.SOCKET_PORT);
