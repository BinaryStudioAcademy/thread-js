import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import passport from 'passport';
import routes from './api/routes/index';
import authorizationMiddleware from './api/middlewares/authorization.middleware';
import errorHandlerMiddleware from './api/middlewares/error-handler.middleware';
import routesWhiteList from './config/routes-white-list.config';
import fs from 'fs';

import './config/passport.config';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.get('/api/*', authorizationMiddleware(routesWhiteList));
routes(app);

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (req, res) => {
    res.write(fs.readFileSync(`${__dirname}/../client/build/index.html`));
    res.end();
});

app.use(errorHandlerMiddleware);
app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
});
