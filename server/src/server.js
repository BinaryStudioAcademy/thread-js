import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';

import knexConfig from '../knexfile.js';
import { initApi } from './api/api.js';
import { ENV } from './common/enums/enums.js';
import { socketInjector as socketInjectorPlugin } from './plugins/plugins.js';
import {
  auth,
  comment,
  image,
  post,
  socket,
  user
} from './services/services.js';

class App {
  #app;

  constructor(options) {
    this.#app = this.#initApp(options);
  }

  get app() {
    return this.#app;
  }

  #initApp(options) {
    const app = fastify(options);
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

    app.setNotFoundHandler((_, response) => {
      response.sendFile('index.html');
    });
  }

  #initDB() {
    const knex = Knex(knexConfig);
    Model.knex(knex);
  }

  start = async () => {
    try {
      await this.#app.listen(ENV.APP.PORT);
    } catch (error) {
      this.#app.log.error(error);
    }
  };
}

export { App };
