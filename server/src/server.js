import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import Knex from 'knex';
import { Model } from 'objection';

import knexConfig from '../knexfile.js';
import { ENV, ExitCode } from './common/enums/enums.js';
import {
  socketInjector as socketInjectorPlugin
} from './plugins/plugins.js';
import { auth, comment, image, post, user, socket } from './services/services.js';
import { initApi } from './api/api.js';

class App {
  #app;

  constructor(opts) {
    this.#app = this.#initApp(opts);
  }

  get app() {
    return this.#app;
  }

  #initApp(opts) {
    const app = fastify(opts);
    socket.initializeIo(app.server);

    this.#registerPlugins(app);
    this.#initDB();

    return app;
  }

  #registerPlugins(app) {
    app.register(cors, {
      cors: {
        origin: 'http://localhost:3000',
        methods: '*',
        credentials: true
      }
    });

    const staticPath = new URL('../../client/build', import.meta.url);
    app.register(fastifyStatic, {
      root: staticPath.pathname,
      prefix: '/'
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

export { App };
