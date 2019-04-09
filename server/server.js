import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import passport from 'passport';
import routes from './api/routes/index';
import authenticationMiddleware from './api/middlewares/authentication.middleware';
import routesWhiteList from './config/routes-white-list.config';

import './config/passport.config';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(authenticationMiddleware(routesWhiteList));

routes(app);

const staticPath = path.resolve(`${__dirname}/../client/build`);
app.use(express.static(staticPath));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
});
