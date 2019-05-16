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

import './config/passport.config';

dotenv.config();

const app = express();
const httpServer = http.Server(app);
const io = socketIO(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use('/api/', authorizationMiddleware(routesWhiteList));

routes(app);

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

io.on('connection', (socket) => {
    socket.on('createRoom', (roomId) => {
        // eslint-disable-next-line no-console
        console.log(`Room ${roomId} was joined`);
        socket.join(roomId);
    });
});

httpServer.listen(3002);
