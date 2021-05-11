import fs from 'fs';
import express, { Router } from 'express';
import path from 'path';
import passport from 'passport';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import { WHITE_ROUTES } from './common/constants/constants';
import { ENV } from './common/enums/enums';
import { sequelize } from './data/db/connection';
import { initApi } from './api/api';
import {
  authorization as authorizationMiddleware,
  errorHandler as errorHandlerMiddleware,
  socketInjector as socketInjectorMiddleware
} from './middlewares/middlewares';
import { handlers as socketHandlers } from './socket/handlers';
import './config/passport';

const app = express();
const socketServer = http.Server(app);
const io = socketIO(socketServer);

sequelize
  .authenticate()
  .then(() => {
    console.info('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

io.on('connection', socketHandlers);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(socketInjectorMiddleware(io));

app.use(ENV.APP.API_PATH, authorizationMiddleware(WHITE_ROUTES));

app.use(ENV.APP.API_PATH, initApi(Router));

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (_req, res) => {
  res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
  res.end();
});

app.use(errorHandlerMiddleware);
app.listen(ENV.APP.PORT, () => {
  console.info(`Server listening on port ${ENV.APP.PORT}!`);
});

socketServer.listen(ENV.APP.SOCKET_PORT);
