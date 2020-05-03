/* eslint-disable no-console */
import Sequelize from 'sequelize';
import * as config from '../../config/db.config';

export default new Sequelize(config);
