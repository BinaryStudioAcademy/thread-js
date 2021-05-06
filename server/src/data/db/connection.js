import Sequelize from 'sequelize';
import * as dbConfig from '../../config/config';

const sequelize = new Sequelize(dbConfig);

export { sequelize };
