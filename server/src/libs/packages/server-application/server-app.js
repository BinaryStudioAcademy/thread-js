import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import multer from 'fastify-multer';

import { joinPath } from '#libs/packages/path/path.js';
import { socketService } from '#libs/packages/socket/socket.js';
import {
  authorization as authorizationPlugin,
  socketInjector as socketInjectorPlugin
} from '#libs/plugins/plugins.js';
import { authService } from '#packages/auth/auth.js';
import { userService } from '#packages/user/user.js';

import { WHITE_ROUTES } from './libs/constants/constants.js';

class ServerApp {
  #app;

  #knex;

  #config;

  #api;

  #database;

  constructor({ config, options, api, database }) {
    this.#config = config;

    this.#app = this.#initApp(options);

    this.#api = api;
    this.#database = database;
  }

  get app() {
    return this.#app;
  }

  get database() {
    return this.#database;
  }

  #initApp = options => {
    const app = fastify(options);
    socketService.initializeIo(app.server);

    return app;
  };

  initialize = async () => {
    await this.#initValidationCompiler();
    await this.#registerServe();
    await this.#registerPlugins();
    await this.#registerRoutes();

    this.#database.connect();

    return this;
  };

  #registerServe = async () => {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../../client/build'
    );

    await this.#app.register(fastifyStatic, {
      root: staticPath,
      prefix: '/'
    });

    this.#app.setNotFoundHandler(async (_request, response) => {
      await response.sendFile('index.html', staticPath);
    });
  };

  #registerPlugins = async () => {
    await this.#app.register(multer.contentParser);
    await this.#app.register(cors, {
      cors: {
        origin: 'http://localhost:3000',
        methods: '*',
        credentials: true
      }
    });
    await this.#app.register(authorizationPlugin, {
      services: {
        userService,
        authService
      },
      routesWhiteList: WHITE_ROUTES
    });
    await this.#app.register(socketInjectorPlugin, { io: socketService.io });
  };

  #registerRoutes = () => {
    const routers = this.#api.controllers.flatMap(it => it.routes);

    for (const it of routers) {
      const { url: path, ...parameters } = it;

      this.app.route({
        url: joinPath([this.#config.ENV.APP.API_PATH, path]),
        ...parameters
      });
    }
  };

  #initValidationCompiler = () => {
    this.#app.setValidatorCompiler(({ schema }) => {
      return data => {
        return schema.validate(data, {
          abortEarly: true
        });
      };
    });
  };

  start = async () => {
    try {
      await this.#app.listen({ port: this.#config.ENV.APP.PORT });
    } catch (error) {
      this.#app.log.error(error);
    }
  };
}

export { ServerApp };
