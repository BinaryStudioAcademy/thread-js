import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';

import { socketService } from '#libs/packages/socket/socket.js';
import { socketInjector as socketInjectorPlugin } from '#libs/plugins/plugins.js';
import { authService } from '#packages/auth/auth.js';
import { commentService } from '#packages/comment/comment.js';
import { imageService } from '#packages/image/image.js';
import { postService } from '#packages/post/post.js';
import { userService } from '#packages/user/user.js';

import knexConfig from '../../../../knexfile.js';
import { initApi } from './server-app-api.js';

class ServerApp {
  #app;

  #knex;

  #config;

  constructor({ config, options }) {
    this.#config = config;

    const { app, knex } = this.#initApp(options);
    this.#app = app;
    this.#knex = knex;
  }

  get app() {
    return this.#app;
  }

  get knex() {
    return this.#knex;
  }

  #initApp(options) {
    const app = fastify(options);
    socketService.initializeIo(app.server);

    this.#registerPlugins(app);
    const knex = this.#initDB();

    return { app, knex };
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

    app.register(socketInjectorPlugin, { io: socketService.io });
    app.register(initApi, {
      services: {
        authService,
        commentService,
        imageService,
        postService,
        userService
      },
      prefix: this.#config.ENV.APP.API_PATH
    });

    app.setNotFoundHandler((_request, response) => {
      response.sendFile('index.html');
    });
  }

  #initDB() {
    const knex = Knex(knexConfig);
    Model.knex(knex);

    return knex;
  }

  start = async () => {
    try {
      await this.#app.listen(this.#config.ENV.APP.PORT);
    } catch (error) {
      this.#app.log.error(error);
    }
  };
}

export { ServerApp };
