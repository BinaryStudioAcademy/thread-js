import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import http from 'http';
import Knex from 'knex';
import { Model } from 'objection';
import qs from 'qs';
import { Server as SocketServer } from 'socket.io';

import knexConfig from '../knexfile.js';
import { ENV, ExitCode } from './common/enums/enums.js';
import {
  socketInjector as socketInjectorPlugin,
  authorization as authorizationPlugin
} from './plugins/plugins.js';
import { auth, comment, image, post, user } from './services/services.js';
import { initControllers } from './controllers/controllers.js';
import { WHITE_ROUTES } from './common/constants/constants.js';
import { handlers as socketHandlers } from './socket/handlers.js';

class App {
  #app;

  #socketServer;

  constructor() {
    const { app, socketServer } = this.#initApp();

    this.#app = app;
    this.#socketServer = socketServer;
  }

  #initApp() {
    const app = fastify({
      prefixAvoidTrailingSlash: true,
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

    this.#iniSocketConnection(io);
    this.#registerPlugins(app, io);
    this.#initDB();

    return { app, socketServer };
  }

  #registerPlugins(app, io) {
    app.register(cors);

    const staticPath = new URL('../../client/build', import.meta.url);
    app.register(fastifyStatic, {
      root: staticPath.pathname,
      prefix: '/'
    });

    app.register(authorizationPlugin, {
      services: {
        auth,
        user
      },
      routesWhiteList: WHITE_ROUTES
    });
    app.register(socketInjectorPlugin, { io });
    app.register(initControllers, {
      services: {
        auth,
        comment,
        image,
        post,
        user
      },
      prefix: ENV.APP.API_PATH
    });

    app.setNotFoundHandler((req, res) => {
      res.sendFile('index.html');
    });
  }

  #initDB() {
    const knex = Knex(knexConfig);
    Model.knex(knex);
  }

  #iniSocketConnection(io) {
    io.on('connection', socketHandlers);
  }

  start = async () => {
    try {
      await this.#app.listen(ENV.APP.PORT);
      await this.#socketServer.listen(ENV.APP.SOCKET_PORT);
    } catch (err) {
      this.#app.log.error(err);
      process.exit(ExitCode.ERROR);
    }
  };
}
new App().start();
