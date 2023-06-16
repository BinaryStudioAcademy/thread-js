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

  #config;

  constructor({ config, options }) {
    this.#config = config;
    this.#app = this.#initApp(options);
  }

  get app() {
    return this.#app;
  }

  #initApp(options) {
    const app = fastify(options);
    socketService.initializeIo(app.server);

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

    app.setNotFoundHandler((request, response) => {
      response.sendFile('index.html');
    });
  }

  #initDB() {
    const knex = Knex(knexConfig);
    Model.knex(knex);
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
