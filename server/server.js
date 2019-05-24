import dotenv from 'dotenv';
import fs from 'fs';
import express from 'express';
import path from 'path';
import passport from 'passport';
import http from 'http';
import socketIO from 'socket.io';

import routes from './api/routes/index';
import authorizationMiddleware from './api/middlewares/authorization.middleware';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import routesWhiteList from './config/routes-white-list.config';
import socketInjector from './socket/injector';
import socketHandlers from './socket/handlers';

import './config/passport.config';

dotenv.config();

const app = express();
const socketServer = http.Server(app);
const io = socketIO(socketServer);

io.on('connection', socketHandlers);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(socketInjector(io));

app.use('/api/', authorizationMiddleware(routesWhiteList));

routes(app, io);

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (req, res) => {
    res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
    res.end();
});

app.use(errorHandlerMiddleware);
app.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
});


socketServer.listen(3002);
