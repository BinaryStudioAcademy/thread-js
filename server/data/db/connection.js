/* eslint-disable no-console */
import Sequelize from 'sequelize';
import * as config from '../../config/db.config';

const sequelize = new Sequelize(config);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
