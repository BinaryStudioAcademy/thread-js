import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastify, {
  type FastifyInstance,
  type FastifyServerOptions
} from 'fastify';
import { type FastifyValidationResult } from 'fastify/types/schema.js';
import multer from 'fastify-multer';

import { type ConfigPackage } from '~/libs/packages/config/config.js';
import { joinPath } from '~/libs/packages/path/path.js';
import { socketService } from '~/libs/packages/socket/socket.js';
import {
  authorization as authorizationPlugin,
  socketInjector as socketInjectorPlugin
} from '~/libs/plugins/plugins.js';
import { type ValidationSchema } from '~/libs/types/types.js';
import { authService } from '~/packages/auth/auth.js';
import { userService } from '~/packages/user/user.js';

import { type DatabasePackage } from '../database/database.js';
import { WHITE_ROUTES } from './libs/constants/constants.js';
import { type ServerApi } from './libs/types/types.js';

type Constructor = {
  config: ConfigPackage;
  api: ServerApi;
  options: FastifyServerOptions;
  database: DatabasePackage;
};

class ServerApp {
  #app: FastifyInstance;

  #config: ConfigPackage;

  #api: ServerApi;

  #database: DatabasePackage;

  public constructor({ config, options, api, database }: Constructor) {
    this.#config = config;

    this.#app = this.#initApp(options);

    this.#api = api;
    this.#database = database;
  }

  public get app(): FastifyInstance {
    return this.#app;
  }

  public get database(): DatabasePackage {
    return this.#database;
  }

  #initApp = (options: FastifyServerOptions): FastifyInstance => {
    const app = fastify(options);
    socketService.initializeIo(app.server);

    return app;
  };

  public initialize = async (): Promise<typeof this> => {
    this.#initValidationCompiler();
    await this.#registerServe();
    await this.#registerPlugins();
    this.#registerRoutes();

    this.#database.connect();

    return this;
  };

  #registerServe = async (): Promise<void> => {
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

  #registerPlugins = async (): Promise<void> => {
    await this.#app.register(multer.contentParser);
    await this.#app.register(cors, {
      origin: 'http://localhost:3000',
      methods: '*',
      credentials: true
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

  #registerRoutes = (): void => {
    const routers = this.#api.controllers.flatMap(it => it.routes);

    for (const it of routers) {
      const { url: path, ...parameters } = it;

      this.app.route({
        url: joinPath([this.#config.ENV.APP.API_PATH, path]),
        ...parameters
      });
    }
  };

  #initValidationCompiler = (): void => {
    this.#app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
      return (data => {
        return schema.validate(data, {
          abortEarly: true
        });
      }) as FastifyValidationResult;
    });
  };

  public start = async (): Promise<void> | never => {
    try {
      await this.#app.listen({
        port: this.#config.ENV.APP.PORT,
        host: this.#config.ENV.APP.HOST
      });
    } catch (error) {
      this.#app.log.error(error);
    }
  };
}

export { ServerApp };
