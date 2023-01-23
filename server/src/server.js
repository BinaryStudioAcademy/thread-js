import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Knex from 'knex';
import { Model } from 'objection';
import qs from 'qs';

import knexConfig from '../knexfile.js';
import { ENV, ExitCode } from './common/enums/enums.js';
import {
  socketInjector as socketInjectorPlugin,
  authorization as authorizationPlugin
} from './plugins/plugins.js';
import { auth, comment, image, post, user, socket } from './services/services.js';
import { initControllers } from './controllers/controllers.js';
import { WHITE_ROUTES } from './common/constants/constants.js';

class App {
  #app;

  constructor() {
    this.#app = this.#initApp();
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
    socket.initializeIo(app.server);

    this.#registerPlugins(app);
    this.#initDB();

    return app;
  }

  #registerPlugins(app) {
    app.register(cors, {
      cors: {
        origin: 'http://localhost:3000',
        methods: '*'
      }
    });

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
    app.register(socketInjectorPlugin, { io: socket.io });
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

  start = async () => {
    try {
      await this.#app.listen(ENV.APP.PORT);
    } catch (err) {
      this.#app.log.error(err);
      process.exit(ExitCode.ERROR);
    }
  };
}
new App().start();
